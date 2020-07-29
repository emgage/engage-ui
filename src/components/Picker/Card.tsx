import * as React from 'react';
import * as style from './Picker.scss';

import FlexBox from '../FlexBox';

export interface Props {
  image?: string;
  nameBefore?: string;
  bold?: string;
  nameAfter?: string;
  email?: string;
  isHighlighted?: boolean;
  alt?: string;
}

class Card extends React.PureComponent<Props, {}> {
  constructor(props: Props) {
    super(props);
  }
  render() {
    const { isHighlighted = false } = this.props;
    const cardBackground = (isHighlighted) ? style.cardItem + ' ' + style.highlighted : style.cardItem;
    return (
      <div>
        <div className={cardBackground}>
        <FlexBox align="Center">
          {
            this.props.image ?
              <span><img className={style.avatarImage} src={this.props.image} alt={this.props.alt} aria-hidden={!this.props.nameAfter || !this.props.nameBefore} /></span>
              : null
          }
          <span className={style.nameStyle}>
            <span>{this.props.nameBefore}</span>
            <span className={style.hinting}>{this.props.bold}</span>
            <span>{this.props.nameAfter}</span>
          </span>
          <span className={style.emailStyle} aria-hidden>{this.props.email}</span>
          </FlexBox>
        </div>
      </div>
    );
  }
}

export default Card;
