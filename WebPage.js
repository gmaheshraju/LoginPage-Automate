const { Builder, By, until } = require("selenium-webdriver");

const chrome = require("selenium-webdriver/chrome");

function initOptions(o) {
//   o.addArguments("headless");
  o.addArguments("disable-infobars");
  o.addArguments("no-sandbox");
  o.addArguments(
    "user-agent=Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36 RuxitSynthetic/1.0 v6419931773 t38550 ath9b965f92 altpub"
  );
  o.setUserPreferences({
    credential_enable_service: false,
  });
}

const BasePage = function (customAudio = null) {
  let o = new chrome.Options();
  initOptions(o);

  this.driver = new Builder()
    .withCapabilities({ acceptSslCerts: true, acceptInsecureCerts: true })
    .setChromeOptions(o)
    .forBrowser("chrome")
    .build();

  this.visit = async function (theUrl) {
    return await this.driver.get(theUrl);
  };

  this.findById = async function (id) {
    await this.driver.wait(
      until.elementLocated(By.id(id)),
      15000,
      "Looking for element"
    );
    return await this.driver.findElement(By.id(id));
  };

  this.findByClassName = async function (name) {
    const els = await this.driver.wait(
      until.elementsLocated(By.className(name)),
      15000,
      "Looking for element"
    );
    return await this.driver.findElement(By.className(name));
  };

  this.signin = async function() {
    // Read the userName and password
    let name = process.env.USERNAME || "test";
    let password = process.env.PASSWORD || "test";

    await this.driver.sleep(2500);
    const initialLoginClickJsCode = "document.querySelector(`*[slot='globalheader']`).getElementsByClassName('mr-0 mt-2 mb-4 mt-lg-0 mb-lg-0').item(0).firstChild.click();";  
    await this.driver.executeScript(initialLoginClickJsCode);
    await this.driver.sleep(2000);
    const inputUserNameJs = "document.querySelector(`*[slot='globalheader']`).getElementsByClassName('sub2').item(0).children[0].value='test'"
    await this.driver.executeScript(inputUserNameJs); 
    const inputPasswordJs = "document.querySelector(`*[slot='globalheader']`).getElementsByClassName('sub2').item(0).children[1].value = 'test'"
    await this.driver.executeScript(inputPasswordJs); 
    const finalLoginJs = "document.querySelector(`*[slot='globalheader']`).getElementsByClassName('sub4').item(0).children[0].click();"
    await this.driver.executeScript(finalLoginJs);

    await this.driver.sleep(8000);
    const manageAccount = "document.querySelector(`*[slot='globalheader']`).getElementsByClassName('dl-global-nav-primary').item(0).children.item(0).childNodes[5].getElementsByTagName('a')[0].click();"
    await this.driver.executeScript(manageAccount);
  }
};

module.exports = BasePage;

