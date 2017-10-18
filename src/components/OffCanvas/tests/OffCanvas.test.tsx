import * as React from 'react';
import { mount } from 'enzyme';
import Button from '../../Button';
import OffCanvas from '../../OffCanvas';

describe('<OffCanvas />', () => {

  const children = <div><p>Test</p><ul><li>Link 1</li><li>Link 2</li><li>Link 3</li></ul></div>;
  const activatorNode = <Button > OffCanvas </Button>;

  describe('when default props are provided', () => {
    it('default OffCanvas with default props', () => {
      const canvasMenu = mount(<OffCanvas activator={activatorNode} >{children}</OffCanvas>);
      expect(canvasMenu.prop('mode')).toBeUndefined;
      expect(canvasMenu.prop('overlay')).toBeUndefined;
      expect(canvasMenu.prop('flip')).toBeUndefined;
      expect(canvasMenu.find('button').exists()).toBe(true);
    });
  });
  describe('Mode', () => {
    it('when set to slide', () => {
      const canvasMenu = mount(<OffCanvas mode="slide" activator={activatorNode}>{children}</OffCanvas>);
      expect(canvasMenu.prop('mode')).toBe('slide');
      expect(canvasMenu.prop('overlay')).toBeUndefined;
      expect(canvasMenu.prop('flip')).toBeUndefined;
      expect(canvasMenu.find('button').exists()).toBe(true);
    });
    it('when set to reveal', () => {
      const canvasMenu = mount(<OffCanvas mode="reveal" activator={activatorNode}>{children}</OffCanvas>);
      expect(canvasMenu.prop('mode')).toBe('reveal');
      expect(canvasMenu.prop('overlay')).toBeUndefined;
      expect(canvasMenu.prop('flip')).toBeUndefined;
      expect(canvasMenu.find('button').exists()).toBe(true);
    });
  });
  describe('Active', () => {
    it('when not set', () => {
      const canvasMenu = mount(<OffCanvas mode="slide" activator={activatorNode}>{children}</OffCanvas>);
      expect(canvasMenu.prop('mode')).toBe('slide');
      expect(canvasMenu.prop('overlay')).toBeUndefined;
      expect(canvasMenu.prop('flip')).toBeUndefined;
      expect(canvasMenu.prop('active')).toBeUndefined;
      expect(canvasMenu.find('button').exists()).toBe(true);
    });
    it('when set to true', () => {
      const canvasMenu = mount(<OffCanvas mode="slide" activator={activatorNode} active>{children}</OffCanvas>);
      expect(canvasMenu.prop('mode')).toBe('slide');
      expect(canvasMenu.prop('overlay')).toBeUndefined;
      expect(canvasMenu.prop('flip')).toBeUndefined;
      expect(canvasMenu.prop('active')).toBe(true);
      expect(canvasMenu.find('button').exists()).toBe(true);
    });
    it('when set to false', () => {
      const canvasMenu = mount(<OffCanvas mode="slide" activator={activatorNode} active={false}>{children}</OffCanvas>);
      expect(canvasMenu.prop('mode')).toBe('slide');
      expect(canvasMenu.prop('overlay')).toBeUndefined;
      expect(canvasMenu.prop('flip')).toBeUndefined;
      expect(canvasMenu.prop('active')).toBe(false);
      expect(canvasMenu.find('button').exists()).toBe(true);
    });
  });
  describe('Flip', () => {
    it('when not set', () => {
      const canvasMenu = mount(<OffCanvas mode="slide" activator={activatorNode}>{children}</OffCanvas>);
      expect(canvasMenu.prop('mode')).toBe('slide');
      expect(canvasMenu.prop('overlay')).toBeUndefined;
      expect(canvasMenu.prop('flip')).toBeUndefined;
      expect(canvasMenu.find('button').exists()).toBe(true);
    });
    it('when set to true', () => {
      const canvasMenu = mount(<OffCanvas mode="slide" activator={activatorNode} flip>{children}</OffCanvas>);
      expect(canvasMenu.prop('mode')).toBe('slide');
      expect(canvasMenu.prop('overlay')).toBeUndefined;
      expect(canvasMenu.prop('flip')).toBe(true);
      expect(canvasMenu.find('button').exists()).toBe(true);
    });
    it('when set to false', () => {
      const canvasMenu = mount(<OffCanvas mode="slide" activator={activatorNode} flip={false}>{children}</OffCanvas>);
      expect(canvasMenu.prop('mode')).toBe('slide');
      expect(canvasMenu.prop('overlay')).toBeUndefined;
      expect(canvasMenu.prop('flip')).toBe(false);
      expect(canvasMenu.find('button').exists()).toBe(true);
    });
  });
  describe('Overlay', () => {
    it('when not set', () => {
      const canvasMenu = mount(<OffCanvas mode="slide" activator={activatorNode}>{children}</OffCanvas>);
      expect(canvasMenu.prop('mode')).toBe('slide');
      expect(canvasMenu.prop('overlay')).toBeUndefined;
      expect(canvasMenu.prop('flip')).toBeUndefined;
      expect(canvasMenu.find('button').exists()).toBe(true);
    });
    it('when set to true', () => {
      const canvasMenu = mount(<OffCanvas mode="slide" activator={activatorNode} overlay>{children}</OffCanvas>);
      expect(canvasMenu.prop('mode')).toBe('slide');
      expect(canvasMenu.prop('overlay')).toBe(true);
      expect(canvasMenu.prop('flip')).toBeUndefined;
      expect(canvasMenu.find('button').exists()).toBe(true);
    });
    it('when set to false', () => {
      const canvasMenu = mount(<OffCanvas mode="slide" activator={activatorNode} overlay={false}>{children}</OffCanvas>);
      expect(canvasMenu.prop('mode')).toBe('slide');
      expect(canvasMenu.prop('overlay')).toBe(false);
      expect(canvasMenu.prop('flip')).toBeUndefined;
      expect(canvasMenu.find('button').exists()).toBe(true);
    });
  });
});
