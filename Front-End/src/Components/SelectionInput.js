import "../Css/Table.css"

const SelectionInput = ({id, text, onChange, values}) => {
    return(
        <>
            <br/>
            <label htmlFor={id}>{text} :</label><br/>
            {/* <input id={id} type="text" onChange={onChange} value={value}/><br/> */}
            <select>
                {values.map(value => <option key={value.name} className = "Filter" value={value.id}>{value.name}</option>)}
            </select>
        </>
    );
}

export {SelectionInput};