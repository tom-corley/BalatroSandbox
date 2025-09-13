export type Score = { chips: number, mult: number };
export type ScoreModifier = (score: Score) => Score;

export type Edition =
    "Standard" | "Foil" | "Holographic" | "Polychrome" | "Negative"

export type Enhancement = 
    "None"   | "Bonus"  |  "Mult"  |  "Wild"  |  "Glass" |
    "Steel"  | "Stone"  |  "Gold"  |  "Lucky"


export const EditionModifiers : Record<Edition, ScoreModifier> = {
    "Standard": s => ({chips: s.chips, mult: s.mult}),
    "Foil": s => ({chips: s.chips+50, mult: s.mult}),
    "Holographic": s => ({chips: s.chips, mult: s.mult+10}),
    "Polychrome": s => ({chips: s.chips, mult: s.mult*1.5}),
    "Negative": s => ({chips: s.chips, mult: s.mult}),
}

export const EnhancementModifiers : Record<Enhancement, ScoreModifier> = {
    "None": s => ({chips: s.chips, mult: s.mult}),
    "Bonus": s => ({chips: s.chips+30, mult: s.mult}),
    "Mult": s => ({chips: s.chips, mult: s.mult+4}),
    "Wild": s => ({chips: s.chips, mult: s.mult}),
    "Glass": s => ({chips: s.chips, mult: s.mult*2}),
    "Steel": s => ({chips: s.chips, mult: s.mult*1.5}),
    "Stone": s => ({chips: s.chips+50, mult: s.mult}),
    "Gold": s => ({chips: s.chips, mult: s.mult}),
    "Lucky": s => ({chips: s.chips, mult: s.mult}), // IMPLEMENT PROPERLY
}

export type Rank = 
  '2' | '3' | '4' | '5' |
  '6' | '7' | '8' | '9' | '10' |
  'J' | 'Q' | 'K' | 'A' 

export const RankChips : Record<Rank, number> = {
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
    '7': 7,
    '8': 8,
    '9': 9,
    '10': 10,
    'J': 10,
    'Q' : 10,
    'K' : 10,
    'A' : 11
}

export const RankNumeric: Record<Rank, number> = {
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
  '6': 6,
  '7': 7,
  '8': 8,
  '9': 9,
  '10': 10,
  'J': 11,
  'Q': 12,
  'K': 13,
  'A': 14
};

// Reverse Map
export const NumericRank: Record<number, Rank> = Object.fromEntries(
  Object.entries(RankNumeric).map(([k, v]) => [v as number, k as Rank])
);

export type Suit = "Hearts" | "Diamonds" | "Clubs" | "Spades";

export type Seal = "None" | "Red" | "Blue" | "Purple" | "Gold";