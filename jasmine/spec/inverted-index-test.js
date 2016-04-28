/*******************************************************
 * Name: Lovelyn Tijesunimi-Israel
 * Title: Inverted Index
 * Description: An Inverted Index object
 *               that takes a JSON array of text objects
 *              and creates an index from the array.
 *******************************************************/

(function() {
  'use strict';

  describe ('Inverted Index test cases', function () {
    var invertedIndex = new InvertedIndex();
    var helper = new HelperMethods();
    var result;


    beforeEach(function(done) {
      result = invertedIndex.createIndex('books.json', done);
    });

    // describe('Check if class exists', function() {
    //   it('checks that class is defined', function () {
    //     expect (InvertedIndex).toBeDefined();
    //   });
    // });

    describe ('Read book data', function() {
      var jsonFile = null;
      var _this = this;

      beforeEach(function(done) {
        this.jsonFile = null;

        helper.readFile('books.json', function (file) {
          _this.jsonFile = file;
          done();
        });
      });

      it('readFile method should not return empty JSON', function () {
        expect (_this.jsonFile.length).toBeGreaterThan(0);
        expect (_this.jsonFile).not.toEqual([]);
      });
    });

    describe ('Populate invertedIndex', function () {
      it ('verifies that invertedIndex is created once jsonFile is read', function () {
        expect (invertedIndex.index).toBeDefined();
        expect (invertedIndex.index).not.toEqual([]);

      });

      it ('verifies that invertedIndex is correct', function () {
        expect (invertedIndex.index.alice).toEqual([0]);
        expect (invertedIndex.index.of).toEqual([0,1]);
        expect (invertedIndex.index.lord).toEqual([1]);
        expect (invertedIndex.index.wonderful).toBeUndefined();
      });
    });

    describe ('Search invertedIndex', function () {
      it ('verifies that search returns correct result', function () {
        expect (invertedIndex.searchIndex('alice wonderland')).toEqual([[0],[0]]);
        expect (invertedIndex.searchIndex('lord ring of'))
          .toEqual([[1],[1],[0,1]]);
        expect (invertedIndex.searchIndex('the')).toEqual([[1]]);
        expect (invertedIndex.searchIndex('they')).toEqual([[]]);
      });

      it('verifies searching an invertedIndex returns array of indices of correct object', function() {
        expect (invertedIndex.searchIndex('into')).toEqual([[0]]);
        expect (invertedIndex.searchIndex('wizard')).toEqual([[1]]);
        expect (invertedIndex.searchIndex('a')).toEqual([[0, 1]]);
        expect (invertedIndex.searchIndex('of')).toEqual([[0, 1]]);
        expect (invertedIndex.searchIndex('lord')).toEqual([[1]]);
        expect (invertedIndex.searchIndex('elf')).toEqual([[1]]);
        expect (invertedIndex.searchIndex('elven')).toEqual([[]]);
      });

      it('can handle varied number of search terms', function() {
        expect(invertedIndex.searchIndex('alice in wonderland'))
          .toEqual([[0],[0],[0]]);
        expect(invertedIndex.searchIndex('lord of the rings'))
          .toEqual([[1],[0, 1],[1],[1]]);
        expect(invertedIndex.searchIndex('an unusual alliance of man'))
          .toEqual([[1],[1],[1],[0, 1],[1]]);
        expect(invertedIndex.searchIndex('me under allow if money'))
          .not.toEqual([[1],[1],[1],[0, 1],[1]]);
      });

      it('ensures search can handle an array of words', function() {
        expect(invertedIndex.searchIndex(['alice', 'wonderland', 'in']))
          .toEqual([[0],[0],[0]]);
        expect(invertedIndex.searchIndex(['lord', 'of', 'the', 'rings']))
          .toEqual([[1],[0, 1],[1],[1]]);
        expect(invertedIndex.searchIndex(['an', 'unusual', 'alliance', 'of', 'man']))
          .toEqual([[1],[1],[1],[0, 1],[1]]);
        expect(invertedIndex.searchIndex(['me', 'under', 'allow', 'if', 'money']))
          .not.toEqual([[1],[1],[1],[0, 1],[1]]);
      });

      it('ensures search can handle edge cases', function() {
        expect(invertedIndex.searchIndex(['alice', 'bicycle', 'in']))
          .toEqual([[0],[],[0]]);
        expect(invertedIndex.searchIndex(['alive', 'bicycle', 'on']))
          .toEqual([[],[],[]]);
        expect(invertedIndex.searchIndex(['alive', 'bicycle', 'on']))
          .not.toEqual([[0],[1],[1]]);
      });
  });

  });
})();
