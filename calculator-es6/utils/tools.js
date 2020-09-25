export function getElement(ev) {
  const event = ev || window.event;
  return event.target || event.srcElement;
}

export function digitalize(str) {
  return Number(str) || 0;
}


export function trimSpace(str = '') {
  return str.replace(/\s/g, '');
}