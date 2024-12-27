import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './AuthContext.jsx';
import { Provider } from 'react-redux';
import store from './store/store.js';
import "./index.css"

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <Toaster />
    <Provider store={store}>
      <App />
    </Provider>
  </AuthProvider>
)
