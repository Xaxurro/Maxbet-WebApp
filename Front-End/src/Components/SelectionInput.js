import "../Css/Table.css"

const SelectionInput = ({id, values}) => {
    console.log("AYUDAAAAAAAAAAA");
    return(
        <>
            <br/>
            {/* <input id={id} type="text" onChange={onChange} value={value}/><br/> */}
            
            {values.map(value => <label htmlFor={id}><input type="radio" id={id} name={id} value={value.id}/>{value.name}</label>)}
            {/* <select>
                {values.map(value => <option key={value.name} className = "Filter" value={value.id}>{value.name}</option>)}
            </select> */}
        </>
    );
}

export {SelectionInput};