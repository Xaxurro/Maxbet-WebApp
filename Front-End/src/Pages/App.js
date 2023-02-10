// import logo from './logo.svg';
import '../Css/App.css';
import {Navbar} from "../Components/Navbar";
import {Route, Routes} from "react-router-dom"
import { WorkList } from "./WorkList";
import { DashBoard } from "./DashBoard";
import { Employees } from "./Employees";
import { Inventory } from "./Inventory";

function App() {
  return (
    <>
      <Navbar/>

      <div className="Container">
        <Routes>
          <Route path="/" element={<DashBoard/>}/>
          <Route path="/" element={<DashBoard/>}/>
          <Route path="/WorkList" element={<WorkList />}/>
          <Route path="/Employees" element={<Employees />}/>
          <Route path="/Inventory" element={<Inventory />}/>
        </Routes>
      </div>
    </>
    
    
  );
}

export { App};
