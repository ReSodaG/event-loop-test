/**
 * 根据传入秒数连续生成对应的微任务事件，模拟微任务队列过长的情况
 * @param {Number} rowSecond 
 */
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

/**
 * 执行一个长达 5 秒的连续计算
 */
const blockFunction = () => {
    console.log("blockFunction start")
    const startTime = Date.now();
    let i = 0;
    while (Date.now() - startTime < 5 * 1000) i++;
    document.getElementById("times").textContent = "计算次数为：" + i;
    console.log("blockFunction end")
}

/**
 * 验证微任务队列的执行会阻塞渲染
 */
const clickButton = () => {
    console.log("clickButton start")
    document.getElementById("intl").textContent = "点击后经过 5s 才修改";
    document.getElementById("line").style.backgroundColor = "red";
    microtaskTimeout(5);
    console.log("clickButton end")
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
        console.log("Web Worker end");
    }
}
else {
    useWebWorker.onclick = () => {
        alert("不支持 Web Worker")
    }
}

// 以下代码用来分辨微任务宏任务的调度顺序和对渲染的影响
console.log('script start');

// 证明微任务的执行是根据微任务的入队顺序
Promise.resolve()
    .then(() => console.log("Promise 0 1"))
    .then(() => console.log("Promise 0 2"));

Promise.resolve()
    .then(() => console.log("Promise 1 1"))
    .then(() => console.log("Promise 1 2"));

// 证明微任务总在宏任务前
setTimeout(() => {
    console.log("setTimeout 0 start");
    Promise.resolve()
        .then(() => console.log("setTimeout 0 Promise 0"))
        .then(() => console.log("setTimeout 0 Promise 1"));
    console.log("setTimeout 0 end");
})

setTimeout(() => {
    console.log("setTimeout 1 start");
    Promise.resolve()
        .then(() => console.log("setTimeout 1 Promise 0"))
        .then(() => console.log("setTimeout 1 Promise 1"));
    console.log("setTimeout 1 end");
})

console.log('script end');

// 一个关于执行顺序的小 demo
setTimeout(() => {
    console.log("0");
    new Promise((resolve) => {
        console.log("1");
        setTimeout(() => {
            console.log("2");
            resolve();
            console.log("3");
        }, 1000)
    })
        .then(() => console.log("4"))
        .then(() => console.log("5"));
    console.log("6");
}, 1000)