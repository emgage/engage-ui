import *as React from 'react';

// tslint:disable-next-line: no-duplicate-imports
import { Component, createRef } from 'react';

import { debounce, isEqual } from 'lodash';

import { classNames } from '@shopify/react-utilities/styles';

import { FeaturesContext } from './features';
import { Labelled, labelID } from '../Labelled';
import { EventListener } from './EventListener';
import { Keys } from '../../../../types';
import BodyText from '../../../BodyText';

import * as styles from './DualThumb.scss';

const CSS_VAR_PREFIX = 'RangeSlider';

export interface State {
  value: [number, number];
  trackWidth: number;
  trackLeft: number;
  prevValue?: [number, number];
}

export interface DualThumbProps {
  value: [number, number];
  id: string;
  min: number;
  max: number;
  step: number;
  label: string;
  labelAction?: any;
  labelHidden?: boolean;
  output?: boolean;
  helpText?: React.ReactNode;
  error?: Error;
  disabled?: boolean;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  onChange(value: [number, number], id: string): void;
  onFocus?(): void;
  onBlur?(): void;
}

interface KeyHandlers {
  [key: string]: () => void;
}

enum Control {
  Lower,
  Upper,
}

export class DualThumb extends Component<DualThumbProps, State> {
  static contextType = FeaturesContext;

  static getDerivedStateFromProps(props: DualThumbProps, state: State) {
    const { min, step, max, value, onChange, id } = props;
    const { prevValue } = state;

    if (isEqual(prevValue, value)) {
      return null;
    }

    const sanitizedValue = sanitizeValue(value, min, max, step);

    if (!isEqual(value, sanitizedValue)) {
      onChange(sanitizedValue, id);
    }

    return {
      prevValue: value,
      value: sanitizedValue,
    };
  }

  context!: React.ContextType<typeof FeaturesContext>;

  state: State = {
    value: sanitizeValue(
      this.props.value,
      this.props.min,
      this.props.max,
      this.props.step
    ),
    trackWidth: 0,
    trackLeft: 0,
  };

  private track = createRef<HTMLDivElement>();
  private trackWrapper = createRef<HTMLDivElement>();
  private thumbLower = createRef<HTMLButtonElement>();
  private thumbUpper = createRef<HTMLButtonElement>();

  private setTrackPosition = debounce(
    () => {
      if (this.track.current) {
        const newDesignLanguage =
          this.context && this.context.newDesignLanguage;
        const thumbSize = newDesignLanguage ? 16 : 24;

        const { width, left } = this.track.current.getBoundingClientRect();
        const adjustedTrackWidth = width - thumbSize;
        const adjustedTrackLeft = left + thumbSize / 2;

        this.setState({
          trackWidth: adjustedTrackWidth,
          trackLeft: adjustedTrackLeft,
        });
      }
    },
    40,
    { leading: true, trailing: true, maxWait: 40 }
  );

  componentDidMount() {
    this.setTrackPosition();

    if (this.trackWrapper.current != null) {
      this.trackWrapper.current.addEventListener(
        'touchstart',
        this.handleTouchStartTrack,
        { passive: false }
      );
    }
  }

  componentWillUnmount() {
    if (this.trackWrapper.current != null) {
      this.trackWrapper.current.removeEventListener(
        'touchstart',
        this.handleTouchStartTrack
      );
    }
  }

