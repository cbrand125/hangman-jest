const hangman = require('./hangman');

describe('playHangman', () => {
  console.log = jest.fn();
  const hangmanSpy = jest.spyOn(hangman, 'playHangman');

  // resets our mocks after each test
  afterEach(() => {
    console.log.mockClear();
    hangmanSpy.mockClear();
  });

  it('should print a success message and end when a completed word has been passed', () => {
    const targetWord = 'abc';
    const guessedWord = 'abc'.split('');
    hangman.playHangman(targetWord, guessedWord);

    expect(console.log).toBeCalledTimes(1);
    expect(console.log).toBeCalledWith(`You win! The word was ${targetWord}`);
    expect(hangmanSpy).toBeCalledTimes(1);
  });

  it('should print a failure message and end when you have run out of strikes', () => {
    const targetWord = 'abc';
    const guessedWord = 'a_c'.split('');
    const maxStrikes = 5;
    hangman.playHangman(targetWord, guessedWord, maxStrikes, maxStrikes);

    expect(console.log).toBeCalledTimes(1);
    expect(console.log).toBeCalledWith(`You lose! The word was ${targetWord}`);
    expect(hangmanSpy).toBeCalledTimes(1);
  });

  it('should continue play if there was no win or loss', () => {});
});
