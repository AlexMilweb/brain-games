import styled, { css } from "styled-components";

export const PlayingFieldStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  background-color: white;
  margin-bottom: auto;

  ${props =>
    props.hidden &&
    css`
      pointer-events: none;
    `};
`;

export const FieldContainer = styled.div`
  width: ${props => props.widthField * 40}px;
  display: flex;
  flex-wrap: wrap;
  box-shadow: 0 0 0 1px #777;
`;

export const FieldItem = styled.div`
  width: 40px;
  height: 40px;
  box-shadow: inset 0 0 0 1px #777;
  cursor: pointer;

  ${props =>
    props.active &&
    css`
      background-color: #225af4;
      box-shadow: inset 0 0 10px 5px #0006bc;
    `};

  ${props =>
    props.isWrong &&
    css`
      background-color: #ff7c7c;
      box-shadow: inset 0 0 10px 5px #d60000;
    `};
`;
