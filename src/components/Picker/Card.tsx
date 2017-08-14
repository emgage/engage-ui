import * as React from 'react';
// import { themr, ThemedComponentClass } from 'react-css-themr';
// import { PICKER } from '../ThemeIdentifiers';
// import TextField from '../TextField';
// import { DisplayMoreInfo } from './PickerEnum';

import * as style from './Picker.scss';

export interface Props {
  image: string;
  name: string;
  email: string;
}

export interface State {
  array?: object[];
}

class Card extends React.Component<Props, {}> {
  constructor(props: any) {
    super(props);
  }
  render() {
    // const {
    //   array: [],
    // } = this.props;
    console.log('this.props:', this.props);
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

// export default themr(PICKER, baseTheme)(Card) as ThemedComponentClass<Props, State>;
export default Card;
