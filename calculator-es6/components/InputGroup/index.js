import tpl from './index.tpl';

export default class InputGroup {
  render() {
    const oDiv = document.createElement('div');
    oDiv.className = 'input-group';
    oDiv.innerHTML = tpl();

    return oDiv;
  }
}