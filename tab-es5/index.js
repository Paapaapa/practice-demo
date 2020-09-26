;(function (doc) {
  function Tab(el, options) {
    this.el = el;
    this.options = options;

    this.nav = doc.createElement('div');
    this.content = doc.createElement('div');

    this.navItemTpl = doc.getElementById('nav-item-tpl').innerHTML;
    this.contentTpl = doc.getElementById('content-tpl').innerHTML;
    this.data = JSON.parse(doc.getElementById('data').innerHTML);

    this.current = 0;
    this.htmlCache = {};
  }

  Tab.prototype.init = function () {
    this.render();
    this.bindEvent();
  };

  Tab.prototype.render = function () {
    var oFrag = doc.createDocumentFragment();

    this.nav.className = 'nav';
    this.nav.innerHTML = this.renderNavItems(this.data);

    this.content.className = 'content';
    this.content.innerHTML = this.renderContent(this.data[0], 0);

    oFrag.appendChild(this.nav);
    oFrag.appendChild(this.content);

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

  Tab.prototype.renderContent = function (data, index) {
    if (!this.htmlCache[index]) {
      this.htmlCache[index] = this.contentTpl.replace(/{{(.*?)}}/g, function (_, key) {
        return {
          name: data.name,
          content: data.content,
          className: 'content-item',
        }[key];
      });
    }

    return this.htmlCache[index];
  };

  Tab.prototype.bindEvent = function () {
    this.nav.addEventListener('click', this.onNavClick.bind(this), false);
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

      this.content.innerHTML = this.renderContent(this.data[index], index);
    }
  };

  window.Tab = Tab;
})(document);