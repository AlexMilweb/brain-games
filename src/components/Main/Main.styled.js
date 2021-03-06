import styled from "styled-components";

export const MainStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 700px;
  min-height: 700px;
  margin-right: auto;
  margin-left: auto;
  margin-top: 50px;
  border-radius: 6px;
  background-color: #111;
`;

export const Header = styled.header`
  margin-bottom: auto;
`;

export const GameName = styled.h1`
  color: white;
  font-size: 30px;
  text-align: center;
`;

export const StartScreen = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 300px;
  height: 300px;
  border-radius: 6px;
  border: 1px solid #3dfff8;
  margin-bottom: auto;
`;

export const StartButton = styled.button`
  padding: 11px 16px;
  border-radius: 6px;
  background-color: #3dfff8;
  border: none;
  text-transform: uppercase;
  cursor: pointer;
`;

export const Level = styled.div`
  color: white;
  font-size: 14px;
  max-width: 200px;

  span {
    margin-left: 10px;
    font-size: 18px;
    font-weight: bold;
  }
`;

export const InfoPanel = styled.div`
  width: 300px;
  border-radius: 6px;
  border: 1px solid #3dfff8;
  padding: 10px;
`;
