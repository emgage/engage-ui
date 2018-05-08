import * as React from 'react';
import { mount } from 'enzyme';
import Dropdown from './../Dropdown';
import Button from './../../Button';
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
      const dropdownWrapper = mount(<Dropdown active={false} toggle={spy} trigger={<Button>Test</Button>} dropdownItems={items} />);
      expect(dropdownWrapper.find('div').at(1).hasClass('dropdown')).toBeTruthy();
      expect(dropdownWrapper.find('div').at(1).hasClass('active')).toBeFalsy();
      expect(dropdownWrapper.find('div').at(3).hasClass('dropdownMenu')).toBeTruthy();
      expect(dropdownWrapper.find('div').at(4).hasClass('box')).toBeTruthy();
      expect(dropdownWrapper.find('div').at(5).hasClass('dropdownItem')).toBeTruthy();
      expect(dropdownWrapper.find('div').at(6).hasClass('dropdownItem')).toBeTruthy();
      expect(dropdownWrapper.find('div').at(6).hasClass('disabled')).toBeTruthy();
      expect(dropdownWrapper.find('div').at(7).hasClass('dropdownDivider')).toBeTruthy();
      expect(dropdownWrapper.prop('active')).toBe(false);
      expect(dropdownWrapper.find('button')).toHaveLength(2);
      expect(dropdownWrapper.find('div')).toHaveLength(8);
    });

    it('Render Properly when direction is down', () => {
      const spy = jest.fn();
      const dropdownWrapper = mount(<Dropdown active={false} toggle={spy} trigger={<Button>Test</Button>} dropdownItems={items} direction="down" />);
      dropdownWrapper.find('button').at(0).simulate('click');
      expect(dropdownWrapper.find('div').at(1).hasClass('dropdown')).toBeTruthy();
      expect(dropdownWrapper.find('div').at(1).hasClass('active')).toBeFalsy();
      expect(dropdownWrapper.find('div').at(3).hasClass('dropdownMenu')).toBeTruthy();
      expect(dropdownWrapper.find('div').at(4).hasClass('box')).toBeTruthy();
      expect(dropdownWrapper.find('div').at(5).hasClass('dropdownItem')).toBeTruthy();
      expect(dropdownWrapper.find('div').at(6).hasClass('dropdownItem')).toBeTruthy();
      expect(dropdownWrapper.find('div').at(6).hasClass('disabled')).toBeTruthy();
      expect(dropdownWrapper.find('div').at(7).hasClass('dropdownDivider')).toBeTruthy();
      expect(dropdownWrapper.prop('active')).toBe(false);
      expect(dropdownWrapper.find('button')).toHaveLength(2);
      expect(dropdownWrapper.find('div')).toHaveLength(8);
      expect(spy).toHaveBeenCalled();
    });

    it('Render Properly when direction is up', () => {
      const spy = jest.fn();
      const dropdownWrapper = mount(<Dropdown active={false} toggle={spy} trigger={<Button>Test</Button>} dropdownItems={items} direction="up" />);
      dropdownWrapper.find('button').at(0).simulate('click');
      expect(dropdownWrapper.find('div').at(1).hasClass('dropup')).toBeTruthy();
      expect(dropdownWrapper.find('div').at(1).hasClass('active')).toBeFalsy();
      expect(dropdownWrapper.find('div').at(3).hasClass('dropdownMenu')).toBeTruthy();
      expect(dropdownWrapper.find('div').at(4).hasClass('box')).toBeTruthy();
      expect(dropdownWrapper.find('div').at(5).hasClass('dropdownItem')).toBeTruthy();
      expect(dropdownWrapper.find('div').at(6).hasClass('dropdownItem')).toBeTruthy();
      expect(dropdownWrapper.find('div').at(6).hasClass('disabled')).toBeTruthy();
      expect(dropdownWrapper.find('div').at(7).hasClass('dropdownDivider')).toBeTruthy();
      expect(dropdownWrapper.prop('active')).toBe(false);
      expect(dropdownWrapper.find('button')).toHaveLength(2);
      expect(dropdownWrapper.find('div')).toHaveLength(8);
      expect(spy).toHaveBeenCalled();
    });

    it('Render Properly when direction is left', () => {
      const spy = jest.fn();
      const dropdownWrapper = mount(<Dropdown active={false} toggle={spy} trigger={<Button>Test</Button>} dropdownItems={items} direction="left" />);
      dropdownWrapper.find('button').at(0).simulate('click');
      expect(dropdownWrapper.find('div').at(1).hasClass('dropleft')).toBeTruthy();
      expect(dropdownWrapper.find('div').at(1).hasClass('active')).toBeFalsy();
      expect(dropdownWrapper.find('div').at(3).hasClass('dropdownMenu')).toBeTruthy();
      expect(dropdownWrapper.find('div').at(4).hasClass('box')).toBeTruthy();
      expect(dropdownWrapper.find('div').at(5).hasClass('dropdownItem')).toBeTruthy();
      expect(dropdownWrapper.find('div').at(6).hasClass('dropdownItem')).toBeTruthy();
      expect(dropdownWrapper.find('div').at(6).hasClass('disabled')).toBeTruthy();
      expect(dropdownWrapper.find('div').at(7).hasClass('dropdownDivider')).toBeTruthy();
      expect(dropdownWrapper.prop('active')).toBe(false);
      expect(dropdownWrapper.find('button')).toHaveLength(2);
      expect(dropdownWrapper.find('div')).toHaveLength(8);
      expect(spy).toHaveBeenCalled();
    });

    it('Render Properly when direction is right', () => {
      const spy = jest.fn();
      const dropdownWrapper = mount(<Dropdown active={false} toggle={spy} trigger={<Button>Test</Button>} dropdownItems={items} direction="right" />);
      dropdownWrapper.find('button').at(0).simulate('click');
      expect(dropdownWrapper.find('div').at(1).hasClass('dropright')).toBeTruthy();
      expect(dropdownWrapper.find('div').at(1).hasClass('active')).toBeFalsy();
      expect(dropdownWrapper.find('div').at(3).hasClass('dropdownMenu')).toBeTruthy();
      expect(dropdownWrapper.find('div').at(4).hasClass('box')).toBeTruthy();
      expect(dropdownWrapper.find('div').at(5).hasClass('dropdownItem')).toBeTruthy();
      expect(dropdownWrapper.find('div').at(6).hasClass('dropdownItem')).toBeTruthy();
      expect(dropdownWrapper.find('div').at(6).hasClass('disabled')).toBeTruthy();
      expect(dropdownWrapper.find('div').at(7).hasClass('dropdownDivider')).toBeTruthy();
      expect(dropdownWrapper.prop('active')).toBe(false);
      expect(dropdownWrapper.find('button')).toHaveLength(2);
      expect(dropdownWrapper.find('div')).toHaveLength(8);
      expect(spy).toHaveBeenCalled();
    });

    it('Set classes when active prop is true', () => {
      const spy = jest.fn();
      const dropdownWrapper = mount(<Dropdown active={true} toggle={spy} trigger={<Button>Test</Button>} dropdownItems={items}  />);
      dropdownWrapper.find('button').at(0).simulate('click');
      expect(dropdownWrapper.find('div').at(1).hasClass('dropdown')).toBeTruthy();
      expect(dropdownWrapper.find('div').at(1).hasClass('active')).toBeTruthy();
      expect(dropdownWrapper.find('div').at(3).hasClass('dropdownMenu')).toBeTruthy();
      expect(dropdownWrapper.find('div').at(4).hasClass('box')).toBeTruthy();
      expect(dropdownWrapper.find('div').at(5).hasClass('dropdownItem')).toBeTruthy();
      expect(dropdownWrapper.find('div').at(6).hasClass('dropdownItem')).toBeTruthy();
      expect(dropdownWrapper.find('div').at(6).hasClass('disabled')).toBeTruthy();
      expect(dropdownWrapper.find('div').at(7).hasClass('dropdownDivider')).toBeTruthy();
      expect(dropdownWrapper.prop('active')).toBe(true);
      expect(dropdownWrapper.find('button')).toHaveLength(2);
      expect(dropdownWrapper.find('div')).toHaveLength(8);
      expect(spy).toHaveBeenCalled();
    });

    it('Call Onclick callback when item is clicked', () => {
      const spy = jest.fn();
      const dropdownWrapper = mount(<Dropdown active={true} toggle={spy} trigger={<Button>Test</Button>} dropdownItems={items}  />);
      dropdownWrapper.find('button').at(0).simulate('click');
      dropdownWrapper.find('div').at(5).simulate('click');
      expect(dropdownWrapper.find('div').at(1).hasClass('dropdown')).toBeTruthy();
      expect(dropdownWrapper.find('div').at(1).hasClass('active')).toBeTruthy();
      expect(dropdownWrapper.find('div').at(3).hasClass('dropdownMenu')).toBeTruthy();
      expect(dropdownWrapper.find('div').at(4).hasClass('box')).toBeTruthy();
      expect(dropdownWrapper.find('div').at(5).hasClass('dropdownItem')).toBeTruthy();
      expect(dropdownWrapper.find('div').at(6).hasClass('dropdownItem')).toBeTruthy();
      expect(dropdownWrapper.find('div').at(6).hasClass('disabled')).toBeTruthy();
      expect(dropdownWrapper.find('div').at(7).hasClass('dropdownDivider')).toBeTruthy();
      expect(dropdownWrapper.prop('active')).toBe(true);
      expect(dropdownWrapper.find('button')).toHaveLength(2);
      expect(dropdownWrapper.find('div')).toHaveLength(8);
      expect(item1Onclick).toHaveBeenCalled();
      expect(spy).toHaveBeenCalled();
    });
  });
});


