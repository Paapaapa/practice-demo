(function (doc) {
  function Tab(el, options) {
    this.el = el;
    this.options = options;
  }

  Tab.prototype.init = function () {
    this.current = 0;
    this.navItemTpl = doc.getElementById('nav-item-tpl').innerHTML;
    this.contentTpl = doc.getElementById('content-tpl').innerHTML;
    this.data = JSON.parse(doc.getElementById('data').innerHTML);

    this.render();
    this.bindEvent();
  };

  Tab.prototype.render = function () {
    var oFrag = doc.createDocumentFragment();

    var nav = doc.createElement('div');
    nav.className = 'nav';
    nav.innerHTML = this.renderNavItems(this.data);

    var content = doc.createElement('div');
    content.className = 'content';
    content.innerHTML = this.renderContent(this.data[0]);

    oFrag.appendChild(nav);
    oFrag.appendChild(content);

    this.el.appendChild(oFrag);
  };

  Tab.prototype.renderNavItems = function (data) {
    var html = '';
    data.forEach(function (city, index) {
      html += this.navItemTpl.replace(/{{(.*?)}}/g, function (_, key) {
        return {
          name: city.name,
          className: index === 0 ? 'nav-item current' : 'nav-item',
        }[key];
      });
    }, this);

    return html;
  };

  Tab.prototype.renderContent = function (data) {
    return this.contentTpl.replace(/{{(.*?)}}/g, function (_, key) {
      return {
        name: data.name,
        content: data.content,
        className: 'content-item',
      }[key];
    });
  };

  Tab.prototype.bindEvent = function () {
    var navElement = this.el.getElementsByClassName('nav')[0];

    navElement.addEventListener('click', this.onNavClick.bind(this), false);
  };

  Tab.prototype.onNavClick = function (ev) {
    var el = this.el,
      navItemElements = el.getElementsByClassName('nav-item'),
      target = tools.getElement(ev);

    if (target.className.indexOf('nav-item') > -1) {
      var index = [].indexOf.call(navItemElements, target);
      navItemElements[this.current].className = 'nav-item';
      this.current = index;
      navItemElements[index].className = 'nav-item current';

      el.getElementsByClassName('content')[0].innerHTML = this.renderContent(this.data[index]);
    }
  };

  window.Tab = Tab;
})(document);