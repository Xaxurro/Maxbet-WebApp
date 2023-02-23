import "../Css/Table.css"

const TextInput = ({id, text, onChange, value}) => {
    return(
        <>
            <br/>
            <label for={id}>{text} :</label><br/>
            <input id={id} type="text" onChange={onChange} value={value}/><br/>
        </>
    );
}

export {TextInput};