import { Item } from "../src/item";
import { GildedTros } from "../src/gilded-tros";

describe('GildedTros: output match', () => {
  test('the output matches the expected output for 4 days', () => {
    // Initial items (day 0)
    const items = [
      new Item('Ring of Cleansening Code', 10, 20),
      new Item('Good Wine', 2, 0),
      new Item('Elixir of the SOLID', 5, 7),
      new Item('B-DAWG Keychain', 0, 80),
      new Item('B-DAWG Keychain', -1, 80),
      new Item('Backstage passes for Re:Factor', 15, 20),
      new Item('Backstage passes for Re:Factor', 10, 49),
      new Item('Backstage passes for HAXX', 5, 49),
      new Item('Duplicate Code', 3, 6),
      new Item('Long Methods', 3, 6),
      new Item('Ugly Variable Names', 3, 6),
    ];
    
    const app = new GildedTros(items);
    
    // Expected state after day 1
    const expectedDay1 = [
      { name: 'Ring of Cleansening Code', sellIn: 9, quality: 19 },
      { name: 'Good Wine', sellIn: 1, quality: 1 },
      { name: 'Elixir of the SOLID', sellIn: 4, quality: 6 },
      { name: 'B-DAWG Keychain', sellIn: 0, quality: 80 },
      { name: 'B-DAWG Keychain', sellIn: -1, quality: 80 },
      { name: 'Backstage passes for Re:Factor', sellIn: 14, quality: 21 },
      { name: 'Backstage passes for Re:Factor', sellIn: 9, quality: 50 },
      { name: 'Backstage passes for HAXX', sellIn: 4, quality: 50 },
      { name: 'Duplicate Code', sellIn: 2, quality: 5 },
      { name: 'Long Methods', sellIn: 2, quality: 5 },
      { name: 'Ugly Variable Names', sellIn: 2, quality: 5 },
    ];
    
    // Expected state after day 2
    const expectedDay2 = [
      { name: 'Ring of Cleansening Code', sellIn: 8, quality: 18 },
      { name: 'Good Wine', sellIn: 0, quality: 2 },
      { name: 'Elixir of the SOLID', sellIn: 3, quality: 5 },
      { name: 'B-DAWG Keychain', sellIn: 0, quality: 80 },
      { name: 'B-DAWG Keychain', sellIn: -1, quality: 80 },
      { name: 'Backstage passes for Re:Factor', sellIn: 13, quality: 22 },
      { name: 'Backstage passes for Re:Factor', sellIn: 8, quality: 50 },
      { name: 'Backstage passes for HAXX', sellIn: 3, quality: 50 },
      { name: 'Duplicate Code', sellIn: 1, quality: 4 },
      { name: 'Long Methods', sellIn: 1, quality: 4 },
      { name: 'Ugly Variable Names', sellIn: 1, quality: 4 },
    ];
    
    // Expected state after day 3
    const expectedDay3 = [
      { name: 'Ring of Cleansening Code', sellIn: 7, quality: 17 },
      { name: 'Good Wine', sellIn: -1, quality: 4 },
      { name: 'Elixir of the SOLID', sellIn: 2, quality: 4 },
      { name: 'B-DAWG Keychain', sellIn: 0, quality: 80 },
      { name: 'B-DAWG Keychain', sellIn: -1, quality: 80 },
      { name: 'Backstage passes for Re:Factor', sellIn: 12, quality: 23 },
      { name: 'Backstage passes for Re:Factor', sellIn: 7, quality: 50 },
      { name: 'Backstage passes for HAXX', sellIn: 2, quality: 50 },
      { name: 'Duplicate Code', sellIn: 0, quality: 3 },
      { name: 'Long Methods', sellIn: 0, quality: 3 },
      { name: 'Ugly Variable Names', sellIn: 0, quality: 3 },
    ];

    // Update quality for day 1 and test
    app.updateQuality();
    app.items.forEach((item, index) => {
      expect(item.name).toEqual(expectedDay1[index].name);
      expect(item.sellIn).toEqual(expectedDay1[index].sellIn);
      expect(item.quality).toEqual(expectedDay1[index].quality);
    });

    // Update quality for day 2 and test
    app.updateQuality();
    app.items.forEach((item, index) => {
      expect(item.name).toEqual(expectedDay2[index].name);
      expect(item.sellIn).toEqual(expectedDay2[index].sellIn);
      expect(item.quality).toEqual(expectedDay2[index].quality);
    });

    // Update quality for day 3 and test
    app.updateQuality();
    app.items.forEach((item, index) => {
      expect(item.name).toEqual(expectedDay3[index].name);
      expect(item.sellIn).toEqual(expectedDay3[index].sellIn);
      expect(item.quality).toEqual(expectedDay3[index].quality);
    });
  });

  // Additional test that validates the Item toString method
  test('Item toString method formats correctly', () => {
    const item = new Item('Test Item', 10, 20);
    expect(item.toString()).toEqual('Test Item, 10, 20');
  });
});