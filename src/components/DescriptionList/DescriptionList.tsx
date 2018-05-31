import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import { classNames, variationName } from '@shopify/react-utilities/styles';
import { DESCRIPTIONLIST } from '../ThemeIdentifiers';
import * as baseTheme from './DescriptionList.scss';
import Term from './Term';
import Description from './Description';

export type Type = 'default' | 'divider';

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

class DescriptionList extends React.PureComponent<Props, never> {
  static Term = Term;
  static Description = Description;

  render() {
    const { children, customType, theme, customStyle } = this.props;
    const background = customType === 'divider' && customStyle ===  'Stacked' ? baseTheme['description-list-divider'] : customType === 'default' && customStyle ===  'Stacked' ? baseTheme['naked'] : '';
    const className = classNames(
      customStyle ===  'Inline' ?  theme.descriptionList : '',
      customType && theme[variationName('type', customType)]
    );

    const classNameTerm = customStyle ===  'Inline' ?  classNames(theme.term) : '' ;

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
