"use client";

import { createContext, useCallback, useContext, useState } from "react";

type Toast = { id: number; message: string; type: "success" | "error" };

const ToastContext = createContext<{
  show: (message: string, type?: "success" | "error") => void;
} | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const show = useCallback(
    (message: string, type: "success" | "error" = "success") => {
      const id = Date.now() + Math.random();
      setToasts((t) => [...t, { id, message, type }]);
      setTimeout(() => {
        setToasts((t) => t.filter((toast) => toast.id !== id));
      }, 3200);
    },
    []
  );

  return (
    <ToastContext.Provider value={{ show }}>
      {children}

      <div className="pointer-events-none fixed bottom-6 left-1/2 z-[100] flex w-full max-w-sm -translate-x-1/2 flex-col gap-2 px-4">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto animate-[toast-in_0.25s_ease-out] rounded-2xl px-5 py-4 text-sm font-bold shadow-xl ${
              toast.type === "success"
                ? "bg-neutral-950 text-white"
                : "bg-red-600 text-white"
            }`}
          >
            {toast.message}
          </div>
        ))}
      </div>

      <style>{`
        @keyframes toast-in {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    // Filet de sécurité si le provider n'est pas monté : on retombe sur alert().
    return {
      show: (message: string) => {
        if (typeof window !== "undefined") window.alert(message);
      },
    };
  }
  return ctx;
}
