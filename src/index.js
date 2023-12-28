import React from 'react'
import ReactDOM from 'react-dom/client'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'

const router = createBrowserRouter(
	createRoutesFromElements(<Route path='/*' element={<App />} />)
)
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	// <React.StrictMode>
	<RouterProvider router={router} />
	// </React.StrictMode>
)