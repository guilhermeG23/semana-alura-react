import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import db from "../../../db.json";

const InputNome = styled.input.attrs({
    /*placeholder: "Entre com o nome",*/ 
    type: 'text'})`
    width: 100%;
    height: 40px;
    text-align: center;
    border-radius: ${db.theme.borderRadius};
`

//Funcao de retorno
//Demonstra que consegue receber as propriedades de quem entancia
function InputNomeChange({placeholder, onChange, ...props}) {
    return <InputNome placeholder={placeholder} onChange={onChange} {...props}/>
}

//Props default
InputNomeChange.defaultprops = {
    value: "",
};

//Limitando o que o props traz
//Fala o que esse cara vai receber, tipo e a forma que recebe
InputNomeChange.PropTypes = {
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
};

export default InputNomeChange;