import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './routers/router.tsx'
import MessageContext from './hooks/MessageContext.tsx'
import ConfigView from './ConfigView.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(

  <React.StrictMode>
    <ConfigView />
  </React.StrictMode>,
)
