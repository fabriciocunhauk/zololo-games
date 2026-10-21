import type { ReactNode } from "react";

type StatProps = {
  label: string;
  value: ReactNode;
  /** Defaults to the lower-cased label. */
  testId?: string;
};

/** One labelled number in a game header. Render inside a `<dl>`. */
export default function Stat({ label, value, testId }: StatProps) {
  return (
    <div className="min-w-16 rounded-xl border-[3px] border-ink bg-white px-3 py-1.5 text-center shadow-[0_4px_0_var(--color-ink)]">
      <dt className="text-[0.65rem] font-bold uppercase tracking-[0.12em]">
        {label}
      </dt>
      <dd
        data-testid={testId ?? label.toLowerCase()}
        className="text-2xl font-extrabold leading-tight"
      >
        {value}
      </dd>
    </div>
  );
}
