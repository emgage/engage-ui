import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import { classNames, variationName } from '@shopify/react-utilities/styles';
import { LIST } from '../ThemeIdentifiers';
import * as baseTheme from './DescriptionList.scss';
//import ListItem from './ListItem';
import Select from '../Select';

export type Type = 'default' | 'divider';

export type Item = {
  term: string,
  description: string,
};

export interface Props {
    items?: Item[];
    type?: Type;
    theme?: any;
}
//class DescriptionList extends React.Component<Props, never> {
  
 const descriptionList = ({
   items,
   type,
   theme,
 }: Props)=> {
      let itemsMarkup : React.ReactNode;
      itemsMarkup = this.props.items.map(renderItem);
 //itemsMarkup = this.props.items.map((item:Item) => {
 //       const term = item.term;
 //       const description = item.description;
  //    });
      const background = this.props.type === 'divider' ? baseTheme['list-divider'] : this.props.type === 'default' ? baseTheme['naked'] : '';
      const className = classNames(
        this.props.theme.list,
        this.props.type && this.props.theme[variationName('type', this.props.type)]
      );
      
      return (
        <div>
          <Select label="Items Display:" labelHidden options={[
              'Stacked',
              'Inline',
          ]} />
          <dl className={className + ' ' + background}>
          {itemsMarkup}
          </dl>
        </div>);
    }

    function renderItem(item:Item) {
      return (
        <div>
          <dt>{item.term}</dt>
          <dd>{item.description}</dd>
      </div>
      );
    }
  export default themr(LIST, baseTheme)(descriptionList) as ThemedComponentClass<Props, {}>;
  