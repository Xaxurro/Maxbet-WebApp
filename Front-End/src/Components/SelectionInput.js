import "../Css/Table.css"

const SelectionInput = ({id, values, selected}) => {
    return(
        <>
            <br/>
            
            {values.map(value => <label htmlFor={id}><input type="radio" checked={selected === value.id} id={id} name={id} value={value.id}/>{value.name}</label>)}
        </>
    );
}

export {SelectionInput};