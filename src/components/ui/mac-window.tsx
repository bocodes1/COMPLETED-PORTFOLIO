import { cn } from "@/lib/utils";

interface MacWindowProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  /** extra element rendered at the right edge of the title bar */
  titlebarEnd?: React.ReactNode;
}

/**
 * Mac window chrome per spec §2 — hairline border, 6px radius, single soft
 * shadow, three traffic-light dots rendered in monochrome (never RGB).
 */
export function MacWindow({ title, children, className, titlebarEnd }: MacWindowProps) {
  return (
    <div className={cn("mac-window", className)}>
      <div className="mac-titlebar">
        <div className="mac-dots" aria-hidden="true">
          <span className="mac-dot" />
          <span className="mac-dot" />
          <span className="mac-dot" />
        </div>
        <span className="mac-title font-mono">{title}</span>
        {titlebarEnd && <span className="ml-auto flex items-center">{titlebarEnd}</span>}
      </div>
      {children}
    </div>
  );
}
