import React from 'react';
import ReactDOM from 'react-dom/client';
import './tailwind.css';
import App from './App';
import { Provider } from 'react-redux';
import { setupStore } from './state';
import './i18n';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { theme } from './theme';
import { BrowserRouter } from 'react-router-dom';

const store = setupStore();

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <App />
                </ThemeProvider>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>
);
