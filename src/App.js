import './App.scss';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./Components/Homepage"
import RegisterComponent from "./Components/Firebase/RegisterComponent";
import LoginComponent from "./Components/Firebase/LoginComponent";
import ResetComponent from "./Components/Firebase/ResetComponent";
import {auth} from "./Components/Firebase/Firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function App() {
    const [user, loading] = useAuthState(auth);

  return (
      <div className="app">
          <Router>
              <Routes>
                  <Route exact path="/" element={<LoginComponent/>}/>
                  <Route exact path="/register" element={<RegisterComponent/>}/>
                  <Route exact path="/reset" element={<ResetComponent/>}/>
                  {user && <Route exact path="/homepage" element={<Homepage/>}/>}
              </Routes>
          </Router>
      </div>
  );
}

export default App;
