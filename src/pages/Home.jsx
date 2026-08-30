import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Landmark, Briefcase, Bot, ArrowRight } from 'lucide-react';

const features = [
  { to: '/learn', icon: GraduationCap, title: 'Learn the Path', desc: 'From Section 8 basics to your first investment — a guided curriculum.' },
  { to: '/financing', icon: Landmark, title: 'Finance the Deal', desc: 'Every business financing option, compared and explained.' },
  { to: '/opportunities', icon: Briefcase, title: 'Solve Toxic Problems', desc: 'Published deals for established investors to diagnose and fix.' },
  { to: '/agents', icon: Bot, title: 'AI Agents', desc: 'Four working agents: guide, financing, analyst, problem solver.' },
];

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 md:py-20">
      <div className="mb-12">
        <span className="inline-block px-3 py-1 rounded-full bg-muted text-xs font-medium mb-4">
          Section 8 Real Estate Investing
        </span>
        <h1 className="text-4xl md:text-5xl font-heading font-bold tracking-tight leading-tight">
          Learn it. Finance it.<br />Invest it. Solve it.
        </h1>
        <p className="mt-5 text-lg text-muted-foreground max-w-2xl">
          The complete platform for Section 8 real estate investors — from your first lesson
          to your first investment, and from toxic problems to resolved deals. All powered by
          working AI agents.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        {features.map(({ to, icon: Icon, title, desc }) => (
          <Link key={to} to={to}
            className="group p-6 rounded-xl border hover:border-primary/40 hover:shadow-sm transition-all">
            <div className="flex items-start justify-between">
              <Icon className="w-8 h-8 text-primary" />
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
            </div>
            <h3 className="mt-4 font-heading font-semibold text-lg">{title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
