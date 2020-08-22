import { checkCPF, checkEmail, checkName } from '../scripts/validation.mjs';

describe('CPF Validation', () => {
  String.prototype.replaceAll = jest.fn();

  test('1 - It should be false when is missing characters ', () => {
    const INPUT = '123.123.123';
    const MOCK_INPUT = '123123123';
    String.prototype.replaceAll.mockReturnValue(MOCK_INPUT);
    expect(checkCPF(INPUT)).toBe(false);
  });

  test('2 - It should be false when CPF has only repeated digits', () => {
    const INPUT = '111.111.111-11';
    const MOCK_INPUT = '11111111111';
    String.prototype.replaceAll.mockReturnValue(MOCK_INPUT);
    expect(checkCPF(INPUT)).toBe(false);
  });

  test('3 - It should be false when CPF is not valid', () => {
    const INPUT = '123.123.123-12';
    const MOCK_INPUT = '12312312312';
    String.prototype.replaceAll.mockReturnValue(MOCK_INPUT);
    expect(checkCPF(INPUT)).toBe(false);
  });

  test('4 - It should be true when CPF is valid', () => {
    const INPUT = '001.256.940-24';
    const MOCK_INPUT = '00125694024';
    String.prototype.replaceAll.mockReturnValue(MOCK_INPUT);
    expect(checkCPF(INPUT)).toBe(true);
  });
});

describe('Email Validation', () => {
  test('1 - It should be false when email is missing @', () => {
    const INPUT = 'lucas-procopiooutlook.com';
    expect(checkEmail(INPUT)).toBe(false);
  });

  test('2 - It should be false when email is missing .{domain}', () => {
    const INPUT = 'lucas-procopio@outlook';
    expect(checkEmail(INPUT)).toBe(false);
  });

  test("3 - It should be false when there's nothing after @", () => {
    const INPUT = 'lucas-procopio@';
    expect(checkEmail(INPUT)).toBe(false);
  });

  test("4 - It should be false when there's nothing before @", () => {
    const INPUT = '@outlook.com';
    expect(checkEmail(INPUT)).toBe(false);
  });

  test('5 - It should pass when email is valid', () => {
    const INPUT = 'lucas-procopio@outlook.com';
    expect(checkEmail(INPUT)).toBe(true);
  });
});

describe('Name Validation', () => {
  test("1 - It should be false name isn't filled", () => {
    const INPUT = '';
    expect(checkName(INPUT)).toBe(false);
  });

  test('2 - It should be true when any name is provided', () => {
    const INPUT = 'lucas procopio';
    expect(checkName(INPUT)).toBe(true);
  });
});
