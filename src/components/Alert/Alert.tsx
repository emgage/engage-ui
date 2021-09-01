import * as React from 'react';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { ALERT } from '../ThemeIdentifiers';
import * as baseTheme from './Alert.scss';
import BodyText from '../BodyText';
import Button from '../Button';

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
    let fill: any;

    switch (componentType) {
      case 'primary':
        style = theme.alertPrimary;
        fill = '#1e87f0';
        break;
      case 'success':
        style = theme.alertSuccess;
        fill = '#32d296';
        break;
      case 'warning' :
        style = theme.alertWarning;
        fill = '#faa05a';
        break;
      case 'danger':
        style = theme.alertDanger;
        fill = '#f0506e';
        break;
      default:
        style = '';
        fill = '#000';
    }

    classes = theme.alert + ' ' + style;
    return (
      <React.Fragment>
      { this.state.isActive && <div className={classes}>
        <BodyText element="p">{children}</BodyText>
        <div className={theme.alertClose}>
        <Button componentSize="slim" plain onClick={() => this.closeAlert()} title="Close Alert" icon="cancelSmall" componentStyle={{fill}}></Button>
        </div>
      </div>}
      </React.Fragment>
    );
  }
}
export default themr(ALERT, baseTheme)(Alert) as ThemedComponentClass<Props, {}>;
