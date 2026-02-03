import { MessageApiProvider } from './hooks';
import { Routes, ThemeProvider } from './providers';

function App() {
  return (
    <ThemeProvider>
      <MessageApiProvider>
        <Routes />
      </MessageApiProvider>
    </ThemeProvider>
  );
}

export default App;
