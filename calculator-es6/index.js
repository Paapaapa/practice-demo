import Result from './components/Result/index';
import ButtonGroup from './components/ButtonGroup/index';
import InputGroup from './components/InputGroup/index';
import { getElement, digitalize } from './utils/tools';
import compute from './utils/compute';

@compute
class Calculator {
  constructor(el) {
    this.el = el;

    this.result = new Result();
    this.buttonGroup = new ButtonGroup();
    this.inputGroup = new InputGroup();
  }

  init() {
    this.render(this.el);
    this.bindEvent(this.el.getElementsByClassName('button-group')[0]);
  }

  render(el) {
    const oFrag = document.createDocumentFragment();

    oFrag.appendChild(this.result.render());
    oFrag.appendChild(this.inputGroup.render());
    oFrag.appendChild(this.buttonGroup.render());

    el.appendChild(oFrag);
  }


  bindEvent(ele) {
    ele.addEventListener('click', this.onClick.bind(this), false);
  }

  renderResult(ele, text) {
    ele.innerText = text;
  }

  onClick(ev) {
    const el = this.el;
    const inputElements = el.getElementsByTagName('input'),
      resultElement = el.getElementsByClassName('result')[0],
      fVal = digitalize(inputElements[0].value),
      sVal = digitalize(inputElements[1].value),
      target = getElement(ev);

    if (target.tagName.toLowerCase() === 'button') {
      const method = target.getAttribute('data-method');
      this.renderResult(resultElement, this[method](fVal, sVal));
    }
  }
}

new Calculator(document.body).init();