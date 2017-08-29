import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import moment from 'moment';

import CalendarMonth from '../../src/components/CalendarMonth';
import CalendarMonthGrid from '../../src/components/CalendarMonthGrid';

import { HORIZONTAL_ORIENTATION, VERTICAL_ORIENTATION } from '../../constants';

import getTransformStyles from '../../src/utils/getTransformStyles';

describe('CalendarMonthGrid', () => {
  it('is .CalendarMonthGrid class', () => {
    const wrapper = shallow(<CalendarMonthGrid />);
    expect(wrapper.is('.CalendarMonthGrid')).to.equal(true);
  });

  it('is .CalendarMonthGrid--horizontal class if props.orientation === HORIZONTAL_ORIENTATION',
    () => {
      const wrapper = shallow(<CalendarMonthGrid orientation={HORIZONTAL_ORIENTATION} />);
      expect(wrapper.is('.CalendarMonthGrid--horizontal')).to.equal(true);
    });

  it('is .CalendarMonthGrid--vertical class if props.orientation === VERTICAL_ORIENTATION',
    () => {
      const wrapper = shallow(<CalendarMonthGrid orientation={VERTICAL_ORIENTATION} />);
      expect(wrapper.is('.CalendarMonthGrid--vertical')).to.equal(true);
    });

  it('is .CalendarMonthGrid--animating class if props.isAnimating === true', () => {
    const wrapper = shallow(<CalendarMonthGrid isAnimating />);
    expect(wrapper.is('.CalendarMonthGrid--animating')).to.equal(true);
  });

  it('is not .CalendarMonthGrid--animating class if props.isAnimating === false', () => {
    const wrapper = shallow(<CalendarMonthGrid isAnimating={false} />);
    expect(wrapper.is('.CalendarMonthGrid--animating')).to.equal(false);
  });

  it('the number of CalendarMonths rendered matches props.numberOfMonths + 2', () => {
    const NUM_OF_MONTHS = 5;
    const wrapper = shallow(<CalendarMonthGrid numberOfMonths={NUM_OF_MONTHS} />);
    expect(wrapper.find(CalendarMonth)).to.have.lengthOf(NUM_OF_MONTHS + 2);
  });

  it('has style equal to getTransformStyles(foo)', () => {
    const transformValue = 'foo';
    const transformStyles = getTransformStyles(transformValue);
    const wrapper = shallow(<CalendarMonthGrid transformValue={transformValue} />);
    Object.keys(transformStyles).forEach((key) => {
      expect(wrapper.prop('style')[key]).to.equal(transformStyles[key]);
    });
  });

  it('does not generate duplicate months', () => {
    const initialMonth = moment();
    const wrapper = shallow(<CalendarMonthGrid numberOfMonths={12} initialMonth={initialMonth} />);

    wrapper.instance().componentWillReceiveProps({
      initialMonth,
      numberOfMonths: 24,
    });

    const months = wrapper.state().months;

    const collisions = months
      .map(m => m.format('YYYY-MM'))
      .reduce((acc, m) => Object.assign(
        {},
        acc,
        { [m]: true },
      ), {});

    expect(Object.keys(collisions).length).to.equal(months.length);
  });

  it('works with the same number of months', () => {
    const initialMonth = moment();
    const wrapper = shallow(<CalendarMonthGrid numberOfMonths={12} initialMonth={initialMonth} />);

    wrapper.instance().componentWillReceiveProps({
      initialMonth,
      numberOfMonths: 12,
      firstVisibleMonthIndex: 0,
    });

    const months = wrapper.state().months;

    const collisions = months
      .map(m => m.format('YYYY-MM'))
      .reduce((acc, m) => Object.assign(
        {},
        acc,
        { [m]: true },
      ), {});

    expect(Object.keys(collisions).length).to.equal(months.length);
  });
});
