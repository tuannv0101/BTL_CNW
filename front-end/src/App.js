import { Switch, Route, Redirect } from "react-router-dom";
import SignIn from "./pages/SignIn";
import Main from "./components/layout/Main";
import CongThuc from "./components/congthuc/CongThuc";
import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import AppContextProvider from "./context/AppContext";

import Nhom from "./components/nhom/Nhom";

function App() {
  return (
    <AppContextProvider>
      <div className="App">
        <Switch>
          <Route path="/dang-nhap" exact component={SignIn} />
          <Route path="/nhom" exact component={Nhom} />
          <Route path="/cong-thuc" exact component={CongThuc} />
          <Main>
          </Main>
        </Switch>
      </div>
    </AppContextProvider>
  );
}

export default App;