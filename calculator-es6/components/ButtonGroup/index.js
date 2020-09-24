import tpl from './index.tpl';

export default class ButtonGroup {
  render() {
    const oDiv = document.createElement('div');
    oDiv.className = 'button-group';
    oDiv.innerHTML = tpl();

    return oDiv;
  }
}