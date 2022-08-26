onmessage = () => {
    console.log("web worker blockFunction start")
    const startTime = Date.now();
    let i = 0;
    while (Date.now() - startTime < 5 * 1000) i++;
    console.log("web worker blockFunction end")
    postMessage(i);
}
