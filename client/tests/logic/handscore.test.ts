import { describe, it, expect } from "vitest";
import { CardHand, makeStandardCard, } from "../../src/domain/cards"
import { scoreHand, evaluateScore } from "../../src/logic/handscore"
import { JokerHand } from "../../src/domain/jokers";
import { Score } from "../../src/domain/types"

describe("Score Hand", () => {
    it("scores a simple pair correctly", () => {
        // Arrange
        const testHand : CardHand = [
            makeStandardCard('2','Hearts'),
            makeStandardCard('3','Hearts'),
            makeStandardCard('J','Clubs'),
            makeStandardCard('J', 'Hearts')
        ];

        const testJokers : JokerHand = []
        const testReserve : CardHand = []

        // Act
        const testScore : Score = scoreHand(testJokers, testHand, testReserve)
        console.log(testScore);
        const res = evaluateScore(testScore)
        console.log(res);


        // Assert
        expect(res).toBe(60);
    });

    it("retriggers a card correctly", () => {
        // Arrange
        const testHand : CardHand = [
            makeStandardCard('2','Hearts'),
            makeStandardCard('3','Hearts'),
            makeStandardCard('J','Clubs'),
            makeStandardCard('J', 'Hearts')
        ];
        testHand[3].seal = "Red";

        const testJokers : JokerHand = []
        const testReserve : CardHand = []

        // Act
        const testScore : Score = scoreHand(testJokers, testHand, testReserve)
        console.log(testScore);
        const res = evaluateScore(testScore)
        console.log(res);


        // Assert
        expect(res).toBe(80);
    });
});