import Marble from "@/app/components/Marble";

/** Face-down side: bubblegum with the logo's marble trio. */
export default function CardBack() {
  return (
    <span className="flex h-full w-full items-center justify-center rounded-2xl border-[3px] border-ink bg-pink-primary bg-[radial-gradient(var(--color-ink)_1px,transparent_1.5px)] bg-[length:12px_12px] [background-blend-mode:soft-light]">
      <svg viewBox="0 0 60 54" aria-hidden className="w-1/2">
        <Marble cx={30} cy={15} r={10} fill="fill-sky" />
        <Marble cx={16} cy={36} r={10} fill="fill-sun" />
        <Marble cx={44} cy={36} r={10} fill="fill-leaf" />
      </svg>
    </span>
  );
}
