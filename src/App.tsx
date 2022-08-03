import "./App.css";
import { AppStateProvider } from "./domain/appContext";
import GameLoop from "./domain/gameLoop";

function App() {
  return (
    <div className="App">
      <AppStateProvider>
        <GameLoop />
      </AppStateProvider>
    </div>
  );
}
export default App;
