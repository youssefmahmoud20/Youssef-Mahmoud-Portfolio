from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
import subprocess, re, json

root = Path(__file__).resolve().parents[1] / 'public' / 'assets'
root.mkdir(parents=True, exist_ok=True)
bases = {
 'https://ryancv.bslthemes.com/developer/wp-content/uploads/sites/3/2022/07/': ['dev-bg-4-1200x744.jpg','dev-bg-1200x800.jpg','dev-bg-3-1200x812.jpg','prod2-2-300x300.jpg','prod1-2-300x300.jpg','prod2-2.jpg','prod1-2.jpg']
}
def get(job):
 url,name=job
 p=root/name
 r=subprocess.run(['curl.exe','--fail','--silent','--show-error','--location','--retry','2','--max-time','60',url,'-o',str(p)],capture_output=True,text=True)
 return {'file':name,'source':url,'ok':r.returncode==0,'bytes':p.stat().st_size if p.exists() else 0}
jobs=[(base+name,name) for base,names in bases.items() for name in names]
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
