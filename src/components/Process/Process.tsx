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
  onClick?(returnValue: any): void;
}

export interface State {
  showPreviousButton: boolean;
  showNextButton: boolean;
  compState: number;
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
      compState: 0,
      navigationState: getNavigationStates(0, this.props.steps.length)
    };
  }

  static defaultProps = {
    showNavigation: true
  };

  setNavigationState = (next: number) => {
    this.setState({
      navigationState: getNavigationStates(next, this.props.steps.length)
    });
    if (next === (this.state.compState + 1) || (next === (this.state.compState - 1) && this.props.allowBackStepping)) {
      this.setState({ compState: next });
    }
  }

  handleOnClick = (evt: React.FormEvent<any>) => {
    const { onClick, steps, allowBackStepping } = this.props;
    if (
      evt.currentTarget.value === (this.state.compState + 1) - 1 &&
      this.state.compState === steps.length - 1 &&
      evt.currentTarget.value !== this.state.compState
    ) {
      this.setNavigationState(steps.length);

      if (onClick) {
        onClick(evt);
      }
    } if (
      evt.currentTarget.value < steps.length &&
      (evt.currentTarget.value === (this.state.compState + 1) || (evt.currentTarget.value === (this.state.compState - 1) && allowBackStepping))
    ) {
      this.setNavigationState(evt.currentTarget.value);

      if (onClick) {
        onClick(evt);
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
        {steps[this.state.compState].component}
      </div>
    );
  }
}

export default themr(PROCESS, baseTheme)(Process) as ThemedComponentClass<Props, {}>;
