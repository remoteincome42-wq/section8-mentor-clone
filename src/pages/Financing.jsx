import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { TrendingUp, TrendingDown, Check } from 'lucide-react';

const categoryLabels = {
  dscr_loan: 'DSCR Loan', sba: 'SBA Loan', hard_money: 'Hard Money', fha: 'FHA / 203k',
  partnership: 'Partnership', grant: 'Grant / DPA', seller_financing: 'Seller Financing',
  conventional: 'Conventional', other: 'Other',
};

export default function Financing() {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    (async () => {
      try { setOptions(await base44.entities.FinancingOption.list()); }
      catch (e) { console.error(e); }
      finally { setLoading(false); }
    })();
  }, []);

  const filtered = filter === 'all' ? options : options.filter((o) => o.category === filter);

  if (loading) return <div className="p-8 text-muted-foreground">Loading financing options…</div>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 pb-24 md:pb-10">
      <h1 className="text-3xl font-heading font-bold tracking-tight">Financing Hub</h1>
      <p className="mt-2 text-muted-foreground">
        Every business financing option for Section 8 investing — compare and choose.
      </p>
      <div className="mt-6 flex flex-wrap gap-2">
        <button onClick={() => setFilter('all')}
          className={`text-sm px-3 py-1.5 rounded-full border transition-colors ${filter === 'all' ? 'bg-primary text-primary-foreground border-primary' : 'hover:bg-muted'}`}>
          All
        </button>
        {Object.entries(categoryLabels).map(([key, label]) => (
          <button key={key} onClick={() => setFilter(key)}
            className={`text-sm px-3 py-1.5 rounded-full border transition-colors ${filter === key ? 'bg-primary text-primary-foreground border-primary' : 'hover:bg-muted'}`}>
            {label}
          </button>
        ))}
      </div>
      <div className="mt-6 grid gap-4">
        {filtered.map((opt) => (
          <div key={opt.id} className="border rounded-xl p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-xs font-medium px-2 py-0.5 rounded bg-muted">{categoryLabels[opt.category]}</span>
                <h3 className="mt-2 font-heading font-semibold text-lg">{opt.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{opt.description}</p>
              </div>
              {opt.typical_rates && <span className="text-sm font-medium text-green-600 shrink-0">{opt.typical_rates}</span>}
            </div>
            <p className="mt-3 text-sm"><span className="font-medium">Best for:</span> <span className="text-muted-foreground">{opt.best_for}</span></p>
            {opt.min_credit_score && (
              <p className="text-sm"><span className="font-medium">Min credit:</span> <span className="text-muted-foreground">{opt.min_credit_score}</span></p>
            )}
            <div className="mt-4 grid sm:grid-cols-2 gap-4">
              {opt.pros?.length > 0 && (
                <div>
                  <p className="text-xs font-semibold flex items-center gap-1 text-green-600 mb-1"><TrendingUp className="w-3 h-3" /> Pros</p>
                  <ul className="text-sm space-y-0.5">{opt.pros.map((p, i) => (
                    <li key={i} className="flex gap-1.5"><Check className="w-3 h-3 text-green-500 mt-0.5 shrink-0" />{p}</li>
                  ))}</ul>
                </div>
              )}
              {opt.cons?.length > 0 && (
                <div>
                  <p className="text-xs font-semibold flex items-center gap-1 text-red-600 mb-1"><TrendingDown className="w-3 h-3" /> Cons</p>
                  <ul className="text-sm space-y-0.5 text-muted-foreground">{opt.cons.map((c, i) => <li key={i}>· {c}</li>)}</ul>
                </div>
              )}
            </div>
            {opt.requirements?.length > 0 && (
              <div className="mt-3 pt-3 border-t">
                <p className="text-xs font-semibold uppercase text-muted-foreground mb-1">Requirements</p>
                <p className="text-sm text-muted-foreground">{opt.requirements.join(' · ')}</p>
              </div>
            )}
          </div>
        ))}
        {filtered.length === 0 && <p className="text-center text-muted-foreground py-12">No options in this category.</p>}
      </div>
    </div>
  );
}
