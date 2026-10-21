import { Cheeks, Eye, Line, Shine, Solid } from "./parts";

/** Leaf-green fish in side view, tipped up a little as if swimming. */
export default function Fish() {
  return (
    <g transform="rotate(-8 50 56)">
      <Solid fill="fill-leaf">
        <path d="M66 56 L92 38 Q85 56 92 74 Z" />
        <path d="M34 40 Q44 22 60 36 Z" />
      </Solid>
      <Solid fill="fill-leaf">
        <ellipse cx={45} cy={57} rx={30} ry={21} />
      </Solid>
      <Shine cx={45} cy={57} r={21} />
      <Line d="M50 44 Q57 57 50 70" />
      <Line d="M60 48 Q64 57 60 66" width={3} />
      <Eye cx={31} cy={52} r={8} />
      <Cheeks points={[[32, 66]]} r={4} />
      <Line d="M17 62 Q20 65 24 63" width={3} />
    </g>
  );
}
