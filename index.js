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

const blockFunction = () => {
    console.log("blockFunction start")
    const startTime = Date.now();
    let i = 0;
    while (Date.now() - startTime < 5 * 1000) i++;
    document.getElementById("times").textContent = "计算次数为：" + i;
    console.log("blockFunction end")
}

console.log('script start');

setTimeout(() => {
    console.log("setTimeout 1")
}, 2000);

Promise.resolve()
    .then(() => console.log("promise 1 1"))
    .then(() => console.log("promise 1 2"));

document.getElementById("line").style.backgroundColor = "blue";

setTimeout(() => {
    console.log("setTimeout 2")
    document.getElementById("line").style.backgroundColor = "red";
    Promise.resolve()
        .then(() => console.log("promise 3"))
}, 1000);

Promise.resolve()
    .then(() => console.log("promise 2"))
    .then(() => {
        setTimeout(() => {
            console.log("setTimeout 3")
        });
    })

const clickButton = () => {
    console.log("clickButton")
    document.getElementById("intl").textContent = "点击后经过5s才修改";
    microtaskTimeout(5);
}

const useWebWorker = document.getElementById("useWebWorker");

if (window.Worker) {
    const webWorker = new Worker("worker.js");

    useWebWorker.onclick = () => {
        console.log("Web Worker start");
        webWorker.postMessage([]);
    }

    webWorker.onmessage = (e) => {
        const i = e.data;
        document.getElementById("times").textContent = "计算次数为：" + i;
    }
}
else {
    useWebWorker.onclick = () => {
        alert("不支持 Web Worker")
    }
}

const webWokerTest = () => {


}

console.log('script end');