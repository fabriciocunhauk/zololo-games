import type { Monster } from "@/app/components/monsters/monsters";
import { randomInt } from "@/app/utils/randomInt";
import {
  ATTRIBUTE_VALUES,
  describeAttribute,
  type OddAttribute,
} from "../constants/attributes";

export type OddOneOutRound = {
  tiles: Monster[];
  oddIndex: number;
  attribute: OddAttribute;
  /** Kid words for what makes the odd one different, e.g. "It has 3 eyes." */
  description: string;
};

function pick<T>(items: ReadonlyArray<T>): T {
  return items[randomInt(0, items.length - 1)];
}

/** Returns a copy of `monster` with `attribute` changed to another valid value. */
function changeAttribute<K extends OddAttribute>(
  monster: Monster,
  attribute: K
): { odd: Monster; value: Monster[K] } {
  const values = ATTRIBUTE_VALUES[attribute] as ReadonlyArray<Monster[K]>;
  const value = pick(values.filter((v) => v !== monster[attribute]));
  return { odd: { ...monster, [attribute]: value }, value };
}

/**
 * `count` copies of one monster, except the one at `oddIndex`, which differs
 * in exactly one of `attributes`. Pass `avoid` (a monster name) to skip the
 * previous round's monster.
 */
export function makeOddOneOut(
  monsters: ReadonlyArray<Monster>,
  attributes: ReadonlyArray<OddAttribute>,
  count: number,
  avoid?: string
): OddOneOutRound {
  const pool = monsters.filter((m) => m.name !== avoid);
  const base = pick(pool.length > 0 ? pool : monsters);
  const attribute = pick(attributes);
  const { odd, value } = changeAttribute(base, attribute);
  const oddIndex = randomInt(0, count - 1);
  const tiles = Array.from({ length: count }, (_, idx) =>
    idx === oddIndex ? odd : { ...base }
  );
  return {
    tiles,
    oddIndex,
    attribute,
    description: describeAttribute(attribute, value),
  };
}

/** A stable serialisation of how a monster looks (its name is ignored). */
export function monsterLook(monster: Monster): string {
  const { body, color, eyes, top, mouth, pattern } = monster;
  return [body, color, eyes, top, mouth, pattern].join("-");
}
