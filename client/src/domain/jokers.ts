import type { Card } from "./cards";
import type {
  Edition,
  ScoreModifier,
} from "./types";

export type Target = (card: Card) => boolean;

export abstract class Joker {
    jokerId: number
    name: string;
    description: string;
    edition: Edition;
    scoreModifier?: ScoreModifier;
    targetCard : Target
    targetEffect : ScoreModifier;
    effects?: any;

    constructor(
        jokerId: number,
        name: string,
        description: string,
        edition: Edition,
        scoreModifier: ScoreModifier,
        targetCard: Target,
        targetEffect: ScoreModifier,
        effects: any,
    ) {
        this.jokerId = jokerId;
        this.name = name;
        this.description = description;
        this.edition = edition;
        this.scoreModifier = scoreModifier;
        this.targetCard = targetCard;
        this.targetEffect = targetEffect
        this.effects = effects;
    }
}

export type JokerHand = Joker[]

// 1. Joker
export class PlainJoker extends Joker {
    constructor(edition : Edition) {
        super(
            1,
            "Joker",
            "Adds +4 Mult",
            edition,
            s => ({chips: s.chips, mult: s.mult+4}),
            _ => false,
            s => ({chips: s.chips, mult: s.mult}),
            undefined
        )
    } 
}

// 2. Greedy Joker
export class GreedyJoker extends Joker {
    constructor(edition : Edition) {
        super(
            2,
            "Greedy Joker",
            "Played cards with diamond suit give +3 mult when scored",
            edition,
            s => ({chips: s.chips, mult: s.mult}),
            c => c.suit == "Diamonds",
            s => ({chips: s.chips, mult: s.mult+3}),
            undefined
        )
    } 
}

// 3. Lusty Joker
export class LustyJoker extends Joker {
    constructor(edition : Edition) {
        super(
            3,
            "Lusty Joker",
            "Played cards with heart suit give +3 mult when scored",
            edition,
            s => ({chips: s.chips, mult: s.mult}),
            c => c.suit == "Hearts",
            s => ({chips: s.chips, mult: s.mult+3}),
            undefined
        )
    } 
}

// 4. Wrathful Joker
export class WrathfulJoker extends Joker {
    constructor(edition : Edition) {
        super(
            4,
            "Wrathful Joker",
            "Played cards with spade suit give +3 mult when scored",
            edition,
            s => ({chips: s.chips, mult: s.mult}),
            c => c.suit == "Spades",
            s => ({chips: s.chips, mult: s.mult+3}),
            undefined
        )
    } 
}

// 5. Gluttonous Joker
export class GluttonousJoker extends Joker {
    constructor(edition : Edition) {
        super(
            5,
            "Gluttonous Joker",
            "Played cards with club suit give +3 mult when scored",
            edition,
            s => ({chips: s.chips, mult: s.mult}),
            c => c.suit == "Clubs",
            s => ({chips: s.chips, mult: s.mult+3}),
            undefined
        )
    } 
}

// 6. Jolly Joker

// 7. Zany Joker

// 8. Mad Joker

// 9. Crazy Joker

// 10. Droll Joker

// 11. Sly Joker

// 12. Wily Joker

// 13. Clever Joker

// 14. Devious Joker

// 15. Crafty Joker

// 16. Half Joker