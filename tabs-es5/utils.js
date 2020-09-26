var tools = (function () {
  function getElement(ev) {
    var event = ev || window.event;
    return event.target || event.srcElement;
  }

  return {
    getElement: getElement,
  };
})();