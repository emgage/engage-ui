import * as React from 'react';
import { mount } from 'enzyme';
import Dropdown from './../Dropdown';
import { Props as DropdownItemProps } from './../DropdownItem';

describe('<Dropdown />', () => {
  const item1Onclick = jest.fn();
  const items : DropdownItemProps[] = [
    {
      content: 'Item 1',
      onClick: item1Onclick,
    },
    {
      content: 'Item 2',
      disabled: true,
    },
    {
      content: 'Item 3',
      divider: true
    }
  ];

  describe('Default dropdown rendering', () => {
    it('Render Properly when direction is not provided', () => {
      const spy = jest.fn();
      const dropdownWrapper = mount(<Dropdown active={false} toggle={spy} dropdownItems={items} />);
      expect(dropdownWrapper.find('div')).toHaveLength(6);
      expect(dropdownWrapper.find('div').at(1).hasClass('active')).toBeFalsy();
      expect(dropdownWrapper.find('div').at(3).hasClass('dropdownItem')).toBeTruthy();
      expect(dropdownWrapper.find('div').at(4).hasClass('dropdownItem')).toBeTruthy();
      expect(dropdownWrapper.find('div').at(4).hasClass('disabled')).toBeTruthy();
      expect(dropdownWrapper.find('div').at(5).hasClass('dropdownDivider')).toBeTruthy();
    });

    it('Render Properly when direction is down', () => {
      const spy = jest.fn();
      const dropdownWrapper = mount(<Dropdown active={false} toggle={spy} dropdownItems={items} direction="down"/>);
      expect(dropdownWrapper.find('div')).toHaveLength(6);
      expect(dropdownWrapper.find('div').at(1).hasClass('active')).toBeFalsy();
      expect(dropdownWrapper.find('div').at(3).hasClass('dropdownItem')).toBeTruthy();
      expect(dropdownWrapper.find('div').at(4).hasClass('dropdownItem')).toBeTruthy();
      expect(dropdownWrapper.find('div').at(4).hasClass('disabled')).toBeTruthy();
      expect(dropdownWrapper.find('div').at(5).hasClass('dropdownDivider')).toBeTruthy();
      expect(dropdownWrapper.prop('active')).toBe(false);
    });

    it('Render Properly when direction is up', () => {
      const spy = jest.fn();
      const dropdownWrapper = mount(<Dropdown active={false} toggle={spy} dropdownItems={items} direction="up"/>);
      expect(dropdownWrapper.find('div')).toHaveLength(6);
      expect(dropdownWrapper.find('div').at(1).hasClass('active')).toBeFalsy();
      expect(dropdownWrapper.find('div').at(3).hasClass('dropdownItem')).toBeTruthy();
      expect(dropdownWrapper.find('div').at(4).hasClass('dropdownItem')).toBeTruthy();
      expect(dropdownWrapper.find('div').at(4).hasClass('disabled')).toBeTruthy();
      expect(dropdownWrapper.find('div').at(5).hasClass('dropdownDivider')).toBeTruthy();
      expect(dropdownWrapper.prop('active')).toBe(false);
    });

    it('Render Properly when direction is left', () => {
      const spy = jest.fn();
      const dropdownWrapper = mount(<Dropdown active={false} toggle={spy} dropdownItems={items} direction="left"/>);
      expect(dropdownWrapper.find('div')).toHaveLength(6);
      expect(dropdownWrapper.find('div').at(1).hasClass('active')).toBeFalsy();
      expect(dropdownWrapper.find('div').at(3).hasClass('dropdownItem')).toBeTruthy();
      expect(dropdownWrapper.find('div').at(4).hasClass('dropdownItem')).toBeTruthy();
      expect(dropdownWrapper.find('div').at(4).hasClass('disabled')).toBeTruthy();
      expect(dropdownWrapper.find('div').at(5).hasClass('dropdownDivider')).toBeTruthy();
      expect(dropdownWrapper.prop('active')).toBe(false);
    });

    it('Render Properly when direction is right', () => {
      const spy = jest.fn();
      const dropdownWrapper = mount(<Dropdown active={false} toggle={spy} dropdownItems={items} direction="right"/>);
      expect(dropdownWrapper.find('div')).toHaveLength(6);
      expect(dropdownWrapper.find('div').at(1).hasClass('active')).toBeFalsy();
      expect(dropdownWrapper.find('div').at(3).hasClass('dropdownItem')).toBeTruthy();
      expect(dropdownWrapper.find('div').at(4).hasClass('dropdownItem')).toBeTruthy();
      expect(dropdownWrapper.find('div').at(4).hasClass('disabled')).toBeTruthy();
      expect(dropdownWrapper.find('div').at(5).hasClass('dropdownDivider')).toBeTruthy();
      expect(dropdownWrapper.prop('active')).toBe(false);
    });

    it('Set classes when active prop is true', () => {
      const spy = jest.fn();
      const dropdownWrapper = mount(<Dropdown active={true} toggle={spy} dropdownItems={items}  />);
      expect(dropdownWrapper.find('div')).toHaveLength(6);
      expect(dropdownWrapper.find('div').at(1).hasClass('active')).toBeTruthy();
      expect(dropdownWrapper.find('div').at(3).hasClass('dropdownItem')).toBeTruthy();
      expect(dropdownWrapper.find('div').at(4).hasClass('dropdownItem')).toBeTruthy();
      expect(dropdownWrapper.find('div').at(4).hasClass('disabled')).toBeTruthy();
      expect(dropdownWrapper.find('div').at(5).hasClass('dropdownDivider')).toBeTruthy();
      expect(dropdownWrapper.prop('active')).toBe(true);
    });
  });
});


