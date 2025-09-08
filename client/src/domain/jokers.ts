import type {
  Edition,
  ScoreModifier,
} from "./types";

export abstract class Joker {
    jokerId: number
    name: string;
    description: string;
    edition: Edition;
    scoreModifier?: ScoreModifier;
    effects?: any;

    constructor(
        jokerId: number,
        name: string,
        description: string,
        edition: Edition,
        scoreModifier: ScoreModifier,
        effects: any,
    ) {
        this.jokerId = jokerId;
        this.name = name;
        this.description = description;
        this.edition = edition;
        this.scoreModifier = scoreModifier;
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
            s => ({chips: s.chips, mult: s.mult}),
            undefined
        )
    } 
}