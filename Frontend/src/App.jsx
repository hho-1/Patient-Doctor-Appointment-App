import { Provider } from "react-redux";
import { store } from "./app/store";
import AppRouter from "./router/AppRouter";
//import Home from "./pages/Home";



function App() {
  
  return (
    <div className="App">
       <Provider store={store}>
        <AppRouter/>
      </Provider>
    </div>
  );
}

export default App;