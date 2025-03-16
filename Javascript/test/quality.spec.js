import { Item } from "../src/item";
import { GildedTros } from "../src/gilded-tros";

describe("GildedTros: quality of item", () => {

   test("At the end of each day our system lowers the quality for every item", () => {
    const items = [
      new Item("test-item-1", 10, 44),
      new Item("test-item-2", 5, 38),
      new Item("test-item-3", 4, 20),
      new Item("test-item-4", 8, 2),
      new Item("test-item-5", 2, 17),
    ];

    // copy of items array
    const appItems = items.map(
      (item) => new Item(item.name, item.sellIn, item.quality)
    );

    const app = new GildedTros(appItems);
    app.updateQuality();

    for (let i = 0; i < items.length; i++) {
      // get item quality prop
      const appItemProps = app.items[i].toString().split(",");
      const appItemsQuality = parseInt(appItemProps[appItemProps.length - 1]);

      // expected value: Quality decreases by 1
      const expectedValue = items[i].quality - 1;

      expect(appItemsQuality).toEqual(expectedValue);
    }
  });


  test("Once the sell by date has passed, Quality degrades twice as fast", () => {
    const items = [
      new Item("test-item-1", -1, 4),
      new Item("test-item-2", -1, 8),
      new Item("test-item-3", -1, 2),
      new Item("test-item-4", -1, 10),
      new Item("test-item-5", -1, 7),
    ];

    // copy of items array
    const appItems = items.map(
      (item) => new Item(item.name, item.sellIn, item.quality)
    );

    const app = new GildedTros(appItems);
    app.updateQuality();

    for (let i = 0; i < items.length; i++) {
      // get item quality prop
      const appItemProps = app.items[i].toString().split(",");
      const appItemsQuality = parseInt(appItemProps[appItemProps.length - 1]);

      // expected value: Quality decreases by 2
      const expectedValue = items[i].quality - 2;

      expect(appItemsQuality).toEqual(expectedValue);
    }
  });

  test("Quality never negative", () => {
    const items = [
      new Item("Elixir of the SOLID", 0, 1),
      new Item("Good Wine", -5, 0),
      new Item("B-DAWG Keychain", -10, 2),
      new Item("Backstage passes for Re:Facto", -20, 1),
      new Item("Ugly Variable Names", -20, 0),
    ];
    // copy of items array
    const appItems = items.map(
      (item) => new Item(item.name, item.sellIn, item.quality)
    );

    const app = new GildedTros(appItems);
    app.updateQuality();

    for (let i = 0; i < items.length; i++) {
      // get item quality prop
      const appItemProps = app.items[i].toString().split(",");
      const appItemsQuality = parseInt(appItemProps[appItemProps.length - 1]);

      // expected value: Minimum possible value
      const expectedValue = 0;

      expect(appItemsQuality).toBeGreaterThanOrEqual(expectedValue);
    }
  });

  test("'Good Wine' actually increases in Quality the older it gets", () => {
    const items = [
      new Item("Good Wine", 2, 4),
      new Item("Good Wine", 10, 0),
      new Item("Good Wine", 4, 15),
      new Item("Good Wine", 6, 6),
      new Item("Good Wine", 4, 10),
    ];

    // copy of items array
    const appItems = items.map(
      (item) => new Item(item.name, item.sellIn, item.quality)
    );

    const app = new GildedTros(appItems);
    app.updateQuality();

    for (let i = 0; i < items.length; i++) {
      // get item quality prop
      const appItemProps = app.items[i].toString().split(",");
      const appItemsQuality = parseInt(appItemProps[appItemProps.length - 1]);

      // expected value: Quality increases by one
      const expectedValue = items[i].quality + 1;

      expect(appItemsQuality).toEqual(expectedValue);
    }
  });

  test("The Quality of an item is never more than 50", () => {
    const items = [
      new Item("Good Wine", 0, 50),
      new Item("test-item", -1, 47),
      new Item("Good Wine", 6, 20),
      new Item("Good Wine", -8, 8),
      new Item("test-item", 4, 9),
    ];

    // copy of items array
    const appItems = items.map(
      (item) => new Item(item.name, item.sellIn, item.quality)
    );

    const app = new GildedTros(appItems);
    app.updateQuality();

    for (let i = 0; i < items.length; i++) {
      // get item quality prop
      const appItemProps = app.items[i].toString().split(",");
      const appItemsQuality = parseInt(appItemProps[appItemProps.length - 1]);

      // expected value: Maximun possible value
      const expectedValue = 50;

      expect(appItemsQuality).toBeLessThanOrEqual(expectedValue);
    }
  });

  test("'B-DAWG Keychain', being a legendary item, never decreases in Quality", () => {
    const items = [
      new Item("B-DAWG Keychain", 0, 50),
      new Item("B-DAWG Keychain", 20, 20),
      new Item("B-DAWG Keychain", 16, 4),
      new Item("B-DAWG Keychain", 3, 30),
      new Item("B-DAWG Keychain", -3, 17),
    ];

    // copy of items array
    const appItems = items.map(
      (item) => new Item(item.name, item.sellIn, item.quality)
    );

    const app = new GildedTros(appItems);
    app.updateQuality();

    for (let i = 0; i < items.length; i++) {
      // get item quality prop
      const appItemProps = app.items[i].toString().split(",");
      const appItemsQuality = parseInt(appItemProps[appItemProps.length - 1]);

      // expected value: Same quality value as original prop
      const expectedValue = items[i].quality;

      expect(appItemsQuality).toBeLessThanOrEqual(expectedValue);
    }
  });

  test("'Backstage passes', Quality increases by 2 when there are 10 days or less", () => {
    const items = [
      new Item("Backstage passes for Re:Factor", 10, 0),
      new Item("Backstage passes for HAXX", 9, 20),
      new Item("Backstage passes for HAXX", 8, 23),
      new Item("Backstage passes for Re:Factor", 7, 4),
      new Item("Backstage passes for HAXX", 6, 32),
    ];

    // copy of items array
    const appItems = items.map(
      (item) => new Item(item.name, item.sellIn, item.quality)
    );

    const app = new GildedTros(appItems);
    app.updateQuality();

    for (let i = 0; i < items.length; i++) {
      // get item quality prop
      const appItemProps = app.items[i].toString().split(",");
      const appItemsQuality = parseInt(appItemProps[appItemProps.length - 1]);

      // expected value: Quality increases by 2
      const expectedValue = items[i].quality + 2;

      expect(appItemsQuality).toBeLessThanOrEqual(expectedValue);
    }
  });

  test("'Backstage passes', Quality increases by 3 when there are 5 days or less", () => {
    const items = [
      new Item("Backstage passes for Re:Factor", 5, 20),
      new Item("Backstage passes for HAXX", 4, 6),
      new Item("Backstage passes for HAXX", 3, 0),
      new Item("Backstage passes for Re:Factor", 2, 17),
      new Item("Backstage passes for HAXX", 1, 32),
    ];

    // copy of items array
    const appItems = items.map(
      (item) => new Item(item.name, item.sellIn, item.quality)
    );

    const app = new GildedTros(appItems);
    app.updateQuality();

    for (let i = 0; i < items.length; i++) {
      // get item quality prop
      const appItemProps = app.items[i].toString().split(",");
      const appItemsQuality = parseInt(appItemProps[appItemProps.length - 1]);

      // expected value: Quality increases by 3
      const expectedValue = items[i].quality + 3;

      expect(appItemsQuality).toBeLessThanOrEqual(expectedValue);
    }
  });

  test("'Backstage passes', Quality drops to 0 after the conference", () => {
    const items = [
      new Item("Backstage passes for Re:Factor", 0, 20),
      new Item("Backstage passes for HAXX", -4, 6),
      new Item("Backstage passes for HAXX", -3, 0),
      new Item("Backstage passes for Re:Factor", 0, 17),
      new Item("Backstage passes for HAXX", 0, 32),
    ];

    // copy of items array
    const appItems = items.map(
      (item) => new Item(item.name, item.sellIn, item.quality)
    );

    const app = new GildedTros(appItems);
    app.updateQuality();

    for (let i = 0; i < items.length; i++) {
      
      // get item quality prop
      const appItemProps = app.items[i].toString().split(",");

      const appItemsQuality = parseInt(appItemProps[appItemProps.length - 1])

      // expected value: Quality drops to 0
      const expectedValue = 0;

      expect(appItemsQuality).toEqual(expectedValue);
    }
  });

  test("Smelly items degrade in Quality twice as fast as normal items", () => {
    const items = [
      new Item("Duplicate Code", 1, 0),
      new Item("Long Methods", 4, 6),
      new Item("Ugly Variable Names", 3, 0),
      new Item("Long Methods", 10, 17),
      new Item("Ugly Variable Names", 20, 32),
    ];

    // copy of items array
    const appItems = items.map(
      (item) => new Item(item.name, item.sellIn, item.quality)
    );

    const app = new GildedTros(appItems);
    app.updateQuality();

    for (let i = 0; i < items.length; i++) {
      // get item quality prop
      const appItemProps = app.items[i].toString().split(",");
      const appItemsQuality = parseInt(appItemProps[appItemProps.length - 1]);
 
      // Quality decreases twice a normal items but never below zero
      const expectedValue = appItems[i].sellIn < 0 ? Math.max(0, items[i].quality - 4) : Math.max(0, items[i].quality - 2);

      expect(appItemsQuality).toEqual(expectedValue);
    }
  });

  test("legendary items always have Quality 80", () => {
    const items = [
      new Item("B-DAWG Keychain", 0, 80),
      new Item("B-DAWG Keychain", 20, 80),
      new Item("B-DAWG Keychain", 16, 80),
      new Item("B-DAWG Keychain", 3, 80),
      new Item("B-DAWG Keychain", -3, 80),
    ];

    // copy of items array
    const appItems = items.map(
      (item) => new Item(item.name, item.sellIn, item.quality)
    );

    const app = new GildedTros(appItems);
    app.updateQuality();

    for (let i = 0; i < items.length; i++) {
      // get item quality prop
      const appItemProps = app.items[i].toString().split(",");
      const appItemsQuality = parseInt(appItemProps[appItemProps.length - 1]);

      // expected value: Quality is always 80
      const expectedValue = 80;

      expect(appItemsQuality).toEqual(expectedValue);
    }
  });


});
