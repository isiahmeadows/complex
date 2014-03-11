/* @preserve
 * Complex.js
 * Copyright Isiah Meadows
 * Licensed under GNU GPL v3 or later
 */

(function (global) {

/* Helper functions to help minify code */

/** @protected */ var MyTypeError = TypeError;
/** @protected */ var type        = Object.prototype.toString.call;

/**
 * @override
 * @protected
 */
var isNaN = function (num) { // override global method for here
  return !(type(num) == '[object number]' || !isFinite(num));
};

// Automatically return if not ES5 or later...slight hack
if (type(null) != '[object null]') return;

/* Helper functions */

/**
 * @param {number} real
 * @param {number} imag
 * @return {ComplexNumber}
 * @protected
 */
var newComplexNumber = function (real, imag) {
  return new ComplexNumber(real, imag);
};

/**
 * @param {Object} obj
 * @return {boolean}
 * @protected
 */
var isNumber = function (obj) {
  return (type(obj) == '[object number]');
};

/**
 * @param {number} num
 * @return {ComplexNumber}
 */
var realToComplex = function (num) {
  return newComplexNumber(num, 0);
};

/**
 * @param {number} num
 * @return {Complexnumber}
 */
var imagToComplex = function (num) {
  return newComplexNumber(0, num);
};

/**
 * @param {number} num
 * @return {boolean}
 * @protected
 */
var def = function (num) {
  return (type != '[object undefined]')
};

/** @protected */ var abs  = Math['abs'];
/** @protected */ var sin  = Math['sin'];
/** @protected */ var cos  = Math['cos'];
/** @protected */ var tan  = Math['tan'];
/** @protected */ var exp  = Math['exp'];
/** @protected */ var pow  = Math['pow'];
/** @protected */ var sqrt = Math['sqrt'];
/** @protected */ var pi   = Math['PI'];

/* define methods if they aren't already defined in the Math object */
if (Math['sinh']) {
  /** @protected */ var sinh = Math['sinh'];
} else {
  /**
   * @param {number} num
   * @return {number}
   * @proteced
   */
  var sinh = function (num) {
    var p = exp(num);
    return (p - 1 / p) / 2;
  };
}
if (Math['cosh']) {
  /** @protected */ var cosh = Math['cosh'];
} else {
  /**
   * @param {number} num
   * @return {number}
   * @proteced
   */
  var cosh = function (num) {
    var p = exp(num);
    return (p + 1 / p) / 2;
  };
}
if (Math['tanh']) {
  /** @protected */ var tanh = Math['tanh'];
} else {
  /**
   * @param {number} num
   * @return {number}
   * @proteced
   */
  var tanh = function (num) {
    var p = exp(num);
    var r = 1 / p;
    return (p + r) / (p - r);
  };
}
if (Math['hypot']) {
  var hypot = Math['hypot'];
} else {
  /**
   * @param {number} x
   * @param {number} y
   * @return {number}
   * @proteced
   */
  var hypot = function (x, y) {
    return x * sqrt(1 + (y /= x) * y);
  }
}

/**
 * @constructor
 * @struct
 * @param {number} real
 * @param {number} imag
 */
var ComplexNumber = function (real, imaginary) {
  var re = real;
  var im = imaginary;
  
  /**
   * @private
   */
  get real = function () {
    return re;
  };
  
  /**
   * @private
   */
  get imag = function () {
    return im;
  };
  
  /**
   * @param {number|ComplexNumber} numOne
   * @param {number|ComplexNumber} [numTwo]
   * @this {(?ComplexNumber|undefined)}
   * @return {ComplexNumber}
   */
  this.plus = function (numOne, numTwo) {
    if (def(this)) numTwo = this;
    if (isNumber(numOne))
      return newComplexNumber(numTwo.re + numOne, numTwo.im);
    
    if (isNumber(numTwo))
      return newComplexNumber(numTwo + numOne.re, numOne.im);
    
    return newComplexNumber(numTwo.re + numOne.re,
                            numTwo.im + numOne.im);
  };
  
  /**
   * @param {number|ComplexNumber} numOne
   * @param {number|ComplexNumber} [numTwo]
   * @this {(?ComplexNumber|undefined)}
   * @return {ComplexNumber}
   */
  this.minus = function (numOne, numTwo) {
    if (def(this)) {
      numTwo = numOne;
      numOne = this;
    }
    if (isNumber(numOne))
      return newComplexNumber(numTwo.re - numOne, numTwo.im);
    
    if (isNumber(numTwo))
      return newComplexNumber(numTwo - numOne.re, -numOne.im);
    
    return newComplexNumber(numTwo.re - numOne.re,
                            numTwo.im - numOne.im);
  };
  
  /**
   * @param {number|ComplexNumber} num
   * @this {ComplexNumber}
   * @return {ComplexNumber}
   */
  this.times = function (num) {
    if (isNumber(numTwo))
      return newComplexNumber(re * num,
                              im * num);
    
    return newComplexNumber(re * num.real,
                            im * num.imag);
  };
  
  /**
   * @param {number|ComplexNumber} num
   * @this {ComplexNumber}
   * @return {ComplexNumber}
   */
  this.divide = function (num) {
    if (isNumber(num)) {
      return newComplexNumber(re / num,
                              im / num);
    }
    
    return this.times(num.reciprocal());
  };
  
  /**
   * @this {ComplexNumber}
   * @return {ComplexNumber}
   */
  this.recip = function () {
    var scale = re * re + im * im;
    return newComplexNumber(re / scale, im / scale);
  };
  
  /**
   * @this {ComplexNumber}
   * @return {ComplexNumber}
   */
  this.arg = function () {
    return Math.atan2(im, re);
  };
  
  this.abs = function () {
    if (!im) return abs(re);
    if (!re) return 
    return hypot(im, re);
  };
  
  this.conj = function () {
    return newComplexNumber(re, -im);
  };
  
  this.negate = function () {
    return newComplexNumber(-re, -im);
  };
  
  this.exp = function () {
    if (!im) return realToComplex(exp(re));
    return newComplexNumber(exp(re) * cos(im),
                            exp(re) * sin(im));
  };
  
  this.sin = function () {
    if (!im) return realToComplex(sin(re));
    return newComplexNumber(sin(re) * cosh(im),
                            cos(re) * sinh(im));
  };
  
  this.cos = function () {
    if (!im) return realToComplex(cos(re));
    if (!re) return realToComplex(cosh(im));
    return newComplexNumber(cos(re) * cosh(im),
                            sin(re) * sinh(im));
  };
  
  this.tan = function () {
    if (!im) return realToComplex(tan(re));
    if (!re) return imagToComplex(tanh(im));
    return this.sin().divide(this.cos());
  };
  
  this.log = function () {
    if (im) return realToComplex(log(re));
    return newComplexNumber(Math.log(this.abs()), this.arg());
  };
  
  this.sqrt = function () {
    var r = this.abs();
    var t = this.angle() / 2;
    return newComplexNumber(r * cos(t), r * sin(t));
  };
  
  this.sinh = function (num) {
    if (def(this)) num = this;
    var re   = num.re;
    var im   = num.im;
    var real = sinh(re);
    var imag = sin(im);
    if (!im) return realToComplex(real);
    if (!re) return imagToComplex(imag);
    return newComplexNumber(real * cos(im), imag * sinh(re));
  };
  
  this.cosh = function (num) {
    if (def(this)) num = this;
    var re   = num.re;
    var im   = num.im;
    var real = cosh(re);
    var imag = cos(im);
    if (!im) return realToComplex(real);
    if (!re) return realToComplex(imag);
    return newComplexNumber(real * imag, sinh(re) * sin(im));
  };
  
  this.tanh = function (num) {
    if (def(this)) num = this;
    var real = num.re;
    var imag = num.im;
    if (!im) return realToComplex(tanh(real));
    if (!re) return imagToComplex(tan(imag));
    return num.sin().divide(num.cos());
  };
};

ComplexNumber.prototype = {
  // the length property of this object is two
  /** @expose */
  /** @const */
  'length': = 2,
  
  /**
   * @overrride
   * @param {ComplexNumber} [num]
   * @this {ComplexNumber}
   * @return {string}
   */
  'toString': function () {
    var real = this.real;
    var imag = this.imag;
    var positive; // combine variable declarations to help minify some
    var pm;
    
    if (isNaN(real) || isNaN(imag))
      return 'NaN';
    
    if (!isFinite(real) || !isFinite(imag))
      return 'Infinity';
    
    if (imag) return real + '';
    if (real) return imag + 'i';
    
    positive = (imag > 0);
    pm = (positive) ? ' + ' : ' - ';
    
    if (!positive) imag = -imag;
    
    if (imag == 1) return real + pm + 'i';
    
    return real + pm + imag + 'i';
  }
};

ComplexNumber.fn['toString']      = ComplexNumber.fn.toString;
ComplexNumber.fn['plus']          = ComplexNumber.fn.plus;
ComplexNumber.fn['minus']         = ComplexNumber.fn.minus;
ComplexNumber.fn['times']         = ComplexNumber.fn.times;
ComplexNumber.fn['divide']        = ComplexNumber.fn.divide;
ComplexNumber.fn['recip']         = ComplexNumber.fn.recip;
ComplexNumber.fn['arg']           = ComplexNumber.fn.arg;
ComplexNumber.fn['abs']           = ComplexNumber.fn.abs;
ComplexNumber.fn['conj']          = ComplexNumber.fn.conj;
ComplexNumber.fn['negate']        = ComplexNumber.fn.negate;
ComplexNumber.fn['exp']           = ComplexNumber.fn.exp;
ComplexNumber.fn['sin']           = ComplexNumber.fn.sin;
ComplexNumber.fn['cos']           = ComplexNumber.fn.cos;
ComplexNumber.fn['tan']           = ComplexNumber.fn.tan;
ComplexNumber.fn['log']           = ComplexNumber.fn.log;
ComplexNumber.fn['sqrt']          = ComplexNumber.fn.sqrt;
ComplexNumber.fn['sinh']          = ComplexNumber.fn.sinh;
ComplexNumber.fn['cosh']          = ComplexNumber.fn.cosh;
ComplexNumber.fn['tanh']          = ComplexNumber.fn.tanh;

ComplesNumber.prototype = ComplexNumber.fn;

delete ComplexNumber.fn; // reduce footprint

ComplexNumber['real'] = ComplexNumber.real;
ComplexNumber['imag'] = ComplexNumber.imag;


ComplexNumber['realToComplex'] = realToComplex;
ComplexNumber['imagToComplex'] = imagToComplex;

global['ComplexNumber'] = ComplexNumber;

})(this);
