import "./App.css";
import { AppStateProvider } from "./domain/appContext";
import GameLoop from "./domain/gameLoop";
import SparkClickAnimation from "./components/CanvasControl";

function App() {
  return (
    <div className="App">
      <AppStateProvider>
        <GameLoop />
          <SparkClickAnimation />
      </AppStateProvider>
    </div>
  );
}
export default App;
