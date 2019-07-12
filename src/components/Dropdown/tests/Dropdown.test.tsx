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
      const dropdownWrapper = mount(<Dropdown toggle={spy} dropdownItems={items} />);
      expect(dropdownWrapper.find('div')).toHaveLength(0);
      // expect(dropdownWrapper.find('div').at(3).hasClass('dropdownItem')).toBeTruthy();
      // expect(dropdownWrapper.find('div').at(4).hasClass('dropdownItem')).toBeTruthy();
      // expect(dropdownWrapper.find('div').at(4).hasClass('disabled')).toBeTruthy();
      // expect(dropdownWrapper.find('div').at(5).hasClass('dropdownDivider')).toBeTruthy();
    });

    it('Render Properly when direction is below', () => {
      const spy = jest.fn();
      const dropdownWrapper = mount(<Dropdown toggle={spy} dropdownItems={items} preferredPosition="below"/>);
      expect(dropdownWrapper.find('div')).toHaveLength(0);
      // expect(dropdownWrapper.find('div').at(3).hasClass('dropdownItem')).toBeTruthy();
      // expect(dropdownWrapper.find('div').at(4).hasClass('dropdownItem')).toBeTruthy();
      // expect(dropdownWrapper.find('div').at(4).hasClass('disabled')).toBeTruthy();
      // expect(dropdownWrapper.find('div').at(5).hasClass('dropdownDivider')).toBeTruthy();
    });

    it('Render Properly when preferredPosition is above', () => {
      const spy = jest.fn();
      const dropdownWrapper = mount(<Dropdown toggle={spy} dropdownItems={items} preferredPosition="above"/>);
      expect(dropdownWrapper.find('div')).toHaveLength(0);
      // expect(dropdownWrapper.find('div').at(3).hasClass('dropdownItem')).toBeTruthy();
      // expect(dropdownWrapper.find('div').at(4).hasClass('dropdownItem')).toBeTruthy();
      // expect(dropdownWrapper.find('div').at(4).hasClass('disabled')).toBeTruthy();
      // expect(dropdownWrapper.find('div').at(5).hasClass('dropdownDivider')).toBeTruthy();
    });

    it('Render Properly when preferredPosition is left', () => {
      const spy = jest.fn();
      const dropdownWrapper = mount(<Dropdown toggle={spy} dropdownItems={items} preferredPosition="left"/>);
      expect(dropdownWrapper.find('div')).toHaveLength(0);
      // expect(dropdownWrapper.find('div').at(3).hasClass('dropdownItem')).toBeTruthy();
      // expect(dropdownWrapper.find('div').at(4).hasClass('dropdownItem')).toBeTruthy();
      // expect(dropdownWrapper.find('div').at(4).hasClass('disabled')).toBeTruthy();
      // expect(dropdownWrapper.find('div').at(5).hasClass('dropdownDivider')).toBeTruthy();
    });

    it('Render Properly when preferredPosition is right', () => {
      const spy = jest.fn();
      const dropdownWrapper = mount(<Dropdown toggle={spy} dropdownItems={items} preferredPosition="right"/>);
      expect(dropdownWrapper.find('div')).toHaveLength(0);
      // expect(dropdownWrapper.find('div').at(3).hasClass('dropdownItem')).toBeTruthy();
      // expect(dropdownWrapper.find('div').at(4).hasClass('dropdownItem')).toBeTruthy();
      // expect(dropdownWrapper.find('div').at(4).hasClass('disabled')).toBeTruthy();
      // expect(dropdownWrapper.find('div').at(5).hasClass('dropdownDivider')).toBeTruthy();
    });

    it('Set classes when active prop is true', () => {
      const spy = jest.fn();
      const dropdownWrapper = mount(<Dropdown toggle={spy} dropdownItems={items}  />);

      expect(dropdownWrapper.find('div')).toHaveLength(0);
      // expect(dropdownWrapper.find('div').at(0).hasClass('dropdownItem')).toBeTruthy();
      // expect(dropdownWrapper.find('div').at(0).hasClass('dropdownItem')).toBeTruthy();
      // expect(dropdownWrapper.find('div').at(0).hasClass('disabled')).toBeTruthy();
      // expect(dropdownWrapper.find('div').at(0).hasClass('dropdownDivider')).toBeTruthy();
    });
  });
});
