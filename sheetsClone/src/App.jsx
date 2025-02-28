import { RecoilRoot } from "recoil";
import "./App.css";
import Cell from "./components/Cell/Cell";

function App() {
  return (
    <RecoilRoot>
      <Cell />
    </RecoilRoot>
  );
}

export default App;
