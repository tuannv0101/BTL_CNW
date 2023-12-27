import { Switch, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import DiCho from "./components/dicho/DiCho";
import AppContextProvider from "./context/AppContext";

function App() {
  return (
    <AppContextProvider>
      <div className="App">
        <Switch>
          <Route path="/dang-nhap" exact component={SignIn} />
          <Route path="/di-cho" exact component={DiCho} />
        </Switch>
      </div>
    </AppContextProvider>
  );
}

export default App;
