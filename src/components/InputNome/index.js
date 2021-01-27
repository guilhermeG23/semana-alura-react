import React from "react";
import styled from "styled-components";
import db from "../../../db.json"

const InputNome = styled.input.attrs({
    placeholder: "Entre com o nome", 
    type: 'text'})`
    width: 100%;
    height: 40px;
    text-align: center;
    border-radius: ${db.theme.borderRadius};
`

export default InputNome;