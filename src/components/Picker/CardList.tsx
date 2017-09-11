import * as React from 'react';
import List from '../List/List';
import Item from '../List/Item';
import * as style from './Picker.scss';
export interface Props {
  array: { key: number, image: string, name: string, email: string, grey: boolean }[];
}

export interface State {
  array?: object[];
}

class CardList extends React.Component<Props, {}> {
  constructor(props: any) {
    super(props);
  }
  render() {
    return (
      <div className={style.cardBorder}>
         <List type="default">
          { this.props.array.map(input => <Item key={input.key} children={
            React.createElement('div', { className: style.flex }, <img className={ style.avatarImage + ' ' + style.cardElem } src={ input.image } />,React.createElement('span', { className: style.cardElem + ' ' + style.nameStyle }, input.name), React.createElement('span', { className: style.cardElem + ' ' + style.emailStyle }, input.email))
            } />)
          }
         </List>
      </div>
    );
  }
}

export default CardList;