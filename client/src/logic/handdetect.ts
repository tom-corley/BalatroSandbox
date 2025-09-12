import { type Rank, RankNumeric, NumericRank } from "../domain/types";
import { type CardHand} from "../domain/cards";
import { type HandType } from "../domain/hands";
import { FrequencySet, ListToFrequencySet } from "../domain/freqset";

// Flush Detection
// Four Fingers, Smeared Joker - modify behaviour
export const hasFlush = (hand: CardHand) : boolean => {
    const suitSet = new Set<string>(hand.map(card => card.suit));
    if (suitSet.size === 1) {
        return true;
    }
    return false;
}

// Straight Detection
// Four Fingers, Smeared Joker - modify behaviour
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

export const highCard = (hand : CardHand) : [HandType, CardHand] => {
    return ["High Card", [sortByRank(hand).at(-1)!]];
}

export const xOfAKind = (hand: CardHand, x: number, rankSet: FrequencySet<number>) : [HandType, CardHand] => {
    let commonRank : Rank = NumericRank[rankSet.keysWithFreq(x)[0]];
    let group : CardHand = hand.filter(card => card.rank === commonRank);
    let handType : HandType
    switch (x) {
        case 2: handType = "Pair"; break;
        case 3: handType = "Three of a Kind"; break;
        case 4: handType = "Four of a Kind"; break;
        default: throw new Error()
    }
    return [handType, group]
}

export const twoPair = (hand: CardHand, rankSet: FrequencySet<number>) : [HandType, CardHand]  => {
    let PairRanks : Rank[] = rankSet.keysWithFreq(2).map(num => NumericRank[num]);
    let twoPair : CardHand = hand.filter(card => PairRanks.includes(card.rank));
    return ["Two Pair", twoPair]
}

// Sort by rank (new array)
export const sortByRank = (hand: CardHand) : CardHand => {
    return hand.slice().sort((a, b) => RankNumeric[a.rank] - RankNumeric[b.rank])
}

export class InvalidHandSizeError extends Error {
  constructor(size: number) {
    super(`Invalid hand size: ${size}. Expected 1–5 cards.`);
    this.name = "InvalidHandSizeError";
  }
}

export const detectHand = (hand: CardHand) : [HandType, CardHand] => {
    const rankSet = ListToFrequencySet(hand.map(c => RankNumeric[c.rank]))
    switch (hand.length) {
        case 1: return ["High Card", hand];

        case 2 : { // Pair, High Card
            if (rankSet.size === 1) return ["Pair", hand];
            else return highCard(hand); // high card
        }

        case 3 : { // Three of a Kind, Pair, High Card
            if (rankSet.size === 1) return ["Three of a Kind", hand];
            else if (rankSet.size === 2) return xOfAKind(hand, 2, rankSet);
            else return highCard(hand); // high card
        }

        case 4: { // Four of a Kind, Two Pair, Three of a Kind, Pair, High Card
            if (rankSet.size === 1) return ["Four of a Kind", hand];
            else if ((rankSet.size === 2) && (rankSet.biggestKind === 3)) {
                return xOfAKind(hand, 3, rankSet)
            } else if (rankSet.size === 2) {
                return twoPair(hand, rankSet)
            }
            else if (rankSet.size === 3) { // Pair
                return xOfAKind(hand, 2, rankSet)
            } 
            else return highCard(hand)
        }

        case 5: { // All hand types possible, + flush variants
            let fl : boolean = hasFlush(hand)
            let st : boolean = hasStraight(hand)
            let handType : HandType
            if (rankSet.size === 1) {
                handType = fl ? "Flush Five" : "Five of a Kind";
                return [handType, hand];
            } else if ((rankSet.size === 2) && (rankSet.biggestKind === 4)) {
                return xOfAKind(hand, 4, rankSet);
            } else if (rankSet.size === 2) {
                handType = fl ? "Flush House" : "Full House";
                return [handType, hand]
            } else if (st && fl) {
                return ["Straight Flush", hand]
            } else if (fl) {
                return ["Flush", hand]
            } else if (st) {
                return ["Straight", hand]
            } else if ((rankSet.size === 3) && (rankSet.biggestKind === 3)) {
                return xOfAKind(hand, 3, rankSet);
            } else if (rankSet.size === 3) {
                return twoPair(hand, rankSet);
            } else if (rankSet.size === 4) {
                return xOfAKind(hand, 2, rankSet);
            } else return highCard(hand);
        }

        default: {
             throw new InvalidHandSizeError(hand.length);
        }
    }
};