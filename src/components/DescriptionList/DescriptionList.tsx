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
  // Display description list with term and description elements
  children?:React.ReactNode;
  // Type of description list to display. Available options: default | divider
  customType?: Type;
  // Theme to be injected via css-themr
  theme?: any;
  // Style to be applied. Available options: Inline | Stacked
  customStyle?:string;
}
// DescriptionList component, in here wrap all other required components or DOM for the DescriptionList
class DescriptionList extends React.PureComponent<Props, never> {
  render() {
    const { children, customType, theme, customStyle } = this.props;
    const background = customType === 'divider' && customStyle ===  'Stacked' ? baseTheme['description-list-divider'] : customType === 'default' && customStyle ===  'Stacked' ? baseTheme['naked'] : '';
    const className = classNames(
      customStyle ===  'Inline' ?  theme.descriptionList : '',
      customType && theme[variationName('type', customType)]
    );
    // Set class for term based on the style
    const classNameTerm = customStyle ===  'Inline' ?  classNames(theme.term) : '' ;
    // Iterate through children and clone the element to set style for term 
    const childrenWithProps = React.Children.map(children, child  =>
      React.cloneElement(child as React.ReactElement<any>, { customStyle: classNameTerm }));

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
