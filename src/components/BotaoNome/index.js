import React from "react";
import styled from "styled-components";
import db from "../../../db.json"

const EstiloBotao = styled.button.attrs({type: 'submit'})`
  margin-top: 20px;
  width: 100%;
  box-sizing: border-box;
  height: 42px;
  border-radius: ${db.theme.borderRadius};
  background-color: ${db.theme.colors.primary};
  color: white;
  font-size: 24px;
`

function BotaoNome(props) {
  if (props.children[1].length === 0) {
    return <EstiloBotao disabled>{props.children}</EstiloBotao>
  } else {
    return <EstiloBotao>{props.children}</EstiloBotao>
  }
}

export default BotaoNome;