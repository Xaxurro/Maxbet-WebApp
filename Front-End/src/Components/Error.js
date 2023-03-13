import "../Css/Table.css"

const TextInput = ({errors}) => {
    return(
        <>
            <label>{errors.message}</label><br/>
        </>
    );
}

export {TextInput};