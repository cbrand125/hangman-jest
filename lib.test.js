const readlineSync = require('readline-sync');
const {
  stringify,
  createBlankWordArray,
  isWordSolved,
  print,
  randomlySelectWord,
  askForALetter,
  validateInput
} = require('./lib');

describe('stringify', () => {
  it('should convert an arbitrary string array to a string', () => {
    const stringArray = ['h', 'e', 'l', 'l', 'o'];
    const result = stringify(stringArray);

    expect(result).toBe('hello');
  });

  it('should maintain case', () => {
    const stringArray = ['H', 'e', 'l', 'l', 'o'];
    const result = stringify(stringArray);

    expect(result).toBe('Hello');
  });

  it('should maintain white-space', () => {
    const stringArray = 'hello world'.split('');
    const result = stringify(stringArray);

    expect(result).toBe('hello world');
  });

  it('should return an empty string when given an empty array', () => {
    const stringArray = [];
    const result = stringify(stringArray);

    expect(result).toBe('');
  });

  it('should properly handle array entries with multiple characters', () => {
    const stringArray = ['h', 'e', 'll', 'o'];
    const result = stringify(stringArray);

    expect(result).toBe('hello');
  });

  it('should handle no input', () => {
    const result = stringify();

    expect(result).toBe('');
  });
});

describe('createBlankWordArray', () => {
  it('should return an array of arbitrary length full of underscores', () => {
    const result = createBlankWordArray(10);

    expect(result.length).toBe(10);
    expect(result).toHaveLength(10);
    expect(result).toEqual('__________'.split(''));
    expect(result.every(letter => letter === '_')).toBeTruthy();
  });

  it('should return an empty array when passed a length of 0', () => {
    expect(createBlankWordArray(0)).toHaveLength(0);
  });

  it('should return an empty array when passed undefined input', () => {
    expect(createBlankWordArray()).toHaveLength(0);
  });

  it('should return an empty array when passed any non-number input', () => {
    expect(createBlankWordArray('hello')).toHaveLength(0);
  });
});

describe('isWordSolved', () => {
  it('should return false if there are any underscores in a given string array', () => {
    const result = isWordSolved('Hel_o'.split(''));
    expect(result).toBeFalsy();
  });

  it('should return true if there are no underscores in a given string array', () => {
    const result = isWordSolved('Hello'.split(''));
    expect(result).toBeTruthy();
  });

  it('should throw a TypeError if passed undefined input', () => {
    /*
    expect.assertions(1);
    try {
      isWordSolved();
    } catch (err) {
      expect(err).toBeInstanceOf(TypeError);
    }
    */

    expect(() => isWordSolved()).toThrow(TypeError);
  });
});

describe('print', () => {
  it('should log input to the console', () => {
    console.log = jest.fn();
    const input = 'some input';
    print(input);
    expect(console.log).toBeCalledTimes(1);
    expect(console.log).toBeCalledWith(input);
  });
});

describe('randomlySelectWord', () => {
  it('should be able to return any word in the array', () => {
    // Math.random = jest.fn(() => 0.5);
    // Math.random = jest.fn().mockReturnValue(0.5);
    Math.random = jest.fn();
    Math.random
      .mockReturnValueOnce(0)
      .mockReturnValueOnce(0.5)
      .mockReturnValueOnce(0.9);

    const wordArray = ['first', 'second', 'third'];

    const firstResult = randomlySelectWord(wordArray);
    const secondResult = randomlySelectWord(wordArray);
    const thirdResult = randomlySelectWord(wordArray);

    expect(firstResult).toBe('first');
    expect(secondResult).toBe('second');
    expect(thirdResult).toBe('third');
  });
});

jest.mock('readline-sync');
describe('askForALetter', () => {
  it('should return the letter that the user input', () => {
    readlineSync.question.mockReturnValueOnce('a');
    const result = askForALetter();
    expect(result).toBe('a');
  });
});

describe('validateInput', () => {
  it('should only return a single letter when a single letter is passed in', () => {
    const result = validateInput('a');
    expect(result).toBe('a');
  });

  it('should return the first character if it recieves a string', () => {
    const result = validateInput('string');
    expect(result).toBe('s');
  });

  it('should throw an error with a message of "Invalid input" if it recieves a number', () => {
    expect.assertions(2);
    try {
      validateInput(1);
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
      expect(err.message).toBe('Invalid input');
    }
  });

  it(`should throw an error with message 'Invalid input' if it recieves an input of undefined`, () => {
    expect(validateInput).toThrow('Invalid input');
  });

  it(`should throw an error with message of 'Invalid input' if it recieves a character that isn't a letter`, () => {
    expect(() => validateInput('2')).toThrow('Invalid input');
    expect(() => validateInput('.')).toThrow('Invalid input');
  });
});
