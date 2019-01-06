import { generateNumbers, paginate } from '../../src/utils';

const QUANTITY = 10;
const numbers = generateNumbers(10);

const dataArray = [12, 23, 4, 5, 7];
const paginateData = paginate(2, 2, dataArray);
const paginateDataWithEmptyArray = paginate(2, 2, '');
const paginateFunctionOutput = {
  data: [4, 5],
  totalCount: 5,
  pageCount: 3,
};


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

  describe('paginate function', () => {
    it('should return an object containing data, totalCount, pageCount,', () => {
      expect(paginateData).toHaveProperty('data');
      expect(paginateData).toHaveProperty('totalCount');
      expect(paginateData).toHaveProperty('pageCount');
    });
    it('should paginate the data based on page and limit', () => {
      expect(paginateData).toMatchObject(paginateFunctionOutput);
    });
    it('should return false when no data array is passed', () => {
      expect(paginateDataWithEmptyArray).toBe(false);
    });
  });
});
