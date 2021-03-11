/*
    Promise.all()
    Promise.allSettled()
    Promise.any()
    Promise.prototype.catch()
    Promise.prototype.finally()
    Promise.prototype.then()
    Promise.race()
    Promise.reject()
    Promise.resolve()
*/

/********************************************************/

// Get random reject or fulfill on promise call
// const promise = new Promise((resolve, reject) => {
//     console.log("Promising...")
//     const random = Math.floor(Math.random() * 2);

//     if (random === 1) {
//         setTimeout(() => {
//             resolve("Fulfilled");
//         }, 2000);
//     } else {
//         setTimeout(() => {
//             reject("Error!");
//         }, 1000);
//     }
// });

// promise
//     .then((data) => console.log(data))
//     .catch((error) => console.log(error));

/********************************************************/

function job(data: any) {
    return new Promise((res, rej) => {
        if (isNaN(data)) {
            rej("error")
        }
        if (data % 2 === 0) {
            setTimeout(() => {
                res("even")
            }, 2000)
        }
        if (data % 2 !== 0) {
            setTimeout(() => {
                res("odd")
            }, 1000)
        }
    });
}

job(1).then(x => console.log(x)).catch((e) => console.log(e))

/********************************************************/