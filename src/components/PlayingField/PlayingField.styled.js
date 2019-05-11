import styled, { css } from "styled-components";

export const PlayingFieldStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  background-color: white;
  margin-bottom: auto;
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

  ${props =>
    props.active &&
    css`
      background-color: #f4bd27;
    `};
`;
