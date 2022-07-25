import './App.scss';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./Components/Homepage"
import {Cards} from './Components/Cards'

function App() {

    //shuffle cards


  return (
      <div className="app">
          <Router>
              <Routes>
                  <Route exact path="/" element={<Homepage />} />
              </Routes>
          </Router>
      </div>
  );
}

export default App;
