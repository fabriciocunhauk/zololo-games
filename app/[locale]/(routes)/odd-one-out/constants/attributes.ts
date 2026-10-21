import type { Monster } from "@/app/components/monsters/monsters";
import type { Locale } from "@/app/i18n/locales";

/** The monster features that can make one monster the odd one out. */
export type OddAttribute = Exclude<keyof Monster, "name">;

type ValueLists = { [K in OddAttribute]: ReadonlyArray<Monster[K]> };
type Descriptions = { [K in OddAttribute]: Record<Monster[K], string> };

/** Every valid value for each feature. */
export const ATTRIBUTE_VALUES: Readonly<ValueLists> = Object.freeze({
  body: ["round", "square", "tall", "wide", "ghost"],
  color: ["sun", "sky", "leaf", "bubblegum", "tangerine", "grape"],
  eyes: [1, 2, 3],
  top: ["none", "horns", "antennae", "ears", "tuft"],
  mouth: ["smile", "teeth", "open"],
  pattern: ["none", "belly", "spots", "cheeks"],
});

/** Kid words for what makes the odd monster different. */
export const ATTRIBUTE_DESCRIPTIONS: Readonly<Record<Locale, Descriptions>> =
  Object.freeze({
    en: {
      body: {
        round: "It has a round body.",
        square: "It has a square body.",
        tall: "It has a tall body.",
        wide: "It has a wide body.",
        ghost: "It has a wavy ghost body.",
      },
      color: {
        sun: "It is yellow.",
        sky: "It is blue.",
        leaf: "It is green.",
        bubblegum: "It is pink.",
        tangerine: "It is orange.",
        grape: "It is purple.",
      },
      eyes: {
        1: "It has 1 eye.",
        2: "It has 2 eyes.",
        3: "It has 3 eyes.",
      },
      top: {
        none: "It has nothing on its head.",
        horns: "It has horns.",
        antennae: "It has antennae.",
        ears: "It has round ears.",
        tuft: "It has a tuft of hair.",
      },
      mouth: {
        smile: "It has a smiley mouth.",
        teeth: "It is showing its teeth.",
        open: "Its mouth is wide open.",
      },
      pattern: {
        none: "It has no spots or patches.",
        belly: "It has a pale tummy patch.",
        spots: "It has spots.",
        cheeks: "It has rosy cheeks.",
      },
    },
    // "Este" is the monster (masculine), so adjectives agree with it.
    pt: {
      body: {
        round: "Este tem o corpo redondo.",
        square: "Este tem o corpo quadrado.",
        tall: "Este tem o corpo alto.",
        wide: "Este tem o corpo largo.",
        ghost: "Este tem o corpo ondulado de fantasma.",
      },
      color: {
        sun: "Este é amarelo.",
        sky: "Este é azul.",
        leaf: "Este é verde.",
        bubblegum: "Este é rosa.",
        tangerine: "Este é laranja.",
        grape: "Este é roxo.",
      },
      eyes: {
        1: "Este tem 1 olho.",
        2: "Este tem 2 olhos.",
        3: "Este tem 3 olhos.",
      },
      top: {
        none: "Este não tem nada na cabeça.",
        horns: "Este tem chifres.",
        antennae: "Este tem antenas.",
        ears: "Este tem orelhas redondas.",
        tuft: "Este tem um topete.",
      },
      mouth: {
        smile: "Este está sorrindo.",
        teeth: "Este está mostrando os dentes.",
        open: "Este está de boca bem aberta.",
      },
      pattern: {
        none: "Este não tem pintas nem manchas.",
        belly: "Este tem uma barriguinha clara.",
        spots: "Este tem pintas.",
        cheeks: "Este tem bochechas rosadas.",
      },
    },
  });

export function describeAttribute<K extends OddAttribute>(
  locale: Locale,
  attribute: K,
  value: Monster[K]
): string {
  return (
    ATTRIBUTE_DESCRIPTIONS[locale][attribute] as Record<Monster[K], string>
  )[value];
}
