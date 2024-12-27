const { device, element, by, expect } = require("detox");

describe("First detox test", () => {
  beforeAll(async () => {
    await device.launchApp({
      newInstance: true,
    });
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it("should test Tabs opening correctly", async () => {
    await element(by.text("TABS")).tap();
    await expect(element(by.text("Welcome!"))).toBeVisible();
  });

  it("should test explore tabs opens correctly", async () => {
    await element(by.text("TABS/EXPLORE")).tap();
    await expect(element(by.id("explore"))).toBeVisible();
  });
});
