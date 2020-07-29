import * as React from 'react';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { classNames } from '@shopify/react-utilities';
import { FLEXBOX } from '../ThemeIdentifiers';
import * as baseTheme from './FlexBox.scss';

export type FlexAlign = 'Start' | 'Center' | 'End' | 'Stretch';
export type FlexJustify = 'Start' | 'Center' | 'End' | 'SpaceAround' | 'SpaceBetween';
export type FlexDirection = 'Row' | 'RowReverse' | 'Column' | 'ColumnReverse';
export type FlexWrap = 'NoWrap' | 'Wrap' | 'WrapReverse';

export interface Props {
  // Set display of flex container.
  inline?: boolean;
  // Sets the direction of flex items in a flex container. Value of direction can be one from this list : "Row", "RowReverse", "Column", "ColumnReverse"
  direction?: FlexDirection ;
  // Sets the alignment of flex items on the main axis. Value of justify can be one from this list : "Start", "Center", "End", "SpaceAround", "SpaceBetween"
  justify?: FlexJustify;
  // Sets the alignment of flex items on the cross axis. Value of align can be one from this list : "Start", "Center", "End", "Stretch"
  align?: FlexAlign;
  // Defines whether flex items are forced in a single line or can be flowed into multiple lines. Value of wrap can be one from this list : "NoWrap", "Wrap", "WrapReverse"
  wrap?: FlexWrap;
  // To display the styling.
  componentStyle?: React.CSSProperties;
  // Set a custom class
  componentClass?: string;
  // Theme to be injected via css-themr.
  theme?: any;
}

class FlexBox extends React.PureComponent<Props, {}> {
  render() {
    const {
      inline = false,
      direction ,
      justify,
      align,
      wrap,
      componentClass
    } = this.props;

    let className = inline ? this.props.theme.inline : this.props.theme.flex;
    className = classNames(componentClass, className);

    // set direction property css
    switch (direction) {
      case 'Column':
        className = classNames(this.props.theme.column, className);
        break;
      case 'RowReverse':
        className = classNames(this.props.theme.rowReverse, className);
        break;
      case 'ColumnReverse':
        className = classNames(this.props.theme.columnReverse, className);
        break;
      case 'Row':
      default:
        className = classNames(this.props.theme.row, className);
        break;
    }

    // set justify property css
    switch (justify) {
      case 'End':
        className = classNames(this.props.theme.contentEnd, className);
        break;
      case 'Center':
        className = classNames(this.props.theme.contentCenter, className);
        break;
      case 'SpaceAround':
        className = classNames(this.props.theme.contentAround, className);
        break;
      case 'SpaceBetween':
        className = classNames(this.props.theme.contentBetween, className);
        break;
      case 'Start':
      default:
        className = classNames(this.props.theme.contentStart, className);
        break;
    }

    // set align property css
    switch (align) {
      case 'Start':
        className = classNames(this.props.theme.alignStart, className);
        break;
      case 'End':
        className = classNames(this.props.theme.alignEnd, className);
        break;
      case 'Center':
        className = classNames(this.props.theme.alignCenter, className);
        break;
      case 'Stretch':
      default:
        className = classNames(this.props.theme.alignStretch, className);
        break;
    }

    // set wrap property css
    switch (wrap) {
      case 'Wrap':
        className = classNames(this.props.theme.wrap, className);
        break;
      case 'WrapReverse':
        className = classNames(this.props.theme.WrapReverse, className);
        break;
      case 'NoWrap':
      default:
        className = classNames(this.props.theme.noWrap, className);
        break;
    }

    return (
            <div className={className} style={this.props.componentStyle}>
                {this.props.children}
            </div>
    );
  }
}

export default themr(FLEXBOX, baseTheme)(FlexBox) as ThemedComponentClass<Props, {}>;
