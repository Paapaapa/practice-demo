import Result from './components/Result/index';
import ButtonGroup from './components/ButtonGroup/index';
import InputGroup from './components/InputGroup/index';
import { getElement, digitalize, trimSpace } from './utils/tools';
import compute from './utils/compute';

@compute
class Calculator {
  constructor(el) {
    this.el = el;

    this.result = new Result();
    this.buttonGroup = new ButtonGroup();
    this.inputGroup = new InputGroup();

    this.selectedIndex = -1;
    this.data = this.defineData();
  }

  defineData() {
    let data = {}, method = 'plus', fVal = 0, sVal = 0;
    const _self = this;

    // Object.defineProperties(data, {
    //   method: {
    //     get() {
    //       return method;
    //     },
    //     set(newVal) {
    //       method = newVal;
    //       _self.renderResult(_self.data.method, _self.data.fVal, _self.data.sVal);
    //     },
    //   },
    //   fVal: {
    //     get() {
    //       return fVal;
    //     },
    //     set(newVal) {
    //       fVal = newVal;
    //       _self.renderResult(_self.data.method, _self.data.fVal, _self.data.sVal);
    //     },
    //   },
    //   sVal: {
    //     get() {
    //       return sVal;
    //     },
    //     set(newVal) {
    //       sVal = newVal;
    //       _self.renderResult(_self.data.method, _self.data.fVal, _self.data.sVal);
    //     },
    //   },
    // });

    return new Proxy({
      method,
      fVal,
      sVal,
    }, {
      get(target, prop) {
        return target[prop];
      },
      set(target, prop, newVal) {
        target[prop] = newVal;
        _self.renderResult(_self.data.method, _self.data.fVal, _self.data.sVal);
        return true;
      },
    });
  }

  init() {
    this.render(this.el);
    this.bindEvent();
  }

  render(el) {
    const oFrag = document.createDocumentFragment();

    oFrag.appendChild(this.result.render());
    oFrag.appendChild(this.inputGroup.render());
    oFrag.appendChild(this.buttonGroup.render());

    el.appendChild(oFrag);
  }


  bindEvent() {
    const el = this.el;

    this.result = el.getElementsByClassName('result')[0];
    this.buttonGroup = el.getElementsByClassName('button-group')[0];
    this.inputGroup = el.getElementsByTagName('input');

    this.buttonGroup.addEventListener('click', this.onClick.bind(this), false);
    this.inputGroup[0].addEventListener('input', this.onInput.bind(this), false);
    this.inputGroup[1].addEventListener('input', this.onInput.bind(this), false);
  }

  renderResult(method, fVal, sVal) {
    this.result.innerText = this[method](fVal, sVal);
  }

  onInput(ev) {
    const target = getElement(ev);
    const field = target.getAttribute('data-field');
    this.data[field] = digitalize(trimSpace(target.value));
  }

  onClick(ev) {
    const target = getElement(ev),
      btnElements = this.el.getElementsByClassName('btn');

    if (target.tagName.toLowerCase() === 'button') {
      const method = target.getAttribute('data-method');
      this.selectedIndex >= 0 && (btnElements[this.selectedIndex].style.backgroundColor = 'transparent');
      this.selectedIndex = [].indexOf.call(btnElements, target);
      target.style.backgroundColor = 'yellow';

      this.data.method = method;
    }
  }
}

new Calculator(document.body).init();