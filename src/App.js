import { Dash } from "./pages/Dash";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { ThemeProvider } from "@emotion/react";
import { createTheme } from '@mui/material/styles';


function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main:'#89b787' 
      },
      secondary: {
        main : '#a0a0a0'
      }
    },
  });

  return (
    <div>
      <ThemeProvider theme={theme}> 
      <Dash />
      </ThemeProvider>
    </div>
  );
}

export default App;
