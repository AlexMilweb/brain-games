import React from "react";
import {
  PlayingFieldStyled,
  FieldItem,
  FieldContainer
} from "./PlayingField.styled";

export class PlayingField extends React.Component {
  renderFieldItems = () => {
    const { fieldArray } = this.props;

    return fieldArray.map((item, index) => {
      return <FieldItem key={index} active={item !== ""} />;
    });
  };

  render() {
    const { widthField } = this.props;

    return (
      <PlayingFieldStyled>
        <FieldContainer widthField={widthField}>
          {this.renderFieldItems()}
        </FieldContainer>
      </PlayingFieldStyled>
    );
  }
}
