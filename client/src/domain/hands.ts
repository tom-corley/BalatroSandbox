import type { Score } from "./types"
import type { CardHand } from "./cards"

export type HandType =
    "High Card" | "Pair" | "Two Pair" | "Three of a Kind" | 
    "Straight" |"Flush" | "Full House" | "Four of a Kind" | 
    "Straight Flush" |"Five of a Kind" | "Flush House" | "Flush Five"


// State management for planetary card updates?
export const HandScore : Record<HandType, Score> = {
    "High Card" : {chips: 5, mult: 1},
    "Pair" : {chips: 10, mult: 2},
    "Two Pair" : {chips: 20, mult: 2},
    "Three of a Kind" : {chips: 30, mult: 13},
    "Straight" : {chips: 30, mult: 4},
    "Flush" : {chips: 35, mult: 4},
    "Full House" : {chips: 40, mult: 4},
    "Four of a Kind" : {chips: 60, mult: 7},
    "Straight Flush" : {chips: 100, mult: 8},
    "Five of a Kind" : {chips: 120, mult: 12},
    "Flush House" : {chips: 140, mult: 14},
    "Flush Five" : {chips: 160, mult: 16}
}

export const detectHand = (hand: CardHand) : [HandType, CardHand] => {
    // Easiest case, one played card is always a high card
    if (hand.length === 1) return ["High Card", hand];

    // Use a set to group ranks together
    const rankSet = new Set<string>(hand.map(card => card.rank));

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

    // Flush Detection 
    // Four Fingers, Smeared Joker - modify behaviour
    const suitSet = new Set<string>(hand.map(card => card.suit));
    if (suitSet.size === 1) {
        handType = "Flush"
    }

    // Straight Detection (No wrap-around straights) 
    // Four Fingers, Shortcut Joker - modify behaviour



    return [handType, hand] ;
}