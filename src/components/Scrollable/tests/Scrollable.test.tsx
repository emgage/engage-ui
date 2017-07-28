import * as React from 'react';
import { mount } from 'enzyme';
import Scrollable from '../Scrollable';

describe('vertical', () => {
  it('should verify the vertical is false', () => {
    const scrollableWrapper = mount(<Scrollable vertical={false}/>);
    expect(scrollableWrapper.prop('vertical')).toBe(false);
  });

  it('should verify the vertical is true', () => {
    const scrollableWrapper = mount(<Scrollable vertical={true}/>);
    expect(scrollableWrapper.prop('vertical')).toBe(true);
  });

  it('should verify the verical type on the Scrollable', () => {
    const scrollableWrapper = mount(<Scrollable vertical/>).prop('vertical');
    expect(typeof scrollableWrapper).toBe('boolean');
  });
});

describe('horizontal', () => {
  it('should verify the horizontal is false', () => {
    const scrollableWrapper = mount(<Scrollable horizontal={false}/>);
    expect(scrollableWrapper.prop('horizontal')).toBe(false);
  });

  it('should verify the horizontal is true', () => {
    const scrollableWrapper = mount(<Scrollable horizontal={true}/>);
    expect(scrollableWrapper.prop('horizontal')).toBe(true);
  });

  it('should verify the horizontal type on the Scrollable', () => {
    const scrollableWrapper = mount(<Scrollable horizontal/>).prop('horizontal');
    expect(typeof scrollableWrapper).toBe('boolean');
  });
});

describe('shadow', () => {
  it('should verify the shadow is false', () => {
    const scrollableWrapper = mount(<Scrollable shadow={false}/>);
    expect(scrollableWrapper.prop('shadow')).toBe(false);
  });

  it('should verify the shadow is true', () => {
    const scrollableWrapper = mount(<Scrollable shadow={true}/>);
    expect(scrollableWrapper.prop('shadow')).toBe(true);
  });

  it('should verify the shadow type on the Scrollable', () => {
    const scrollableWrapper = mount(<Scrollable shadow/>).prop('shadow');
    expect(typeof scrollableWrapper).toBe('boolean');
  });
});

describe('children', () => {
  it('should verify children is defined as paragraph', () => {
    const scrollableWrapper = mount(
                              <Scrollable>
                              <p>By signing up for the Shopify service (“Service”)</p>
                              </Scrollable>);
    expect(scrollableWrapper.children().prop('children')).toBe('By signing up for the Shopify service (“Service”)');
  });
});
