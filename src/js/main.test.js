import { OPTIONS } from './module/options';
import { AVAILABLE_LANGUAGES } from './module/languages';

describe('test params', () => {
  it('should return list of params of options', () => {
    expect(OPTIONS).toBeDefined();
  });

  it('should return list of params of languages', () => {
    expect(AVAILABLE_LANGUAGES).toBeDefined();
  });
});

describe('type languages and options params', () => {
  it('should return of type of options', () => {
    expect(OPTIONS).toBeInstanceOf(Object);
    expect(OPTIONS).toEqual(expect.any(Object));
  });

  it('should return of type of languages', () => {
    expect(AVAILABLE_LANGUAGES).toBeInstanceOf(Object);
    expect(AVAILABLE_LANGUAGES).toEqual(expect.any(Object));
  });
});

describe('count languages', () => {
  it('more then 2 languages', () => {
    expect(Object.values(AVAILABLE_LANGUAGES).length).toBeGreaterThan(2);
  });
});

describe('available language', () => {
  let languageRes;

  beforeEach(() => {
    languageRes = Object.values(AVAILABLE_LANGUAGES);
  });

  it('includes EN', () => {
    expect(languageRes.includes('en')).toBeTruthy();
  });

  it('includes BE', () => {
    expect(languageRes.includes('be')).toBeTruthy();
  });

  it('includes RU', () => {
    expect(languageRes).toContain('ru');
  });

  it('includes DE', () => {
    expect(languageRes[3]).toEqual('de');
  });

  it('includes IT', () => {
    expect(languageRes[4]).toEqual('it');
  });
});
