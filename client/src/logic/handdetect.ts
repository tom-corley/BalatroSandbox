import { RankNumeric } from "../domain/types";
import { type CardHand } from "../domain/cards";
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

export const detectHand = (hand: CardHand) : [HandType, CardHand] => {
    // Easiest case, one played card is always a high card, whole hand played
    if (hand.length === 1) return ["High Card", hand];

    // Use a set to group ranks together
    const rankSet = ListToFrequencySet(hand)

    // For two cards played check for pair
    if (hand.length === 2) {
        return (rankSet.size === 1 ? ["Pair", hand] : ["High Card", hand])
    }

    // For three cards played, either three of a kind, pair, or high card
    if (hand.length === 3) {
        switch (rankSet.size) {
            case 1: return ["Three of a Kind", hand]
            case 2: return ["Pair", hand]
            case 3: return ["High Card", hand]
        }
    }

    // For four cards played, more complex
    if (hand.length === 4) {
        switch (rankSet.size) {
            case 1: return ["Four of a Kind", hand]
            case 2: return ["Three of a Kind", hand] // Either three of a kind or two pair
            case 3: return ["Pair", hand] // Pair
            case 4: return ["High Card", hand]
        }
    }

    // Five cards: Now must consider flushes and straights, and combo types
    let handType : HandType = "High Card"
    switch (rankSet.size) {
        case 1: handType = "Five of a Kind"; break;
        case 2: handType = "Four of a Kind"; break; // Either four of a kind or full house
        case 3: handType = "Three of a Kind"; break; // Either three of a kind, two pair
        case 4: handType = "Pair"; break;
    }

    // Flush Detection - MODIFY LATER FOR FOUR FINGERS etc
    if (hasFlush(hand)) {
        handType = "Flush";
    }

    // Straight Detection - MODIFY LATER FOR FOUR FINGERS etc
    // Four Fingers, Shortcut Joker - modify behaviour
    if (hasStraight(hand)) {
        if (handType == "Flush") {
            handType = "Straight Flush"
        } else {
            handType = "Straight";
        }
    }
    return [handType, hand];
};