import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { MapPin, Building2, AlertTriangle } from 'lucide-react';

const problemLabels = {
  toxic_title: 'Toxic Title', code_violations: 'Code Violations', distressed_financials: 'Distressed Financials',
  problem_tenants: 'Problem Tenants', deferred_maintenance: 'Deferred Maintenance', tax_lien: 'Tax Lien', other: 'Other',
};
const statusColors = {
  open: 'bg-red-100 text-red-700',
  in_progress: 'bg-amber-100 text-amber-700',
  resolved: 'bg-green-100 text-green-700',
};

export default function Opportunities() {
  const [opps, setOpps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try { setOpps(await base44.entities.Opportunity.list('-created_date', 50)); }
      catch (e) { console.error(e); }
      finally { setLoading(false); }
    })();
  }, []);

  if (loading) return <div className="p-8 text-muted-foreground">Loading opportunities…</div>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 pb-24 md:pb-10">
      <h1 className="text-3xl font-heading font-bold tracking-tight">Opportunities Board</h1>
      <p className="mt-2 text-muted-foreground">
        Published Section 8 deals with toxic problems — for established investors to diagnose and solve.
      </p>
      <div className="mt-8 grid gap-4">
        {opps.map((o) => (
          <div key={o.id} className="border rounded-xl p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-heading font-semibold text-lg">{o.title}</h3>
                <p className="text-sm text-muted-foreground flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3" />{o.location}
                </p>
              </div>
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize shrink-0 ${statusColors[o.status]}`}>
                {o.status.replace('_', ' ')}
              </span>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="text-xs font-medium px-2 py-1 rounded bg-red-50 text-red-700 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" />{problemLabels[o.problem_type]}
              </span>
              {o.property_type && (
                <span className="text-xs px-2 py-1 rounded bg-muted flex items-center gap-1">
                  <Building2 className="w-3 h-3" />{o.property_type}
                </span>
              )}
              {o.units > 1 && <span className="text-xs px-2 py-1 rounded bg-muted">{o.units} units</span>}
              <span className="text-xs px-2 py-1 rounded bg-muted">Sec 8: {o.section8_status}</span>
            </div>
            <p className="mt-3 text-sm">{o.problem_description}</p>
            <div className="mt-4 flex flex-wrap gap-6 text-sm border-t pt-3">
              {o.asking_price && (
                <div><span className="text-muted-foreground">Asking:</span> <span className="font-medium">${o.asking_price.toLocaleString()}</span></div>
              )}
              {o.current_rent && (
                <div><span className="text-muted-foreground">Rent:</span> <span className="font-medium">${o.current_rent.toLocaleString()}/mo</span></div>
              )}
              {o.cap_rate && (
                <div><span className="text-muted-foreground">Cap rate:</span> <span className="font-medium">{o.cap_rate}%</span></div>
              )}
            </div>
            {o.contact_info && <p className="mt-3 text-xs text-muted-foreground">Contact: {o.contact_info}</p>}
          </div>
        ))}
        {opps.length === 0 && <p className="text-center text-muted-foreground py-12">No opportunities published yet.</p>}
      </div>
    </div>
  );
}