  render() {
    const {
      id,
      min,
      max,
      prefix,
      suffix,
      disabled,
      output,
      error,
      onFocus,
      onBlur,
      label,
      labelAction,
      labelHidden,
      helpText,
    } = this.props;
    const { value } = this.state;

    const idLower = id;
    const idUpper = `${id}Upper`;

    const describedBy: string[] = [];

    if (error) {
      describedBy.push(`${id}Error`);
    }

    const ariaDescribedBy = describedBy.length
      ? describedBy.join(' ')
      : undefined;

    const trackWrapperClassName = classNames(
      styles.TrackWrapper,
      error && styles.error,
      disabled && styles.disabled
    );

    const thumbLowerClassName = classNames(
      styles.Thumbs,
      styles.ThumbLower,
      disabled && styles.disabled
    );
    const thumbUpperClassName = classNames(
      styles.Thumbs,
      styles.ThumbUpper,
      disabled && styles.disabled
    );

    const trackWidth = this.state.trackWidth;
    const range = max - min;

    const leftPositionThumbLower = (value[0] / range) * trackWidth;
    const leftPositionThumbUpper = (value[1] / range) * trackWidth;

    const outputLowerClassName = classNames(styles.Output, styles.OutputLower);
    const outputMarkupLower =
      !disabled && output ? (
        <output
          htmlFor={idLower}
          className={outputLowerClassName}
          style={{
            left: `${leftPositionThumbLower}px`,
          }}
        >
          {/* <div className={styles.OutputBubble}>
            <span className={styles.OutputText}>{value[0]}</span>
          </div> */}
          <BodyText componentSize="small" componentColor="darker" element="span">{value[0]}</BodyText>
        </output>
      ) : null;

    const outputUpperClassName = classNames(styles.Output, styles.OutputUpper);
    const outputMarkupUpper =
      !disabled && output ? (
        <output
          htmlFor={idUpper}
          className={outputUpperClassName}
          style={{
            left: `${leftPositionThumbUpper}px`,
          }}
        >
          {/* <div className={styles.OutputBubble}>
            <span className={styles.OutputText}>{value[1]}</span>
          </div> */}
          <BodyText componentSize="small" componentColor="darker"  element="span">{value[1]}</BodyText>
        </output>
      ) : null;

    const cssVars = {
      [`${CSS_VAR_PREFIX}progress-lower`]: `${leftPositionThumbLower}px`,
      [`${CSS_VAR_PREFIX}progress-upper`]: `${leftPositionThumbUpper}px`,
    };

    const prefixMarkup = prefix && (
      <div className={styles.Prefix}>{prefix}</div>
    );

    const suffixMarkup = suffix && (
      <div className={styles.Suffix}>{suffix}</div>
    );

    return (
      <>
        <Labelled
          id={id}
          label={label}
          error={error}
          action={labelAction}
          labelHidden={labelHidden}
          helpText={helpText}
        >
          <div className={styles.Wrapper}>
            {prefixMarkup}
            <div
              className={trackWrapperClassName}
              onMouseDown={this.handleMouseDownTrack}
              ref={this.trackWrapper}
            >
              <div
                className={styles.Track}
                style={cssVars}
                ref={this.track}
              />
              <div className={styles['Track--dashed']} />
              <button
                id={idLower}
                className={thumbLowerClassName}
                style={{
                  left: `${leftPositionThumbLower}px`,
                }}
                role="slider"
                aria-disabled={disabled}
                aria-valuemin={min}
                aria-valuemax={max}
                aria-valuenow={value[0]}
                aria-invalid={Boolean(error)}
                aria-describedby={ariaDescribedBy}
                aria-labelledby={labelID(id)}
                onFocus={onFocus}
                onBlur={onBlur}
                onKeyDown={this.handleKeypressLower}
                onMouseDown={this.handleMouseDownThumbLower}
                onTouchStart={this.handleTouchStartThumbLower}
                ref={this.thumbLower}
                disabled={disabled}
              />
              {outputMarkupLower}
              <button
                id={idUpper}
                className={thumbUpperClassName}
                style={{
                  left: `${leftPositionThumbUpper}px`,
                }}
                role="slider"
                aria-disabled={disabled}
                aria-valuemin={min}
                aria-valuemax={max}
                aria-valuenow={value[1]}
                aria-invalid={Boolean(error)}
                aria-describedby={ariaDescribedBy}
                aria-labelledby={labelID(id)}
                onFocus={onFocus}
                onBlur={onBlur}
                onKeyDown={this.handleKeypressUpper}
                onMouseDown={this.handleMouseDownThumbUpper}
                onTouchStart={this.handleTouchStartThumbUpper}
                ref={this.thumbUpper}
                disabled={disabled}
              />
              {outputMarkupUpper}
            </div>
            {suffixMarkup}
          </div>
        </Labelled>
        <EventListener event="resize" handler={this.setTrackPosition} />
      </>
    );
  }

