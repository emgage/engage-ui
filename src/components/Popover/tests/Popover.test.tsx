import * as React from 'react';
import { mount } from 'enzyme';
import Popover from './../Popover';

describe('<Popover />', () => {
  describe('Default popover rendering', () => {
    it('Render Properly when direction is not provided', () => {
      const spy = jest.fn();
      const popoverWrapper = mount(<Popover active={false} toggle={spy}>Hi there I'm popover</Popover>);
      expect(popoverWrapper.find('div')).toHaveLength(3);
      expect(popoverWrapper.find('div').at(1).hasClass('popdown')).toBeTruthy();
      expect(popoverWrapper.find('div').at(1).hasClass('active')).toBeFalsy();
      expect(popoverWrapper.find('div').at(2).hasClass('popoverContainer')).toBeTruthy();
    });

    it('Render Properly when direction is down', () => {
      const spy = jest.fn();
      const popoverWrapper = mount(<Popover active={false} toggle={spy} direction="down">Hi there I'm popover</Popover>);
      expect(popoverWrapper.find('div')).toHaveLength(3);
      expect(popoverWrapper.find('div').at(1).hasClass('popdown')).toBeTruthy();
      expect(popoverWrapper.find('div').at(1).hasClass('active')).toBeFalsy();
      expect(popoverWrapper.find('div').at(2).hasClass('popoverContainer')).toBeTruthy();
      expect(popoverWrapper.prop('active')).toBe(false);
    });

    it('Render Properly when direction is up', () => {
      const spy = jest.fn();
      const popoverWrapper = mount(<Popover active={false} toggle={spy} direction="up">Hi there I'm popover</Popover>);
      expect(popoverWrapper.find('div')).toHaveLength(3);
      expect(popoverWrapper.find('div').at(1).hasClass('popup')).toBeTruthy();
      expect(popoverWrapper.find('div').at(1).hasClass('active')).toBeFalsy();
      expect(popoverWrapper.find('div').at(2).hasClass('popoverContainer')).toBeTruthy();
      expect(popoverWrapper.prop('active')).toBe(false);
    });

    it('Render Properly when direction is left', () => {
      const spy = jest.fn();
      const popoverWrapper = mount(<Popover active={false} toggle={spy} direction="left">Hi there I'm popover</Popover>);
      expect(popoverWrapper.find('div')).toHaveLength(3);
      expect(popoverWrapper.find('div').at(1).hasClass('popleft')).toBeTruthy();
      expect(popoverWrapper.find('div').at(1).hasClass('active')).toBeFalsy();
      expect(popoverWrapper.find('div').at(2).hasClass('popoverContainer')).toBeTruthy();
      expect(popoverWrapper.prop('active')).toBe(false);
    });

    it('Render Properly when direction is right', () => {
      const spy = jest.fn();
      const popoverWrapper = mount(<Popover active={false} toggle={spy} direction="right">Hi there I'm popover</Popover>);
      expect(popoverWrapper.find('div')).toHaveLength(3);
      expect(popoverWrapper.find('div').at(1).hasClass('popright')).toBeTruthy();
      expect(popoverWrapper.find('div').at(1).hasClass('active')).toBeFalsy();
      expect(popoverWrapper.find('div').at(2).hasClass('popoverContainer')).toBeTruthy();
      expect(popoverWrapper.prop('active')).toBe(false);
    });

    it('Set classes when active prop is true', () => {
      const spy = jest.fn();
      const popoverWrapper = mount(<Popover active={true} toggle={spy}>Hi there I'm popover</Popover>);
      expect(popoverWrapper.find('div')).toHaveLength(3);
      expect(popoverWrapper.find('div').at(1).hasClass('popdown')).toBeTruthy();
      expect(popoverWrapper.find('div').at(1).hasClass('active')).toBeTruthy();
      expect(popoverWrapper.find('div').at(2).hasClass('popoverContainer')).toBeTruthy();
      expect(popoverWrapper.prop('active')).toBe(true);
    });
  });
});
