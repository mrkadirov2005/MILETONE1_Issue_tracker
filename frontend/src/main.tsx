import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {  QueryClientProvider } from '@tanstack/react-query'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './index.css'
import App from './App.tsx'
import queryClient from './shared/query/reactQuerySetup.ts';
// query client is setup in file : frontend/src/shared/query/reactQuerySetup.ts
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <App />
    </QueryClientProvider>
  </StrictMode>,
)
