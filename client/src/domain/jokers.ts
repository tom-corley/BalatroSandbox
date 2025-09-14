import type { Card, CardHand } from "./cards";
import type {
  Edition,
  ScoreModifier,
} from "./types";
import { hasFlush, hasStraight, hasTwoPair, hasXofAKind } from "../logic/handdetect";

export type Target = (card: Card) => boolean;
export type HandContext = {hand: CardHand, held: CardHand, deck: CardHand, jokers: JokerHand, discards: number, hands: number};
export type JokerTrigger = (ctxt: HandContext) => boolean;

// To calculate the sell value, the game does a simple calculation:
// sell_cost = math.max(1, math.floor(cost/2)) + ability_extra_value

export abstract class Joker {
    jokerId: number
    name: string;
    description: string;
    edition: Edition;
    effectTrigger: JokerTrigger;
    scoreModifier: ScoreModifier;
    targetCard : Target
    targetEffect : ScoreModifier;
    effects?: any;

    constructor(
        jokerId: number,
        name: string,
        description: string,
        edition: Edition,
        effectTrigger: JokerTrigger,
        scoreModifier: ScoreModifier,
        targetCard: Target,
        targetEffect: ScoreModifier,
        effects: any,
    ) {
        this.jokerId = jokerId;
        this.name = name;
        this.description = description;
        this.edition = edition;
        this.effectTrigger = effectTrigger;
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
            _ => true,
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
            _ => false,
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
            _ => false,
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
            _ => false,
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
            _ => false,
            s => ({chips: s.chips, mult: s.mult}),
            c => c.suit == "Clubs",
            s => ({chips: s.chips, mult: s.mult+3}),
            undefined
        )
    } 
}

// 6. Jolly Joker
export class JollyJoker extends Joker {
    constructor(edition : Edition) {
        super(
            6,
            "Jolly Joker",
            "+8 mult if played hand contains a pair",
            edition,
            (ctxt : HandContext) => hasXofAKind(ctxt.hand, 2),
            s => ({chips: s.chips, mult: s.mult+8}),
            _ => false,
            s => ({chips: s.chips, mult: s.mult}),
            undefined
        )
    } 
}


// 7. Zany Joker
export class ZanyJoker extends Joker {
    constructor(edition : Edition) {
        super(
            7,
            "Zany Joker",
            "+12 mult if played hand contains a Three of a Kind",
            edition,
            (ctxt : HandContext) => hasXofAKind(ctxt.hand, 3),
            s => ({chips: s.chips, mult: s.mult+12}),
            _ => false,
            s => ({chips: s.chips, mult: s.mult}),
            undefined
        )
    }
}

// 8. Mad Joker
export class MadJoker extends Joker {
    constructor(edition : Edition) {
        super(
            8,
            "Mad Joker",
            "+10 mult if played hand contains a Two Pair",
            edition,
            (ctxt : HandContext) => hasTwoPair(ctxt.hand),
            s => ({chips: s.chips, mult: s.mult+10}),
            _ => false,
            s => ({chips: s.chips, mult: s.mult}),
            undefined
        )
    }
}

// 9. Crazy Joker
export class CrazyJoker extends Joker {
    constructor(edition : Edition) {
        super(
            9,
            "Crazy Joker",
            "+12 mult if played hand contains a Straight",
            edition,
            (ctxt : HandContext) => hasStraight(ctxt.hand),
            s => ({chips: s.chips, mult: s.mult+12}),
            _ => false,
            s => ({chips: s.chips, mult: s.mult}),
            undefined
        )
    }
}

// 10. Droll Joker
export class DrollJoker extends Joker {
    constructor(edition : Edition) {
        super(
            10,
            "Droll Joker",
            "+10 mult if played hand contains a Flush",
            edition,
            (ctxt : HandContext) => hasFlush(ctxt.hand),
            s => ({chips: s.chips, mult: s.mult+10}),
            _ => false,
            s => ({chips: s.chips, mult: s.mult}),
            undefined
        )
    }
}


// 11. Sly Joker
export class SlyJoker extends Joker {
    constructor(edition : Edition) {
        super(
            11,
            "Sly Joker",
            "+50 Chips if played hand contains a Pair",
            edition,
            (ctxt : HandContext) => hasXofAKind(ctxt.hand, 2),
            s => ({chips: s.chips+50, mult: s.mult}),
            _ => false,
            s => ({chips: s.chips, mult: s.mult}),
            undefined
        )
    }
}

// 12. Wily Joker
export class WilyJoker extends Joker {
    constructor(edition : Edition) {
        super(
            12,
            "Wily Joker",
            "+100 Chips if played hand contains a Three of a Kind",
            edition,
            (ctxt : HandContext) => hasXofAKind(ctxt.hand, 3),
            s => ({chips: s.chips+100, mult: s.mult}),
            _ => false,
            s => ({chips: s.chips, mult: s.mult}),
            undefined
        )
    }
}

// 13. Clever Joker
export class CleverJoker extends Joker {
    constructor(edition : Edition) {
        super(
            13,
            "Clever Joker",
            "+80 Chips if played hand contains a Two Pair",
            edition,
            (ctxt : HandContext) => hasTwoPair(ctxt.hand),
            s => ({chips: s.chips+80, mult: s.mult}),
            _ => false,
            s => ({chips: s.chips, mult: s.mult}),
            undefined
        )
    }
}

// 14. Devious Joker
export class DeviousJoker extends Joker {
    constructor(edition : Edition) {
        super(
            14,
            "Devious Joker",
            "+100 Chips if played hand contains a Straight",
            edition,
            (ctxt : HandContext) => hasStraight(ctxt.hand),
            s => ({chips: s.chips+100, mult: s.mult}),
            _ => false,
            s => ({chips: s.chips, mult: s.mult}),
            undefined
        )
    }
}

// 15. Crafty Joker
export class CraftyJoker extends Joker {
    constructor(edition : Edition) {
        super(
            15,
            "Crafty Joker",
            "+80 Chips if played hand contains a Flush",
            edition,
            (ctxt : HandContext) => hasFlush(ctxt.hand),
            s => ({chips: s.chips+80, mult: s.mult}),
            _ => false,
            s => ({chips: s.chips, mult: s.mult}),
            undefined
        )
    }
}

// 16. Half Joker
export class HalfJoker extends Joker {
    constructor(edition : Edition) {
        super(
            16,
            "Half Joker",
            "+20 mult if played hand contains 3 or fewer cards",
            edition,
            (ctxt : HandContext) => ctxt.hand.length <= 3,
            s => ({chips: s.chips, mult: s.mult+20}),
            _ => false,
            s => ({chips: s.chips, mult: s.mult}),
            undefined
        )
    }
}