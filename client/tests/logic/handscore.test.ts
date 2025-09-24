import { describe, it, expect } from "vitest";
import { CardHand, makeStandardCard, } from "../../src/domain/cards"
import { JollyJoker, LustyJoker, PlainJoker, SlyJoker, WilyJoker } from "../../src/domain/jokers";
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

    it("applies plain joker buff", () => {
        // Arrange
        const testHand : CardHand = [
            makeStandardCard('2','Hearts'),
            makeStandardCard('3','Hearts'),
            makeStandardCard('J','Clubs'),
            makeStandardCard('J', 'Hearts')
        ];

        const testJokers : JokerHand = [new PlainJoker("Standard")]
        const testReserve : CardHand = []

        // Act
        const testScore : Score = scoreHand(testJokers, testHand, testReserve)
        console.log(testScore);
        const res = evaluateScore(testScore)
        console.log(res);


        // Assert
        expect(res).toBe(30*6);
    });

    it("applies holographic joker buff", () => {
        // Arrange
        const testHand : CardHand = [
            makeStandardCard('2','Hearts'),
            makeStandardCard('3','Hearts'),
            makeStandardCard('J','Clubs'),
            makeStandardCard('J', 'Hearts')
        ];

        const testJokers : JokerHand = [new PlainJoker("Holographic")]
        const testReserve : CardHand = []

        // Act
        const testScore : Score = scoreHand(testJokers, testHand, testReserve)
        console.log(testScore);
        const res = evaluateScore(testScore)
        console.log(res);


        // Assert
        expect(res).toBe(30*16);
    });

    it("applies lusty joker buff", () => {
        // Arrange
        const testHand : CardHand = [
            makeStandardCard('2','Hearts'),
            makeStandardCard('3','Hearts'),
            makeStandardCard('J','Clubs'),
            makeStandardCard('J', 'Hearts')
        ];

        const testJokers : JokerHand = [new LustyJoker("Standard")]
        const testReserve : CardHand = []

        // Act
        const testScore : Score = scoreHand(testJokers, testHand, testReserve)
        console.log(testScore);
        const res = evaluateScore(testScore)
        console.log(res);


        // Assert
        expect(res).toBe(30*5);
    });

    it("applies jolly joker buff", () => {
        // Arrange
        const testHand : CardHand = [
            makeStandardCard('2','Hearts'),
            makeStandardCard('3','Hearts'),
            makeStandardCard('J','Clubs'),
            makeStandardCard('J', 'Hearts')
        ];

        const testJokers : JokerHand = [new JollyJoker("Standard")]
        const testReserve : CardHand = []

        // Act
        const testScore : Score = scoreHand(testJokers, testHand, testReserve)
        console.log(testScore);
        const res = evaluateScore(testScore)
        console.log(res);


        // Assert
        expect(res).toBe(30*10);
    })

    it("applies sly joker buff", () => {
        // Arrange
        const testHand : CardHand = [
            makeStandardCard('2','Hearts'),
            makeStandardCard('3','Hearts'),
            makeStandardCard('J','Clubs'),
            makeStandardCard('J', 'Hearts')
        ];

        const testJokers : JokerHand = [new SlyJoker("Standard")]
        const testReserve : CardHand = []

        // Act
        const testScore : Score = scoreHand(testJokers, testHand, testReserve)
        console.log(testScore);
        const res = evaluateScore(testScore)
        console.log(res);


        // Assert
        expect(res).toBe(80*2);
    })

    it("applies wily joker buff", () => {
        // Arrange
        const testHand : CardHand = [
            makeStandardCard('2','Hearts'),
            makeStandardCard('J','Hearts'),
            makeStandardCard('J','Clubs'),
            makeStandardCard('J', 'Hearts')
        ];

        const testJokers : JokerHand = [new WilyJoker("Standard")]
        const testReserve : CardHand = []

        // Act
        const testScore : Score = scoreHand(testJokers, testHand, testReserve)
        console.log(testScore);
        const res = evaluateScore(testScore)
        console.log(res);


        // Assert
        expect(res).toBe(160*3);
    })
});