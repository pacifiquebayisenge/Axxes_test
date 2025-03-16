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

      switch (true) {
        case this.#isLegendaryItem(item):
          // Legendary items do not change in quality or sellIn
          break;

        case this.#isGoodWineItem(item):
          // Good Wine: actually increases in Quality the older it gets
          this.#increaseQuality(item);

          if (item.sellIn <= 0) this.#increaseQuality(item);
          break;

        case this.#isBackstageItem(item):
          if (item.sellIn <= 0) {
            // Quality drops to 0 after the conference
            item.quality = 0;
          } else {
            // Quality increases by 2 when there are 10 days or less
            // Quality increases by 3 when there are 5 days or less

            this.#increaseQuality(item);
            if (item.sellIn < 11) this.#increaseQuality(item);
            if (item.sellIn < 6) this.#increaseQuality(item);
          }
          break;

        case this.#isSmellyItem(item):
          // Smelly items degrade in Quality twice as fast as normal items
          this.#decreaseQuality(item);
          this.#decreaseQuality(item);
          if (item.sellIn <= 0) {
            this.#decreaseQuality(item);
            this.#decreaseQuality(item);
          }
          break;

        default: // Normal items
          this.#decreaseQuality(item);
          if (item.sellIn <= 0) this.#decreaseQuality(item);
          break;
      }

      this.#decreaseSellIn(item);
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
    return this.#smellyItems.includes(item.name);
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
