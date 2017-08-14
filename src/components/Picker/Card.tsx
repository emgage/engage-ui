import * as React from 'react';

import * as style from './Picker.scss';
export interface Props {
  image: string;
  name: string;
  email: string;
}

class Card extends React.Component<Props, {}> {
  constructor(props: any) {
    super(props);
  }
  render() {
    return (
      <div>
        <div className={style.cardItem}>
          <img className={ style.avatarImage + ' ' + style.cardElem } src={ this.props.image } alt="not found" />
          <div className={style.cardElem + ' ' + style.nameStyle }>{ this.props.name }</div>
          <span className={ style.cardElem + ' ' + style.emailStyle + ' ' + style.grey }>{ this.props.email }</span>
        </div>
      </div>
    );
  }
}

export default Card;
