import AddedTasks from "./AddedTasks/AddedTasks";
import "./App.css";
import InputList from "./inputTask/InputList";

function App() {
  return (
    <div className="App">
      <InputList />
      <AddedTasks />
    </div>
  );
}

export default App;
