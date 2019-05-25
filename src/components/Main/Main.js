import React from "react";
import { PlayingField } from "../PlayingField/PlayingField";
import {
  MainStyled,
  GameName,
  StartScreen,
  StartButton,
  Level
} from "./Main.styled";

export class Main extends React.Component {
  state = {
    level: 2,
    widthField: 0,
    countFields: 0,
    fieldArray: [],
    gameProcessArray: [],
    gameProcess: false,
    isStartGame: false,
    rightAnswersCount: 0,
    wrongAnswersCount: 0,
    reloadGame: false
  };

  componentDidUpdate() {
    const { rightAnswersCount, level, reloadGame } = this.state;

    if (rightAnswersCount === level) {
      this.setState(prevState => {
        const nextLevel =
          prevState.wrongAnswersCount > 0
            ? prevState.level - prevState.wrongAnswersCount
            : prevState.level + 1;
        return {
          level: nextLevel,
          rightAnswersCount: 0,
          wrongAnswersCount: 0,
          reloadGame: true
        };
      });
    }

    if (reloadGame) {
      this.handleStartGame();
    }
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
    let emptyArray = [];

    for (let i = 0; i < numCells; i++) {
      array.push("");
      emptyArray.push("");
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
      gameProcessArray: emptyArray,
      widthField: fieldParams.widthField,
      countFields: numCells
    });
  };

  handleStartGame = () => {
    const { level } = this.state;

    this.generateRandomArray(level);

    this.setState({
      isStartGame: true,
      gameProcess: false,
      reloadGame: false
    });

    setTimeout(() => {
      this.setState({
        gameProcess: true
      });
    }, 3000);
  };

  handleClickOnItem = id => {
    const { fieldArray } = this.state;

    const numId = +id.replace("field_", "");

    if (fieldArray[numId] !== "" && fieldArray[numId] !== "x") {
      this.setState(prevState => {
        return {
          gameProcessArray: [
            ...prevState.gameProcessArray.slice(0, numId),
            (prevState.gameProcessArray[numId] = "o"),
            ...prevState.gameProcessArray.slice(numId + 1)
          ],
          rightAnswersCount: prevState.rightAnswersCount + 1
        };
      });
    } else {
      this.setState(prevState => {
        return {
          gameProcessArray: [
            ...prevState.gameProcessArray.slice(0, numId),
            (prevState.gameProcessArray[numId] = "x"),
            ...prevState.gameProcessArray.slice(numId + 1)
          ],
          wrongAnswersCount: prevState.wrongAnswersCount + 1
        };
      });
    }
  };

  render() {
    const {
      fieldArray,
      widthField,
      gameProcess,
      gameProcessArray,
      isStartGame,
      level
    } = this.state;

    return (
      <MainStyled>
        <GameName>Тренажер памяти</GameName>
        {isStartGame ? (
          <PlayingField
            hidden={gameProcess}
            fieldArray={gameProcess ? gameProcessArray : fieldArray}
            widthField={widthField}
            onClick={this.handleClickOnItem}
          />
        ) : (
          <StartScreen>
            <Level>
              Следующий уровень: <span>{level}</span>
            </Level>
            <StartButton onClick={this.handleStartGame}>Старт игры</StartButton>
          </StartScreen>
        )}
      </MainStyled>
    );
  }
}
