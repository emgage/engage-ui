import * as React from 'react';
import { cleanClasses} from './helpers';

export interface Props{
    align       : any,
    children    : any,
    className   : string,
    borderRadius: any,
    clear       : any,
    center      : boolean,
    col         : any,
    colSmall    : any,
    colMedium   : any,
    colLarge    : any,
    contrast    : boolean,
    display     : any,
    float       : any,
    hidden      : string,
    id       : string,
    margin      : string,
    order       : any,
    padding     : string,
    position    : any,
    responsive  : string,
    scroll      : any,
    tall        : boolean | string,
    textAlign   : any,
    textVertical: any,
    textWrap    : any,
    vertical    : any,
    viewport    : boolean,
    visible     : string,
    wide        : boolean | string,
    list        : any,
}
export interface State{}


const Base: any = (Cmpt: any) => {
  class UIKitBase extends React.Component<Props, State> {
    render () {
      const props = this.props;
      const classes: any = [ ];

      const containerClasses = cleanClasses([]);

      const id = props.id ; //|| cuid()

      // Elementd
      const component = <Cmpt {...this.props} id={id} classes={(classes)}/>;


      const list = props.list ? (<li className={containerClasses}>{component}</li>) : null;


      const container = (props.center
       || props.col
       || props.colSmall
       || props.colMedium
       || props.colLarge
       || props.vertical)  ? (<div className={containerClasses}>
        {component}
      </div>) : null;

      // return component
      return list || container || component;
    }
  }

  return UIKitBase;
};

export default Base;
