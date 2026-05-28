import type { GuestQuestion, GuestAnswer } from '@/types/question';

interface HeroShort {
  key: string;
  name: string;
  portrait: string | null;
  role: string;
  subrole: string | null;
}

interface OWMap {
  key: string;
  name: string;
  screenshot: string | null;
  gamemodes: string[];
  location: string | null;
}

interface Ability {
  name: string;
  icon: string | null;
}

interface HeroDetail {
  name: string;
  abilities: Ability[];
}

function pickRandom<T>(arr: T[], n: number): T[] {
  return [...arr].sort(() => Math.random() - 0.5).slice(0, n);
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function formatLabel(s: string): string {
  return s.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

async function fetchHeroes(): Promise<HeroShort[]> {
  const res = await fetch('https://overfast-api.tekrop.fr/heroes', {
    next: { revalidate: 86400 },
  });
  if (!res.ok) throw new Error('Failed to fetch heroes');
  return res.json();
}

async function fetchMaps(): Promise<OWMap[]> {
  const res = await fetch('https://overfast-api.tekrop.fr/maps', {
    next: { revalidate: 86400 },
  });
  if (!res.ok) throw new Error('Failed to fetch maps');
  return res.json();
}

async function fetchHeroDetail(key: string): Promise<HeroDetail> {
  const res = await fetch(`https://overfast-api.tekrop.fr/heroes/${key}`, {
    next: { revalidate: 86400 },
  });
  if (!res.ok) throw new Error(`Failed to fetch hero ${key}`);
  return res.json();
}

const ALL_SUBROLES = ['Flanker', 'Recon', 'Sharpshooter', 'Specialist', 'Medic', 'Survivor', 'Tactician', 'Bruiser', 'Initiator', 'Stalwart'];
const DISPLAY_GAMEMODES = ['Assault', 'Capture the Flag', 'Clash', 'Control', 'Escort', 'Flashpoint', 'Hybrid', 'Push', 'Team Deathmatch'];

function makeHeroSubroleQuestion(hero: HeroShort, id: number): GuestQuestion {
  const correct = formatLabel(hero.subrole!);
  const distractors = pickRandom(ALL_SUBROLES.filter(s => s !== correct), 3);
  return {
    id,
    text: `What is ${hero.name}'s subrole?`,
    category: 'HERO SUBROLE',
    imageUrl: hero.portrait,
    answers: shuffle<GuestAnswer>([
      { text: correct, isCorrect: true },
      ...distractors.map(s => ({ text: s, isCorrect: false })),
    ]),
  };
}

function makeHeroAbilityQuestion(heroDetail: HeroDetail, ability: Ability, allHeroes: HeroShort[], id: number): GuestQuestion {
  const distractors = pickRandom(
    allHeroes.filter(h => h.name !== heroDetail.name),
    3
  ).map(h => h.name);
  return {
    id,
    text: `Which hero has an ability called "${ability.name}"?`,
    category: 'HERO ABILITY',
    imageUrl: ability.icon,
    answers: shuffle<GuestAnswer>([
      { text: heroDetail.name, isCorrect: true },
      ...distractors.map(name => ({ text: name, isCorrect: false })),
    ]),
  };
}

function makeMapLocationQuestion(map: OWMap, allMaps: OWMap[], id: number): GuestQuestion {
  const otherLocations = [
    ...new Set(
      allMaps
        .filter(m => m.key !== map.key && m.location && m.location !== map.location)
        .map(m => m.location!)
    ),
  ];
  const distractors = pickRandom(otherLocations, 3);
  return {
    id,
    text: `In which real-world location is the map "${map.name}"?`,
    category: 'MAP LORE',
    imageUrl: map.screenshot,
    answers: shuffle<GuestAnswer>([
      { text: map.location!, isCorrect: true },
      ...distractors.map(loc => ({ text: loc, isCorrect: false })),
    ]),
  };
}

function makeMapGamemodeQuestion(map: OWMap, id: number): GuestQuestion {
  const correct = formatLabel(map.gamemodes[0]);
  const distractors = pickRandom(
    DISPLAY_GAMEMODES.filter(g => g !== correct),
    3
  );
  return {
    id,
    text: `Which game mode is played on "${map.name}"?`,
    category: 'MAP KNOWLEDGE',
    imageUrl: map.screenshot,
    answers: shuffle<GuestAnswer>([
      { text: correct, isCorrect: true },
      ...distractors.map(g => ({ text: g, isCorrect: false })),
    ]),
  };
}

function makeHeroRoleQuestion(heroes: HeroShort[], id: number): GuestQuestion {
  const roles = ['damage', 'support', 'tank'];
  const role = pickRandom(roles, 1)[0];
  const correctHero = pickRandom(heroes.filter(h => h.role === role && h.portrait), 1)[0];
  const distractors = pickRandom(heroes.filter(h => h.role !== role && h.portrait), 3);
  return {
    id,
    text: `Which of these heroes is a ${formatLabel(role)} hero?`,
    category: 'HERO ROLE',
    imageUrl: correctHero.portrait,
    answers: shuffle<GuestAnswer>([
      { text: correctHero.name, isCorrect: true },
      ...distractors.map(h => ({ text: h.name, isCorrect: false })),
    ]),
  };
}

export async function GET() {
  try {
    const [heroes, maps] = await Promise.all([fetchHeroes(), fetchMaps()]);

    const heroesWithPortrait = heroes.filter(h => h.portrait);
    const heroesWithSubrole = heroesWithPortrait.filter(h => h.subrole);
    const mapsWithLocation = maps.filter(m => m.location && m.screenshot);
    const mapsWithGamemode = maps.filter(m => m.gamemodes.length > 0 && m.screenshot);

    const abilityHero = pickRandom(heroesWithPortrait, 1)[0];
    const heroDetail = await fetchHeroDetail(abilityHero.key);
    const validAbilities = heroDetail.abilities.filter(a => a.name && a.icon);

    const subroleHero = pickRandom(heroesWithSubrole, 1)[0];
    const locationMap = pickRandom(mapsWithLocation, 1)[0];
    const gamemodeMap = pickRandom(mapsWithGamemode, 1)[0];
    const ability = pickRandom(validAbilities, 1)[0];

    const questions = shuffle([
      makeHeroSubroleQuestion(subroleHero, 0),
      makeHeroAbilityQuestion(heroDetail, ability, heroes, 0),
      makeMapLocationQuestion(locationMap, mapsWithLocation, 0),
      makeMapGamemodeQuestion(gamemodeMap, 0),
      makeHeroRoleQuestion(heroesWithPortrait, 0),
    ]).map((q, i) => ({ ...q, id: i + 1 }));

    return Response.json({ questions });
  } catch (error) {
    console.error('Guest quiz generation failed:', error);
    return Response.json({ error: 'Failed to generate quiz' }, { status: 500 });
  }
}
