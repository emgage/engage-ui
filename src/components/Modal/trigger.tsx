import * as  React from 'react';
import Button from '../Button';
import Helpers from './helpers';
import Base from './base';

export interface Props {
  body: any,
  children: any,
  className: string,
  classes: any,
  id: string,
  onClick: any,
  opened: boolean,
  type: 'button' | 'link' | 'span' | 'div',
  icon: any,
}

const Trigger = (props: Props) => {
  const icon = props.icon ? <i className={`uk-icon-${props.icon}`} /> : null;

  const cssClassNames = Helpers.cleanClasses([
    props.classes,
    props.className,
  ]);

  const ignoreProps = [
    'body',
    'children',
    'classes',
    'id',
    'opened',
    'type',
  ];

  const cleanProps = Helpers.cleanProps(ignoreProps)(props);

  const type = {
    button: <Button
      {...props}
    >Open
    </Button>,

    link: <a
      {...props}
    >
      click here to open modal
    </a>,

    span: <span
      {...cleanProps}
      className={cssClassNames}
      data-id={props.id}
    >
      {props.body}
      {props.children} {icon}
    </span>,

    div: <div
      {...cleanProps}
      className={cssClassNames}
      data-id={props.id}
    >
      {props.body}
      {props.children} {icon}
    </div>,
  };

  return props.type ? type[props.type] : type['button'];
};

export default Base(Trigger);
