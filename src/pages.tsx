import { Link } from "react-router-dom";
import { home } from "./content";
import { Heading } from "./components";
import { Icon } from "./icons";

export function NotFound() {
  return (
    <section>
      <Heading>Page not found</Heading>
      <p>The page you’re looking for could not be found.</p>
      <Link className="action" to={home()}>
        Back to About <Icon name="right" />
      </Link>
    </section>
  );
}
