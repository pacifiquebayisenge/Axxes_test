export class GildedTros {
  constructor(items) {
    this.items = items;
  }

  // item names with special conditions for the Quality
  #specialTitles = [
    "Good Wine",
    "Backstage passes for Re:Factor",
    "Backstage passes for HAXX",
    "B-DAWG Keychain",
  ];

  #smellyItems = ["Duplicate Code", "Long Methods", "Ugly Variable Names"];

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {

      
      const item = this.items[i];

      //  At the end of each day our system lowers both values for every item
      if (this.#isNormalItem(item) || this.#isSmellyItem(item)) {
        this.#decreaseQuality(item);

        if(this.#isSmellyItem(item)) this.#decreaseQuality(item)

      } else {

        // "Good Wine" actually increases in Quality the older it gets
        this.#increaseQuality(item);

        // for very interesting conferences increases in Quality as its SellIn value approaches
        if (this.#isBackstageItem(item)) {

          // Quality increases by 2 when there are 10 days or less
          if (item.sellIn < 11) this.#increaseQuality(item);

          // Quality increases by 3 when there are 5 days or less
          if (item.sellIn < 6) this.#increaseQuality(item);
          
        }
      }

      this.#decreaseSellIn(item);

      // Once the sell by date has passed
      if (item.sellIn < 0) {

        if(this.#isGoodWineItem(item)) {
          // "Good Wine": increases  Quality the older it gets
          // Quality degrades twice as fast
          this.#increaseQuality(item)
        } else if (this.#isBackstageItem(item)) {
          // "Backstage passes": Quality drops to 0 after the conference
          item.quality= 0
        }
        else {
          // Quality degrades twice as fast
          this.#decreaseQuality(item)

          if(this.#isSmellyItem(item)) this.#decreaseQuality(item)
        }
      }
    }
  }

  #decreaseQuality(item) {
    if (item.quality == 0 || this.#isLegendaryItem(item)) return;
    item.quality -= 1;
  }

  #increaseQuality(item) {
    if (item.quality >= 50 || this.#isLegendaryItem(item)) return;
    item.quality += 1;
  }

  #decreaseSellIn(item) {
    if (this.#isLegendaryItem(item)) return;
    item.sellIn -= 1;
  }

  #isNormalItem(item) {
    return (
      !this.#specialTitles.includes(item.name) &&
      !this.#smellyItems.includes(item.name)
    );
  }

  #isSmellyItem(item) {
    return this.#smellyItems.includes(item.name)
    
  }

  #isBackstageItem(item) {
    return item.name.includes("Backstage passes");
  }

  #isLegendaryItem(item) {
    return item.name.includes("B-DAWG Keychain");
  }

  #isGoodWineItem(item) {
    return item.name.includes("Good Wine");
  }
}
