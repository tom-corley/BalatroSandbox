import { type CardHand } from "../domain/cards";
import { type HandType } from "../domain/hands";

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