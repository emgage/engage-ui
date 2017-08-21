import * as React from 'react';
import { mount } from 'enzyme';
import { OffCanvasMode } from '..';
import OffCanvas from '../OffCanvas';
import Button from '../../Button';

describe('<OffCanvas />', () => {
  describe('onClick()', () => {
    it('is called when the link is clicked', () => {
      const spy = jest.fn();
      mount(<Button onClick={spy}>Push Left</Button>).simulate('click');
      expect(spy).toHaveBeenCalled();
    });
  });  
  describe('width', () => {
    it('sets the width on the offcanvasmenu', () => {
      const offcanvasmenu = mount(<OffCanvas width={270}/>);
      expect(offcanvasmenu.prop('width')).toBe(270);
    });
  });
  describe('transitionDuration', () => {
    it('sets the transitionDuration on the offcanvasbody', () => {
      const offcanvasmenu = mount(<OffCanvas transitionDuration={270}/>);
      expect(offcanvasmenu.prop('transitionDuration')).toBe(270);
    });
  });
  describe('overlay', () => {
    it('sets true the overlay on the offcanvasmenu', () => {
      const offcanvasmenu = mount(<OffCanvas />);
      expect(offcanvasmenu.prop('overlay')).toBeUndefined();
    }); 
    it('sets true the overlay on the offcanvasmenu', () => {
      const offcanvasmenu = mount(<OffCanvas overlay/>);
      expect(offcanvasmenu.prop('overlay')).toBe(true);
    });    
  });
  describe('flip', () => {
    it('sets true the flip on the offcanvasmenu', () => {
      const offcanvasmenu = mount(<OffCanvas />);
      expect(offcanvasmenu.prop('flip')).toBeUndefined();
    }); 
    it('sets true the flip on the offcanvasmenu', () => {
      const offcanvasmenu = mount(<OffCanvas flip/>);
      expect(offcanvasmenu.prop('flip')).toBe(true);
    });    
  });
  describe('set style', () => {
    const closedStyle = {
      width: '270px',      
      top: '0px',
      left: 'auto',
      right: '-270px',      
      transitionDuration: '270ms',     
    };
    let currStyle = Object.assign({}, closedStyle);
    it('set closestyle', () => {      

      const offcanvasstyle = mount(<div style={currStyle}/>);
      expect(offcanvasstyle.prop('style')).toBe(currStyle);
    });
    it('set openstyle', () => {      

      const openStyle = {
        left: '-270px',
        right: 'auto',      
      };
      currStyle = Object.assign({}, currStyle, openStyle);
      const offcanvasstyle = mount(<div style={currStyle}/>);
      expect(offcanvasstyle.prop('style')).toBe(currStyle);
    });
  });
  describe('mode', () => {
    it('sets mode to "slide" on the offcanvas', () => {
      const offcanvas = mount(<OffCanvas mode={OffCanvasMode.slide}/>);
      expect(offcanvas.prop('mode')).toBe(0);
    });
    it('sets mode to "push" on the offcanvas', () => {
      const offcanvas = mount(<OffCanvas mode={OffCanvasMode.push}/>);
      expect(offcanvas.prop('mode')).toBe(2);
    });    
    it('sets mode to "none" on the offcanvas', () => {
      const offcanvas = mount(<OffCanvas mode={OffCanvasMode.none}/>);
      expect(offcanvas.prop('mode')).toBe(3);
    });
    it('sets mode to "reveal" on the offcanvas', () => {
      const offcanvas = mount(<OffCanvas mode={OffCanvasMode.reveal}/>);
      expect(offcanvas.prop('mode')).toBe(1);
    });    
  });  
});
