import nav from './nav';
import content from './content';
import data from './data';
import { getTargetElement } from '../../utils';

import './index.css';

export default class Tab {
  constructor(app) {
    this.app = app;

    this.container = document.createElement('div');
    this.container.className = 'tab';

    this.navComp = nav();
    this.contentComp = content();

    this.current = 0;
    this.htmlCache = {};
  }

  init() {
    this.render();
    this.getElements();
    this.navComp.bindEvent(this.onNavClick.bind(this));
  }

  render() {
    const oFrag = document.createDocumentFragment();
    const { content, html } = this.contentComp.render(data[0]);

    this.htmlCache[0] = html;

    oFrag.appendChild(this.navComp.render(data));
    oFrag.appendChild(content);

    this.container.appendChild(oFrag);

    this.app.appendChild(this.container);
  }

  getElements() {
    this.nav = this.app.getElementsByClassName('nav')[0];
    this.content = this.app.getElementsByClassName('content')[0];
  }

  onNavClick(ev) {
    const el = this.app,
      navItemElements = el.getElementsByClassName('nav-item'),
      target = getTargetElement(ev);

    if (target.className.indexOf('nav-item') > -1) {
      const index = [].indexOf.call(navItemElements, target);
      navItemElements[this.current].className = 'nav-item';
      this.current = index;
      navItemElements[index].className = 'nav-item current';

      if (!this.htmlCache[index]) {
        this.htmlCache[index] = this.contentComp.tpl(data[index]);
      }

      this.content.innerHTML = this.htmlCache[index];
    }
  }
}