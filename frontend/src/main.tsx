import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store.ts';

import './assets/styles/index.css';
import App from './App.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LoginPage } from './pages/LoginPage/components/LoginPage.tsx';
import { RegisterPage } from './pages/RegisterPage/components/RegisterPage.tsx';
import { AuthProvider } from './context/AuthContext.tsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <BrowserRouter>
          <StrictMode>
            <Routes>
              <Route
                path='*'
                element={<App />}
              />
              <Route
                path='/login'
                element={<LoginPage />}
              />
              <Route
                path='/register'
                element={<RegisterPage />}
              />
            </Routes>
          </StrictMode>
        </BrowserRouter>
      </Provider>
    </QueryClientProvider>
  </AuthProvider>
);
