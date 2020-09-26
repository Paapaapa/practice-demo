import tpl from './template/content.tpl';

export default () => ({
  name: 'content',
  tpl(data) {
    let html = tpl().replace(/{{(.*?)}}/g, function (_, key) {
      return {
        name: data.name,
        content: data.content,
        className: 'content-item',
      }[key];
    });

    return html;
  },
  render(data) {
    const content = document.createElement('div');
    content.className = 'content';
    const html = this.tpl(data);
    content.innerHTML = html;

    return { content, html };
  }
});