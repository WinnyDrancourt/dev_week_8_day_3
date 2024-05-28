class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items = []) {
    this.items = items;
  }
  updateQuality() {
    for (var i = 0; i < this.items.length; i++) {
      // si ce n'est pas Aged bries et Backstage
      this.items[i].name != "Aged Brie" &&
      this.items[i].name != "Backstage passes to a TAFKAL80ETC concert"
        ? // diminuer la qualité
          this.qualityDecrease(i)
        : this.qualityIncrease(i);
      // SellIn diminuer sauf Sulfuras
      this.sellInDecrease(i);
      // Si SellIn < 0
      this.items[i].sellIn < 0 ? this.sellInExpiredQualityUpdate(i) : null;
    }
    return this.items;
  }

  sellInDecrease(i) {
    // Si ce n'est pas Sulfuras
    this.items[i].name != "Sulfuras, Hand of Ragnaros"
      ? // Diminuer SellIn
        (this.items[i].sellIn = this.items[i].sellIn - 1)
      : // sinon empty
        null;
  }

  qualityDecrease(i) {
    // Si la qualité > 0 et ce n'est pas Sulfuras
    this.items[i].quality > 0 &&
    this.items[i].name != "Sulfuras, Hand of Ragnaros"
      ? // Diminuer la qualité
        (this.items[i].quality = this.items[i].quality - 1)
      : // sinon empty
        null;
    // Si c'est Conjured et la qualité > 0
    this.items[i].name == "Conjured Mana Cake" && this.items[i].quality > 0
      ? // Diminuer la qualité
        (this.items[i].quality = this.items[i].quality - 1)
      : // sinon empty
        null;
  }

  qualityIncrease(i) {
    // Si la qualité < 50
    if (this.items[i].quality < 50) {
      // Augmenter la qualité
      this.items[i].quality = this.items[i].quality + 1;
      // Si c'est Backstage et la qualité < 50 et SellIn < 11
      if (
        this.items[i].name == "Backstage passes to a TAFKAL80ETC concert" &&
        this.items[i].quality < 50 &&
        this.items[i].sellIn < 11
      ) {
        this.items[i].quality = this.items[i].quality + 1;
      }
      // Si c'est Backstage et la qualité < 50 et SellIn < 6
      if (
        this.items[i].name == "Backstage passes to a TAFKAL80ETC concert" &&
        this.items[i].quality < 50 &&
        this.items[i].sellIn < 6
      ) {
        this.items[i].quality = this.items[i].quality + 1;
      }
    }
  }

  sellInExpiredQualityUpdate(i) {
    // Si ce n'est pas Aged Brie
    if (this.items[i].name != "Aged Brie") {
      if (
        // Si ce n'est pas Backstage et la qualité > 0 et ce n'est pas Sulfuras
        this.items[i].quality > 0 &&
        this.items[i].name != "Sulfuras, Hand of Ragnaros" &&
        this.items[i].name != "Backstage passes to a TAFKAL80ETC concert"
      ) {
        // Diminuer la qualité
        this.items[i].quality = this.items[i].quality - 1;
      } else {
        // Sinon la qualité = 0
        this.items[i].quality = this.items[i].quality - this.items[i].quality;
      }
    } else {
      // Sinon si la qualité < 50
      if (this.items[i].quality < 50) {
        // Augmenter la qualité
        this.itemsp[i].quality = this.items[i].quality + 1;
      }
    }
  }
}

module.exports = {
  Item,
  Shop,
};
