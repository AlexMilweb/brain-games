import React from "react";
import pt from "prop-types";
import {
  PlayingFieldStyled,
  FieldItem,
  FieldContainer
} from "./PlayingField.styled";

export class PlayingField extends React.Component {
  static propTypes = {
    active: pt.bool,
    hidden: pt.bool,
    fieldArray: pt.array,
    widthField: pt.number,
    onClick: pt.func
  };

  handleClick = e => {
    this.props.onClick(e.target.getAttribute("id"));
  };

  renderFieldItems = () => {
    const { fieldArray, hidden } = this.props;

    return fieldArray.map((item, index) => {
      return (
        <FieldItem
          onClick={this.handleClick}
          id={`field_${index}`}
          key={index}
          active={(!hidden && item !== "") || item === "o"}
          isWrong={item === "x"}
        />
      );
    });
  };

  render() {
    const { widthField, hidden } = this.props;

    return (
      <PlayingFieldStyled hidden={!hidden}>
        <FieldContainer widthField={widthField}>
          {this.renderFieldItems()}
        </FieldContainer>
      </PlayingFieldStyled>
    );
  }
}
