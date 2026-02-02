import { persistor, store } from "stores/store";
import { Provider } from "react-redux";
import AppWrapper from "./AppWrapper";
import { PersistGate } from "redux-persist/integration/react";

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <AppWrapper />
      </PersistGate>
    </Provider>
  );
}

export default App;
