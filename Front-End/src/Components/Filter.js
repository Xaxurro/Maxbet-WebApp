import "../Css/Filter.css"

export function Filter(props){
    return (
        <div className="Filter">
            <input type="text" placeholder="Filter"/>
            <select>
                {props.data.map(opt => <option key={opt} className = "Filter" value={opt}>{opt}</option>)}
            </select>
        </div>
        
    );
}