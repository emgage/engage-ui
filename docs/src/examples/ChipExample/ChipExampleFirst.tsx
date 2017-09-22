import * as React from 'react';
import { Chip } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';


export interface IProps{
}

export interface IState {
}

const imgForChip = {
  url:'http://www.newsshare.in/wp-content/uploads/2017/04/Miniclip-8-Ball-Pool-Avatar-5.jpg',
  alt:'Image',
};

class ChoiceListExample extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  valueUpdater(field: any) {
    return (value: any) => this.setState({ [field]: value });
  }

  render() {
    return (
      <div className={styles.example}>
        <h3>1. Chip with text</h3>
        <Chip>Trevor Hansen</Chip>
        <h3>2. Chip with image and Text</h3>
        <Chip
          image={imgForChip}
        >
          Trevor Hansen
        </Chip>
        <h3>3. Clickable Chip with text</h3>
        <Chip
          clickable
          onClick={() => {alert('You clicked on Chip');}}
        >
          Trevor Hansen
        </Chip>
        <h3>4. Removable Chip with text</h3>
        <Chip
          removable
          onRemove={() => {alert('You clicked to remove Chip');}}
        >
          Trevor Hansen
        </Chip>
        <h3>5. Clickable and removable Chip with text and image</h3>
        <Chip
          clickable
          removable
          onClick={() => {alert('You clicked on Chip');}}
          onRemove={() => {alert('You clicked on remove button of Chip.');}}
          image={imgForChip}
        >
          Trevor Hansen
        </Chip>
        <h3>5. Transparent Chip with text and image having clickable and removable events</h3>
        <Chip
          transparent
          clickable
          removable
          onClick={() => {alert('You clicked on Chip');}}
          onRemove={() => {alert('You clicked on remove button of Chip.');}}
          image={imgForChip}
        >
          Trevor Hansen
        </Chip>
      </div>
    );
  }
}

export default ChoiceListExample;
