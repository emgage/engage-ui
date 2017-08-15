import * as React from 'react';
// import Card from './Card';
import * as style from './Picker.scss';
import List from '../List/List';
import Item from '../List/Item';
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
    // const arrayCard = this.props.array;
    // console.log('arrayCard:', arrayCard);
    // image={input.image} name={input.name} email={input.email} grey={input.grey}
    return (
      <div className={style.cardBorder}>
        {/* { arrayCard.map(input => <Card key={input.key} image={input.image} name={input.name} email={input.email} grey={input.grey} />)} */}
         <List type="default"> 
          { this.props.array.map(input => <Item key={input.key} children={ React.createElement('div', { className: style.flex }, <img className={ style.avatarImage + ' ' + style.cardElem } src={ input.image } />, React.createElement('span', { className: style.cardElem + ' ' + style.nameStyle }, input.name), React.createElement('span', { className: style.cardElem + ' ' + style.emailStyle }, input.email)) } />) } 
            {/* React.createElement('div', {}, <img className={ style.avatarImage + ' ' + style.cardElem } src={ input.image } />, React.createElement('span', { className: style.cardElem + ' ' + style.nameStyle }, input.name, React.createElement('span', { className: style.cardElem + ' ' + style.emailStyle }, input.email))) */}
               {/* } />) }    */}
            {/* React.createElement('img', { className: style.avatarImage + ' ' + style.cardElem, src: input.image }, */}
             {/* 'HELLO' */}
         </List> 
      </div>
    );
  }
}

export default CardList;
