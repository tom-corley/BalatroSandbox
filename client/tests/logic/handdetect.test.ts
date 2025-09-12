import { describe, it, expect } from "vitest";
import { CardHand, makeStandardCard, } from "../../src/domain/cards"
import { detectHand } from "../../src/logic/handdetect"
import { HandType } from "../../src/domain/hands";

describe("detectHand", () => {
    it("Finds a pair in a four card hand", () => {
        // Arrange
        const testHand : CardHand = [
            makeStandardCard('2','Hearts'),
            makeStandardCard('3','Hearts'),
            makeStandardCard('J','Clubs'),
            makeStandardCard('J', 'Hearts')
        ];

        // Act
        const [handType, scoredHand] = detectHand(testHand)
        console.log(scoredHand);

        // Assert
        expect(handType).toBe("Pair");
    });
});