  private handleMouseDownThumbLower = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    if (event.button !== 0 || this.props.disabled) return;
    registerMouseMoveHandler(this.handleMouseMoveThumbLower);
    event.stopPropagation();
  }

  private handleMouseMoveThumbLower = (event: MouseEvent) => {
    const valueUpper = this.state.value[1];
    this.setValue(
      [this.actualXPosition(event.clientX), valueUpper],
      Control.Upper
    );
  }

  private handleTouchStartThumbLower = (
    event: React.TouchEvent<HTMLButtonElement>
  ) => {
    if (this.props.disabled) return;
    registerTouchMoveHandler(this.handleTouchMoveThumbLower);
    event.stopPropagation();
  }

  private handleTouchMoveThumbLower = (event: TouchEvent) => {
    event.preventDefault();
    const valueUpper = this.state.value[1];
    this.setValue(
      [this.actualXPosition(event.touches[0].clientX), valueUpper],
      Control.Upper
    );
  }

  private handleMouseDownThumbUpper = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    if (event.button !== 0 || this.props.disabled) return;
    registerMouseMoveHandler(this.handleMouseMoveThumbUpper);
    event.stopPropagation();
  }

  private handleMouseMoveThumbUpper = (event: MouseEvent) => {
    const valueLower = this.state.value[0];
    this.setValue(
      [valueLower, this.actualXPosition(event.clientX)],
      Control.Lower
    );
  }

  private handleTouchStartThumbUpper = (
    event: React.TouchEvent<HTMLButtonElement>
  ) => {
    if (this.props.disabled) return;
    registerTouchMoveHandler(this.handleTouchMoveThumbUpper);
    event.stopPropagation();
  }

  private handleTouchMoveThumbUpper = (event: TouchEvent) => {
    event.preventDefault();
    const valueLower = this.state.value[0];
    this.setValue(
      [valueLower, this.actualXPosition(event.touches[0].clientX)],
      Control.Lower
    );
  }

  private handleKeypressLower = (
    event: React.KeyboardEvent<HTMLButtonElement>
  ) => {
    if (this.props.disabled) return;
    const { incrementValueLower, decrementValueLower } = this;

    const handlerMap: KeyHandlers = {
      [Keys.UP_ARROW]: incrementValueLower,
      [Keys.RIGHT_ARROW]: incrementValueLower,
      [Keys.DOWN_ARROW]: decrementValueLower,
      [Keys.LEFT_ARROW]: decrementValueLower,
    };

    const handler = handlerMap[event.keyCode];

    if (handler != null) {
      event.preventDefault();
      event.stopPropagation();
      handler();
    }
  }

  private handleKeypressUpper = (
    event: React.KeyboardEvent<HTMLButtonElement>
  ) => {
    if (this.props.disabled) return;
    const { incrementValueUpper, decrementValueUpper } = this;

    const handlerMap: KeyHandlers = {
      [Keys.UP_ARROW]: incrementValueUpper,
      [Keys.RIGHT_ARROW]: incrementValueUpper,
      [Keys.DOWN_ARROW]: decrementValueUpper,
      [Keys.LEFT_ARROW]: decrementValueUpper,
    };

    const handler = handlerMap[event.keyCode];

    if (handler != null) {
      event.preventDefault();
      event.stopPropagation();
      handler();
    }
  }

  private incrementValueLower = () => {
    this.setValue(
      [this.state.value[0] + this.props.step, this.state.value[1]],
      Control.Upper
    );
  }

  private decrementValueLower = () => {
    this.setValue(
      [this.state.value[0] - this.props.step, this.state.value[1]],
      Control.Upper
    );
  }

  private incrementValueUpper = () => {
    this.setValue(
      [this.state.value[0], this.state.value[1] + this.props.step],
      Control.Lower
    );
  }

  private decrementValueUpper = () => {
    this.setValue(
      [this.state.value[0], this.state.value[1] - this.props.step],
      Control.Lower
    );
  }

  private dispatchValue = () => {
    const { onChange, id } = this.props;
    const { value } = this.state;

    onChange(value, id);
  }

  private setValue = (dirtyValue: [number, number], control: Control) => {
    const {
      props: { min, max, step },
      state: { value },
    } = this;

    const sanitizedValue = sanitizeValue(dirtyValue, min, max, step, control);

    if (!isEqual(sanitizedValue, value)) {
      this.setState(
        {
          value: sanitizedValue,
        },
        this.dispatchValue
      );
    }
  }

  private handleMouseDownTrack = (event: React.MouseEvent) => {
    if (event.button !== 0 || this.props.disabled) return;
    event.preventDefault();
    const clickXPosition = this.actualXPosition(event.clientX);
    const { value } = this.state;
    const distanceFromLowerThumb = Math.abs(value[0] - clickXPosition);
    const distanceFromUpperThumb = Math.abs(value[1] - clickXPosition);

    if (distanceFromLowerThumb <= distanceFromUpperThumb) {
      this.setValue([clickXPosition, value[1]], Control.Upper);
      registerMouseMoveHandler(this.handleMouseMoveThumbLower);

      if (this.thumbLower.current != null) {
        this.thumbLower.current.focus();
      }
    } else {
      this.setValue([value[0], clickXPosition], Control.Lower);
      registerMouseMoveHandler(this.handleMouseMoveThumbUpper);

      if (this.thumbUpper.current != null) {
        this.thumbUpper.current.focus();
      }
    }
  }

  private handleTouchStartTrack = (event: TouchEvent) => {
    if (this.props.disabled) return;
    event.preventDefault();
    const clickXPosition = this.actualXPosition(event.touches[0].clientX);
    const { value } = this.state;
    const distanceFromLowerThumb = Math.abs(value[0] - clickXPosition);
    const distanceFromUpperThumb = Math.abs(value[1] - clickXPosition);

    if (distanceFromLowerThumb <= distanceFromUpperThumb) {
      this.setValue([clickXPosition, value[1]], Control.Upper);
      registerTouchMoveHandler(this.handleTouchMoveThumbLower);

      if (this.thumbLower.current != null) {
        this.thumbLower.current.focus();
      }
    } else {
      this.setValue([value[0], clickXPosition], Control.Lower);
      registerTouchMoveHandler(this.handleTouchMoveThumbUpper);

      if (this.thumbUpper.current != null) {
        this.thumbUpper.current.focus();
      }
    }
  }

  private actualXPosition = (dirtyXPosition: number): number => {
    if (this.track.current) {
      const { min, max } = this.props;
      const { trackLeft, trackWidth } = this.state;

      const relativeX = dirtyXPosition - trackLeft;
      const percentageOfTrack = relativeX / trackWidth;
      return percentageOfTrack * (max - min);
    }
    return 0;

  }
}

