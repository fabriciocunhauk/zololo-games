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
    <div className="min-w-14 rounded-xl border-[3px] border-ink bg-white px-2 py-1 sm:min-w-16 sm:px-3 sm:py-1.5 text-center shadow-[0_4px_0_var(--color-ink)]">
      <dt className="text-[0.65rem] font-bold uppercase tracking-[0.12em]">
        {label}
      </dt>
      <dd
        data-testid={testId ?? label.toLowerCase()}
        className="text-xl font-extrabold leading-tight sm:text-2xl"
      >
        {value}
      </dd>
    </div>
  );
}
