/**
 * @file Домашка по FP ч. 1
 *
 * Основная задача — написать самому, или найти в FP библиотеках функции anyPass/allPass
 * Эти функции/их аналоги есть и в ramda и в lodash
 *
 * allPass — принимает массив функций-предикатов, и возвращает функцию-предикат, которая
 * вернет true для заданного списка аргументов, если каждый из предоставленных предикатов
 * удовлетворяет этим аргументам (возвращает true)
 *
 * anyPass — то же самое, только удовлетворять значению может единственная функция-предикат из массива.
 *
 * Если какие-либо функции написаны руками (без использования библиотек) это не является ошибкой
 */
import {
  __,
  all,
  allPass,
  any,
  complement,
  compose,
  countBy,
  dissoc,
  equals,
  filter,
  gte,
  identity,
  length,
  lte,
  prop,
  propEq,
  props,
  values,
} from "ramda";
import { COLORS, SHAPES } from "../constants";

// LOGIC
const greaterEqualThree = gte(__, 3);
const anyGreaterEqualThree = any(greaterEqualThree);

// COLORS
const isRed = equals(COLORS.RED);
const isBlue = equals(COLORS.BLUE);
const isOrange = equals(COLORS.ORANGE);
const isGreen = equals(COLORS.GREEN);
const isWhite = equals(COLORS.WHITE);

const dissocWhite = dissoc(COLORS.WHITE);
const colorsCounterMap = compose(countBy(identity), values);
const colorsCounterMapWithoutWhite = compose(dissocWhite, colorsCounterMap);

const oneRed = propEq(COLORS.RED, 1);
const twoGreen = propEq(COLORS.GREEN, 2);

const oneRedShape = compose(oneRed, colorsCounterMap);
const twoGreenShapes = compose(twoGreen, colorsCounterMap);

// SHAPES
const getShapes = props([
  SHAPES.CIRCLE,
  SHAPES.SQUARE,
  SHAPES.TRIANGLE,
  SHAPES.STAR,
]);

const getCircle = prop(SHAPES.CIRCLE);
const getSquare = prop(SHAPES.SQUARE);
const getTriangle = prop(SHAPES.TRIANGLE);
const getStar = prop(SHAPES.STAR);

const isWhiteCircle = compose(isWhite, getCircle);
const isBlueCircle = compose(isBlue, getCircle);

const isGreenSquare = compose(isGreen, getSquare);
const isWhiteSquare = compose(isWhite, getSquare);
const isNotWhiteSquare = complement(isWhiteSquare);
const isOrangeSquare = compose(isOrange, getSquare);

const isWhiteTriangle = compose(isWhite, getTriangle);
const isNotWhiteTriangle = complement(isWhiteTriangle);
const isGreenTriangle = compose(isGreen, getTriangle);

const isRedStar = compose(isRed, getStar);
const isWhiteStar = compose(isWhite, getStar);
const isNotRedStar = complement(isRedStar);
const isNotWhiteStar = complement(isWhiteStar);


// SPECIFIC LOGIC
const triangleColorEqualsSquare = ({ square, triangle }) => square === triangle;

const atLeastTwoShapesGreen = compose(lte(2), length, filter(isGreen));
const compareRedsAndBlues = (colorsArray) => {
  const blues = filter(isBlue, colorsArray);
  const reds = filter(isRed, colorsArray);

  return length(blues) === length(reds);
};

// 1. Красная звезда, зеленый квадрат, все остальные белые.
export const validateFieldN1 = allPass([
  isWhiteCircle,
  isGreenSquare,
  isWhiteTriangle,
  isRedStar,
]);

// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = compose(atLeastTwoShapesGreen, getShapes);

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = compose(compareRedsAndBlues, getShapes);

// 4. Синий круг, красная звезда, оранжевый квадрат треугольник любого цвета
export const validateFieldN4 = allPass([
  isBlueCircle,
  isOrangeSquare,
  isRedStar,
]);

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = compose(
  anyGreaterEqualThree,
  values,
  colorsCounterMapWithoutWhite
);

// 6. Ровно две зеленые фигуры (одна из зелёных – это треугольник), плюс одна красная.
// Четвёртая оставшаяся любого доступного цвета, но не нарушающая первые два условия
export const validateFieldN6 = allPass([
  twoGreenShapes,
  isGreenTriangle,
  oneRedShape,
]);

// 7. Все фигуры оранжевые.
export const validateFieldN7 = compose(all(isOrange), getShapes);

// 8. Не красная и не белая звезда, остальные – любого цвета.
export const validateFieldN8 = allPass([isNotRedStar, isNotWhiteStar]);

// 9. Все фигуры зеленые.
export const validateFieldN9 = compose(all(isGreen), getShapes);

// 10. Треугольник и квадрат одного цвета (не белого), остальные – любого цвета
export const validateFieldN10 = allPass([
  isNotWhiteSquare,
  isNotWhiteTriangle,
  triangleColorEqualsSquare,
]);
