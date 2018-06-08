import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import { classNames, variationName } from '@shopify/react-utilities/styles';
import { DESCRIPTIONLIST } from '../ThemeIdentifiers';
import * as baseTheme from './DescriptionList.scss';
// import Term from './Term';
// import Description from './Description';

// Define type for DescriptionList which can be without divider or with divider 
export type Type = 'default' | 'divider';

// All prototypes type
export interface Props {
  // Set children to display description list with term and description elements
  children?:React.ReactNode;
  // Set type whether default or divider
  type?: Type;
  // Set theme for DescriptionList
  theme?: any;
  // Set Style to be applied. Available options: Inline | Stacked'
  style?:string;
}
// DescriptionList component, in here wrap all other required components or DOM for the DescriptionList
class DescriptionList extends React.PureComponent<Props, never> {
  render() {
    const { children, type, theme, style } = this.props;
    const background = type === 'divider' && style ===  'Stacked' ? baseTheme['description-list-divider'] : type === 'default' && style ===  'Stacked' ? baseTheme['naked'] : '';
    const className = classNames(
      style ===  'Inline' ?  theme.descriptionList : '',
      type && theme[variationName('type', type)]
    );
    // Set class for term based on the style
    const classNameTerm = style ===  'Inline' ?  classNames(theme.term) : '' ;
    // Iterate through children and clone the element to set style for term 
    const childrenWithProps = React.Children.map(children, child  =>
      React.cloneElement(child as React.ReactElement<any>, { style: classNameTerm }));

    return (
      <div>
      <dl className={className + ' ' + background}>
      {childrenWithProps}
      </dl>
      </div>
    );
  }
}

export default themr(DESCRIPTIONLIST, baseTheme)(DescriptionList) as ThemedComponentClass<Props, {}>;
