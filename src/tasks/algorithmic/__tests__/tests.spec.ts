
import { calculateThrowProbability } from "../tasksWithTests";

describe("calculateThrowProbability", () => {
    it("passes sample 1", () => {
        expect(calculateThrowProbability("d10")).toMatchObject([
            ["1", "10.00"],
            ["2", "10.00"],
            ["3", "10.00"],
            ["4", "10.00"],
            ["5", "10.00"],
            ["6", "10.00"],
            ["7", "10.00"],
            ["8", "10.00"],
            ["9", "10.00"],
            ["10", "10.00"],
        ]);
    });

    it("passes sample 2", () => {
        expect(calculateThrowProbability("d4+d4")).toMatchObject([
            ["2", "6.25"],
            ["3", "12.50"],
            ["4", "18.75"],
            ["5", "25.00"],
            ["6", "18.75"],
            ["7", "12.50"],
            ["8", "6.25"],
        ]);
    });

    it("passes sample 3", () => {
        expect(calculateThrowProbability("d4*2<d8")).toMatchObject([
            ["0", "62.50"],
            ["1", "37.50"],
        ]);
    });

    it("passes sample 4", () => {
        expect(calculateThrowProbability("d6")).toMatchObject([
            ["1", "16.67"],
            ["2", "16.67"],
            ["3", "16.67"],
            ["4", "16.67"],
            ["5", "16.67"],
            ["6", "16.67"],
        ]);
    });

    it("passes sample 5", () => {
        expect(calculateThrowProbability("(2>1)*3+(3-1)")).toMatchObject([
            ["5", "100.00"],
        ]);
    });

    it("passes sample 6", () => {
        expect(calculateThrowProbability("1+d4+1")).toMatchObject([
            ["3", "25.00"],
            ["4", "25.00"],
            ["5", "25.00"],
            ["6", "25.00"],
        ]);
    });
});