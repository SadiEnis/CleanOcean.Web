import '../globals.css';
import Analytics from '../analytics';
export default function Layout({ children }: { children: React.ReactNode }) { return <html lang="en"><body>{children}<Analytics/></body></html>; }
