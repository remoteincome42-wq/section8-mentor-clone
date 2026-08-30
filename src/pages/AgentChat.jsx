import React, { useState } from 'react';
import AgentConversation from '@/components/AgentConversation';
import { GraduationCap, Landmark, Calculator, Wrench, ArrowLeft } from 'lucide-react';

const agents = [
  {
    name: 'section8_guide', icon: GraduationCap, title: 'Section 8 Guide',
    subtitle: 'Your mentor from basics to first investment',
    suggestions: ['What is Section 8 and how does it work?', 'How do I become a Section 8 landlord?', 'What should I learn first?'],
  },
  {
    name: 'financing_advisor', icon: Landmark, title: 'Financing Advisor',
    subtitle: 'Compare and structure your financing',
    suggestions: ['What financing options do I have?', 'How do DSCR loans work?', 'Best financing for my first deal?'],
  },
  {
    name: 'deal_analyst', icon: Calculator, title: 'Deal Analyst',
    subtitle: 'Underwrite deals for cash flow and risk',
    suggestions: ['Analyze a Section 8 deal for me', 'What cap rate should I target?', 'Red flags to watch for?'],
  },
  {
    name: 'problem_solver', icon: Wrench, title: 'Problem Solver',
    subtitle: 'Diagnose and resolve toxic property problems',
    suggestions: ['How do I fix a toxic title?', 'Dealing with code violations?', 'Resolving problem tenants?'],
  },
];

export default function AgentChat() {
  const [selected, setSelected] = useState(null);

  if (selected) {
    const agent = agents.find((a) => a.name === selected);
    return (
      <div className="max-w-3xl mx-auto px-6 py-8 pb-24 md:pb-8">
        <button onClick={() => setSelected(null)}
          className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 mb-4">
          <ArrowLeft className="w-4 h-4" /> All agents
        </button>
        <AgentConversation
          agentName={agent.name}
          title={agent.title}
          subtitle={agent.subtitle}
          suggestions={agent.suggestions}
        />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 pb-24 md:pb-10">
      <h1 className="text-3xl font-heading font-bold tracking-tight">AI Agents</h1>
      <p className="mt-2 text-muted-foreground">
        Four working agents to guide, finance, analyze, and solve — available on demand.
      </p>
      <div className="mt-8 grid sm:grid-cols-2 gap-4">
        {agents.map((a) => (
          <button key={a.name} onClick={() => setSelected(a.name)}
            className="text-left p-5 border rounded-xl hover:border-primary/40 hover:shadow-sm transition-all">
            <a.icon className="w-7 h-7 text-primary" />
            <h3 className="mt-3 font-heading font-semibold">{a.title}</h3>
            <p className="text-sm text-muted-foreground mt-0.5">{a.subtitle}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
