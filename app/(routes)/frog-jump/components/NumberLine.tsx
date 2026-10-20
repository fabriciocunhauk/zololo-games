import type { ReactNode } from "react";
import Container from "@/app/components/Container";

export default function NumberLine({
  max,
  getPosition,
  children,
}: {
  max: number;
  getPosition: (value: number) => string;
  children?: ReactNode;
}) {
  return (
    <Container
      classes={{
        container:
          "relative w-full bg-gradient-to-r from-blue-300 to-green-300 h-24 sm:h-32 rounded-full border-4 border-orange-400",
      }}
    >
      {Array.from({ length: max + 1 }, (_, value) => (
        <div
          key={value}
          className="flex flex-col items-center absolute top-13 bottom-0 -translate-x-1/2"
          style={{ left: getPosition(value) }}
        >
          <div className="w-1 h-2 sm:h-3 bg-gray-700" />
          <span className="text-xs sm:text-sm font-bold text-gray-800 -mt-1 sm:mt-0">
            {value}
          </span>
        </div>
      ))}
      {children}
    </Container>
  );
}
