import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { ChevronDown, Clock, CheckCircle2, Circle } from 'lucide-react';

export default function Learn() {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState(null);
  const [completed, setCompleted] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const data = await base44.entities.Lesson.list('order', 50);
        setLessons(data);
      } catch (e) { console.error(e); }
      finally { setLoading(false); }
    })();
  }, []);

  const modules = lessons.reduce((acc, l) => {
    (acc[l.module] = acc[l.module] || []).push(l);
    return acc;
  }, {});

  if (loading) return <div className="p-8 text-muted-foreground">Loading curriculum…</div>;

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 pb-24 md:pb-10">
      <h1 className="text-3xl font-heading font-bold tracking-tight">Learning Path</h1>
      <p className="mt-2 text-muted-foreground">
        From Section 8 basics to your first investment. Complete each lesson to progress.
      </p>
      <div className="mt-8 space-y-8">
        {Object.entries(modules).map(([module, items], mi) => (
          <div key={module}>
            <h2 className="font-heading font-semibold text-lg mb-3">
              <span className="text-muted-foreground text-sm font-normal">Module {mi + 1}</span>
              <span className="mx-2 text-muted-foreground">·</span>
              {module}
            </h2>
            <div className="space-y-2">
              {items.map((lesson) => {
                const isOpen = openId === lesson.id;
                const isDone = completed[lesson.id];
                return (
                  <div key={lesson.id} className="border rounded-lg overflow-hidden">
                    <button
                      onClick={() => setOpenId(isOpen ? null : lesson.id)}
                      className="w-full flex items-center gap-3 p-4 text-left hover:bg-muted/50 transition-colors">
                      {isDone
                        ? <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                        : <Circle className="w-5 h-5 text-muted-foreground shrink-0" />}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium">{lesson.title}</p>
                        <p className="text-xs text-muted-foreground truncate">{lesson.summary}</p>
                      </div>
                      <span className="text-xs text-muted-foreground flex items-center gap-1 shrink-0">
                        <Clock className="w-3 h-3" />{lesson.duration_minutes}m
                      </span>
                      <ChevronDown className={`w-4 h-4 transition-transform shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 pt-1 border-t bg-muted/20">
                        <p className="text-sm whitespace-pre-wrap py-3">{lesson.content}</p>
                        {lesson.key_takeaways?.length > 0 && (
                          <div className="mt-2">
                            <p className="text-xs font-semibold uppercase text-muted-foreground mb-1">Key Takeaways</p>
                            <ul className="text-sm space-y-1 list-disc pl-5">
                              {lesson.key_takeaways.map((t, i) => <li key={i}>{t}</li>)}
                            </ul>
                          </div>
                        )}
                        <button
                          onClick={() => setCompleted((c) => ({ ...c, [lesson.id]: !c[lesson.id] }))}
                          className="mt-3 text-sm font-medium text-primary hover:underline">
                          {isDone ? 'Mark as not done' : 'Mark complete'}
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
        {lessons.length === 0 && (
          <p className="text-center text-muted-foreground py-12">No lessons published yet.</p>
        )}
      </div>
    </div>
  );
}
