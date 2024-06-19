import { Builder, Browser } from "selenium-webdriver";
import assert from 'assert';

async function homeTitleTest() {
  let driver;

  try {
    driver = await new Builder().forBrowser(Browser.CHROME).build();
    await driver.get("http://localhost:5173/");

    let title = await driver.getTitle();
    assert.equal("Reposzukiwacz", title);

    console.log('test running correctly');
  } catch (error) {
    console.log(error);
  } finally {
    await driver.quit();
  }
}

homeTitleTest();
