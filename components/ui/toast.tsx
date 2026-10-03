"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "destructive" | "success";
}

const ToastViewport = React.forwardRef<
  HTMLDivElement,
  ToastProps
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className
    )}
    {...props}
  />
));
ToastViewport.displayName = "ToastViewport";

const toastVariants = {
  default: "border border-border bg-background text-foreground",
  destructive:
    "border border-red-500 bg-red-500/10 text-red-500 border-red-500/20",
  success:
    "border border-green-500 bg-green-500/10 text-green-500 border-green-500/20",
} as const;

const Toast = React.forwardRef<
  HTMLDivElement,
  ToastProps
>(({ className, variant = "default", ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "group pointer-events-auto flex w-full items-center justify-between overflow-hidden rounded-xl border p-4 pr-8 shadow-lg transition-all",
        variant,
        className
      )}
      {...props}
    />
  );
});
Toast.displayName = "Toast";

const ToastTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => {
  return <h3 ref={ref} className={cn("text-sm font-semibold", className)} {...props} />;
});
ToastTitle.displayName = "ToastTitle";

const ToastDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  return <p ref={ref} className={cn("text-sm opacity-90", className)} {...props} />;
});
ToastDescription.displayName = "ToastDescription";

const ToastClose = React.forwardRef<
  HTMLButtonElement,
  React.HTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "absolute right-2 top-2 rounded-lg p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
        className
      )}
      {...props}
    >
      <svg
        className="h-4 w-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          className="line-through"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M18 6L6 18M6 6l12 12"
        />
      </svg>
    </button>
  );
});
ToastClose.displayName = "ToastClose";

export { Toast, ToastTitle, ToastDescription, ToastClose, ToastViewport };