export function getTargetElement(ev) {
  var event = ev || window.event;
  return event.target || event.srcElement;
};