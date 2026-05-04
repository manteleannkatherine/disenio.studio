import * as React from "react";
import { cn } from "../utils/cn";

/**
 * AuthCard — the canonical sign-in / sign-up form pair.
 *
 *   <AuthCard
 *     title="Welcome back"
 *     description="Sign in to your account."
 *     providers={<>
 *       <AuthCard.Provider icon={<G/>}>Continue with Google</AuthCard.Provider>
 *       <AuthCard.Provider icon={<Gh/>}>Continue with GitHub</AuthCard.Provider>
 *     </>}
 *   >
 *     <FormField label="Email"><Input /></FormField>
 *     <FormField label="Password"><Input type="password" /></FormField>
 *     <Button>Sign in</Button>
 *   </AuthCard>
 */

interface AuthCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  providers?: React.ReactNode;
  footer?: React.ReactNode;
}

export const AuthCard = Object.assign(
  React.forwardRef<HTMLDivElement, AuthCardProps>(
    ({ title, description, providers, footer, className, children, ...props }, ref) => (
      <div
        ref={ref}
        className={cn(
          "w-full max-w-sm rounded-[var(--ds-radius)] border bg-[var(--ds-paper)] border-[var(--ds-line)] p-6 flex flex-col gap-5",
          className,
        )}
        {...props}
      >
        {(title || description) && (
          <div className="flex flex-col gap-1">
            {title && <h2 className="serif text-2xl tracking-[-0.02em] font-semibold text-[var(--ds-ink)]">{title}</h2>}
            {description && <p className="text-sm text-[var(--ds-ink-soft)]">{description}</p>}
          </div>
        )}
        {providers && (
          <div className="flex flex-col gap-2">
            {providers}
            <div className="flex items-center gap-3 my-1 text-xs uppercase tracking-[0.18em] text-[var(--ds-muted)] mono">
              <span className="flex-1 h-px bg-[var(--ds-line)]" />
              or
              <span className="flex-1 h-px bg-[var(--ds-line)]" />
            </div>
          </div>
        )}
        <div className="flex flex-col gap-3">{children}</div>
        {footer && <div className="text-xs text-center text-[var(--ds-muted)]">{footer}</div>}
      </div>
    ),
  ),
  { Provider: AuthProvider },
);
(AuthCard as React.ForwardRefExoticComponent<unknown>).displayName = "AuthCard";

function AuthProvider({
  icon,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { icon?: React.ReactNode }) {
  return (
    <button
      type="button"
      className="h-10 px-4 inline-flex items-center justify-center gap-2 rounded-[var(--ds-button-radius)] border border-[var(--ds-line)] bg-[var(--ds-paper)] text-sm font-medium text-[var(--ds-ink)] transition-colors hover:bg-[var(--ds-paper-deep)]"
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}
AuthProvider.displayName = "AuthCard.Provider";
