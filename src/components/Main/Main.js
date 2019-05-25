import React from "react";
import { PlayingField } from "../PlayingField/PlayingField";
import {
  MainStyled,
  GameName,
  StartScreen,
  StartButton,
  Level,
  InfoPanel,
  Header
} from "./Main.styled";

export class Main extends React.Component {
  state = {
    level: 2,
    widthField: 0,
    numCells: 0,
    fieldArray: [],
    gameProcessArray: [],
    gameProcess: false,
    isStartGame: false,
    rightAnswersCount: 0,
    wrongAnswersCount: 0,
    reloadGame: false,
    fatigueRate: 0
  };

  componentDidMount() {
    this.setState({
      level: this.getAverageLevel()
    });
  }

  componentDidUpdate() {
    const { rightAnswersCount, level, reloadGame } = this.state;

    if (rightAnswersCount === level) {
      this.setState(prevState => {
        const isWrongs = prevState.wrongAnswersCount > 0;
        const nextLevel = isWrongs
          ? prevState.level - prevState.fatigueRate
          : prevState.level + 1;

        return {
          level: nextLevel,
          rightAnswersCount: 0,
          wrongAnswersCount: 0,
          reloadGame: true,
          fatigueRate: isWrongs ? prevState.fatigueRate + 1 : 0
        };
      });

      const statistic = JSON.parse(localStorage.getItem("statistic"));
      statistic.push(level);

      localStorage.setItem("statistic", JSON.stringify(statistic));
      this.getAverageLevel();
    }

    if (reloadGame) {
      this.handleStartGame();
    }
  }

  getAverageLevel = () => {
    const statistic = JSON.parse(localStorage.getItem("statistic"));
    const average = Math.round(
      statistic.reduce((a, b) => a + b) / statistic.length
    );
    return average;
  };

  randomInteger = num => Math.floor(Math.random() * (num + 1));

  getWidthField = () => {
    const { level } = this.state;
    let widthField;

    for (let i = 2; i * i <= level * 3; i++) {
      widthField = i;
    }
    return widthField;
  };

  generateRandomArray = level => {
    const widthField = this.getWidthField();
    const numCells = widthField * widthField;

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
      gameProcessArray: array.slice(),
      widthField: widthField,
      numCells: numCells
    });
  };

  handleStartGame = () => {
    const { level } = this.state;

    if (!localStorage.getItem("statistic")) {
      localStorage.setItem("statistic", JSON.stringify([]));
    }

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
      level,
      fatigueRate
    } = this.state;

    return (
      <MainStyled>
        <Header>
          <GameName>Тренажер памяти</GameName>
          {isStartGame && (
            <InfoPanel>
              <Level>
                Текущий уровень: <span>{level}</span>
              </Level>
              <Level>
                Уровень усталости: <span>{fatigueRate}</span>
              </Level>
            </InfoPanel>
          )}
        </Header>

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
              Средний уровень запоминания ячеек: <span>{level}</span>
            </Level>
            <StartButton onClick={this.handleStartGame}>Старт игры</StartButton>
          </StartScreen>
        )}
      </MainStyled>
    );
  }
}
