import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import store from './redux/app/store'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css'


ReactDOM.createRoot(document.getElementById('root')).render(

    <React.StrictMode>
      <Provider store={store}>
       <App />
      </Provider>
      <ToastContainer/>
    </React.StrictMode>

)
