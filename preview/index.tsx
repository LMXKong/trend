
import * as ReactDOM from 'react-dom/client';
import APP from '../index';



// ReactDOM.render(<Navigation />, document.querySelector('#__navi__'));
// ReactDOM.render(<App />, document.querySelector('#app'));

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<APP />);
// ReactDOM.render(<APP />, document.querySelector('#app'));

  // @ts-ignore
if (module.hot) {
  // @ts-ignore
  module.hot.accept('../index.tsx', () => {
    root.render(<APP />);
  });
}
// test.componentWillMount();
