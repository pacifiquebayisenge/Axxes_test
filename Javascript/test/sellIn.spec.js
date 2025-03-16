import { Item } from "../src/item";
import { GildedTros } from "../src/gilded-tros";

describe("GildedTros: sellIn of item", () => {
  test("At the end of each day our system lowers the sellIn for every item", () => {
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
      // get item sellIn prop
      const appItemProps = app.items[i].toString().split(",");
      const appItemsSellIn = parseInt(appItemProps[appItemProps.length - 2]);

      // expected value: SellIn decreases by 1
      const expectedValue = items[i].sellIn - 1;

      expect(appItemsSellIn).toEqual(expectedValue);
    }
  });
});
