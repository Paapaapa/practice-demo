import tpl from './template/navItem.tpl';

export default () => ({
  name: 'nav',
  tpl(data) {
    let html = '';

    data.forEach((city, index) => {
      html += tpl().replace(/{{(.*?)}}/g, (_, key) => {
        return {
          name: city.name,
          className: index === 0 ? 'nav-item current' : 'nav-item',
        }[key];
      });
    });

    return html;
  },
  render(data) {
    const nav = document.createElement('div');
    nav.className = 'nav';
    nav.innerHTML = this.tpl(data);

    return nav;
  },
  bindEvent(onClick) {
    document.getElementsByClassName('nav')[0].addEventListener('click', onClick, false);
  },
});