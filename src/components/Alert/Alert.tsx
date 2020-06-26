import * as React from 'react';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { ALERT } from '../ThemeIdentifiers';
import * as baseTheme from './Alert.scss';

export interface State {
  // State for alert to be active or closed
  isActive?:boolean;
}

// All prototypes type
export interface Props {
  // The content to display inside the alert
  children?: React.ReactNode;
  // Define the type of alert, It can be primary, success, warning or danger.
  componentType?: string;
  // Theme to be injected via css-themr
  theme?: any;
}
// Define custom close icon for smaller height-width
const IconClose = (props:any) => {
  return (
    <svg width="12" height="12" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
      <line stroke={props.color} strokeWidth="1.1" x1="1" y1="1" x2="13" y2="13"></line>
      <line stroke={props.color} strokeWidth="1.1" x1="13" y1="1" x2="1" y2="13"></line>
    </svg>
  );
};

// Alert component, in here wrap all other required components or DOM for the Alert
class Alert extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      // Set alert to be active
      isActive:true,
    };
  }
  // When alert is closed, set alert active peroperty to be false
  closeAlert = () => {
    this.setState({
      isActive: false,
    });
  }
  render() {
    const { children, componentType, theme } = this.props;
    let classes: string;
    let style: string;
    let color: string;

    switch (componentType) {
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
