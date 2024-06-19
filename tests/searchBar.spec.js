import { Builder, Browser, By } from "selenium-webdriver";
import assert from "assert";

async function searchBarTest() {
  let driver;

  try {
    driver = await new Builder().forBrowser(Browser.CHROME).build();
    await driver.get("http://localhost:5173/");

    let searchBar = await driver.findElement(By.className("search_bar"));
    await searchBar.sendKeys("React");

    let searchButton = await driver.findElement(By.className("search_button"));
    await searchButton.click();

    await driver.manage().setTimeouts({ implicit: 5000 });

    let allIds = await driver.findElements(By.className("td_id"));

    console.log("ids are displayed");

    if (allIds.length > 0) {
      const firstId = allIds[0];

      let idText = await firstId.getText();
      const isLongerThatTwo = idText.length > 2;

      assert.equal(isLongerThatTwo, true);
    } else {
      console.log(`no id's found`);
    }
  } catch (error) {
    console.log(error);
  } finally {
    await driver.quit();
  }
}

searchBarTest();
