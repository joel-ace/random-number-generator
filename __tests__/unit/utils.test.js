import { generateNumbers } from '../../src/utils';

const QUANTITY = 10;
const numbers = generateNumbers(10);


describe('Utils', () => {
  describe('generateNumbers function', () => {
    it('should return an array of numbers when the quantity is more than 0', () => {
      expect(typeof numbers).toBe('object');
    });
    it('should generate the correct quantity of numbers', () => {
      expect(numbers.length).toBe(QUANTITY);
    });
    it('should generate phone numbers that are 10 digits', () => {
      expect(numbers[0].length).toBe(QUANTITY);
      expect(numbers[1].length).toBe(QUANTITY);
      expect(numbers[7].length).toBe(QUANTITY);
      expect(numbers[4].length).toBe(QUANTITY);
      expect(numbers[9].length).toBe(QUANTITY);
    });
    it('should generate numbers that have zero as its first digits', () => {
      expect(numbers[0].charAt(0)).toBe('0');
      expect(numbers[1].charAt(0)).toBe('0');
      expect(numbers[7].charAt(0)).toBe('0');
      expect(numbers[4].charAt(0)).toBe('0');
      expect(numbers[9].charAt(0)).toBe('0');
    });
  });
});
