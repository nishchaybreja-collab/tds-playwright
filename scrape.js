const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  let totalSum = 0;

  for (let seed = 17; seed <= 26; seed++) {
    const url = `https://exam.sanand.workers.dev/tds-2026-01-ga3hq-cdp-runtime-diagnostics?seed=${seed}`;
    
    console.log("Opening:", url);

    await page.goto(url);

    await page.waitForSelector("table");

    const numbers = await page.$$eval("td", tds =>
      tds.map(td => parseFloat(td.innerText)).filter(n => !isNaN(n))
    );

    const pageSum = numbers.reduce((a, b) => a + b, 0);

    console.log(`Seed ${seed} sum =`, pageSum);

    totalSum += pageSum;
  }

  console.log("FINAL_SUM =", totalSum);

  await browser.close();
})();