function registerMouseMoveHandler(handler: (event: MouseEvent) => void) {
  document.addEventListener('mousemove', handler);
  document.addEventListener(
    'mouseup',
    () => {
      document.removeEventListener('mousemove', handler);
    },
    { once: true }
  );
}

function registerTouchMoveHandler(handler: (event: TouchEvent) => void) {
  const removeHandler = () => {
    document.removeEventListener('touchmove', handler);
    document.removeEventListener('touchend', removeHandler);
    document.removeEventListener('touchcancel', removeHandler);
  };

  document.addEventListener('touchmove', handler, { passive: false });
  document.addEventListener('touchend', removeHandler, { once: true });
  document.addEventListener('touchcancel', removeHandler, { once: true });
}

function sanitizeValue(
  value: [number, number],
  min: number,
  max: number,
  step: number,
  control = Control.Upper
): [number, number] {
  let upperValue = inBoundsUpper(roundedToStep(value[1]));
  let lowerValue = inBoundsLower(roundedToStep(value[0]));

  const maxLowerValue = upperValue - step;
  const minUpperValue = lowerValue + step;

  if (control === Control.Upper && lowerValue > maxLowerValue) {
    lowerValue = maxLowerValue;
  } else if (control === Control.Lower && upperValue < minUpperValue) {
    upperValue = minUpperValue;
  }

  return [lowerValue, upperValue];

  function inBoundsUpper(value: number): number {
    const lowerMin = min + step;

    if (value < lowerMin) {
      return lowerMin;
    }  if (value > max) {
      return max;
    }
    return value;

  }

  function inBoundsLower(value: number): number {
    const upperMax = max - step;

    if (value < min) {
      return min;
    }  if (value > upperMax) {
      return upperMax;
    }
    return value;

  }

  function roundedToStep(value: number) {
    return Math.round(value / step) * step;
  }
}
