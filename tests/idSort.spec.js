import { Builder, Browser, By } from "selenium-webdriver";
import assert from "assert";

async function idSort() {
  let driver;

  try {
    driver = await new Builder().forBrowser(Browser.CHROME).build();
    await driver.get("http://localhost:5173/");

    let searchBar = await driver.findElement(By.className("search_bar"));
    await searchBar.sendKeys("React");

    let searchButton = await driver.findElement(By.className("search_button"));
    await searchButton.click();

    await driver.manage().setTimeouts({ implicit: 15000 });

    let allIds = await driver.findElements(By.className("td_id"));

    console.log("ids are displayed");

    let idArrowDown = await driver.findElement(By.className("id_arrow_down"));
    idArrowDown.click();

    if (allIds.length > 0) {
      const idTable = [];
      for (let id of allIds) {
        let idText = await id.getText();
        idTable.push(idText);
      }

      console.log(idTable);

      let isSorted = false;
      for (let i = 0; i < idTable.length; i++) {
        if (idTable[i] < idTable[i + 1]) {
          isSorted = true;
        }
      }

      assert(isSorted, true);
    } else {
      console.log(`no id's found`);
    }
  } catch (error) {
    console.log(error);
  } finally {
    await driver.quit();
  }
}

idSort();
