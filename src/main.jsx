import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './app/router.jsx'
import { store } from './app/store.jsx'
import { Provider, useSelector } from 'react-redux'
import { ThemeProvider, CssBaseline } from "@mui/material";
import { getTheme } from "./theme/theme"

// BU HİSSƏNİ AYRI FAYLA ÇIXARMAQ ƏN DÜZGÜNÜDÜR (Məsələn App.jsx)
const AppContent = () => {
  const mode = useSelector((state) => state.theme.mode);
  const theme = getTheme(mode);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <AppContent />
    </Provider>
  </StrictMode>
);