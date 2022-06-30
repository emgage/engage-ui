import * as React from 'react';
import { autobind } from '@shopify/javascript-utilities/decorators';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { classNames } from '@shopify/react-utilities/styles';

import { ACCORDION } from '../ThemeIdentifiers';
import * as baseTheme from './Accordion.scss';
import Icon from '../Icon';

export interface State {
  activeDelete?: boolean;
}
export interface Props {
  // Define accordion item is active or not
  active?: boolean;
  clickHandler?(event: React.FormEvent<HTMLElement>): void;
  // Click handler for children items
  childrenClickHandler?(event: React.FormEvent<HTMLElement>): void;
  // Item of accordion component to be displayed
  children: React.ReactElement<any>;
  componentClass?: string;
  // Header of accordion item to be displayed
  header: React.ReactElement<any>;
  index: number;
  style?: any;
  // Make accordion item active or inactive.
  toggle?(index: number): void;
  theme?: any;
  position?: string;
  icon?: string;
  isDelete?: boolean;
  activeDelete?: boolean;
  onDeleteClick?: any;
  rotate?: any;
}

class AccordionItem extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      activeDelete: false,
    };
  }

  handleClick = (event: React.FormEvent<HTMLElement>) => {
    if (this.props.clickHandler) {
      this.props.clickHandler(event);
    }
  }

  handleClickChildren = (event: React.FormEvent<HTMLElement>) => {
    if (this.props.childrenClickHandler) {
      this.props.childrenClickHandler(event);
    }
  }

  render() {
    const { activeDelete } = this.state;
    const {
      componentClass = '',
      header,
      active,
      style,
      theme,
      position = 'right',
      isDelete,
      icon = 'chevronDown',
      onDeleteClick,
        children,
        rotate,
    } = this.props;

    const containerClass = classNames(
      componentClass,
      theme.accordionItem
    );

    const headerClass = classNames(
      theme.header,
      active && theme.active
    );

    return (
      // <div className={containerClass} style={ active ? { overflow: 'visible', height: 'auto' } : { overflow: 'hidden', height: 38 } }>
      //   <div className={headerClass} style={style} onClick={this.clickHandler} onMouseEnter={()=> this.setState({ activeDelete : true })} onMouseLeave ={()=> this.setState({ activeDelete : false })}>
      //   {header}
      //     {position === 'left' ? <Icon source="chevronRight" componentColor="black" componentClass={theme.AccordianIcon}></Icon> : <Icon source="chevronDown" componentColor="black" componentClass={theme.AccordianIcon}></Icon>}
      //     {/* {position === 'right' ? <Icon source="chevronDown" componentColor="black" componentClass={theme.AccordianIcon}></Icon> : null} */}
      //     {isDelete && activeDelete && <div>delete</div> }

      //   </div>

      //   <div className={active ? theme.body : theme.bodyCollapsed} onClick={this.handleClickChildren}>
      //     {active && children}
      //   </div>
      // </div>

      <div className={containerClass} style={active ? { overflow: 'visible', height: 'auto' } : { overflow: 'hidden', height: 38 }}>

        {position === 'right' ?

          <div className={headerClass} style={style} onClick={this.clickHandler}>
            {header}
            <Icon source={icon ? icon : 'chevronDown' as any} componentColor="black" componentStyle={ rotate && active ? { transform: `rotate(${rotate}deg)` } : {}} componentClass={theme.AccordianIcon}/>
          </div>
          :

          <div className={headerClass} style={style} onClick={this.clickHandler} onMouseEnter={() => this.setState({ activeDelete: true })} onMouseLeave={() => this.setState({ activeDelete: false })}>
             <span style={{ display: 'flex', justifyContent: 'left' }}>
              <Icon source={icon ? icon : 'chevronDown' as any} componentColor="black"  componentStyle={rotate && active ? { transform: `rotate(${rotate}deg)` } : {}} componentClass={theme.AccordianIcon}/>
              {header}
               </span>
            {isDelete && activeDelete && <Icon source="delete" onClick={onDeleteClick}/>}
          </div>
        }
        <div className={active ? theme.body : theme.bodyCollapsed} onClick={this.handleClickChildren}>
          {active && children}
        </div>
      </div>

    );
  }

  @autobind
  private clickHandler(event: any) {
    if (typeof this.props.toggle !== 'undefined') {
      this.props.toggle(this.props.index);
    }
    this.handleClick(event);
  }
}
export default themr(ACCORDION, baseTheme)(AccordionItem) as ThemedComponentClass<Props, never>;
