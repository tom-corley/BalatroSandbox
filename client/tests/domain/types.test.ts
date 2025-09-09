import { describe, it, expect } from "vitest";
import { Rank, RankNumeric, NumericRank } from "../../src/domain/types"

describe("NumericRank", () => {
    it("composes to identity with RankNumeric", () => {
        // Arrange
        const jack : Rank = 'J'

        // Act
        const res : Rank = NumericRank[RankNumeric[jack]]

        // Assert
        expect(res).toBe(jack);
    });
});