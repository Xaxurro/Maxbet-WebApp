import "../Css/Table.css"

const TextInput = ({id, text, setValue, value}) => {
    return(
        <>
            <br/>
            <label htmlFor={id}>{text} :</label><br/>
            <input id={id} name={id} type="text" onChange={e => setValue(e.target.value)} value={value}/><br/>
        </>
    );
}

export {TextInput};