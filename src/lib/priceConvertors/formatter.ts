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

/**
 * @description: This function is used to format the price value to a currency value with n decimal places and a currency symbol as prefix or suffix
 * the value if has an exponent value in it then it will return the value with 10 decimal places
 * @param {number} value: The value to be rounded off
 * @param {number} decimalPlaces: The number of decimal places to round off the value to
 * @param {string} currencySymbol: The currency symbol to be used as a prefix or suffix
 * @returns {number} The rounded off value
 * @example: currencyRoundOff(0.123456, 2) => 0.12
 * @example: currencyRoundOff(9.240141050604644e-10, ) => 0.0000000023
 */
export const formatCurrency = (
  value: number,
  decimalPlaces: number,
  currencySymbol: string,
): string => {
  if (value.toString().includes('e')) {
    return `${currencySymbol}${value.toFixed(10)}`
  }
  return `${currencySymbol}${value.toFixed(decimalPlaces)}`
}
