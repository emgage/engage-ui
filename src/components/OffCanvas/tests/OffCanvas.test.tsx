// import * as React from 'react';
// import { mount } from 'enzyme';
// import { OffCanvasAnimationType, OffCanvasPosition } from '..';
// import OffCanvas from '../OffCanvas';

// describe('<OffCanvas />', () => {
//   describe('onClick()', () => {
//     it('is called when the link is clicked', () => {
//       const spy = jest.fn();
//       mount(<a href="#" onClick={spy}>Toggle Menu</a>).simulate('click');
//       expect(spy).toHaveBeenCalled();
//     });
//   });
//   describe('width', () => {
//     it('sets the width on the offcanvasmenu', () => {
//       const offcanvasmenu = mount(<OffCanvas width={270}/>);
//       expect(offcanvasmenu.prop('width')).toBe(270);
//     });
//   });
//   describe('transitionDuration', () => {
//     it('sets the transitionDuration on the offcanvasbody', () => {
//       const offcanvasmenu = mount(<OffCanvas transitionDuration={270}/>);
//       expect(offcanvasmenu.prop('transitionDuration')).toBe(270);
//     });
//   });
//   describe('isMenuOpened', () => {
//     const closedStyle = {
//       width: '270px',
//       position: 'fixed' as 'fixed',
//       top: '0px',
//       left: 'auto',
//       transform: 'translate(-270px, 0px)',
//       transitionDuration: '270ms',     
//     };
//     let currStyle = Object.assign({}, closedStyle);
//     it('set closestyle while isMenuOpened is set as false', () => {
//       const offcanvas = mount(<OffCanvas isMenuOpened={false}/>);
//       expect(offcanvas.prop('isMenuOpened')).toBe(false);

//       const offcanvasstyle = mount(<div style={currStyle}/>);
//       expect(offcanvasstyle.prop('style')).toBe(currStyle);
//     });
//     it('set openstyle while isMenuOpened is set as true', () => {
//       const offcanvas = mount(<OffCanvas isMenuOpened={true}/>);
//       expect(offcanvas.prop('isMenuOpened')).toBe(true);

//       const openStyle = {
//         transform: 'translate(270px, 0px)',
//       };
//       currStyle = Object.assign({}, currStyle, openStyle);
//       const offcanvasstyle = mount(<div style={currStyle}/>);
//       expect(offcanvasstyle.prop('style')).toBe(currStyle);
//     });
//   });
//   describe('animation', () => {
//     it('sets animation to "Slide" on the offcanvas', () => {
//       const offcanvas = mount(<OffCanvas animation={OffCanvasAnimationType.Slide}/>);
//       expect(offcanvas.prop('animation')).toBe('Slide');
//     });
//     it('sets animation to "Push" on the offcanvas', () => {
//       const offcanvas = mount(<OffCanvas animation={OffCanvasAnimationType.Push}/>);
//       expect(offcanvas.prop('animation')).toBe('Push');
//     });
//     it('sets animation to "None" on the offcanvas', () => {
//       const offcanvas = mount(<OffCanvas animation={OffCanvasAnimationType.None}/>);
//       expect(offcanvas.prop('animation')).toBe('None');
//     });
//   });
//   describe('position', () => {
//     it('sets the isMenuOpened on the offcanvas', () => {
//       const offcanvas = mount(<OffCanvas position={OffCanvasPosition.Right}/>);
//       expect(offcanvas.prop('position')).toBe('right');
//     });
//   });
// });
