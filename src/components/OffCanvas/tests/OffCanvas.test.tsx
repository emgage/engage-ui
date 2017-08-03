import * as React from 'react';
import { mount } from 'enzyme';
import { OffCanvasBody, OffCanvasMenu, OffCanvasAnimationType, OffCanvasPosition } from '..';
import OffCanvas from '../OffCanvas';

describe('<OffCanvas/>', () => {
  describe('width', () => {
    it('sets the width on the offcanvas', () => {
      const offcanvas = mount(<OffCanvas width={270}/>);
      expect(offcanvas.prop('width')).toBe(270);
    });
  });
  describe('transitionDuration', () => {
    it('sets the transitionDuration on the offcanvas', () => {
      const offcanvas = mount(<OffCanvas transitionDuration={270}/>);
      expect(offcanvas.prop('transitionDuration')).toBe(270);
    });
  });
  describe('isMenuOpened', () => {
    it('sets the isMenuOpened on the offcanvas', () => {
      const offcanvas = mount(<OffCanvas isMenuOpened={false}/>);
      expect(offcanvas.prop('isMenuOpened')).toBe(false);
    });
  });
});

describe('<OffCanvasBody />', () => {
  describe('onClick()', () => {
    it('is called when the link is clicked', () => {
      const spy = jest.fn();
      mount(<a href="#" onClick={spy}>Slide</a>).simulate('click');
      expect(spy).toHaveBeenCalled();
    });
  });
  describe('width', () => {
    it('sets the width on the offcanvasbody', () => {
      const offcanvasbody = mount(<OffCanvasBody width={270}/>);
      expect(offcanvasbody.prop('width')).toBe(270);
    });
  });
  describe('transitionDuration', () => {
    it('sets the transitionDuration on the offcanvasbody', () => {
      const offcanvasbody = mount(<OffCanvasBody transitionDuration={270}/>);
      expect(offcanvasbody.prop('transitionDuration')).toBe(270);
    });
  });
  describe('isMenuOpened', () => {
    const closedStyle = {
      transitionDuration: '270ms',
      transform: 'translate(0px, 0px)',
      backfaceVisibility: 'hidden',
    };
    let currStyle = Object.assign({}, closedStyle);
    it('set closestyle while isMenuOpened is set as false on the offcanvasbody', () => {
      const offcanvasbody = mount(<OffCanvasBody isMenuOpened={false}/>);
      expect(offcanvasbody.prop('isMenuOpened')).toBe(false);

      const offcanvasbodystyle = mount(<div style={currStyle}/>);
      expect(offcanvasbodystyle.prop('style')).toBe(currStyle);
    });
    it('set openstyle while isMenuOpened is set as true on the offcanvasbody', () => {
      const offcanvasbody = mount(<OffCanvasBody isMenuOpened={true}/>);
      expect(offcanvasbody.prop('isMenuOpened')).toBe(true);

      const openStyle = {
        transform: 'translate(270px, 0px)',
      };
      currStyle = Object.assign({}, currStyle, openStyle);
      const offcanvasbodystyle = mount(<div style={currStyle}/>);
      expect(offcanvasbodystyle.prop('style')).toBe(currStyle);
    });
  });
  describe('animation', () => {
    it('sets animation to "Slide" on the offcanvas', () => {
      const offcanvasbody = mount(<OffCanvasBody animation={OffCanvasAnimationType.Slide}/>);
      expect(offcanvasbody.prop('animation')).toBe('Slide');
    });
    it('sets animation to "Reveal" on the offcanvas', () => {
      const offcanvasbody = mount(<OffCanvasBody animation={OffCanvasAnimationType.Reveal}/>);
      expect(offcanvasbody.prop('animation')).toBe('Reveal');
    });
    it('sets animation to "None" on the offcanvas', () => {
      const offcanvasbody = mount(<OffCanvasBody animation={OffCanvasAnimationType.None}/>);
      expect(offcanvasbody.prop('animation')).toBe('None');
    });
  });
  describe('position', () => {
    it('sets the isMenuOpened on the offcanvas', () => {
      const offcanvasbody = mount(<OffCanvasBody position={OffCanvasPosition.Right}/>);
      expect(offcanvasbody.prop('position')).toBe('right');
    });
  });
});

describe('<OffCanvasMenu />', () => {
  describe('onClick()', () => {
    it('is called when the link is clicked', () => {
      const spy = jest.fn();
      mount(<a href="#" onClick={spy}>Toggle Menu</a>).simulate('click');
      expect(spy).toHaveBeenCalled();
    });
  });
  describe('width', () => {
    it('sets the width on the offcanvasmenu', () => {
      const offcanvasmenu = mount(<OffCanvasMenu width={270}/>);
      expect(offcanvasmenu.prop('width')).toBe(270);
    });
  });
  describe('transitionDuration', () => {
    it('sets the transitionDuration on the offcanvasbody', () => {
      const offcanvasmenu = mount(<OffCanvasMenu transitionDuration={270}/>);
      expect(offcanvasmenu.prop('transitionDuration')).toBe(270);
    });
  });
  describe('isMenuOpened', () => {
    const closedStyle = {
      width: '270px',
      position: 'fixed' as 'fixed',
      top: '0px',
      left: 'auto',
      transform: 'translate(-270px, 0px)',
      transitionDuration: '270ms',
      backfaceVisibility: 'hidden',
    };
    let currStyle = Object.assign({}, closedStyle);
    it('set closestyle while isMenuOpened is set as false', () => {
      const offcanvasmenu = mount(<OffCanvasMenu isMenuOpened={false}/>);
      expect(offcanvasmenu.prop('isMenuOpened')).toBe(false);

      const offcanvasmenustyle = mount(<div style={currStyle}/>);
      expect(offcanvasmenustyle.prop('style')).toBe(currStyle);
    });
    it('set openstyle while isMenuOpened is set as true', () => {
      const offcanvasmenu = mount(<OffCanvasMenu isMenuOpened={true}/>);
      expect(offcanvasmenu.prop('isMenuOpened')).toBe(true);

      const openStyle = {
        transform: 'translate(270px, 0px)',
      };
      currStyle = Object.assign({}, currStyle, openStyle);
      const offcanvasmenustyle = mount(<div style={currStyle}/>);
      expect(offcanvasmenustyle.prop('style')).toBe(currStyle);
    });
  });
});
