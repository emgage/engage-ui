import * as React from 'react';

import * as style from './Picker.scss';
export interface Props {
  image: string;
  name: string;
}

class PickedCard extends React.Component<Props, {}> {
  constructor(props: any) {
    super(props);
  }
  render() {
    return (
      <div>
        <div className={style.pickedCardContainer}>
          {/* <div className={style.pickedCard}> */}
            <img className={ style.pickedAvatarImage + ' ' + style.cardElem } src={ this.props.image } alt="not found" />
            <div className={style.pickedNameStyle }>{ this.props.name }</div>
          {/* </div> */}
        </div>
      </div>
    );
  }
}

export default PickedCard;
