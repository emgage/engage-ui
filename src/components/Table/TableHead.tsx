import * as React from 'react';
import { themr } from '@friendsofreactjs/react-css-themr';
import { classNames } from '@shopify/react-utilities/styles';

import { TABLE } from '../ThemeIdentifiers';

import * as baseTheme from './Table.scss';

// Accessibility values for scope will be col or row
// If its for thead > th then use 'col'
// If its for tbody > th then use 'col'
export type Scope = 'col' | 'row';

export interface Props {
  // Accessibility id attribute, this will match with header attribute added in td
  accessibilityId?: string;
  // Accessibility scope attribute, this can be used instead of id
  accessibilityScope?: Scope;
  // Any custom class that user wants to add which could be for setting width or any custom styling
  className?: string;
  // If sorting is enabled, then clickhndler will get triggered on click
  clickHandler?(field: string, sortBy: string): void;
  // To set colspan value
  colSpan?: number;
  // Current sort order, it will be only filled if the current sorting field will be this
  order?: string;
  // Set row span value
  rowSpan?: number;
  // This have the key of current heading, this helps in sorting
  sort?: string;
  // If specific key contains an object this prop will tell which key from that object to be used
  sortBy?: string;
  // Custom style, if user wants to add in th
  componentStyle?: any;
  theme?: any;
}

class TableHead extends React.Component<Props, never> {
  constructor(props: Props) {
    super(props);
  }

  // Function to trigger the clickhandler if its defined
  triggerClick = () => {
    const { clickHandler, sort, sortBy = '' } = this.props;

    if (sort && clickHandler) {
      clickHandler(sort, sortBy);
    }
  }

  // Get custom classname if user have sent any
  getClassName = () => {
    const { className, theme } = this.props;

    if (className) {
      return classNames(
        theme[className]
      );
    }

    return ;
  }

  render () {
    const { accessibilityId, accessibilityScope, children, colSpan, order, rowSpan, sort, componentStyle } = this.props;
    const customClassName = this.getClassName();

    return (
      <th
        className={customClassName}
        scope={accessibilityScope}
        id={accessibilityId}
        colSpan={colSpan}
        rowSpan={rowSpan}
        style={componentStyle}
        onClick={this.triggerClick}>
        { children }
        {
          sort ? <small> { order ? order : 'asc | desc' }</small> : ''
        }
      </th>
    );
  }
}

export default themr(TABLE, baseTheme)(TableHead);
