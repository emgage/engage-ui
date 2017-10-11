import * as React from 'react';

import * as style from './Picker.scss';
export interface Props {
  image?: string;
  nameBefore?: string;
  bold?: string;
  nameAfter?: string;
  email?: string;
  isHighlighted?: boolean;
  alt?: string;
}
class Card extends React.Component<Props, {}> {
  constructor(props: any) {
    super(props);
  }
  render() {
    const cardBackground = (this.props.isHighlighted) ? style.cardItem + ' ' + style.grey : style.cardItem;
    return (
      <div>
        <div className={ cardBackground }>
          <span><img className={ style.avatarImage + ' ' + style.cardElem } src={ this.props.image } alt={this.props.alt} aria-hidden={!this.props.nameAfter || !this.props.nameBefore}/></span>
          <span className={style.cardElem + ' ' + style.nameStyle }>
            <span>{ this.props.nameBefore }</span>
            <span className={style.bold}>{ this.props.bold }</span>
            <span>{ this.props.nameAfter }</span>
          </span>
          <span className={ style.cardElem + ' ' + style.emailStyle } aria-hidden>{ this.props.email }</span>
        </div>
      </div>
    );
  }
}

export default Card;
