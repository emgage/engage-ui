import * as React from 'react';
import Calendar from '../Calendar';
import { mount } from 'enzyme';

describe('<Calender /> Test Suit', () => {
  it('should render Calender with default properties', () => {
    const calenderWrapper = mount(<Calendar />);
    expect(calenderWrapper.isEmptyRender()).toEqual(false);
  });

  it('should contain parent class rbc-calendar', () => {
    const calenderWrapper = mount(<Calendar />);
    expect(calenderWrapper.find('.rbc-calendar').exists()).toEqual(true);
  });

  it('should show the toolbar', () => {
    const calenderWrapper = mount(<Calendar />);
    expect(calenderWrapper.find('.rbc-toolbar').exists()).toEqual(true);
  });

  it('should show Week View when passed defaultView as "week" ', () => {
    const calenderWrapper = mount(<Calendar defaultView="week" />);
    expect(calenderWrapper.find('.rbc-time-view').exists()).toEqual(true);
  });
});
