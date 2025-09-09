import { describe, it, expect } from "vitest";
import { Card, CardHand, makeStandardCard, } from "../../src/domain/cards"
import { FrequencySet, ListToFrequencySet } from "../../src/domain/freqset"
import { RankNumeric } from "../../src/domain/types";

describe("CardHand", () => {
    it("converts to Frequency Set correctly", () => {
        // Arrange
        const testHand : CardHand = [
            makeStandardCard('2','Hearts'),
            makeStandardCard('3','Hearts'),
            makeStandardCard('J','Clubs'),
            makeStandardCard('J', 'Hearts')
        ];

        // Act
        const testFreqSet : FrequencySet<number> = ListToFrequencySet(testHand.map(card => RankNumeric[card.rank]));

        // Assert
        expect(testFreqSet.size).toBe(3);
    });
});