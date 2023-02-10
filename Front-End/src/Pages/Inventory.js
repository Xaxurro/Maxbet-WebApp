import { Button } from "../Components/Button"
import { Table } from "../Components/Table";
import { Filter } from "../Components/Filter";


const Filters = ["Item id","Item Name","Origin","Owner Name","Status"]
const Titles =[{heading: 'Item id'},{heading: 'Item Name'},{heading: 'Origin'},{heading: 'Owner Name'},{heading: 'Status'}];
export function Inventory(){
    return (
    <div className="Employees"> 
        <div className="Title">
            
            <h1><i>Inventory</i></h1>
            <div className="right">
                <Filter data={Filters}/>
                <Button className="Button" type="submit" Text ="Search"/>
                <Button className="Button" type="submit" Text ="Add Item"/>
            </div>
        </div>
        <Table column={Titles}/>
        
        
    </div>);
}