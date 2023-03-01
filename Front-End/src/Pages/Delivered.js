import { Button } from "../Components/Button"
import { Table } from "../Components/Table";
import { useState, useEffect } from "react";
import { sendRequest } from "../Helpers/sendRequest";

export default function Delivered() {
  const [items, setItems] = useState([]);
  const URL = "http://localhost:5000/product/";
  const UPDATETIME = 60000;
  const [initDatos, setInitDatos] = useState(false)
  const Titles = [{ heading: 'Serial', value: "serial" }, { heading: 'Item Name', value: "name" }, { heading: 'Origin', value: "origin" }, { heading: 'Owner Name', value: "owner" }, { heading: 'Status', value: "state" }];
  const getItems = () => {
    sendRequest(URL)
        .then(response => response.json())
        .then(json => {
            if (json.success) return json.data;
            return [];
        })
        .then(data => setItems([...data]));
        }
        if (!initDatos) {
          getItems();
          setInitDatos(true)
      }
      useEffect(() => {
          setInterval(() => {
              getItems();
          }, UPDATETIME);
      }, []);
  return (
    <div className="Employees"> 
        <div className="Title">
            
            <h1><i>Delivered</i></h1>
            <div className="right">
                <Button className="Button" text="Search" />
                <Button className="Button" text="Add Employee"  />
            </div>
        </div>
    
        <Table data={items} column={Titles} />
        
    </div>
  )
}
