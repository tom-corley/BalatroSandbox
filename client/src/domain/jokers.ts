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