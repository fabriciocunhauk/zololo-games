import { classNames } from "@/app/utils/appearance";
import type { BinPicture as Picture } from "../constants/bins";
import { BG_CLASS } from "../constants/shapes";
import ShapeArt from "./ShapeArt";

type BinPictureProps = {
  picture: Picture;
  className?: string;
};

/** A bin's label picture: a paint swatch for a colour, a white outline for a shape. Decorative. */
export default function BinPicture({ picture, className }: BinPictureProps) {
  if (picture.type === "swatch") {
    return (
      <span
        aria-hidden
        className={classNames(
          "block aspect-square rounded-xl border-[3px] border-ink shadow-[0_3px_0_var(--color-ink)]",
          BG_CLASS[picture.colour],
          className
        )}
      />
    );
  }
  return <ShapeArt kind={picture.kind} className={className} />;
}
