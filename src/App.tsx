import "./App.css";
import { AppStateProvider } from "./domain/appContext";
import GameLoop from "./domain/gameLoop";
import SparkClickAnimation from "./components/CanvasControl";
import { useEffect, useRef } from "react";

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
