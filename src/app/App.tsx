import { store } from "stores/store";
import { Provider } from "react-redux";
import AppWrapper from "./AppWrapper";

function App() {
  return (
    <>
      <Provider store={store}>
        <AppWrapper />
      </Provider>
    </>
  );
}

export default App;
