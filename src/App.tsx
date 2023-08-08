import "./App.css";
import { AppStateProvider } from "./mechanics/appContext";
import GameLoop from "./mechanics/gameLoop";

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
