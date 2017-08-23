import * as React from 'react';

import * as style from './Picker.scss';
export interface Props {
  image?: string;
  nameBefore?: string;
  bold?: string;
  nameAfter?: string;
  email?: string;
  isHighlighted?: boolean;
}

class Card extends React.Component<Props, {}> {
  constructor(props: any) {
    super(props);
  }
  render() {
    let cardBackground;
    if (this.props.isHighlighted) cardBackground = style.cardItem + ' ' + style.grey;
    else cardBackground = style.cardItem;
    console.log('nameBefore"' + this.props.nameBefore + '"');
    console.log('query:"' + this.props.bold + '"');
    console.log('nameAfter:"' + this.props.nameAfter + '"');
    return (
      <div>
        <div className={ cardBackground }>
          <span><img className={ style.avatarImage + ' ' + style.cardElem } src={ this.props.image } alt="not found" /></span>
          <span className={style.cardElem + ' ' + style.nameStyle }>
            <span>{ this.props.nameBefore }</span>
            <span className={style.bold}>{ this.props.bold }</span>
            <span>{ this.props.nameAfter }</span>
          </span>
          <span className={ style.cardElem + ' ' + style.emailStyle }>{ this.props.email }</span>
        </div>
      </div>
    );
  }
}

export default Card;
