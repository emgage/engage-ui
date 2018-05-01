import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import { classNames, variationName } from '@shopify/react-utilities/styles';
import { DESCRIPTIONLIST } from '../ThemeIdentifiers';
import * as baseTheme from './DescriptionList.scss';

export type Type = 'default' | 'divider';

export interface ItemArray {
  term: string,
  description: string,
}

export type Item = ItemArray;

export interface Props {
    items: Item[];
    type?: Type;
    theme?: any;
    style?:string;
}

const descriptionList = ({
   items,
   type,
   style,
   theme,
 }: Props)=> {
      const itemMarkup = items.map((item:Item) => {
        const term = item.term;
        const description = item.description;
        const classNameTerm = style ===  "Inline" ?  classNames(theme.term) : '' ;
        const classNameDescription = classNames(theme.description);
        return (
            <React.Fragment>
            <dt className={classNameTerm}>{term}</dt>
            <dd className={classNameDescription}>{description}</dd>
            </React.Fragment>
        );
      });
      
      const background = type === 'divider' && style ===  "Stacked" ? baseTheme['description-list-divider'] : type === 'default' && style ===  "Stacked" ? baseTheme['naked'] : '';
      const className = classNames(
        style ===  "Inline" ?  theme.descriptionList : '',
        type && theme[variationName('type', type)]
      );
    return (
         <div>
          <dl className={className + ' ' + background}>
            {itemMarkup}
          </dl>
        </div>
    );
  };
  export default themr(DESCRIPTIONLIST, baseTheme)(descriptionList) as ThemedComponentClass<Props, {}>;
  