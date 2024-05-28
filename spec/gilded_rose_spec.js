var { Shop, Item } = require("../src/gilded_rose.js");

const items = [
  new Item("+5 Dexterity Vest", 10, 20),
  new Item("Aged Brie", 2, 0),
  new Item("Elixir of the Mongoose", 5, 7),
  new Item("Sulfuras, Hand of Ragnaros", 0, 80),
  new Item("Sulfuras, Hand of Ragnaros", -1, 80),
  new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
  new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
  new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49),
  // This Conjured item does not work properly yet
  new Item("Conjured Mana Cake", 3, 6),
];

describe("Gilded Rose", function () {
  describe("Majeur partie des items", function () {
    it("doivent avoir la qualité qui se degrade deux fois plus vite apres le SellIn date", function () {
      const gildedRose = new Shop([new Item("+5 Dexterity Vest", 0, 4)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toEqual(-1);
      expect(items[0].quality).toEqual(2);
    });

    it("ne peuvent pas avoir une qualité negative", function () {
      const gildedRose = new Shop([new Item("+5 Dexterity Vest", 10, 0)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toEqual(9);
      expect(items[0].quality).toEqual(0);
    });

    it("doivent avoir une qualité qui ne depasse pas 50", function () {
      const gildedRose = new Shop([new Item("Aged Brie", 2, 50)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toEqual(1);
      expect(items[0].quality).toEqual(50);
    });
  });

  describe("Aged Brie", function () {
    it("doit augmenter sa qualité avec le temps", function () {
      const gildedRose = new Shop([new Item("Aged Brie", 2, 0)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toEqual(1);
      expect(items[0].quality).toEqual(1);
    });
  });

  describe("Sulfuras", function () {
    it("ne doit jamais etre vendu ou diminuer en qualité", function () {
      const gildedRose = new Shop([
        new Item("Sulfuras, Hand of Ragnaros", 0, 80),
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(0);
      expect(items[0].quality).toBe(80);
    });
  });

  describe("Backstage passes", function () {
    it("Augmenté en qualité, plus le SellIn diminue", function () {
      const gildedRose = new Shop([
        new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toEqual(14);
      expect(items[0].quality).toEqual(21);
    });

    it("Augmenté en qualité de 2, 10 jours ou moins", function () {
      const gildedRose = new Shop([
        new Item("Backstage passes to a TAFKAL80ETC concert", 10, 20),
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toEqual(9);
      expect(items[0].quality).toEqual(22);
    });

    it("Augmenté en qualité de 3, 5 jours ou moins", function () {
      const gildedRose = new Shop([
        new Item("Backstage passes to a TAFKAL80ETC concert", 5, 20),
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toEqual(4);
      expect(items[0].quality).toEqual(23);
    });

    it("La qualité tombe à 0 après le concert", function () {
      const gildedRose = new Shop([
        new Item("Backstage passes to a TAFKAL80ETC concert", 0, 20),
      ]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toEqual(-1);
      expect(items[0].quality).toEqual(0);
    });
  });

  describe("Conjured", function () {
    it("doit avoir une qualité qui se degrade deux fois plus vite", function () {
      const gildedRose = new Shop([new Item("Conjured Mana Cake", 3, 6)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toEqual(2);
      expect(items[0].quality).toEqual(4);
    });

    it("doit avoir une qualité qui se degrade deux fois plus vite apres le SellIn date", function () {
      const gildedRose = new Shop([new Item("Conjured Mana Cake", 0, 6)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toEqual(-1);
      expect(items[0].quality).toEqual(3);
    });

    it("ne peuvent pas avoir une qualité negative", function () {
      const gildedRose = new Shop([new Item("Conjured Mana Cake", 10, 0)]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toEqual(9);
      expect(items[0].quality).toEqual(0);
    });
  });
});
