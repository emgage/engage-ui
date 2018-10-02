import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import { classNames } from '@shopify/react-utilities/styles';
import { PROCESS } from '../ThemeIdentifiers';
import * as baseTheme from './Process.scss';

export interface NavState {
  indx: number;
  styles: string[];
}

export interface Step {
  name: string;
  component: React.ReactNode;
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
}

export interface State {
  showPreviousBtn: boolean;
  showNextBtn: boolean;
  compState: number;
  navState: NavState;
}

const getNavStates = (indx: number, length: number) => {
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

const checkNavState = (currentStep: number, stepsLength: number) => {
  if (currentStep > 0 && currentStep < stepsLength - 1) {
    return {
      showPreviousBtn: true,
      showNextBtn: true
    };
  } if (currentStep === 0) {
    return {
      showPreviousBtn: false,
      showNextBtn: true
    };
  }

  return {
    showPreviousBtn: true,
    showNextBtn: false
  };
};

class Process extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      showPreviousBtn: false,
      showNextBtn: true,
      compState: 0,
      navState: getNavStates(0, this.props.steps.length)
    };
  }

  static defaultProps = {
    showNavigation: true
  };

  setNavState = (next: number) => {
    this.setState({
      navState: getNavStates(next, this.props.steps.length)
    });
    if (next === (this.state.compState + 1) || (next === (this.state.compState - 1) && this.props.allowBackStepping)) {
      this.setState({ compState: next });
    }
    this.setState(checkNavState(next, this.props.steps.length));
  }

  handleKeyDown = (event: React.KeyboardEvent<EventTarget>) => {
    if (event.which === 13) {
      this.next();
    }
  }

  handleOnClick = (evt: React.FormEvent<any>) => {
    if (
      evt.currentTarget.value === (this.state.compState + 1) - 1 &&
      this.state.compState === this.props.steps.length - 1 &&
      evt.currentTarget.value !== this.state.compState
    ) {
      this.setNavState(this.props.steps.length);
    } if (
      evt.currentTarget.value < this.props.steps.length &&
      (evt.currentTarget.value === (this.state.compState + 1) || (evt.currentTarget.value === (this.state.compState - 1) && this.props.allowBackStepping))
    ) {
      this.setNavState(evt.currentTarget.value);
    }
  }

  next = () => {
    this.setNavState(this.state.compState + 1);
  }

  previous = () => {
    if (this.state.compState > 0) {
      this.setNavState(this.state.compState - 1);
    }
  }

  getClassName = (i: number) => {
    return this.state.navState.styles[i];
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
    const { theme, componentStyle, showNavigation, steps, componentClass } = this.props;
    const className = classNames(
      componentClass && theme.progtrckr
    );

    return (
      <div className={theme.container} onKeyDown={this.handleKeyDown}>
        <ol className={className} style={componentStyle}>
          {this.renderSteps()}
        </ol>
        {steps[this.state.compState].component}
        <div style={showNavigation ? {} : { display: 'none' }}>
          <button
            style={this.state.showPreviousBtn ? {} : { display: 'none' }}
            onClick={this.previous}
          >
          Previous
          </button>
          <button
            style={this.state.showNextBtn ? {} : { display: 'none' }}
            onClick={this.next}
          >
          Next
          </button>
        </div>
      </div>
    );
  }
}

export default themr(PROCESS, baseTheme)(Process) as ThemedComponentClass<Props, {}>;
