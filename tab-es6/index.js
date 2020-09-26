import Tab from './components/Tab'

; ((doc) => {
  const app = doc.getElementById('app');

  const init = (app) => {
    new Tab(app).init();
  };

  init(app);
})(document);