import { describe, it, expect } from "vitest";
import { CardHand, makeStandardCard, } from "../../src/domain/cards"
import { detectHand, InvalidHandSizeError } from "../../src/logic/handdetect"
import { HandType } from "../../src/domain/hands";

describe("detectHand", () => {
    describe("One card hand", () => {
        it("returns only card", () => {
            // Arrange
            const testHand : CardHand = [
                makeStandardCard('K','Clubs'),
            ];

            // Act
            const [handType, scoredHand] = detectHand(testHand)

            // Assert
            expect(handType).toBe("High Card")
            expect(scoredHand[0].rank).toBe("K");
        })
    });
    
    describe("Two card hand", () => {
        it("Finds highest of two cards", () => {
            // Arrange
            const testHand : CardHand = [
                makeStandardCard('K','Clubs'),
                makeStandardCard('J', 'Hearts')
            ];

            // Act
            const [handType, scoredHand] = detectHand(testHand)

            // Assert
            expect(handType).toBe("High Card")
            expect(scoredHand[0].rank).toBe("K");
        });

        it("Finds a pair in a two card hand", () => {
            // Arrange
            const testHand : CardHand = [
                makeStandardCard('J','Clubs'),
                makeStandardCard('J', 'Hearts')
            ];

            // Act
            const [handType, _] = detectHand(testHand)

            // Assert
            expect(handType).toBe("Pair");
        });
    });

    describe("Three card hand", () => {
        it("Finds a triple in a three card hand", () => {
            // Arrange
            const testHand : CardHand = [
                makeStandardCard('J','Clubs'),
                makeStandardCard('J', 'Hearts'),
                makeStandardCard('J', 'Diamonds')
            ];

            // Act
            const [handType, _] = detectHand(testHand)

            // Assert
            expect(handType).toBe("Three of a Kind");
        });

        it("Finds a pair in a three card hand", () => {
            // Arrange
            const testHand : CardHand = [
                makeStandardCard('2', 'Hearts'),
                makeStandardCard('J','Clubs'),
                makeStandardCard('J', 'Hearts')
            ];

            // Act
            const [handType, _] = detectHand(testHand)

            // Assert
            expect(handType).toBe("Pair");
        });

        it("Finds highest card in a three card hand", () => {
            // Arrange
            const testHand : CardHand = [
                makeStandardCard('2','Hearts'),
                makeStandardCard('3','Hearts'),
                makeStandardCard('J','Clubs'),
            ]

            // Act
            const [handType, _] = detectHand(testHand)

            // Assert
            expect(handType).toBe("High Card");
        });
    });

    describe("Four card hand", () => {
        it("Finds a four of a kind in a four card hand", () => {
            // Arrange
            const testHand : CardHand = [
                makeStandardCard('J','Hearts'),
                makeStandardCard('J','Diamonds'),
                makeStandardCard('J','Clubs'),
                makeStandardCard('J', 'Spades')
            ];

            // Act
            const [handType, _] = detectHand(testHand)

            // Assert
            expect(handType).toBe("Four of a Kind");
        });

        it("Finds a three a kind in a four card hand", () => {
            // Arrange
            const testHand : CardHand = [
                makeStandardCard('J','Hearts'),
                makeStandardCard('K','Diamonds'),
                makeStandardCard('J','Clubs'),
                makeStandardCard('J', 'Spades')
            ];

            // Act
            const [handType, _] = detectHand(testHand)

            // Assert
            expect(handType).toBe("Three of a Kind");
        });

        it("Finds a two pair in a four card hand", () => {
            // Arrange
            const testHand : CardHand = [
                makeStandardCard('J','Hearts'),
                makeStandardCard('K','Diamonds'),
                makeStandardCard('J','Clubs'),
                makeStandardCard('K', 'Spades')
            ];

            // Act
            const [handType, _] = detectHand(testHand)

            // Assert
            expect(handType).toBe("Two Pair");
        })

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

            // Assert
            expect(handType).toBe("Pair");
        });

        it("Finds a high card in a four card hand", () => {
            // Arrange
            const testHand : CardHand = [
                makeStandardCard('A','Hearts'),
                makeStandardCard('2','Hearts'),
                makeStandardCard('J','Clubs'),
                makeStandardCard('5', 'Hearts')
            ];

            // Act
            const [handType, _] = detectHand(testHand)

            // Assert
            expect(handType).toBe("High Card");
        });
    });

    describe("Five card hand", () => {
        it("Finds a five of a kind", () => {
            // Arrange
            const testHand : CardHand = [
                makeStandardCard('A','Hearts'),
                makeStandardCard('A','Hearts'),
                makeStandardCard('A','Clubs'),
                makeStandardCard('A', 'Hearts'),
                makeStandardCard('A', 'Diamonds')
            ];

            // Act
            const [handType, _] = detectHand(testHand)

            // Assert
            expect(handType).toBe("Five of a Kind");
        })

        it("Finds a flush five", () => {
            // Arrange
            const testHand : CardHand = [
                makeStandardCard('A','Hearts'),
                makeStandardCard('A','Hearts'),
                makeStandardCard('A','Hearts'),
                makeStandardCard('A', 'Hearts'),
                makeStandardCard('A', 'Hearts')
            ];

            // Act
            const [handType, _] = detectHand(testHand)

            // Assert
            expect(handType).toBe("Flush Five");
        })

        it("Finds a four of a kind", () => {
            // Arrange
            const testHand : CardHand = [
                makeStandardCard('A','Hearts'),
                makeStandardCard('J','Hearts'),
                makeStandardCard('A','Clubs'),
                makeStandardCard('A', 'Hearts'),
                makeStandardCard('A', 'Diamonds')
            ];

            // Act
            const [handType, _] = detectHand(testHand)

            // Assert
            expect(handType).toBe("Four of a Kind");
        })

        it("Finds a straight flush", () => {
            // Arrange
            const testHand : CardHand = [
                makeStandardCard('6','Hearts'),
                makeStandardCard('2','Hearts'),
                makeStandardCard('3','Hearts'),
                makeStandardCard('4', 'Hearts'),
                makeStandardCard('5', 'Hearts')
            ];

            // Act
            const [handType, _] = detectHand(testHand)

            // Assert
            expect(handType).toBe("Straight Flush");
        })

        it("Finds a flush", () => {
            // Arrange
            const testHand : CardHand = [
                makeStandardCard('6','Hearts'),
                makeStandardCard('2','Hearts'),
                makeStandardCard('8','Hearts'),
                makeStandardCard('4', 'Hearts'),
                makeStandardCard('J', 'Hearts')
            ];

            // Act
            const [handType, _] = detectHand(testHand)

            // Assert
            expect(handType).toBe("Flush");
        })

        it("Finds a low ace straight", () => {
            // Arrange
            const testHand : CardHand = [
                makeStandardCard('5','Hearts'),
                makeStandardCard('2','Hearts'),
                makeStandardCard('3','Clubs'),
                makeStandardCard('4', 'Hearts'),
                makeStandardCard('A', 'Hearts')
            ];

            // Act
            const [handType, _] = detectHand(testHand)

            // Assert
            expect(handType).toBe("Straight");
        })

        it("Finds a high ace straight", () => {
            // Arrange
            const testHand : CardHand = [
                makeStandardCard('10','Hearts'),
                makeStandardCard('Q','Hearts'),
                makeStandardCard('J','Clubs'),
                makeStandardCard('K', 'Hearts'),
                makeStandardCard('A', 'Hearts')
            ];

            // Act
            const [handType, _] = detectHand(testHand)

            // Assert
            expect(handType).toBe("Straight");
        })

        it("Finds a three of a kind", () => {
            // Arrange
            const testHand : CardHand = [
                makeStandardCard('A','Hearts'),
                makeStandardCard('J','Hearts'),
                makeStandardCard('A','Clubs'),
                makeStandardCard('K', 'Clubs'),
                makeStandardCard('A', 'Diamonds')
            ];

            // Act
            const [handType, _] = detectHand(testHand)

            // Assert
            expect(handType).toBe("Three of a Kind");
        })

        it("Finds a two pair", () => {
            // Arrange
            const testHand : CardHand = [
                makeStandardCard('J','Hearts'),
                makeStandardCard('J','Hearts'),
                makeStandardCard('A','Clubs'),
                makeStandardCard('A', 'Clubs'),
                makeStandardCard('3', 'Diamonds')
            ];

            // Act
            const [handType, _] = detectHand(testHand)

            // Assert
            expect(handType).toBe("Two Pair");
        })

        it("Finds a pair", () => {
            // Arrange
            const testHand : CardHand = [
                makeStandardCard('K','Hearts'),
                makeStandardCard('J','Hearts'),
                makeStandardCard('A','Clubs'),
                makeStandardCard('A', 'Spades'),
                makeStandardCard('3', 'Diamonds')
            ];

            // Act
            const [handType, _] = detectHand(testHand)

            // Assert
            expect(handType).toBe("Pair");
        })

        it("Finds high card", () => {
            // Arrange
            const testHand : CardHand = [
                makeStandardCard('K','Hearts'),
                makeStandardCard('J','Hearts'),
                makeStandardCard('4','Clubs'),
                makeStandardCard('A', 'Spades'),
                makeStandardCard('3', 'Diamonds')
            ];

            // Act
            const [handType, _] = detectHand(testHand)

            // Assert
            expect(handType).toBe("High Card");
        })
    });

    describe("More than five card hand", () => {
        it("Throws a InvalidHandSizeError", () => {
             // Arrange
            const testHand : CardHand = [
                makeStandardCard('K','Hearts'),
                makeStandardCard('J','Hearts'),
                makeStandardCard('4','Clubs'),
                makeStandardCard('A', 'Spades'),
                makeStandardCard('3', 'Diamonds'),
                makeStandardCard('7', 'Spades')
            ];

            // Act / Assert
            expect(() => detectHand(testHand)).toThrow(InvalidHandSizeError);        
        });
    });
});