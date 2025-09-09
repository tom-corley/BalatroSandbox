import { RankNumeric } from "../domain/types";
import { type CardHand} from "../domain/cards";
import { type HandType } from "../domain/hands";
import { ListToFrequencySet } from "../domain/freqset";

// Flush Detection
export const hasFlush = (hand: CardHand) : boolean => {
    // Flush Detection 
    // Four Fingers, Smeared Joker - modify behaviour
    const suitSet = new Set<string>(hand.map(card => card.suit));
    if (suitSet.size === 1) {
        return true;
    }
    return false;
}

// Straight Detection
export const hasStraight = (hand: CardHand) : boolean => {
    let numRanks : number[] = hand.map(card => RankNumeric[card.rank]);
    numRanks.sort((a, b) => a - b);

    // Treat Ace as both 1 and 14
    if (numRanks.includes(14)) {
        numRanks.unshift(1)
    }

    let run : number = 1
    for (let i : number = 1; i < numRanks.length; i++) {
        if (numRanks[i] == numRanks[i-1] + 1) {
            run += 1
            if (run >= 5) return true;
        } else {
            run = 1
        }
    }
    return false;
}

// Sort by rank (new array)
export const sortByRank = (hand: CardHand) : CardHand => {
    return hand.slice().sort((a, b) => RankNumeric[a.rank] - RankNumeric[b.rank])
}

export const detectHand = (hand: CardHand) : [HandType, CardHand] => {
    const rankSet = ListToFrequencySet(hand.map(c => RankNumeric[c.rank]))
    switch (hand.length) {
        case 1: return ["High Card", hand];

        case 2 : { // Pair, High Card
            if (rankSet.size === 1) return ["Pair", hand];
            else return ["High Card", [sortByRank(hand).at(-1)!]]; // high card
        }


        case 3 : { // Three of a Kind, Pair, High Card
            if (rankSet.size === 1) return ["Three of a Kind", hand];
            else if (rankSet.size === 2) {

                return ["Pair", hand] // only return pair here
            }
            else return ["High Card", [sortByRank(hand).at(-1)!]]; // high card
        }

        case 4: { // Four of a Kind, Two Pair, Three of a Kind, Pair, High Card
            if (rankSet.size === 1) return ["Four of a Kind", hand];
            else if (rankSet.size === 2) return ["Three of a Kind", hand]; 
            else if (rankSet.size === 3) return ["Pair", hand] 
            else return ["High Card", [sortByRank(hand).at(-1)!]]; 
        }

        case 5: { // All hand types possible, + flush variants
            let handType : HandType = "High Card";
            if (rankSet.size === 1) handType = "Five of a Kind" 
            else if (rankSet.size === 2) handType = "Full House";
            else if (rankSet.size === 3) handType = "Three of a Kind";
            else if (rankSet.size === 4) handType = "Pair";
            
            // Straight Detection - MODIFY LATER FOR FOUR FINGERS etc
            if (["Five of a Kind", "Four of a Kind", "Full House"].includes(handType)) {
                ; // Cannot be improved by a straight
            }
            else if (hasStraight(hand)) { 
                handType = "Straight";
            }

            // Flush Detection - MODIFY LATER FOR FOUR FINGERS etc 
            //if (handType === "Four of a Kind") {
              //  ;
            //}
            else if (hasFlush(hand)) {
                if (handType === "Five of a Kind") {
                    handType = "Flush Five"
                } else if (handType === "Full House") {
                    handType = "Flush House"
                //} else if (handType === "Straight") {
                //    handType = "Straight Flush"
                } else {
                    handType = "Flush";
                }
            }

            if (handType == "High Card") return ["High Card", [sortByRank(hand).at(-1)!]];

            return [handType, hand];
        }

        default: return ["High Card", hand];
    }
};