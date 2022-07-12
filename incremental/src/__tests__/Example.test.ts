import React from "react";

// Example testing file for jest. Mostly pulled from this tutorial: https://itnext.io/testing-with-jest-in-typescript-cc1cd0095421
// Jest documentation can be found here for more in-depth information: https://jestjs.io/

// Dummy function to be used in an example test
export function sum(a:number, b:number): number {
    return a+b;
}

// Example of a standalone test
it("true == true", () => {
    expect(true).toBe(true);
});

// Another example of a standalone test, this time using async
test("false == false", async () => {
    expect(false).toBe(false);
});

// Either it() or test() can be used interchangably.
// They do the same thing functionally, so the choice is up to preference.

// Example of a set of tests grouped together with a description
describe("test sum function", () => {
    it("should return 15 for sum(10,5)", () => {
        expect(sum(10, 5)).toBe(15);
    });
    it("should return 5 for sum(2,3)", () => {
        expect(sum(2, 3)).toBe(5);
    });
});