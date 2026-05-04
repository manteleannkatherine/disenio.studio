import * as React from "react";
import { cn } from "../utils/cn";

/**
 * CommentRow — avatar + name + meta + body, with optional actions.
 *
 *   <CommentRow
 *     author="Ana"
 *     meta="2h ago"
 *     avatar={<Avatar name="Ana" fake />}
 *     actions={<button>Reply</button>}
 *   >
 *     This is the comment body. It can be any ReactNode.
 *   </CommentRow>
 */

export interface CommentRowProps extends React.HTMLAttributes<HTMLDivElement> {
  author: React.ReactNode;
  meta?: React.ReactNode;
  avatar?: React.ReactNode;
  actions?: React.ReactNode;
  badge?: React.ReactNode;
}

export const CommentRow = React.forwardRef<HTMLDivElement, CommentRowProps>(
  ({ author, meta, avatar, actions, badge, className, children, ...props }, ref) => (
    <article
      ref={ref}
      className={cn("flex gap-3", className)}
      {...props}
    >
      {avatar && <div className="shrink-0 pt-0.5">{avatar}</div>}
      <div className="flex flex-col gap-1.5 min-w-0 flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-semibold text-[var(--ds-ink)] truncate">{author}</span>
          {badge}
          {meta && (
            <span className="text-xs text-[var(--ds-muted)] mono">{meta}</span>
          )}
        </div>
        <div className="text-sm text-[var(--ds-ink-soft)] leading-relaxed">{children}</div>
        {actions && <div className="flex items-center gap-3 mt-1 text-xs text-[var(--ds-muted)]">{actions}</div>}
      </div>
    </article>
  ),
);
CommentRow.displayName = "CommentRow";
