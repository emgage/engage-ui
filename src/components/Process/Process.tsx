import * as React from 'react';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { classNames } from '@shopify/react-utilities/styles';
import { PROCESS } from '../ThemeIdentifiers';
import * as baseTheme from './Process.scss';

export interface NavigationState {
  indx: number;
  styles: string[];
}

export type ProcessStatus = 'active' | 'completed' | 'upcoming';
export interface Step {
  name: string;
  component?: React.ReactNode | string;
  style?: any;
  onClick?(): void;
  status?: string;
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
  // Set a custom class
  componentClass?: string;
  // Call callbackParent method on outside area click 
  onClick?(returnValue: number): void;
  // callback method for getting state when clicked from outside area.
  onComponentStateUpdate?(currentComponentState: number, processComponentState: number): void;
  processComponentState?: number;
}

export interface State {
  showPreviousButton: boolean;
  showNextButton: boolean;
  processComponentState: number;
  navigationState: NavigationState;
}

const getNavigationStates = (indx: number, length: number) => {
  const styles = [];
  for (let i = 0; i < length; i++) {
    if (i < indx) {
      styles.push('processTrackerDone');
    } else if (i === indx) {
      styles.push('processTrackerDoing');
    } else {
      styles.push('processTrackerTodo');
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
      processComponentState: 0,
      navigationState: getNavigationStates(0, this.props.steps.length)
    };
  }

  static defaultProps = {
    showNavigation: true
  };

  componentWillReceiveProps(newProps: Props) {
    const { processComponentState: newprocessComponentState } = newProps;
    const { processComponentState } = this.props;

    if (newprocessComponentState !== processComponentState) {
      this.setNavigationState(newprocessComponentState ? newprocessComponentState : 0);
    }
  }

  setNavigationState = (next: number) => {
    const { allowBackStepping = false } = this.props;
    if (next < this.props.steps.length && next > -1) {
      this.setState({
        navigationState: getNavigationStates(next, this.props.steps.length)
      });
      if (next === (this.state.processComponentState + 1) || (next === (this.state.processComponentState - 1) && allowBackStepping)) {
        this.setState({ processComponentState: next });
        if (this.props.onComponentStateUpdate) {
          this.props.onComponentStateUpdate(this.props.steps.length, next);
        }
      }
    }
  }

  handleOnClick = (evt: React.FormEvent<any>) => {
    const { onClick, steps, allowBackStepping = false } = this.props;
    if (
      evt.currentTarget.value === (this.state.processComponentState + 1) - 1 &&
      this.state.processComponentState === steps.length - 1 &&
      evt.currentTarget.value !== this.state.processComponentState
    ) {
      this.setNavigationState(steps.length);
      if (onClick) {
        onClick(evt.currentTarget.value);
      }
    } if (
      evt.currentTarget.value < steps.length &&
      (evt.currentTarget.value === (this.state.processComponentState + 1) || (evt.currentTarget.value === (this.state.processComponentState - 1) && allowBackStepping))
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
    const { steps, theme } = this.props;

    return steps.map((item, index) => (
      <li
        className={theme[item.status ? item.status : 'upcoming']}
        key={index}
        value={index}
      >
        { index !== 0 ? <div className={theme.processBar}><span className={theme.processDivider}></span></div> : null }
        <div className={theme.processItem}>
          <span
            className={theme.processIndex}
            style={{ ...item.style, cursor: item.onClick ? 'pointer' : 'default' }}
            onClick={item.onClick ? this.handleOnClick : () => {}}
          >
            {index + 1}
          </span>
          <span className={theme.processLabel}>{item.name}</span>
        </div>
      </li>
    ));
  }

  render() {
    const { theme, componentStyle, steps, componentClass } = this.props;
    const className = classNames(
      theme.processTracker,
      componentClass
    );

    return (
      <div className={theme.container}>
        <ul className={className} style={componentStyle}>
          {this.renderSteps()}
        </ul>
        {steps[this.state.processComponentState].component ? steps[this.state.processComponentState].component : null}
      </div>
    );
  }
}

export default themr(PROCESS, baseTheme)(Process) as ThemedComponentClass<Props, {}>;
