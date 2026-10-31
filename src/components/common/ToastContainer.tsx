import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, Info, AlertTriangle } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="pointer-events-auto bg-stone-900/95 backdrop-blur-xs text-white p-3.5 rounded-2xl shadow-xl border border-stone-800 flex items-start gap-3 animate-in fade-in slide-in-from-bottom-2 duration-200"
        >
          {t.type === 'success' && <CheckCircle2 className="w-4 h-4 text-[#B9D49B] shrink-0 mt-0.5" />}
          {t.type === 'info' && <Info className="w-4 h-4 text-[#F4A261] shrink-0 mt-0.5" />}
          {t.type === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />}
          
          <p className="text-xs text-stone-200 leading-snug flex-1">
            {t.message}
          </p>
        </div>
      ))}
    </div>
  );
};
