import { Cheeks, Eye, Line, Patch, Shine, Solid } from "./parts";

/** Round sky-blue songbird in three-quarter view, beak to the left. */
export function Bird() {
  return (
    <g transform="rotate(-6 50 60)">
      <Patch fill="fill-sun">
        <ellipse cx={42} cy={85} rx={6} ry={3.5} />
        <ellipse cx={58} cy={85} rx={6} ry={3.5} />
      </Patch>
      <Solid fill="fill-sky">
        <path d="M66 54 L92 40 Q86 56 90 70 Z" />
      </Solid>
      <Line d="M47 31 Q42 22 48 16 M53 31 Q54 23 60 20" width={4} />
      <Solid fill="fill-sky">
        <circle cx={50} cy={57} r={27} />
      </Solid>
      <Shine cx={50} cy={57} r={27} />
      <ellipse
        cx={46}
        cy={71}
        rx={15}
        ry={9}
        className="fill-paper"
        opacity={0.7}
      />
      <Patch fill="fill-sky">
        <path d="M52 64 Q63 55 75 59 Q68 72 52 69 Z" />
      </Patch>
      <Patch fill="fill-sun">
        <path d="M27 51 L13 57 L27 63 Z" />
      </Patch>
      <Eye cx={36} cy={49} r={6.5} />
      <Eye cx={54} cy={48} r={6.5} />
      <Cheeks
        points={[
          [33, 61],
          [56, 59],
        ]}
        r={4}
      />
    </g>
  );
}

/** Sunny duck in side view with a tangerine bill and feet. */
export function Duck() {
  return (
    <g>
      <Patch fill="fill-tangerine">
        <ellipse cx={46} cy={86} rx={7} ry={3.5} />
        <ellipse cx={62} cy={86} rx={7} ry={3.5} />
      </Patch>
      <Solid fill="fill-sun">
        <ellipse cx={56} cy={69} rx={30} ry={16} />
        <path d="M76 62 L93 49 Q92 64 84 75 Z" />
      </Solid>
      <Solid fill="fill-tangerine">
        <path d="M24 42 Q6 41 7 48 Q8 55 24 53 Z" />
      </Solid>
      <Solid fill="fill-sun">
        <circle cx={36} cy={40} r={18} />
      </Solid>
      <Shine cx={36} cy={40} r={18} />
      <Line d="M11 48 H23" width={2.5} />
      <Patch fill="fill-sun">
        <path d="M50 66 Q64 57 79 64 Q68 81 50 73 Z" />
      </Patch>
      <Eye cx={37} cy={37} r={7} />
      <Cheeks points={[[44, 48]]} r={4} />
    </g>
  );
}

/** Grape owl with ear tufts, a paper belly and big eyes. */
export function Owl() {
  return (
    <g>
      <Solid fill="fill-grape">
        <path d="M26 37 L19 16 L42 28 Z" />
        <path d="M74 37 L81 16 L58 28 Z" />
        <ellipse cx={50} cy={55} rx={30} ry={30} />
      </Solid>
      <Shine cx={50} cy={55} r={30} />
      <Patch fill="fill-paper">
        <ellipse cx={50} cy={74} rx={14} ry={10} />
      </Patch>
      <Solid fill="fill-grape">
        <ellipse
          cx={20}
          cy={62}
          rx={8}
          ry={15}
          transform="rotate(12 20 62)"
        />
        <ellipse
          cx={80}
          cy={62}
          rx={8}
          ry={15}
          transform="rotate(-12 80 62)"
        />
      </Solid>
      <Eye cx={37} cy={45} r={11} />
      <Eye cx={63} cy={45} r={11} />
      <Patch fill="fill-sun">
        <path d="M45 56 H55 L50 64 Z" />
      </Patch>
      <Patch fill="fill-sun">
        <ellipse cx={41} cy={86} rx={6} ry={3.5} />
        <ellipse cx={59} cy={86} rx={6} ry={3.5} />
      </Patch>
    </g>
  );
}
