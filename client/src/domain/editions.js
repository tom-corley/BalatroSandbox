var EditionModifiers = {
    "Standard": function (s) { return ({ chips: s.chips, mult: s.mult }); },
    "Foil": function (s) { return ({ chips: s.chips + 50, mult: s.mult }); },
    "Holographic": function (s) { return ({ chips: s.chips, mult: s.mult + 10 }); },
    "Polychrome": function (s) { return ({ chips: s.chips, mult: s.mult * 1.5 }); },
    "Negative": function (s) { return ({ chips: s.chips, mult: s.mult }); },
};
var evaluateScore = function (s) { return s.chips * s.mult; };
var PlainJoker = {
    Name: "Joker",
    Description: "Provides +4 Mult",
    Edition: "Standard",
    ScoreModifier: function (s) { return ({ chips: s.chips, mult: s.mult + 4 }); }
};
var scoreHand = function (jokers, played, held) {
    var _a, _b;
    // Pre-Scoring
    // Hand-detection MISSING
    var score = { chips: 40, mult: 4 };
    // Played Cards Scoring
    // Held Cards Scoring
    // Remaining Jokers
    for (var i = 0; i < jokers.length; i++) {
        var j = jokers[i];
        // Apply Joker Effect if exists
        score = (_b = (_a = j.ScoreModifier) === null || _a === void 0 ? void 0 : _a.call(j, score)) !== null && _b !== void 0 ? _b : score;
        // Apply Joker Edition
        score = EditionModifiers[j.Edition](score);
    }
    // Placeholders
    return score;
};
console.log(scoreHand([PlainJoker], [], []));
