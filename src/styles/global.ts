import { createTheme } from '@mui/material/styles'

// Create a theme instance.
export const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          -webkit-font-smoothing: antialiased;
        }

        body, input, textarea, button {
          font-family: 'Roboto', sans-serif;
          font-weight: 400;
          font-size: 1rem;
        }
      `,
    },
  },
})
