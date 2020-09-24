export function getElement(ev) {
  const event = ev || window.event;
  return event.target || event.srcElement;
}

export function digitalize(str) {
  return Number(str.replace(/\s/g, '')) || 0;
}
