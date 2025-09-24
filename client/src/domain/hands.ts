import type { Score } from "./types"

export type HandType =
    "High Card" | "Pair" | "Two Pair" | "Three of a Kind" | 
    "Straight" |"Flush" | "Full House" | "Four of a Kind" | 
    "Straight Flush" |"Five of a Kind" | "Flush House" | "Flush Five"


// State management for planetary card updates?
export const HandScore : Record<HandType, Score> = {
    "High Card" : {chips: 5, mult: 1},
    "Pair" : {chips: 10, mult: 2},
    "Two Pair" : {chips: 20, mult: 2},
    "Three of a Kind" : {chips: 30, mult: 3},
    "Straight" : {chips: 30, mult: 4},
    "Flush" : {chips: 35, mult: 4},
    "Full House" : {chips: 40, mult: 4},
    "Four of a Kind" : {chips: 60, mult: 7},
    "Straight Flush" : {chips: 100, mult: 8},
    "Five of a Kind" : {chips: 120, mult: 12},
    "Flush House" : {chips: 140, mult: 14},
    "Flush Five" : {chips: 160, mult: 16}
}