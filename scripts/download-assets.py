from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
import subprocess, re, json

root = Path(__file__).resolve().parents[1] / 'public' / 'assets'
root.mkdir(parents=True, exist_ok=True)
bases = {
 'https://ryancv.bslthemes.com/developer/wp-content/uploads/sites/3/2022/07/': ['avatar.png','dev-bg-4-1200x744.jpg','dev-bg-1200x800.jpg','dev-bg-3-1200x812.jpg','brand3_w-184x62.png','brand1_w-184x62.png','brand2_w-184x62.png','brand3-184x62.png','testi1-184x184.jpg','testi2-184x184.jpg','avatar2-184x184.png','brand2_w.png','brand3_w.png','certificate.jpeg','prod2-2-300x300.jpg','prod1-2-300x300.jpg','prod2-2.jpg','prod1-2.jpg'],
 'https://ryancv.bslthemes.com/developer/wp-content/uploads/sites/3/2020/04/': ['rlogo3.png','work1-1.jpg','work2-1.jpg','work3-1.jpg','work4-1.jpg','work8.jpg','work6.jpg','work7.jpg','work5-1.jpg'] + [f'work-single{i}.jpg' for i in range(1,7)] + ['blog1.jpg','blog2.jpg','blog3.jpg','bg.jpg']
}
def get(job):
 url,name=job
 p=root/name
 r=subprocess.run(['curl.exe','--fail','--silent','--show-error','--location','--retry','2','--max-time','60',url,'-o',str(p)],capture_output=True,text=True)
 return {'file':name,'source':url,'ok':r.returncode==0,'bytes':p.stat().st_size if p.exists() else 0}
jobs=[(base+name,name) for base,names in bases.items() for name in names]
jobs += [('https://ryancv.bslthemes.com/default/wp-content/uploads/sites/29/2026/07/cv-example-file.pdf','cv.pdf')]
with ThreadPoolExecutor(max_workers=6) as pool:
 results=list(pool.map(get,jobs))
css=subprocess.run(['curl.exe','--fail','--silent','--location','https://fonts.googleapis.com/css2?family=Lekton:ital,wght@0,400;0,700;1,400&display=swap'],capture_output=True,text=True).stdout
font_rules=[]
for i,block in enumerate(re.findall(r'@font-face\s*\{[^}]+\}',css)):
 match=re.search(r'url\(([^)]+)\)',block)
 if match:
  url=match.group(1); name=f'lekton-{i}.'+('woff2' if 'woff2' in url else 'ttf')
  result=get((url,name)); results.append(result)
  if result['ok']: font_rules.append(block.replace(url,'/assets/'+name))
(root/'fonts.css').write_text('\n'.join(font_rules),encoding='utf-8')
(root/'manifest.json').write_text(json.dumps(results,indent=2),encoding='utf-8')
print(json.dumps({'downloaded':sum(r['ok'] for r in results),'failed':[r['file'] for r in results if not r['ok']]}))
