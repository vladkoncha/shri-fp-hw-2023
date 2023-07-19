/**
 * @file Домашка по FP ч. 2
 *
 * Подсказки:
 * Метод get у инстанса Api – каррированый
 * GET / https://animals.tech/{id}
 *
 * GET / https://api.tech/numbers/base
 * params:
 * – number [Int] – число
 * – from [Int] – из какой системы счисления
 * – to [Int] – в какую систему счисления
 *
 * Иногда промисы от API будут приходить в состояние rejected, (прямо как и API в реальной жизни)
 * Ответ будет приходить в поле {result}
 */
import Api from "../tools/api";
import {
  __,
  allPass,
  andThen,
  assoc,
  compose,
  concat,
  gt,
  ifElse,
  length,
  lt,
  otherwise,
  partial,
  prop,
  tap,
  test,
} from "ramda";

const api = new Api();

const numberOfCharsLessThanTen = compose(lt(__, 10), length);
const numberOfCharsMoreThanTwo = compose(gt(__, 2), length);
const numberMustBePositive = compose(gt(__, 0), Number);
const numberRegex = /^[0-9]+(\.[0-9]+)?$/;
const isValueValidNumber = test(numberRegex);

const isValidValue = allPass([
  numberOfCharsMoreThanTwo,
  numberOfCharsLessThanTen,
  numberMustBePositive,
  isValueValidNumber,
]);

const roundNumber = compose(Math.round, Number);
const countNumberDigits = compose(length, String);
const thenCountNumberDigits = andThen(countNumberDigits);

const squareNumber = (number) => number ** 2;
const thenSquareNumber = andThen(compose(squareNumber, Number));

const remainderDividingByThree = (number) => number % 3;
const thenGetRemainderDivByThree = andThen(
  compose(String, remainderDividingByThree)
);

const getResult = prop("result");
const thenGetResult = andThen(getResult);

const assocDecToBinNumberOption = assoc("number", __, { from: 10, to: 2 });
const convertDecToBin = compose(
  api.get("https://api.tech/numbers/base"),
  assocDecToBinNumberOption
);

const thenGetAnimalUrl = andThen(concat("https://animals.tech/"));
const thenGetAnimal = andThen(api.get(__, {}));
const thenGetRandomAnimal = compose(thenGetAnimal, thenGetAnimalUrl);

const processSequence = ({ value, writeLog, handleSuccess, handleError }) => {
  const handleValidationError = partial(handleError, ["ValidationError"]);
  const otherwiseHandleError = otherwise(handleError);

  const thenHandleSuccess = andThen(handleSuccess);

  const writeLogValue = tap(writeLog);
  const thenWriteLogValue = andThen(writeLogValue);

  const roundAndLog = compose(writeLogValue, roundNumber);
  const convertToBinAndLog = compose(
    thenWriteLogValue,
    thenGetResult,
    convertDecToBin
  );
  const countDigitsAndLog = compose(thenWriteLogValue, thenCountNumberDigits);
  const squareNumberAndLog = compose(thenWriteLogValue, thenSquareNumber);
  const getRemainderDivByThreeAndLog = compose(
    thenWriteLogValue,
    thenGetRemainderDivByThree
  );
  const getRandomAnimal = compose(thenGetResult, thenGetRandomAnimal);

  const sequence = compose(
    otherwiseHandleError,
    thenHandleSuccess, // 9
    getRandomAnimal, // 8
    getRemainderDivByThreeAndLog, // 7
    squareNumberAndLog, // 6
    countDigitsAndLog, // 5
    convertToBinAndLog, // 4
    roundAndLog // 3
  );

  const runSequence = ifElse(isValidValue, sequence, handleValidationError); // 2
  const writeLogAndRunSequence = compose(runSequence, writeLogValue); // 1
  writeLogAndRunSequence(value);
};

export default processSequence;
