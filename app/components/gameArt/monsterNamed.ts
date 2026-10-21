import { MONSTERS, type Monster } from "@/app/components/monsters/monsters";

/** Looks up a mascot by name, so tile art reads as "Pip", not MONSTERS[0]. */
export function monsterNamed(name: string): Monster {
  const found = MONSTERS.find((monster) => monster.name === name);
  if (!found) throw new Error(`Unknown monster: ${name}`);
  return found;
}
