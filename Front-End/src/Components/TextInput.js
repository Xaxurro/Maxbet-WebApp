import "../Css/Table.css"

const TextInput = ({id, text, onChange, value}) => {
    return(
        <>
            <br/>
            <label htmlFor={id}>{text} :</label><br/>
            <input id={id} name={id} type="text" onChange={onChange} value={value}/><br/>
        </>
    );
}

export {TextInput};