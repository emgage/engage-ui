import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';

import { ALERT } from '../ThemeIdentifiers';
import * as baseTheme from './Alert.scss';

export interface Props {
    id: string;
    style?: React.CSSProperties;
//theme?: any;
  }
  
  class Alert extends React.Component<Props, {}> {
    render() {
      const {  id, style } = this.props;
      return (
        <div id={id} style={style} >
         
        </div>
      );
    }
  }
export default themr(ALERT, baseTheme)(Alert) as ThemedComponentClass<Props, {}>;