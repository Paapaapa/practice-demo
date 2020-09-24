export default (target) => {
  target.prototype.plus = (a, b) => a + b;

  target.prototype.minus = (a, b) => a - b;

  target.prototype.multiply = (a, b) => a * b;

  target.prototype.divide = (a, b) => a / b;
};