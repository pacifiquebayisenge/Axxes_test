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

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];

      if (this.#isNormalItem(item)) {
        this.#decreaseQuality(item);
      } else {
        this.#increaseQuality(item);

        if (item.name == "Backstage passes for Re:Factor") {
          if (item.sellIn < 11) {
            this.#increaseQuality(item);
          }

          if (item.sellIn < 6) {
            this.#increaseQuality(item);
          }
        }
      }

      this.#decreaseSellIn(item);

      if (item.sellIn < 0) {
        
        if (item.name != "Good Wine") {

          if (
            item.name != "Backstage passes for Re:Factor" ||
            item.name != "Backstage passes for HAXX"
          ) {
            this.#decreaseQuality(item);
          } else {
            item.quality = item.quality - item.quality;
          }





        } else {
          this.#increaseQuality(item);
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
    return !this.#specialTitles.includes(item.name);
  }

  #isBackstageItem(item){
    retrun ['Backstage passes'].includes(item.name)
  }

  #isLegendaryItem(item) {
    return ["B-DAWG Keychain"].includes(item.name);
  }

  
}
