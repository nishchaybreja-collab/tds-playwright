const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  let total = 0;

  for (let seed = 17; seed <= 26; seed++) {
    const url = `https://sanand0.github.io/tdsdata/js_table/?seed=${seed}`;

    console.log("Opening:", url);

    await page.goto(url, { waitUntil: "networkidle" });

    // get full page text
    const text = await page.evaluate(() => document.body.innerText);

    // extract all numbers
    const numbers = text
      .split(/\s+/)
      .map(x => parseInt(x))
      .filter(x => !isNaN(x));

    const pageSum = numbers.reduce((a, b) => a + b, 0);

    console.log("Seed", seed, pageSum);

    total += pageSum;
  }

  console.log("FINAL_SUM=" + total);

  await browser.close();
})();