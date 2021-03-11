/*
    You like playing 'Dungeons & Dragons' with friends. And you need to know the possibility of success of each involving dice throws.
    Your program takes in input an arithmetic expression with dice throws and must print all possible outcomes along with their probabilities.
    An expression could contain parentheses and the following operators:

    multiplication ( * )
    addition and subtraction ( + / - )
    greater-than and less-then comparison (> / <) : evaluates to 1 if true, 0 if false

    With operands:

    n: a decimal positive integer
    dn: a 'd' followed by a strictly positive number, representing a die throw from 1 to n by a uniform distribution


    Sample Input 1
    "d6"

    Sample Output 1
    [
        ["1", "16.67"],
        ["2", "16.67"],
        ["3", "16.67"], 
        ["4", "16.67"], 
        ["5", "16.67"], 
        ["6", "16.67"],
    ]

    Sample Input 2
    "d4+d4"

    Sample Output 2
    [
        ["2", "6.25"],
        ["3", "12.50"], 
        ["4", "18.75"], 
        ["5", "25.00"], 
        ["6", "18.75"], 
        ["7", "12.50"],
        ["8", "6.25"],
    ]

    Sample Input 3
    "d4*2>d8"

    Sample Output 3
    [["0", "50.00"], ["1", "50.00"]]
*/

/*
const getOutcome = (
    total: number,
    d1: number,
    d2: number,
) => {
    let outcomes = 0;

    for (let o = 1; o <= d1; o++) {
        for (let m = 1; m <= d2; m++) {
            if (o + m === total) {
                outcomes++;
            }
        }
    }

    return outcomes;
}

export function calculateThrowProbability(formula: string): [string, string][] {
    const dice = formula.match(/(d[0-9]+)/g);
    const nums = formula.match(/([0-9]+)/g);
    const operations = formula.match(/([*+><-])/g);
    const probabilities: [string, string][] = [];

    // One die, simple
    if (!operations && dice) {
        const number = dice.map(d => +d.slice(1))[0];

        for (let i = 1; i <= number; i++) {
            probabilities.push([`${i}`, `${(100 / number).toFixed(2)}`])
        }
    // More dices
    } else if (operations.length > 0 && dice) {
        const number = dice.map(d => +d.slice(1));

        const minThrow = number.length;
        const maxThrow = number.reduce((a, b) => a + b);

        for (let i = minThrow; i <= maxThrow; i++) {
            probabilities.push([
                `${i}`,
                `${(getOutcome(i, number[0], number[1]) / maxThrow / minThrow * 100).toFixed(2)}`,
            ])
        }
    // No dices
    } else {
        // Or parser including arithmetic operations sequence
        const number = eval(formula);
        
        for (let i = 1; i <= number; i++) {
            probabilities.push([`${i}`, `${(100 / number).toFixed(2)}`])
        }
    }

    console.log("probabilities", probabilities)
    return probabilities;
}
*/
/*
export function calculateThrowProbability(formula: string): string[][] {
    const results: Record<number, number> = {};
    let total = 0;

    const evaluate = (expression: string) => {
        const die = expression.match(/d(\d+)/);
        if (die) {
            for (let i = 1; i <= +die[1]; i++) {
                evaluate(expression.replace(die[0], `${i}`));
            }
        } else {
            const r = +eval(expression);
            results[r]++ || (results[r] = 1);
            total++;
        }
    }
    evaluate(formula);

    return Object.keys(results)
        .sort((a, b) => a - b)
        .map(result => {
            const freq = results[result] / total * 100;
            return [result, freq.toFixed(2)];
        });
}
*/
// export function calculateThrowProbability(formula: string): [string, string][] {
//     const dice = formula.match(/(d[0-9]+)/g);
//     const cleanExpr = formula.replace(/d/g, "");
//     const diceMin = cleanExpr.match(/([0-9]+)/g);
//     const diceMax = eval(cleanExpr);
//     let result: [string, string][] = [];

//     // one die
//     if (dice) {
//         if (dice.length === 1) {
//             for (let i = diceMin.length; i <= diceMax; i++) {
//                 const number = dice.map(d => +d.slice(1))[0];
//                 result.push([`${i}`, (100 / number).toFixed(2)])
//             }
//         // many dice
//         } else {
//             const totalOutcomes = () => {
//                 const numbers = dice.map(d => +d.slice(1));
//                 return numbers.reduce((a, b) => a * b);
//             }
//             console.log("totalOutcomes", totalOutcomes)
//             const goodOutcomes = (roll: number) => {
//                 let outcomes = 0;

//                 // this is only for two dices.. 
//                 for (let i = 1; i <= +dice[0].slice(1); i++) {
//                     for (let o = 1; o <= +dice[1].slice(1); o++) {
//                         if (i + o === roll) {
//                             outcomes++
//                         }
//                     }
//                 }

//                 return outcomes;
//             }

//             for (let i = diceMin.length; i <= diceMax; i++) {
//                 const number = dice.map(d => +d.slice(1))[0];
//                 result.push([`${i}`, (goodOutcomes(i) / totalOutcomes() * 100).toFixed(2)])
//             }
//         }
//     }

//     // no dice
//     if (!dice) {
//         result.push([`${diceMax}`, (100).toFixed(2)])
//     }
// console.log(result)
//     return result;
// }