const { chromium } = require("playwright");

async function run() {

    const seeds = [
        17,18,19,20,21,22,23,24,25,26
    ];

    let total = 0;

    const browser = await chromium.launch();
    const page = await browser.newPage();

    for (let s of seeds) {

        const url = `https://exam.sanand.workers.dev/seed/${s}`;

        await page.goto(url);

        const numbers = await page.$$eval("td", tds =>
            tds.map(td => parseFloat(td.innerText))
               .filter(x => !isNaN(x))
        );

        const sum = numbers.reduce((a,b)=>a+b,0);

        total += sum;
    }

    console.log("FINAL TOTAL =", total);

    await browser.close();
}

run();