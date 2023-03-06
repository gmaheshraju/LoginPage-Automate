const { Builder, By, until } = require("selenium-webdriver");
const BasePage = require("./WebPage")

async function sleep(timeInS) {
	await new Promise((resolve) => setTimeout(resolve, timeInS * 1000))
}

async function startLogin() {
	const page = new BasePage();
	let site = "";
    await page.visit(site);
    await sleep(5);
	await page.signin();
    await sleep(20); 
}

(async () => {
	await startLogin()
})()
