import type { Score } from "../domain/types"
import { EditionModifiers, EnhancementModifiers } from "../domain/types"
import type { JokerHand } from "../domain/jokers"
import { HandScore, type HandType } from "../domain/hands"
import { PlainJoker } from "../domain/jokers"
import type { CardHand } from "../domain/cards"

import { detectHand } from "./handdetect"

export const evaluateScore : (score: Score) => Number =
    s => s.chips*s.mult

export const scoreHand = (
    jokers: JokerHand,
    played: CardHand,
    held: CardHand
): Score =>  {
        // Pre-Scoring
        // Hand-detection + array of cards which are scoring
        let handType : HandType; let scored: CardHand;
        [handType, scored] = detectHand(played)

        let score : Score = HandScore[handType]   

        // Active Cards Scoring
        // Splash Joker / Stone Card can make non active played cards score??
        for (let i = 0; i < scored.length; i++) {
            const c = scored[i];

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