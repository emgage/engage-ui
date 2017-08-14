import * as React from 'react';
import Card from './Card';
import * as style from './Picker.scss';

export interface Props {
  array: { key: number, image: string, name: string, email: string }[];
}

export interface State {
  array?: object[];
}

class CardList extends React.Component<Props, {}> {
  constructor(props: any) {
    super(props);
  }
  render() {
    console.log('array!:', this.props.array);
    const arrayCard = this.props.array;

    console.log('arrayCard:', arrayCard);

    // const {
    //   array: [],
    // } = this.props;
    return (
      <div className={style.cardBorder}>
         { arrayCard.map(input => <Card key={input.key} image={input.image} name={input.name} email={input.email} />)}
      </div>
    );
  }
}




export default CardList;
