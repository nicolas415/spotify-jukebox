import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from "react-router-dom";
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ThemeProvider } from '@emotion/react';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import configureStore from './redux/configureStore'

import { AppRouter } from './router/router.tsx';
import { theme } from './theme/index.ts';
import "./index.css";

const queryClient = new QueryClient()
const { store, persistor } = configureStore()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <ReduxProvider store={store}>
          <PersistGate persistor={persistor}>
            <RouterProvider router={AppRouter} />
          </PersistGate>
        </ReduxProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
