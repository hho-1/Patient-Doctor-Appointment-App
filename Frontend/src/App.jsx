import { Provider } from "react-redux";
import { store } from "./app/store";
import SearchDoctor from "./pages/searchDoctor/SearchDoctor";


function App() {
  
  return (
    <div className="App">
       <Provider store={store}>
        <SearchDoctor/>
      </Provider>
    </div>
  );
}

export default App;