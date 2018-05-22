import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import { ALERT } from '../ThemeIdentifiers';
import * as baseTheme from './Alert.scss';

export interface State {
  isActive?:boolean;
}

export interface Props {
  children?: React.ReactNode;
  type?: string;
  theme?: any;
}
const IconClose = (props:any) => {
  return (
    <svg width="12" height="12" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
      <line stroke={props.color} strokeWidth="1.1" x1="1" y1="1" x2="13" y2="13"></line>
      <line stroke={props.color} strokeWidth="1.1" x1="13" y1="1" x2="1" y2="13"></line>
    </svg>
  );
};

class Alert extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isActive:true,
    };
  }
  closeAlert = () => {
    this.setState({
      isActive: false,
    });
  }
  render() {
    const { children, type, theme } = this.props;
    let classes: string;
    let style: string;
    let color: string;

    switch (type) {
      case 'primary':
        style = theme.alertPrimary;
        color = '#1e87f0';
        break;
      case 'success':
        style = theme.alertSuccess;
        color = '#32d296';
        break;
      case 'warning' :
        style = theme.alertWarning;
        color = '#faa05a';
        break;
      case 'danger':
        style = theme.alertDanger;
        color = '#f0506e';
        break;
      default:
        style = '';
        color = '#000';
    }

    classes = theme.alert + ' ' + style;
    return (
      <React.Fragment>
      { this.state.isActive && <div className={classes}>
        <p>{children}</p><button type="button" className={theme.alertClose} onClick={() => this.closeAlert()}><IconClose color={color}/></button>
      </div>}
      </React.Fragment>
    );
  }
}
export default themr(ALERT, baseTheme)(Alert) as ThemedComponentClass<Props, {}>;
