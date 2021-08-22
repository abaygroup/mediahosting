import '../sass/base.scss';
import { Provider } from 'react-redux';
import { useStore } from '../store';
 
function App({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default App