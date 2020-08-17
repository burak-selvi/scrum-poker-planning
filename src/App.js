import React from "react";
import { HashRouter } from "react-router-dom";
import Routes from "./Routes";
import { Layout } from "./components";
import { Provider } from "react-redux";
import { store } from "./redux/store";
const { PUBLIC_URL } = process.env;

function App() {
  return (
    <Provider store={store}>
      <HashRouter basename={PUBLIC_URL} hashType="slash">
        <Layout>
          <Routes />
        </Layout>
      </HashRouter>
    </Provider>
  );
}

export default App;
