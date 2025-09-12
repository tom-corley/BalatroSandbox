import type { Score } from "../domain/types"
import { EditionModifiers, EnhancementModifiers } from "../domain/types"
import type { JokerHand } from "../domain/jokers"
import { HandScore, type HandType } from "../domain/hands"
import { PlainJoker } from "../domain/jokers"
import type { Card, CardHand } from "../domain/cards"

import { detectHand } from "./handdetect"

export const evaluateScore : (score: Score) => Number =
    s => s.chips*s.mult

function handTypeBase(type: HandType): Score {
  const base = HandScore[type];            
  return { chips: base.chips, mult: base.mult }; 
}

export const scoreHand = (
    jokers: JokerHand,
    played: CardHand,
    held: CardHand
): Score =>  {
        // === PRE SCORING ===
        // Hand-detection + array of cards which are scoring
        //console.log({ Jokers: jokers, Played: played, Held: held });
        let handType : HandType; let scored: CardHand;
        [handType, scored] = detectHand(played)
        console.log(`\nDetected Hand Type: ${handType}`);
        let score : Score = handTypeBase(handType);  
        console.log(`Base score: chips - ${score.chips}, mult - ${score.mult}`);

        // === ACTIVE CARD SCORING ===
        // Splash Joker / Stone Card can make non active played cards score??
        let i : number = 0;
        let redUsed : boolean = false
        while (i < scored.length) {
            const c : Card = scored[i];
            let retrig: boolean = false

            // Add Base Chips
            console.log(`Adding ${c.baseChips} chips`);
            score.chips += c.baseChips;

            // Card Enhancement
            score = EnhancementModifiers[c.enhancement](score);

            // Card Editon
            score = EditionModifiers[c.edition](score);

            // Joker Effect
            for (let j = 0; j < jokers.length; j++) {
                const jkr = jokers[j]
                score = jkr.targetCard(c) ? jkr.targetEffect(score) : score;
            }

            // Seal
            if (redUsed === false && c.seal === "Red") {
                console.log("Red seal retrigger...");
                retrig = true;
                redUsed = true;
            }
            // gold seal too

            // Retrigger or continue to next card
            if (retrig) {
                retrig = false;
                continue;
            }
            else {
                i+=1;
                redUsed = false;
            }
        }

        // === HELD CARD SCORING ===
        for (let i = 0; i < held.length; i++) {
            // Check for steel/gold

            // Check for blue seal

            // Check for joker effects
        }

        // === REMAINING JOKERS ===
        for (let i : number = 0; i < jokers.length; i++) {
            const j = jokers[i];

            // Apply Joker Effect if exists
            score = j.scoreModifier?.(score) ?? score;

            // Apply Joker Edition
            score = EditionModifiers[j.edition](score);
        }

        return score;
    }

export const perfTest = () : void => {
    const start = performance.now();
    let res: Score = scoreHand([new PlainJoker("Standard")], [], []); 
    const end = performance.now();

    console.log(`⏱ Took ${(end - start).toFixed(2)} ms`);
    console.log(res);
    console.log(`Total Score: ${evaluateScore(res)}`);
}