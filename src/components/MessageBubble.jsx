import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { ChevronDown, ChevronRight, Check, Loader2, AlertCircle } from 'lucide-react';

const statusConfig = {
  pending: { icon: Loader2, className: 'animate-spin text-muted-foreground', label: 'Queued' },
  running: { icon: Loader2, className: 'animate-spin text-blue-500', label: 'Running' },
  in_progress: { icon: Loader2, className: 'animate-spin text-blue-500', label: 'In progress' },
  completed: { icon: Check, className: 'text-green-500', label: 'Completed' },
  success: { icon: Check, className: 'text-green-500', label: 'Done' },
  failed: { icon: AlertCircle, className: 'text-red-500', label: 'Failed' },
  error: { icon: AlertCircle, className: 'text-red-500', label: 'Error' },
};

function FunctionDisplay({ toolCall }) {
  const [expanded, setExpanded] = useState(false);
  const status = statusConfig[toolCall.status] || statusConfig.pending;
  const StatusIcon = status.icon;
  const proj = toolCall.display_projection || {};
  const hideDetails = proj.hide_details && proj.details_redacted;
  const label = hideDetails
    ? (['pending', 'running', 'in_progress'].includes(toolCall.status)
        ? proj.active_label
        : ['failed', 'error'].includes(toolCall.status)
          ? proj.error_label
          : proj.label)
    : status.label;
  let parsedResults = toolCall.results;
  try { parsedResults = JSON.parse(toolCall.results); } catch { /* keep raw */ }
  const failed = ['failed', 'error'].includes(toolCall.status)
    || /error|failed/i.test(String(toolCall.results || ''))
    || parsedResults?.success === false;
  return (
    <div className="mt-2 text-xs border rounded-md p-2 bg-muted/30">
      <button onClick={() => setExpanded(!expanded)} className="flex items-center gap-2 w-full text-left">
        {expanded ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
        <StatusIcon className={`w-3 h-3 ${failed ? 'text-red-500' : status.className}`} />
        <span className="font-medium capitalize">{toolCall.name}</span>
        <span className="text-muted-foreground">· {label}</span>
      </button>
      {!hideDetails && expanded && (
        <div className="mt-2 space-y-2 pl-5">
          {toolCall.arguments_string && (
            <div>
              <p className="font-medium mb-1">Parameters:</p>
              <pre className="bg-muted p-2 rounded text-[10px] overflow-x-auto whitespace-pre-wrap break-all">
                {(() => { try { return JSON.stringify(JSON.parse(toolCall.arguments_string), null, 2); } catch { return toolCall.arguments_string; } })()}
              </pre>
            </div>
          )}
          {toolCall.results && (
            <div>
              <p className="font-medium mb-1">Result:</p>
              <pre className="bg-muted p-2 rounded text-[10px] overflow-x-auto whitespace-pre-wrap break-all">
                {typeof parsedResults === 'object' ? JSON.stringify(parsedResults, null, 2) : String(parsedResults)}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function MessageBubble({ message }) {
  const isUser = message.role === 'user';
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 ${isUser ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
        {message.content && (isUser
          ? <p className="text-sm whitespace-pre-wrap">{message.content}</p>
          : <ReactMarkdown className="text-sm prose prose-sm max-w-none prose-p:my-1 prose-ul:my-1 prose-ol:my-1 prose-li:my-0 prose-headings:my-2">{message.content}</ReactMarkdown>
        )}
        {message.tool_calls?.map((tc, i) => <FunctionDisplay key={i} toolCall={tc} />)}
      </div>
    </div>
  );
}
