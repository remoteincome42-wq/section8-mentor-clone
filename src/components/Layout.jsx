import { Outlet, NavLink, Link } from 'react-router-dom';
import { Home, GraduationCap, Landmark, Briefcase, Bot } from 'lucide-react';

const navItems = [
  { to: '/', label: 'Dashboard', icon: Home, end: true },
  { to: '/learn', label: 'Learn', icon: GraduationCap, end: false },
  { to: '/financing', label: 'Financing', icon: Landmark, end: false },
  { to: '/opportunities', label: 'Opportunities', icon: Briefcase, end: false },
  { to: '/agents', label: 'AI Agents', icon: Bot, end: false },
];

export default function Layout() {
  return (
    <div className="flex min-h-screen bg-background">
      <aside className="hidden md:flex w-64 flex-col border-r bg-sidebar shrink-0">
        <div className="p-6 border-b">
          <Link to="/" className="block">
            <h1 className="text-lg font-heading font-semibold tracking-tight">Section8 Academy</h1>
            <p className="text-xs text-muted-foreground mt-1">Invest · Finance · Solve</p>
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink key={to} to={to} end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                  isActive
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
                }`
              }>
              <Icon className="w-4 h-4" /> {label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <main className="flex-1 overflow-auto">
        <div className="md:hidden border-b px-4 py-3 flex items-center gap-2 sticky top-0 bg-background z-10">
          <Link to="/" className="font-heading font-semibold">Section8 Academy</Link>
        </div>
        <Outlet />
        <nav className="md:hidden fixed bottom-0 inset-x-0 border-t bg-background flex justify-around py-2 z-20">
          {navItems.map(({ to, icon: Icon, end }) => (
            <NavLink key={to} to={to} end={end}
              className={({ isActive }) =>
                `flex flex-col items-center gap-0.5 text-[10px] ${isActive ? 'text-primary' : 'text-muted-foreground'}`
              }>
              <Icon className="w-5 h-5" />
            </NavLink>
          ))}
        </nav>
      </main>
    </div>
  );
}
