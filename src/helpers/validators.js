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
  length,
  allPass,
  compose,
  curry,
  equals,
  filter,
  keys,
  not,
  prop,
  propEq,
  props,
  reduce,
  tap,
  zip,
  zipWith,
  lt,
  lte,
} from "ramda";
import { COLORS, SHAPES } from "../constants";

function compareFirstAndSecond(x, y) {
  return equals(x, y);
}

// COLORS
const isRed = equals(COLORS.RED);
const isBlue = equals(COLORS.BLUE);
const isOrange = equals(COLORS.ORANGE);
const isGreen = equals(COLORS.GREEN);
const isWhite = equals(COLORS.WHITE);

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
const isGreenSquare = compose(isGreen, getSquare);
const isWhiteTriangle = compose(isWhite, getTriangle);
const isRedStar = compose(isRed, getStar);

const atLeastTwoPiecesGreen = compose(lte(2), length, filter(isGreen));

// 1. Красная звезда, зеленый квадрат, все остальные белые.
export const validateFieldN1 = compose(
  allPass([isWhiteCircle, isGreenSquare, isWhiteTriangle, isRedStar])
);

// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = compose(atLeastTwoPiecesGreen, getShapes);

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = () => false;

// 4. Синий круг, красная звезда, оранжевый квадрат треугольник любого цвета
export const validateFieldN4 = () => false;

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = () => false;

// 6. Ровно две зеленые фигуры (одна из зелёных – это треугольник), плюс одна красная. Четвёртая оставшаяся любого доступного цвета, но не нарушающая первые два условия
export const validateFieldN6 = () => false;

// 7. Все фигуры оранжевые.
export const validateFieldN7 = () => false;

// 8. Не красная и не белая звезда, остальные – любого цвета.
export const validateFieldN8 = () => false;

// 9. Все фигуры зеленые.
export const validateFieldN9 = () => false;

// 10. Треугольник и квадрат одного цвета (не белого), остальные – любого цвета
export const validateFieldN10 = () => false;
