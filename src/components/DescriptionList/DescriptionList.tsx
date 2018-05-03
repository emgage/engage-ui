import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import { classNames, variationName } from '@shopify/react-utilities/styles';
import { DESCRIPTIONLIST } from '../ThemeIdentifiers';
import * as baseTheme from './DescriptionList.scss';
import Term from './Term';
import Description from './Description';

export type Type = 'default' | 'divider';

//export interface ItemArray {
 // term: string,
//  description: string,
//}

//export type Item = ItemArray;

export interface Props {
    children?:React.ReactNode;
    type?: Type;
    theme?: any;
    style?:string;
}

class DescriptionList extends React.PureComponent<Props, never> {
      static Term = Term;
      static Description = Description;

      render(){     
        const { children, type, theme, style } = this.props;
      const background = type === 'divider' && style ===  "Stacked" ? baseTheme['description-list-divider'] : type === 'default' && style ===  "Stacked" ? baseTheme['naked'] : '';
      const className = classNames(
        style ===  "Inline" ?  theme.descriptionList : '',
        type && theme[variationName('type', type)]
      );
      const classNameTerm = style ===  "Inline" ?  classNames(theme.term) : '' ;
      
    const childrenWithProps = React.Children.map(children, child  => 
                React.cloneElement(child as React.ReactElement<any>, { style: classNameTerm }));
    return (
        <div>
          <dl className={className + ' ' + background}>
            {childrenWithProps}
          </dl>
        </div>
    )
  }
}
export default themr(DESCRIPTIONLIST, baseTheme)(DescriptionList) as ThemedComponentClass<Props, {}>;
  