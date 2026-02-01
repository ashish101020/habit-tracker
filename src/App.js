import "./App.css";
import { SnackbarProvider } from "notistack";
import HabitTracker from "./components/HabitTracker";

function App() {
  return (
    <SnackbarProvider>
      <div>
        <HabitTracker/>
      </div>
    </SnackbarProvider>
  );
}

export default App;
