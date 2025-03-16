import { Item } from "../src/item";
import { GildedTros } from "../src/gilded-tros";

describe('GildedTros: output match', () => {

  // Additional test that validates the Item toString method
  test('Item toString method formats correctly', () => {
    const item = new Item('Test Item', 10, 20);
    expect(item.toString()).toEqual('Test Item, 10, 20');
  });
});