type Score = { chips: number, mult: number };
type ScoreModifier = (score: Score) => Score;

type Edition =
    "Standard" | "Foil" | "Holographic" | "Polychrome" | "Negative"

type Enhancement = 
    "None"   | "Bonus"  |  "Mult"  |  "Wild"  |  "Glass" |
    "Steel"  | "Stone"  |  "Gold"  |  "Lucky"


const EditionModifiers : Record<Edition, ScoreModifier> = {
    "Standard": s => ({chips: s.chips, mult: s.mult}),
    "Foil": s => ({chips: s.chips+50, mult: s.mult}),
    "Holographic": s => ({chips: s.chips, mult: s.mult+10}),
    "Polychrome": s => ({chips: s.chips, mult: s.mult*1.5}),
    "Negative": s => ({chips: s.chips, mult: s.mult}),
}

const EnhancementModifiers : Record<Enhancement, ScoreModifier> = {
    "None": s => ({chips: s.chips, mult: s.mult}),
    "Bonus": s => ({chips: s.chips+30, mult: s.mult}),
    "Mult": s => ({chips: s.chips, mult: s.mult+4}),
    "Wild": s => ({chips: s.chips, mult: s.mult}),
    "Glass": s => ({chips: s.chips, mult: s.mult*2}),
    "Steel": s => ({chips: s.chips, mult: s.mult*1.5}),
    "Stone": s => ({chips: s.chips+50, mult: s.mult}),
    "Gold": s => ({chips: s.chips, mult: s.mult}),
    "Lucky": s => ({chips: s.chips, mult: s.mult}),
}

const evaluateScore : (score: Score) => Number =
    s => s.chips*s.mult

interface Joker {
    jokerId: number
    name: string;
    description: string;
    edition: Edition;
    scoreModifier?: ScoreModifier;
    effects?: any;
}

type JokerHand = Joker[]

class PlainJoker implements Joker {
    jokerId: number
    name: string;
    description: string;
    edition: Edition;
    scoreModifier?: ScoreModifier;
    effects?: any;

    constructor(edition : Edition) {
        this.jokerId = 1;
        this.name = "Joker";
        this.description = "+4 Mult";
        this.edition = edition;
        this.scoreModifier = s => ({chips: s.chips, mult: s.mult+4});
        this.effects = {};
    } 
}

type Rank = 
  | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
  | 'J' | 'Q' | 'K' | 'A' 

const RankChips : Record<Rank, number> = {
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    10: 10,
    'J': 10,
    'Q' : 10,
    'K' : 10,
    'A' : 11
}

type Suit = "Hearts" | "Diamonds" | "Clubs" | "Spades";

type Seal = "None" | "Red" | "Blue" | "Purple" | "Gold";

class Card {
    rank: Rank;
    suit: Suit;
    baseChips: number;
    bonusChips: number;
    edition: Edition;
    enhancement: Enhancement
    seal: Seal;

    constructor( 
        rank: Rank,
        suit: Suit,
        edition: Edition,
        enhancement: Enhancement,
        seal: Seal
    ) {
        this.rank = rank;
        this.suit = suit;
        this.edition = edition;
        this.enhancement = enhancement;
        this.seal = seal;
        this.baseChips = RankChips[rank];
        this.bonusChips = 0
    }
};

type CardHand = Card[];


const scoreHand = (
    jokers: JokerHand,
    played: CardHand,
    held: CardHand
): Score =>  {
        // Pre-Scoring
        // Hand-detection + Array of cards which are scoring
        let score : Score = {chips: 40, mult: 4};    

        // Active Cards Scoring
        for (let i = 0; i < played.length; i++) {
            const c = played[i];

            // Add Base Chips
            score.chips += c.baseChips;

            // Card Enhancement
            score = EnhancementModifiers[c.enhancement](score);

            // Card Editon
            score = EditionModifiers[c.edition](score);

            // Joker Effect

            // Possible Retrigger
        }

        // Held Cards Scoring (If seal or edition, or joker effect
        for (let i = 0; i < held.length; i++) {
            // Check for steel/gold

            // Check for blue seal

            // Check for joker effects
        }

        // Remaining Jokers
        for (let i : number = 0; i < jokers.length; i++) {
            const j = jokers[i];

            // Apply Joker Effect if exists
            score = j.scoreModifier?.(score) ?? score;

            // Apply Joker Edition
            score = EditionModifiers[j.edition](score);
        }

        // Placeholders
        return score;
    }

const start = performance.now();
let res: Score = scoreHand([new PlainJoker("Standard")], [], []); 
const end = performance.now();

console.log(`⏱ Took ${(end - start).toFixed(2)} ms`);
console.log(res);
console.log(`Total Score: ${evaluateScore(res)}`);

export {};