// Sum of two, find two numbers that summed will give target
const input1 = [0, 1, 15, 20, 21, 41, 58];
const target1 = 21;

// Not the best solution since time complexity will be O(n**2)
function sumOfTwoUgly(numbers: number[], target: number) {
    const result = [];

    for (let numberA of numbers) {
        for (let numberB of numbers) {
            if (numberA + numberB === target) {
                result.push([numberA, numberB]);
            }
        }
    }

    return result;
}

// This will be O(n) since we convert diff to object keys and can access directly
function sumOfTwoBetter(numbers: number[], target: number) {
    // Record is the same as { [k: number]: number }
    const numbersObject: Record<number, number> = {};
    const result = [];

    for (let i = 0; i < numbers.length; i++) {
        numbersObject[numbers[i]] = i;
    }

    for (let i = 0; i < numbers.length; i++) {
        const diff = target - numbers[i];

        if (numbersObject[diff] !== undefined) {
            result.push([numbers[i], numbers[numbersObject[diff]]])
        }
    }

    return result;
}

// console.log(sumOfTwoUgly(input1, target1));
// console.log(sumOfTwoBetter(input1, target1));

/********************************************************/

// Sum of three, find three numbers that summed will give 0
// TODO

/********************************************************/

// Check receipt, try to find more time complexity friendly solution
function bakery(receipt: Record<string, number>, ingredients: Record<string, number>) {
    const receiptA = Object.entries(receipt);
    const ingredientsA = Object.entries(ingredients);
    const output: number[] = [];

    // Can do with one loop
    for (let i of ingredientsA) {
        for (let r of receiptA) {
            if (r[0] === i[0]) {
                output.push(Math.floor(i[1] / r[1]));
            }
        }
    }

    return Math.min(...output);
}

console.log(bakery(
    { floor: 500, sugar: 200, eggs: 1 },
    { floor: 5500, sugar: 200, eggs: 5, milk: 200 },
));

/********************************************************/

// Restore string task
function restoreString(input: string, data: number[]) {
    const output: string[] = [];

    for (let i of data) {
        output.push(input[i]);
    };
    
    return output.join("");
}

console.log(restoreString("tsaerm", [5, 2, 1, 0, 3, 4]))