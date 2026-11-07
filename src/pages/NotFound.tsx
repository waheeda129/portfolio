import {PageShell, Rise} from '../components/Site';

export default function NotFound() {
  return (
    <PageShell title="Page not found, Waheeda Gillani">
      <Rise as="header" className="page-hero not-found">
        <h1>This page doesn’t exist</h1>
        <p className="page-lead">The link may be old or mistyped. Try one of these instead.</p>
        <div className="band-actions">
          <a className="pill pill-dark" href="/">
            Go to the home page
          </a>
          <a className="pill" href="/work">
            See my work
          </a>
        </div>
      </Rise>
    </PageShell>
  );
}
