import Home from './home/Home';
import Work from './work/Work';

export default function App() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/';
  return path === '/work' ? <Work /> : <Home />;
}
