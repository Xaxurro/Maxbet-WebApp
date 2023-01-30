import styled from "styled-components"

const ButtonInterno = styled.button`
    transition: all 0.5s ease;
    background-color: orange;
    border-radius: 4px;
    color: black;
    border: none;
    padding: 10px 20px;
    font-weight: 700;
    font-size: 15px;
    cursor: pointer;
    position: relative;
    float:right;
    
`

const Button = ({children, onClick, type}) => {
    return(        
        <ButtonInterno onClick={onClick} type={type}>
            {children}
        </ButtonInterno>
    )
}

export default Button