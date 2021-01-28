import React from "react";
import styled from "styled-components";

const EstiloBotao = styled.button.attrs({type: 'submit'})`
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.contrastText};
  border-radius: ${({ theme }) => theme.borderRadius};
  border: 0;
  margin-top: 10px;
  width: 100%;
  padding: 10px 16px;
  font-weight: bold;
  font-size: 14px;
  line-height: 1;
  text-transform: uppercase;
  outline: 0;
  transition: .3s;
  cursor: pointer;
  &:hover,
  &:focus {
    opacity: .5;
  }
  &:disabled {
    background-color: #979797;
    cursor: not-allowed;
  }
`;

function BotaoConfirmar(props) {
  if (props.children[1].length === 0) {
    return <EstiloBotao disabled>{props.children}</EstiloBotao>
  } else {
    return <EstiloBotao>{props.children}</EstiloBotao>
  }
}

export default BotaoConfirmar;