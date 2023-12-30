import { Switch, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import Main from "./components/layout/Main";
import CongThuc from "./components/congthuc/CongThuc";
import Kho from "./components/kho/Kho";
import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import AppContextProvider from "./context/AppContext";

import Nhom from "./components/nhom/Nhom";
import NhomChiTiet from "./components/nhom/NhomChiTiet";
import MonDo from "./components/mondo/MonDo";

function App() {
  return (
    <AppContextProvider>
      <div className="App">
        <Switch>
          <Main>
            <Route path="/dang-nhap" exact component={SignIn} />
            <Route path="/cong-thuc" exact component={CongThuc} />
            <Route path="/kho" exact component={Kho} />
            <Route path="/nhom" exact component={Nhom} />
            <Route path="/nhom/:id" exact component={NhomChiTiet} />
            <Route path="/mon-do" exact component={MonDo} />
          </Main>
        </Switch>
      </div>
    </AppContextProvider>
  );
}

export default App;