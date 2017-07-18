import * as  React from 'react';
import  base  from './base';

import Button from '../Button';
import { helpers } from "./uikit";

export interface Props {
  body      : any,
  children  : any,
  className : string,
  classes   : any,
  kitid     : string,
  onClick   : any,
  opened    : boolean,
  type      : 'button'|'link'|'span'|'div',
  icon      : any,
}

const Trigger = (props: Props) => {
  const icon = props.icon ? <i className={`uk-icon-${props.icon}`}/> : null; 

  const cssClassNames = helpers.cleanClasses([
    props.classes,
    props.className
  ]);


  // Remove non valid html attributes
  const ignoreProps = [
    'body',
    'children',
    'classes',
    'kitid',
    'opened',
    'type'
  ];

  const cleanProps = helpers.cleanProps(ignoreProps)(props);


  // Element
  const type = {
    button: <Button
      {...props}
    >Open
    </Button>,

    link: <Button
      {...props}
    >
    click here to open modal
    </Button>,

    span : <span
      {...cleanProps}
      {...helpers.events}
      className={cssClassNames}
      data-kitid={props.kitid}
    >
      {props.body}
      {props.children} {icon}
    </span>,

    div: <div
      {...cleanProps}
      className={cssClassNames}
      {...helpers.events}
      data-kitid={props.kitid}
    >
      {props.body}
      {props.children} {icon}
    </div>
  };
if(props.type === 'span') {

}

  return props.type ? type[props.type] : type['button'];
};

export default base(Trigger);
