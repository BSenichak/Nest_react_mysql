import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { ThemeProvider } from '@mui/material/styles'
import themes from './styles/themes.ts'
import { CssBaseline } from '@mui/material'
import { Provider } from "react-redux"
import store from './Store/store.ts'
import { BrowserRouter } from 'react-router-dom'
import { SnackbarProvider } from 'notistack'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider theme={themes}>
        <SnackbarProvider>
          <CssBaseline />
          <App />
        </SnackbarProvider>
      </ThemeProvider>
    </BrowserRouter>
  </Provider>
)
