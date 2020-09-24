(function (doc) {
  var resultElement = doc.getElementsByClassName('result')[0],
    buttonGroupElement = doc.getElementsByClassName('button-group')[0];

  function init() {
    bindEvent(buttonGroupElement);
  }

  function bindEvent(ele) {
    ele.addEventListener('click', onClick, false);
  }

  function renderResult(ele, text) {
    ele.innerText = text;
  }

  function onClick(ev) {
    var inputElements = doc.getElementsByTagName('input'),
      fVal = tools.digitalize(inputElements[0].value),
      sVal = tools.digitalize(inputElements[1].value),
      target = tools.getElement(ev);

    if (target.tagName.toLowerCase() === 'button') {
      var method = target.getAttribute('data-method');
      renderResult(resultElement, compute[method](fVal, sVal));
    }
  }

  init();
})(document);