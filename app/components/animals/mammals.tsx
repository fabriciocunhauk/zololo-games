import { Cheeks, Eye, Line, Patch, Shine, Solid } from "./parts";

/** Tangerine teddy bear with round ears and a paper muzzle. */
export function Bear() {
  return (
    <g>
      <Solid fill="fill-tangerine">
        <ellipse cx={50} cy={73} rx={25} ry={14} />
      </Solid>
      <Patch fill="fill-tangerine">
        <ellipse cx={38} cy={84} rx={8} ry={4.5} />
        <ellipse cx={62} cy={84} rx={8} ry={4.5} />
      </Patch>
      <Solid fill="fill-tangerine">
        <circle cx={27} cy={24} r={12} />
        <circle cx={73} cy={24} r={12} />
      </Solid>
      <Patch fill="fill-paper">
        <circle cx={26} cy={23} r={5.5} />
        <circle cx={74} cy={23} r={5.5} />
      </Patch>
      <Solid fill="fill-tangerine">
        <circle cx={50} cy={47} r={28} />
      </Solid>
      <Shine cx={50} cy={47} r={28} />
      <Patch fill="fill-paper">
        <ellipse cx={50} cy={59} rx={14} ry={10.5} />
      </Patch>
      <ellipse cx={50} cy={54} rx={6} ry={4.2} className="fill-ink" />
      <Line d="M50 57 V62 M44 62 Q47 65.5 50 62 Q53 65.5 56 62" width={3} />
      <Eye cx={37} cy={42} r={7} />
      <Eye cx={63} cy={42} r={7} />
      <Cheeks
        points={[
          [29, 55],
          [71, 55],
        ]}
      />
    </g>
  );
}

/** Grape cat with pointy ears, whiskers and a curled tail. */
export function Cat() {
  const tail = "M66 80 Q92 82 88 58";
  return (
    <g>
      <path
        d={tail}
        transform="translate(0 4)"
        fill="none"
        className="stroke-ink"
        strokeWidth={14}
        strokeLinecap="round"
      />
      <path
        d={tail}
        fill="none"
        className="stroke-ink"
        strokeWidth={14}
        strokeLinecap="round"
      />
      <path
        d={tail}
        fill="none"
        className="stroke-grape"
        strokeWidth={6.5}
        strokeLinecap="round"
      />
      <Solid fill="fill-grape">
        <ellipse cx={50} cy={74} rx={24} ry={13} />
      </Solid>
      <Patch fill="fill-grape">
        <ellipse cx={39} cy={85} rx={7} ry={4.5} />
        <ellipse cx={61} cy={85} rx={7} ry={4.5} />
      </Patch>
      <Solid fill="fill-grape">
        <path d="M21 42 L23 13 L45 28 Z" />
        <path d="M79 42 L77 13 L55 28 Z" />
      </Solid>
      <Patch fill="fill-pink-primary">
        <path d="M27 31 L28 21 L36 27 Z" />
        <path d="M73 31 L72 21 L64 27 Z" />
      </Patch>
      <Solid fill="fill-grape">
        <ellipse cx={50} cy={51} rx={31} ry={25} />
      </Solid>
      <Shine cx={50} cy={51} r={25} />
      <Eye cx={38} cy={47} r={7.5} />
      <Eye cx={62} cy={47} r={7.5} />
      <Cheeks
        points={[
          [31, 60],
          [69, 60],
        ]}
      />
      <Patch fill="fill-pink-primary">
        <path d="M46 57 H54 L50 61.5 Z" />
      </Patch>
      <Line d="M43 64 Q46.5 68 50 64 Q53.5 68 57 64" width={3} />
      <Line d="M24 58 L8 55 M24 64 L9 67 M76 58 L92 55 M76 64 L91 67" width={3} />
    </g>
  );
}

/** Sunny puppy with floppy tangerine ears and a pink tongue. */
export function Dog() {
  return (
    <g>
      <Solid fill="fill-sun">
        <ellipse cx={50} cy={74} rx={24} ry={13} />
      </Solid>
      <Patch fill="fill-sun">
        <ellipse cx={39} cy={85} rx={7} ry={4.5} />
        <ellipse cx={61} cy={85} rx={7} ry={4.5} />
      </Patch>
      <Solid fill="fill-sun">
        <circle cx={50} cy={47} r={28} />
      </Solid>
      <Shine cx={50} cy={47} r={28} />
      <Solid fill="fill-tangerine">
        <ellipse
          cx={21}
          cy={50}
          rx={9}
          ry={18}
          transform="rotate(15 21 50)"
        />
        <ellipse
          cx={79}
          cy={50}
          rx={9}
          ry={18}
          transform="rotate(-15 79 50)"
        />
      </Solid>
      <Patch fill="fill-paper">
        <ellipse cx={50} cy={60} rx={14} ry={10.5} />
      </Patch>
      <path
        d="M45.5 64 H54.5 V68 A4.5 4.5 0 0 1 45.5 68 Z"
        className="fill-pink-primary stroke-ink"
        strokeWidth={2.5}
        strokeLinejoin="round"
      />
      <ellipse cx={50} cy={55} rx={6.5} ry={4.5} className="fill-ink" />
      <Line d="M50 58 V62 M43 62 Q46.5 65.5 50 62 Q53.5 65.5 57 62" width={3} />
      <Eye cx={39} cy={42} r={7} />
      <Eye cx={61} cy={42} r={7} />
    </g>
  );
}

/** Paper bunny with tall pink-lined ears and two buck teeth. */
export function Rabbit() {
  return (
    <g>
      <Solid fill="fill-paper">
        <ellipse cx={50} cy={75} rx={21} ry={13} />
      </Solid>
      <Patch fill="fill-paper">
        <ellipse cx={40} cy={86} rx={7} ry={4} />
        <ellipse cx={60} cy={86} rx={7} ry={4} />
      </Patch>
      <Solid fill="fill-paper">
        <ellipse
          cx={38}
          cy={24}
          rx={9}
          ry={19}
          transform="rotate(-10 38 24)"
        />
        <ellipse
          cx={62}
          cy={24}
          rx={9}
          ry={19}
          transform="rotate(10 62 24)"
        />
      </Solid>
      <Patch fill="fill-pink-primary">
        <ellipse
          cx={38}
          cy={23}
          rx={4}
          ry={12}
          transform="rotate(-10 38 23)"
        />
        <ellipse
          cx={62}
          cy={23}
          rx={4}
          ry={12}
          transform="rotate(10 62 23)"
        />
      </Patch>
      <Solid fill="fill-paper">
        <circle cx={50} cy={50} r={23} />
      </Solid>
      <Shine cx={50} cy={50} r={23} />
      <Eye cx={40} cy={47} r={6.5} />
      <Eye cx={60} cy={47} r={6.5} />
      <Cheeks
        points={[
          [34, 58],
          [66, 58],
        ]}
      />
      <Patch fill="fill-white">
        <rect x={45.5} y={59} width={9} height={7} rx={1.5} />
      </Patch>
      <Line d="M50 59 V65.5" width={2} />
      <Patch fill="fill-pink-primary">
        <ellipse cx={50} cy={55} rx={4} ry={3} />
      </Patch>
      <Line d="M44 60 Q47 58 50 58 Q53 58 56 60" width={3} />
    </g>
  );
}
