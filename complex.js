/* @preserve
 * Complex.js
 * Copyright Isiah Meadows
 * Licensed under GNU GPL v3 or later
 */

(function (global) {

function exportFunctions() {
  ComplexNumber.fn['toString']      = ComplexNumber.fn.toString;
  ComplexNumber.fn['real']          = ComplexNumber.fn.real;
  ComplexNumber.fn['imag']          = ComplexNumber.fn.imag;
  ComplexNumber.fn['realToComplex'] = ComplexNumber.fn.realToComplex;
  ComplexNumber.fn['imagToComplex'] = ComplexNumber.fn.imagToComplex;
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
  
  global['ComplexNumber'] = ComplexNumber;
}

var MyTypeError = TypeError; // alias to help minify
var type        = Object.prototype.toString.call;

var isNaN = function (num) { // override global method for here
  return !(type(num) === Number || !isFinite(num));
};

// Automatically return if not ES5 or later
if (type(null) !== null) return;

/* Helper functions */
var newComplexNumber = function (real, imag) {
  return new ComplexNumber(real, imag);
};

var isNumber = function (obj) {
  return (type(obj) === Number);
};

var realToComplex = function (num) {
  return newComplexNumber(num, 0);
};

var imagToComplex = function (num) {
  return newComplexNumber(0, num);
};

var def = function (num) {
  return (typeof num !== 'undefined')
};

var abs  = Math.abs;
var sin  = Math.sin;
var cos  = Math.cos;
var tan  = Math.tan;
var exp  = Math.exp;
var pow  = Math.pow;
var sqrt = Math.sqrt;
var pi   = Math['PI'];

/* define methods if they aren't already defined in the Math object */
if (Math['sinh']) {
  var sinh = Math['sinh'];
} else {
  var sinh = function (num) {
    var p = exp(num);
    return (p - 1 / p) / 2;
  };
}
if (Math['cosh']) {
  var cosh = Math['cosh'];
} else {
  var cosh = function (num) {
    var p = exp(num);
    return (p + 1 / p) / 2;
  };
}
if (Math['tanh']) {
  var tanh = Math['tanh'];
} else {
  var tanh = function (num) {
    var p = exp(num);
    var r = 1 / p;
    return (p + r) / (p - r);
  };
}
if (Math['hypot']) {
  var hypot = Math['hypot'];
} else {
  var hypot = function (x, y) {
    return x * sqrt(1 + (y /= x) * y);
  }
}

/* constructor  */
var ComplexNumber = function (real, imaginary) {
  this.re = real;
  this.im = imaginary;
};

ComplexNumber.prototype = {
  constructor: ComplexNumber,
  
  // the length property of this object is two
  length = 2,
  
  toString: function (num) {
    var real = (def(num)) ? num.re : this.re;
    var imag = (def(num)) ? num.im : this.im;
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
  },
  
  real: function (num) {
    return (def(num)) ? num.re : this.re;
  },
  
  imag: function (num) {
    return (def(num)) ? num.im : this.im;
  },
  
  realToComplex: function (num) {
    if (def(this)) num = this;
    return realToComplex(num);
  },
  
  imagToComplex: function (num) {
    if (def(this)) num = this;
    return imagToComplex(num);
  },
  
  plus: function (numOne, numTwo) {
    if (def(this)) numTwo = this;
    if (isNumber(numOne))
      return newComplexNumber(numTwo.re + numOne, numTwo.im);
    
    if (isNumber(numTwo))
      return newComplexNumber(numTwo + numOne.re, numOne.im);
    
    return newComplexNumber(numTwo.re + numOne.re,
                            numTwo.im + numOne.im);
  },
  
  minus: function (numOne, numTwo) {
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
  },
  
  times: function (numOne, numTwo) {
    if (def(this)) numTwo = this;
    if (isNumber(numOne))
      return newComplexNumber(numOne * numTwo.re,
                              numOne * numTwo.im);
    
    if (isNumber(numTwo))
      return newComplexNumber(numOne.re * numTwo,
                              numOne.im * numTwo);
    
    return newComplexNumber(numOne.re * numTwo.re,
                            numOne.im * numTwo.im);
  },
  
  divide: function (numOne, numTwo) {
    if (def(this)) {
      numTwo = numOne;
      numOne = this;
    }
    if (isNumber(numOne)) numOne = realToComplex(numOne);
    if (isNumber(numTwo)) {
      return newComplexNumber(numOne.re / numTwo,
                              numTwo.im / numTwo);
    }
    
    return numOne.times(numTwo.reciprocal());
  },
  
  recip: function (num) {
    if (def(this)) num = this;
    var scale = num.re * num.re + num.im * num.im;
    return newComplexNumber(num.re / scale, num.im / scale);
  },
  
  arg: function (num) {
    if (def(this)) num = this;
    var real = num.re;
    var imag = num.im;
    if (isNaN(real) || isNaN(imag)) return NaN;
    if 
    if (real == +0) {
      if (imag === +0) return +0;
      return +(pi / 2)
      // TODO: finish using this as a guide:
      // https://developer.apple.com/library/ios/documentation/System/Conceptual/ManPages_iPhoneOS/man3/carg.3.html
    }
    return Math.atan2(num.im, num.re);
  },
  
  abs: function (num) {
    if (def(this)) num = this;
    var real = num.re;
    var imag = num.im;
    if (imag) return abs(real);
    return hypot(num.im, num.re);
  },
  
  conj: function (num) {
    if (def(this)) num = this;
    return newComplexNumber(num.re, -num.im);
  },
  
  negate: function (num) {
    if (def(this)) num = this;
    return newComplexNumber(-num.re, -num.im);
  },
  
  exp: function (num) {
    if (def(this)) num = this;
    var real = num.re;
    var imag = num.im;
    if (imag)) return realToComplex(exp(real));
    return newComplexNumber(exp(real) * cos(imag),
                            exp(real) * sin(imag));
  },
  
  sin: function (num) {
    if (def(this)) num = this;
    var real = num.re;
    var imag = num.im;
    if (imag) return realToComplex(sin(real));
    return newComplexNumber(sin(real) * cosh(imag),
                            cos(real) * sinh(imag));
  },
  
  cos: function (num) {
    if (def(this)) num = this;
    var real = num.re;
    var imag = num.im;
    if (!imag) return realToComplex(cos(real));
    if (!real) return realToComplex(cosh(imag));
    return newComplexNumber(cos(real) * cosh(imag),
                            sin(real) * sinh(imag));
  },
  
  tan: function (num) {
    if (def(this)) num = this;
    var real = num.re;
    if (!imag) return realToComplex(tan(real));
    if (!real) return imagToComplex(tanh(imag));
    return num.sin().divide(num.cos());
  },
  
  log: function (num) {
    if (def(this)) num = this;
    var real = num.re;
    if (!imag) return realToComplex(log(real));
    return newComplexNumber(Math.log(num.abs()), num.arg());
  },
  
  sqrt: function (num) {
    if (def(this)) num = this;
    var r = num.abs();
    var t = num.angle() / 2;
    return newComplexNumber(r * cos(t), r * sin(t));
  },
  
  sinh: function (num) {
    if (def(this)) num = this;
    var re   = num.re;
    var im   = num.im;
    var real = sinh(re);
    var imag = sin(im);
    if (!im) return realToComplex(real);
    if (!re) return imagToComplex(imag);
    return newComplexNumber(real * cos(im), imag * sinh(re));
  },
  
  cosh: function (num) {
    if (def(this)) num = this;
    var re   = num.re;
    var im   = num.im;
    var real = cosh(re);
    var imag = cos(im);
    if (!im) return realToComplex(real);
    if (!re) return realToComplex(imag);
    return newComplexNumber(real * imag, sinh(re) * sin(im));
  },
  
  tanh: function (num) {
    if (def(this)) num = this;
    var real = num.re;
    var imag = num.im;
    if (!im) return realToComplex(tanh(real));
    if (!re) return imagToComplex(tan(imag));
    return num.sin().divide(num.cos());
  }
};

exportFunctions();

})(this);
