/*
 * @description: This file contains the formatter functions for the price convertor
 */

/**
 * @description: This function is used to format the price percentage value to a percentage value with n decimal places
 * @param {number} value: The value to be rounded off
 * @param {number} decimalPlaces: The number of decimal places to round off the value to
 * @returns {number} The rounded off value
 * @example: percentageRoundOff(0.123456, 2) => 0.12
 * @example: percentageRoundOff(0.123456, 4) => 0.1234
 */
export const percentageRoundOff = (
  value: number,
  decimalPlaces: number,
): number => {
  return (
    Math.round(value * Math.pow(10, decimalPlaces)) /
    Math.pow(10, decimalPlaces)
  )
}
