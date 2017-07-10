import * as React from 'react';
//import PropTypes from 'prop-types';
// import { forbidExtraProps } from 'airbnb-prop-types';
import * as cx from 'classnames';

import DayPickerNavigationPhrases from './defaultPhrases';
//import getPhrasePropTypes from '../utils/getPhrasePropTypes';

import LeftArrow from '../svg/arrow-left.svg';
import RightArrow from '../svg/arrow-right.svg';
import ChevronUp from '../svg/chevron-up.svg';
import ChevronDown from '../svg/chevron-down.svg';
//import ScrollableOrientationShape from '../shapes/ScrollableOrientationShape';
import Constants from './constants';

export interface State {


}
export interface Props {
  navPrev?: any,
  navNext?: any,
  onPrevMonthClick?: any,
  onNextMonthClick?: any,
  orientation?: any,
  phrases?: any,
  isRTL?: any,

}

export default class DayPickerNavigation extends React.Component<Props, State> {
  //export default function DayPickerNavigation(props:any) {

  constructor(props: any) {
    super(props);
    // this.state = {
    //      };

    // this.onChange = this.onChange.bind(this);
    // this.onKeyDown = this.onKeyDown.bind(this);
  }

  // static propTypes = ({
  //   navPrev: PropTypes.node,
  //   navNext: PropTypes.node,
  //   orientation: ScrollableOrientationShape,

  //   onPrevMonthClick: PropTypes.func,
  //   onNextMonthClick: PropTypes.func,

  //   // internationalization
  //   phrases: PropTypes.shape(getPhrasePropTypes(DayPickerNavigationPhrases)),

  //   isRTL: PropTypes.bool,
  // });

  static defaultProps = {
    navPrev: null,
    navNext: null,
    orientation: Constants.HORIZONTAL_ORIENTATION,

    onPrevMonthClick() { },
    onNextMonthClick() { },

    // internationalization
    phrases: DayPickerNavigationPhrases,
    isRTL: false,
  };
  render() {

    const {
    navPrev,
      navNext,
      onPrevMonthClick,
      onNextMonthClick,
      orientation,
      phrases,
      isRTL,
  } = this.props;

    const isVertical = orientation !== Constants.HORIZONTAL_ORIENTATION;
    const isVerticalScrollable = orientation === Constants.VERTICAL_SCROLLABLE;

    let navPrevIcon = navPrev;
    let navNextIcon = navNext;
    let isDefaultNavPrev = false;
    let isDefaultNavNext = false;
    if (!navPrevIcon) {
      isDefaultNavPrev = true;
      navPrevIcon = isVertical ? <ChevronUp /> : <LeftArrow />;
      if (isRTL && !isVertical) {
        navPrevIcon = <RightArrow />;
      }
    }
    if (!navNextIcon) {
      isDefaultNavNext = true;
      navNextIcon = isVertical ? <ChevronDown /> : <RightArrow />;
      if (isRTL && !isVertical) {
        navNextIcon = <LeftArrow />;
      }
    }



    const navClassNames = cx('DayPickerNavigation', {
      'DayPickerNavigation--horizontal': !isVertical,
      'DayPickerNavigation--vertical': isVertical,
      'DayPickerNavigation--vertical-scrollable': isVerticalScrollable,
    });
    const prevClassNames = cx('DayPickerNavigation__prev', {
      'DayPickerNavigation__prev--default': isDefaultNavPrev,
      'DayPickerNavigation__prev--rtl': isRTL,
    });
    const nextClassNames = cx('DayPickerNavigation__next', {
      'DayPickerNavigation__next--default': isDefaultNavNext,
      'DayPickerNavigation__next--rtl': isRTL,
    });
// debugger;
    return (
      <div className={navClassNames}>
        {!isVerticalScrollable && (
          <button
            type="button"
            aria-label={phrases.jumpToPrevMonth}
            className={prevClassNames}
            onClick={onPrevMonthClick}
            onMouseUp={(e) => {
              e.currentTarget.blur();
            }}
          >
            {navPrevIcon}
          </button>
        )}

        <button
          type="button"
          aria-label={phrases.jumpToNextMonth}
          className={nextClassNames}
          onClick={onNextMonthClick}
          onMouseUp={(e) => {
            e.currentTarget.blur();
          }}
        >
          {navNextIcon}
        </button>
      </div>
    );
  }
}
// DayPickerNavigation.propTypes = propTypes;
// DayPickerNavigation.defaultProps = defaultProps;
