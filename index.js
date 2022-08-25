console.log('script start');

const microtaskTimeout = (rowSecond) => {
    const startTime = Date.now();
    const second = Number(rowSecond);
    if (second) {
        const timeout = () => {
            if (Date.now() - startTime < second * 1000) {
                return Promise.resolve()
                    .then(timeout);
            }
        }
        timeout();
    }
}


setTimeout(function () {
    console.log("setTimeout 1")
}, 2000);

Promise.resolve()
    .then(() => console.log("promise 1 1"))
    .then(() => console.log("promise 1 2"));

document.getElementById("line").style.backgroundColor = "blue";

setTimeout(function () {
    console.log("setTimeout 2")
    document.getElementById("line").style.backgroundColor = "red";
    Promise.resolve()
        .then(() => console.log("promise 3"))
}, 1000);

Promise.resolve()
    .then(() => console.log("promise 2"))
    .then(() => {
        setTimeout(function () {
            console.log("setTimeout 3")
        });
    })

function clickButton() {
    console.log("clickButton")
    document.querySelector('p').textContent = "点击后经过5s才修改";
    microtaskTimeout(5);
}

console.log('script end');