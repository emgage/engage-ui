import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import { ALERT } from '../ThemeIdentifiers';
import * as baseTheme from './Alert.scss';
import Icon from '../Icon';
import closeSvg from './icons/close.svg';

export interface State {
  isActive?:boolean;
}

export interface Props {
  children?: React.ReactNode;
  type?: string;
  theme?: any;
  onClose?(): void;
  toggle?(): void;
}
  
  class Alert extends React.Component<Props, State> {
    constructor(props: Props) {
      super(props);
      this.state = {
        isActive:true,
      };
    }
    render() {
      const { children, type, theme } = this.props;
      let classes : string, style : string;
      switch (type) {
        case 'primary':
          style = theme.alertPrimary;
        break;
        case 'success':
          style = theme.alertSuccess;
          break;
        case 'warning' :
          style = theme.alertWarning;
          break;
        case 'danger':
          style = theme.alertDanger;
          break;
        default:
          style = '';
      }
      classes = theme.alert +' '+ style;
      return (
        <React.Fragment>
        { this.state.isActive && <div className={classes}>
          <p>{children}</p><button type="button" className={theme.alertClose} onClick={() => this.closeAlert()}><Icon source={closeSvg} /></button>
        </div>}
        </React.Fragment>
      );
    }
    closeAlert = () => {
      this.setState({
        isActive: false,
      });
    }
  }
export default themr(ALERT, baseTheme)(Alert) as ThemedComponentClass<Props, {}>;