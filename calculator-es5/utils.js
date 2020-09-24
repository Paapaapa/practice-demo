var tools = (function () {
  function getElement(ev) {
    var event = ev || window.event;
    return event.target || event.srcElement;
  }

  function digitalize(str) {
    return Number(str.replace(/\s/g, '')) || 0;
  }

  return {
    getElement: getElement,
    digitalize: digitalize,
  };
})();

var compute = (function () {
  function plus(a, b) {
    return a + b;
  }

  function minus(a, b) {
    return a - b;
  }

  function multiply(a, b) {
    return a * b;
  }

  function divide(a, b) {
    return a / b;
  }

  return {
    plus: plus,
    minus: minus,
    multiply: multiply,
    divide: divide,
  }
})();