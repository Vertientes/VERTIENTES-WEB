import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './redux/store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home } from './views/Home.jsx'
import { NotFoundView } from './views/NotFoundView.jsx';
import { DeliveryView } from './views/DeliveryView.jsx';


const router = createBrowserRouter([
  {
    //esto seria /orders cuando haya login
    path:'/',
    element: <Home/>,
    errorElement: <NotFoundView/>
  },
  {
    path:'/deliveries',
    element: <DeliveryView/>,

  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
