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
  compose,
  gt,
  ifElse,
  length,
  lt,
  partial,
  tap,
  test,
} from "ramda";

const api = new Api();

/**
 * Я – пример, удали меня
 */
const wait = (time) =>
  new Promise((resolve) => {
    setTimeout(resolve, time);
  });

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

const processSequence = ({ value, writeLog, handleSuccess, handleError }) => {
  const handleValidationError = partial(handleError, ["ValidationError"]);
  const writeLogValue = tap(writeLog);

  const sequence = writeLogValue;

  const runSequence = ifElse(isValidValue, sequence, handleValidationError);
  const writeLogAndRunSequence = compose(runSequence, writeLogValue);
  writeLogAndRunSequence(value);

  api
    .get("https://api.tech/numbers/base", {
      from: 2,
      to: 10,
      number: "01011010101",
    })
    .then(({ result }) => {
      writeLog(result);
    });

  wait(2500)
    .then(() => {
      writeLog("SecondLog");

      return wait(1500);
    })
    .then(() => {
      writeLog("ThirdLog");

      return wait(400);
    })
    .then(() => {
      handleSuccess("Done");
    });
};

export default processSequence;
