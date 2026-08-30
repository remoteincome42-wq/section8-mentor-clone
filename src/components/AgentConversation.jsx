import React, { useState, useEffect, useRef } from 'react';
import { base44 } from '@/api/base44Client';
import MessageBubble from './MessageBubble';
import { Send, Loader2 } from 'lucide-react';

export default function AgentConversation({ agentName, title, subtitle, suggestions = [] }) {
  const [conversationId, setConversationId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    let unsub = () => {};
    let active = true;
    (async () => {
      try {
        const conv = await base44.agents.createConversation({
          agent_name: agentName,
          metadata: { name: title, description: subtitle },
        });
        if (!active) return;
        setConversationId(conv.id);
        setMessages(conv.messages || []);
        unsub = base44.agents.subscribeToConversation(conv.id, (data) => {
          setMessages(data.messages || []);
        });
      } catch (e) {
        console.error('Agent conversation error:', e);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => { active = false; unsub(); };
  }, [agentName]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const send = async (text) => {
    if (!text.trim() || !conversationId || sending) return;
    const content = text.trim();
    setInput('');
    setSending(true);
    try {
      const conv = { id: conversationId, agent_name: agentName, messages, metadata: { name: title } };
      await base44.agents.addMessage(conv, { role: 'user', content });
    } catch (e) {
      console.error('Send error:', e);
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] md:h-[calc(100vh-10rem)]">
      <div className="pb-3">
        <h2 className="font-heading text-xl font-semibold">{title}</h2>
        {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      <div className="flex-1 overflow-y-auto space-y-4 pb-4">
        {messages.length === 0 && (
          <div className="text-center py-12">
            <p className="text-sm text-muted-foreground mb-4">Start a conversation or try:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {suggestions.map((s) => (
                <button key={s} onClick={() => send(s)}
                  className="text-sm px-3 py-1.5 rounded-full border hover:bg-muted transition-colors">
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
        {messages.map((m, i) => <MessageBubble key={i} message={m} />)}
        <div ref={scrollRef} />
      </div>
      <div className="border-t pt-3 pb-16 md:pb-3">
        <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2.5 rounded-full bg-muted border focus:outline-none focus:ring-2 focus:ring-ring text-sm"
          />
          <button type="submit" disabled={sending || !input.trim()}
            className="p-2.5 rounded-full bg-primary text-primary-foreground disabled:opacity-50 transition-opacity">
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
