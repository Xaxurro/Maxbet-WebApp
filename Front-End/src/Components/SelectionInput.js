import "../Css/Table.css"

const SelectionInput = ({id, text, options, onChange, value}) => {
    return(
        <>
            <br />
            <label>{text}: <br/>
                <select id={id} value={value} onChange={onChange}>
                    {options.map(option => <option value={option.id}>{option.name}</option>)}
                </select>
            </label>
        </>
    );
}

export {SelectionInput};