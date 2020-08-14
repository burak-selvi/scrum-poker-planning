import React from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from "./Routes";
import { Layout } from "./components";
import { Provider } from "react-redux";
import { store } from "./store";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Layout>
          <Routes />
        </Layout>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
