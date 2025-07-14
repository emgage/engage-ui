import * as React from 'react';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { classNames } from '@shopify/react-utilities/styles';

import { TABLE } from '../ThemeIdentifiers';

import * as baseTheme from './Table.scss';
import Icon from '../Icon';

// Accessibility values for scope will be col or row
// If its for thead > th then use 'col'
// If its for tbody > th then use 'col'
export type Scope = 'col' | 'row';

export interface Props {
  // Accessibility id attribute, this will match with header attribute added in td
  accessibilityId?: string;
  // Unique ID
  componentId?: string;
  // Accessibility scope attribute, this can be used instead of id
  accessibilityScope?: Scope;
  // Any custom class that user wants to add which could be for setting width or any custom styling
  className?: string;
  // If sorting is enabled, then clickhndler will get triggered on click
  clickHandler?(field: string, sortBy: string): void;
  // To set colspan value
  colSpan?: number;
  // Custom style, if user wants to add in th
  componentStyle?: any;
  // Current sort order, it will be only filled if the current sorting field will be this
  order?: string;
  // Set row span value
  rowSpan?: number;
  // This have the key of current heading, this helps in sorting
  sort?: string;
  // If specific key contains an object this prop will tell which key from that object to be used
  sortBy?: string;
  // Callback function to do the server sort
  serverSort?(field: string, sortBy: string): void;
  theme?: any;

  allowDrag?: boolean;
  isFirst?: boolean;
  allowAddRow?: boolean;
  onPlusClick?(position: 'right' | 'left'): void;
  onResize?(width: number, nextWidth: number): void;
}

class TableHead extends React.PureComponent<Props, any> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hoverLeftColumn: false,
      hoverRightColumn: false,
      isDragging: false,
    }
  }

  // Function to trigger the clickhandler if its defined
  triggerClick = () => {
    const { clickHandler, sort = '', serverSort, sortBy = '' } = this.props;

    if (sort && sortBy) {
      if (!serverSort) {
        if (sort && clickHandler) {
          clickHandler(sort, sortBy);
        }
      } else {
        serverSort(sort, sortBy);
      }
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

    return;
  }

  setHoverLeftColumn = (isHovered: boolean) => {
    this.setState({ hoverLeftColumn: isHovered });
  }
  setHoverRightColumn = (isHovered: boolean) => {
    this.setState({ hoverRightColumn: isHovered });
  }

  handleMouseDown = (e: any) => {
    const { onResize } = this.props;
    const startX = e.clientX;

    const thElement = e.target.parentElement; // Get the `th` element
    const startWidth = thElement.getBoundingClientRect().width; // Get its current width

    const nextStartWidth = thElement.nextElementSibling.getBoundingClientRect().width;; // Get its current width

    const handleMouseMove = (e: any) => {
      const delta = e.clientX - startX;
      const newWidth = Math.max(startWidth + delta, 50);
      const newNextWidth = Math.max(nextStartWidth - delta, 50);
      this.setState({
        isDragging: true,
      });
      if ((startWidth + nextStartWidth) == (newWidth + newNextWidth)) {
        onResize && onResize(newWidth, newNextWidth);
      }
    };

    const handleMouseUp = () => {
      this.setState({
        isDragging: false,
      });
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  render() {
    const { accessibilityId = '', componentId = '', accessibilityScope, children, colSpan, order, rowSpan, sort, componentStyle, theme } = this.props;
    const { isFirst, allowAddRow, onPlusClick, allowDrag } = this.props;
    const customClassName = this.getClassName();
    const { hoverLeftColumn, hoverRightColumn, isDragging } = this.state;

    const canBeDragged = allowAddRow && allowDrag;

    return (
      <th
        className={customClassName}
        scope={accessibilityScope}
        id={accessibilityId ? accessibilityId : componentId ? `${componentId}` : ''}
        colSpan={colSpan}
        rowSpan={rowSpan}
        style={{ ...componentStyle, position: 'relative', ...(isDragging ? { cursor: 'ew-resize' } : {}) }}
        onClick={this.triggerClick}>
        <div className={theme.sortingHeader}>
          {children}
          {
            sort ?
              <div className={theme.sortIcon}>
                {
                  order ?
                    order === 'asc' ? <Icon componentClass={theme.iconStyle} source="caretUp" /> : <Icon componentClass={theme.iconStyle} source="caretDown" />
                    :
                    <div>
                      <Icon componentClass={theme.iconGroupStyle} componentColor="skyDark" source="caretUp" />
                      <Icon componentClass={theme.iconGroupStyle} componentColor="skyDark" source="caretDown" />
                    </div>
                }
              </div>
              : ''
          }
        </div>
        {allowAddRow && (
          <>
            {isFirst && (<div
              className={theme.iconPlusWrapper}
              onMouseEnter={() => this.setHoverLeftColumn(true)}
              onMouseLeave={() => this.setHoverLeftColumn(false)}
              style={{ left: '0px' }}
            >
              {hoverLeftColumn
                && (
                  <>
                    <Icon
                      componentColor="inkLight"
                      onClick={(e: any) => {
                        e.stopPropagation();
                        onPlusClick && onPlusClick('left')
                      }}
                      componentClass={theme.iconPlusClick}
                      source="add" />
                    <span
                      className={`${theme.resizeHandle}`}
                    />
                  </>
                )
              }
            </div>
            )}
            <div
              className={theme.iconPlusWrapper}
              onMouseEnter={() => this.setHoverRightColumn(true)}
              onMouseLeave={() => this.setHoverRightColumn(false)}
              style={{ right: '-7px', ...(canBeDragged || isDragging ? { cursor: 'ew-resize' } : {}) }}
              onMouseDown={canBeDragged ? this.handleMouseDown : () => { }}
            >
              {(isDragging || hoverRightColumn)
                && (
                  <>
                    <Icon
                      componentColor="inkLight"
                      onClick={(e: any) => {
                        e.stopPropagation();
                        onPlusClick && onPlusClick('right')
                      }}
                      componentClass={theme.iconPlusClick}
                      source="add" />
                    <span
                      className={`${theme.resizeHandle}`}
                    />
                  </>
                )
              }
            </div>

          </>
        )}
      </th>
    );
  }
}

export default themr(TABLE, baseTheme)(TableHead) as ThemedComponentClass<Props, {}>;
