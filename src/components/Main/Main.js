import React from "react";
import { PlayingField } from "../PlayingField/PlayingField";
import { MainStyled, GameName } from "./Main.styled";

export class Main extends React.Component {
  state = {
    level: 11,
    widthField: 3,
    countFields: 25,
    fieldArray: []
  };

  componentDidMount() {
    const { level } = this.state;

    this.generateRandomArray(level);
  }

  randomInteger = num => Math.floor(Math.random() * (num + 1));

  setFieldParams = () => {
    const { level } = this.state;

    if (level < 5) {
      return {
        widthField: 3,
        countFields: 9
      };
    }
    if (level >= 5 && level <= 10) {
      return {
        widthField: 4,
        countFields: 16
      };
    }
    if (level >= 11 && level <= 18) {
      return {
        widthField: 5,
        countFields: 25
      };
    }
  };

  generateRandomArray = level => {
    const fieldParams = this.setFieldParams();
    const numCells = fieldParams.countFields;

    let array = [];

    for (let i = 0; i < numCells; i++) {
      array.push("");
    }

    for (let j = 0; j < level; j++) {
      let index;

      do {
        index = this.randomInteger(numCells);
      } while (array[index] !== "");

      array[index] = j;
    }

    this.setState({
      fieldArray: array,
      widthField: fieldParams.widthField,
      countFields: numCells
    });
  };

  render() {
    const { fieldArray, widthField } = this.state;

    if (fieldArray.length === 0) {
      return null;
    }

    return (
      <MainStyled>
        <GameName>Memory training</GameName>
        <PlayingField fieldArray={fieldArray} widthField={widthField} />
      </MainStyled>
    );
  }
}
