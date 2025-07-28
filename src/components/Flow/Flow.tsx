import * as React from 'react';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { classNames } from '@shopify/react-utilities/styles';
import { FLOW } from '../ThemeIdentifiers';
import * as baseTheme from './Flow.scss';
import { createRef } from 'react';

export interface NavigationState {
  indx: number;
  styles: string[];
}

export type FlowStatus = 'active' | 'completed' | 'upcoming';
export interface Step {
  name: string;
  component?: React.ReactNode | string;
  style?: any;
  onClick?(): void;
  status?: string;
  icon?: React.ReactNode;
}

export interface Props {
  // JSON data source of which we need to indicate Flow for.
  steps: Step[];
  theme?: any;
  additionTop?: number;
  additionalLeft?: number;
  infoWidth?: number;
  // To apply custom styling.
  componentStyle?: React.CSSProperties;
  infoStyle?: React.CSSProperties;
  infoType?: 'html' | 'react';
  // Set a custom class
  componentClass?: string;
  // Call callbackParent method on outside area click 
  onClick?(step: Step, e: any): void;
  // callback method for getting state when clicked from outside area.
  renderInfo(): any;
}


class Flow extends React.PureComponent<Props, any> {
  containerRef: any;
  constructor(props: Props) {
    super(props);
    this.state = {
      left: 0,
      top: 0,
      clickedStep: null,
    };
    this.containerRef = createRef();
  }

  componentDidMount() {
    document.addEventListener('click', this.handleOutsideClick, true);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleOutsideClick, true);
  }

  handleClickOld = (step: Step, event: any) => {
    const { steps } = this.props;
    const clickedStepIndex = steps.indexOf(step);

    const width = this.containerRef.current.scrollWidth;
    const left = (width / (steps.length * 2)) + (width / steps.length) * clickedStepIndex
    console.log(this.containerRef)
    this.setState({
      // left:rect.left,
      left: left,
      clickedStep: step === this.state.clickedStep ? null : step,
    }, () => {
      if (this.props.onClick) {
        this.props.onClick(step, event);
      }
    });

  }
  handleClick = (step: Step, event: any) => {
    const rect = event.target.getBoundingClientRect();
    this.setState({
      // left:rect.left,
      left: rect.left+ rect.width/2,
      top: (rect.top + rect.height),
      clickedStep: step === this.state.clickedStep ? null : step,
    }, () => {
      if (this.props.onClick) {
        this.props.onClick(step, event);
      }
    });

  }

  renderSteps = () => {
    const { steps, theme, onClick } = this.props;

    return steps.map((item, index) => (
      <li
        className={theme[item.status ? item.status : 'upcoming']}
        key={index}
        value={index}
      >
        {index !== 0 ? <div className={theme.processBar}><span className={theme.processDivider}></span></div> : null}
        <div className={theme.processItem}>
          <span
            className={item.icon ? theme.iconProcess : theme.processIndex}
            style={{ ...item.style, cursor: onClick ? 'pointer' : 'default' }}
            onClick={onClick ? (e) => this.handleClick(item, e) : () => { }}
          >
            {item.icon ? item.icon : index + 1}
          </span>
          <span className={theme.processLabel}>{item.name}</span>
        </div>
      </li>
    ));
  }

  handleOutsideClick = (e: any) => {
    if (
      this.containerRef.current &&
      !this.containerRef.current.contains(e.target)) {
      this.setState({ clickedStep: null });
    }
  };

  render() {
    const { theme, componentStyle, componentClass, infoType = 'html', renderInfo,
      additionTop = 5, additionalLeft = 10, infoWidth = 0, infoStyle = {} } = this.props;
    const { left, clickedStep, top } = this.state;
    const className = classNames(
      theme.processTracker,
      componentClass
    );

    return (
      <div ref={this.containerRef} className={theme.container} style={{ position: 'relative' }}>
        <ul className={className} style={componentStyle}>
          {this.renderSteps()}
          {clickedStep && <div style={{
            position: 'fixed',
            left: (left - (infoWidth / 2)) + additionalLeft,
            top: top + additionTop,
            zIndex: 1,
            width: infoWidth,
          }}>
            <div className={theme.processTip} style={{ left: (infoWidth / 2) - additionalLeft }}>
            </div>
            <div className={theme.processInfo} style={infoStyle}>
              {infoType === 'html' && <div dangerouslySetInnerHTML={{ __html: renderInfo() }}></div>}
              {infoType === 'react' && renderInfo()}
            </div>
          </div>}
        </ul>
      </div>
    );
  }
}

export default themr(FLOW, baseTheme)(Flow) as ThemedComponentClass<Props, {}>;
