import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import { classNames } from '@shopify/react-utilities/styles';
import { PROCESS } from '../ThemeIdentifiers';
import * as baseTheme from './Process.scss';

export interface NavigationState {
  indx: number;
  styles: string[];
}

export interface Step {
  name: string;
  component: React.ReactNode | string;
  style?: any;
  onClick?(): void;
}

export interface Props {
  // JSON data source of which we need to indicate process for.
  steps: Step[];
  showNavigation?: boolean;
  // To allow user to enable / disable backstepping on process indicator for navigation.
  allowBackStepping?: boolean;
  // To apply any theme to component via themer.
  theme?: any;
  // To apply custom styling.
  componentStyle?: React.CSSProperties;
    // Custom class
  componentClass?: string;
  // Call callbackParent method on outside area click 
  onClick?(returnValue: number): void;
  // callback method for getting state when clicked from outside area.
  onComponentStateUpdate?(currentComponentState: number, processComponentState: number): void;
  ProcessComponentState?: number;
}

export interface State {
  showPreviousButton: boolean;
  showNextButton: boolean;
  ProcessComponentState: number;
  navigationState: NavigationState;
}

const getNavigationStates = (indx: number, length: number) => {
  const styles = [];
  for (let i = 0; i < length; i++) {
    if (i < indx) {
      styles.push('progtrckrdone');
    } else if (i === indx) {
      styles.push('progtrckrdoing');
    } else {
      styles.push('progtrckrtodo');
    }
  }
  return { indx, styles };
};

class Process extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      showPreviousButton: false,
      showNextButton: true,
      ProcessComponentState: 0,
      navigationState: getNavigationStates(0, this.props.steps.length)
    };
  }

  static defaultProps = {
    showNavigation: true
  };

  componentWillReceiveProps(newProps: Props) {
    const { ProcessComponentState: newProcessComponentState } = newProps;
    const { ProcessComponentState } = this.props;

    if (newProcessComponentState !== ProcessComponentState) {
      this.setNavigationState(newProcessComponentState ? newProcessComponentState : 0);
    }
  }

  setNavigationState = (next: number) => {
    if (next < this.props.steps.length && next > -1) {
      this.setState({
        navigationState: getNavigationStates(next, this.props.steps.length)
      });
      if (next === (this.state.ProcessComponentState + 1) || (next === (this.state.ProcessComponentState - 1) && this.props.allowBackStepping)) {
        this.setState({ ProcessComponentState: next });
        if (this.props.onComponentStateUpdate) {
          this.props.onComponentStateUpdate(this.props.steps.length, next);
        }
      }
    }
  }

  handleOnClick = (evt: React.FormEvent<any>) => {
    const { onClick, steps, allowBackStepping } = this.props;
    if (
      evt.currentTarget.value === (this.state.ProcessComponentState + 1) - 1 &&
      this.state.ProcessComponentState === steps.length - 1 &&
      evt.currentTarget.value !== this.state.ProcessComponentState
    ) {
      this.setNavigationState(steps.length);
      if (onClick) {
        onClick(evt.currentTarget.value);
      }
    } if (
      evt.currentTarget.value < steps.length &&
      (evt.currentTarget.value === (this.state.ProcessComponentState + 1) || (evt.currentTarget.value === (this.state.ProcessComponentState - 1) && allowBackStepping))
    ) {
      this.setNavigationState(evt.currentTarget.value);

      if (onClick) {
        onClick(evt.currentTarget.value);
      }
    }
  }

  getClassName = (i: number) => {
    return this.state.navigationState.styles[i];
  }

  renderSteps = () => {
    return this.props.steps.map((s, i) => (
      <li
        className={this.props.theme[this.getClassName(i)]}
        style={this.props.steps[i].style}
        onClick={this.handleOnClick}
        key={i}
        value={i}
      >
        <em>{i + 1}</em>
        <span>{this.props.steps[i].name}</span>
      </li>
    ));
  }

  render() {
    const { theme, componentStyle, steps, componentClass } = this.props;
    const className = classNames(
      theme.progtrckr,
      componentClass
    );

    return (
      <div className={theme.container}>
        <ol className={className} style={componentStyle}>
          {this.renderSteps()}
        </ol>
        {steps[this.state.ProcessComponentState].component}
      </div>
    );
  }
}

export default themr(PROCESS, baseTheme)(Process) as ThemedComponentClass<Props, {}>;
