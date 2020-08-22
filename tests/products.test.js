let { getProducts, generateProductCard } = require('../scripts/products.mjs');
import PAGE_1_MOCK from './mocks/API_RESPONSE_PAGE_1';
import PAGE_2_MOCK from './mocks/API_RESPONSE_PAGE_2';
import PRODUCT_CARD_MOCK from './mocks/FIRST_PRODUCT_CARD';

describe('Get products from API', () => {
  global.fetch = jest.fn();
  global.fetch
    .mockReturnValueOnce(Promise.resolve({ json: () => PAGE_1_MOCK }))
    .mockReturnValue(Promise.resolve({ json: () => PAGE_2_MOCK }));
  test("1 - It should return the API's page 1 when it's called for the first time", async () => {
    const result = await getProducts();
    expect(result).toContain(PAGE_1_MOCK.products[0]);
    expect(result).toEqual(PAGE_1_MOCK.products);
  });
  test("2 - It should return the API's page 2 when it's called for the second time", async () => {
    const result = await getProducts();
    expect(result).toContain(PAGE_2_MOCK.products[0]);
    expect(result).toEqual(PAGE_2_MOCK.products);
  });
});

describe('Generate card for individual product', () => {
  test('1 - It should return the card for the first product', () => {
    const result = generateProductCard(PAGE_1_MOCK.products[0]);
    expect(result).toEqual(PRODUCT_CARD_MOCK);
  });
});
