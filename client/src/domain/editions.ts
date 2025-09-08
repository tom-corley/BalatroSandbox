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
    "Steel": s => ({chips: s.chips, mult: s.mult}),
    "Stone": s => ({chips: s.chips, mult: s.mult}),
    "Gold": s => ({chips: s.chips, mult: s.mult}),
    "Lucky": s => ({chips: s.chips, mult: s.mult}),
}

const evaluateScore : (score: Score) => Number =
    s => s.chips*s.mult

type Joker = {
    Name: string,
    Description: string,
    Edition: Edition
    ScoreModifier?: ScoreModifier
    Effects?: any
}

type JokerHand = Joker[]

const PlainJoker : Joker = 
{
    Name: "Joker",
    Description: "Provides +4 Mult",
    Edition: "Standard",
    ScoreModifier: s => ({chips: s.chips, mult: s.mult+4})
}

type Suit = "Hearts" | "Diamonds" | "Clubs" | "Spades"

type Card = {
    rank: number | 'J' | 'Q' | 'K' | 'A',
    suit: Suit,
    baseChips: number,
    bonusChips: number,
    edition: Edition
    enhancement: Enhancement
}

type CardHand = Card[]


const scoreHand = (
    jokers: JokerHand,
    played: CardHand,
    held: CardHand
): Score =>  {
        // Pre-Scoring
        // Hand-detection MISSING
        let score : Score = {chips: 40, mult: 4}        

        // Played Cards Scoring

        // Held Cards Scoring

        // Remaining Jokers
        for (let i : number = 0; i < jokers.length; i++) {
            const j = jokers[i]

            // Apply Joker Effect if exists
            score = j.ScoreModifier?.(score) ?? score;

            // Apply Joker Edition
            score = EditionModifiers[j.Edition](score);
        }

        // Placeholders
        return score;
    }

const start = performance.now();
let res: Score = scoreHand([PlainJoker], [], []);  // <-- your predefined function call
const end = performance.now();
console.log(`⏱ Took ${(end - start).toFixed(2)} ms`);
console.log(res);
console.log(`Total Score: ${evaluateScore(res)}`);
