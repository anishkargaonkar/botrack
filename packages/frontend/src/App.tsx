import { Basket } from "./modules/Basket/Basket";
import { useTrackStore } from "./modules/hooks/useTrackStore";
import { Playground } from "./modules/Playground/Playground";

function App() {
  return (
    <>
      <Playground />
      <Basket />
    </>
  );
}

export default App;
