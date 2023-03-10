import "../Css/Table.css"

const SelectionInput = ({id, text, options, setValue, value}) => {

    return(
        <>
            <br />
            <label>{text}: <br/>
                <select id={id} value={value} onChange={e => setValue(e.target.value)}>
                    {options.map(option => <option key={option.id} value={option.id}>{option.name}</option>)}
                </select>
            </label>
        </>
    );
}

export {SelectionInput};