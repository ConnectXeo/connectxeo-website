"use client";

import * as React from "react";

// Type definitions for toast actions
type ToastActionElement = React.ReactElement;

// Toast props interface
interface ToastProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
  variant?: "default" | "destructive" | "success";
}

// Toast state interface
interface ToastState {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
  open: boolean;
  onOpenChange?: (open: boolean) => void;
}

let count = 0;

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 5000;

type ActionType =
  | "ADD_TOAST"
  | "UPDATE_TOAST"
  | "DISMISS_TOAST"
  | "REMOVE_TOAST";

type Action =
  | { type: "ADD_TOAST"; toast: ToastState }
  | { type: "UPDATE_TOAST"; toast: Partial<ToastState> }
  | { type: "DISMISS_TOAST"; toastId?: string }
  | { type: "REMOVE_TOAST"; toastId?: string };

const listeners: Array<(state: { toasts: ToastState[] }) => void> = [];
let memoryState: { toasts: ToastState[] } = { toasts: [] };

function dispatch(action: Action) {
  switch (action.type) {
    case "ADD_TOAST":
      memoryState = {
        ...memoryState,
        toasts: [action.toast, ...memoryState.toasts].slice(0, TOAST_LIMIT),
      };
      break;
    case "UPDATE_TOAST":
      memoryState = {
        ...memoryState,
        toasts: memoryState.toasts.map((t) =>
          t.id === action.toast?.id ? { ...t, ...action.toast! } : t
        ),
      };
      break;
    case "DISMISS_TOAST": {
      const { toastId } = action;
      if (toastId) {
        memoryState.toasts = memoryState.toasts.filter((t) => t.id !== toastId);
      } else {
        memoryState.toasts.forEach((t) => (t.open = false));
      }
      break;
    }
    case "REMOVE_TOAST":
      if (action.toastId === undefined) {
        memoryState = { toasts: [] };
      } else {
        memoryState.toasts = memoryState.toasts.filter((t) => t.id !== action.toastId);
      }
      break;
  }
  listeners.forEach((listener) => listener(memoryState));
}

function toast({ ...props }: Omit<ToastState, "id" | "open" | "onOpenChange"> & { id?: string }) {
  const toastId = genId();
  const state: ToastState = {
    id: toastId,
    ...props,
    open: true,
  };

  dispatch({ type: "ADD_TOAST", toast: state });

  return {
    id: toastId,
    dismiss: () => dispatch({ type: "DISMISS_TOAST", toastId: toastId }),
  };
}

function useToast() {
  const [state, setState] = React.useState<{ toasts: ToastState[] }>(memoryState);

  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) listeners.splice(index, 1);
    };
  }, [state]);

  return {
    toasts: state.toasts,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
  };
}

export { useToast, toast };