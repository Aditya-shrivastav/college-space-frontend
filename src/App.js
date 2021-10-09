import Main from './components/Main'
import './App.css';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from './redux/configureStore';
import history from './shared/history'
import { PersistGate } from 'redux-persist/integration/react'

const { store, persistor } = configureStore();

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router history={history}>
          <Main />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
