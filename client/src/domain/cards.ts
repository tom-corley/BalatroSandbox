import type {
  Edition,
  Rank,
  Suit,
  Enhancement, 
  Seal,
} from "./types";

import { RankChips } from "./types";

export class Card {
    rank: Rank;
    suit: Suit;
    baseChips: number;
    bonusChips: number;
    edition: Edition;
    enhancement: Enhancement
    seal: Seal;

    constructor( 
        rank: Rank,
        suit: Suit,
        edition: Edition,
        enhancement: Enhancement,
        seal: Seal
    ) {
        this.rank = rank;
        this.suit = suit;
        this.edition = edition;
        this.enhancement = enhancement;
        this.seal = seal;
        this.baseChips = RankChips[rank];
        this.bonusChips = 0
    }
};

export const makeStandardCard = (rank: Rank, suit: Suit) : Card => {
    return new Card(rank, suit, "Standard", "None", "None")
}

export type CardHand = Card[]