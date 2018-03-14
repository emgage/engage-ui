// import * as React from 'react';
// import { mount } from 'enzyme';
// import Modal from '../Modal';
// import Button from '../../Button';
// import Heading from '../../Heading';

// describe('<Modal />', () => {

//   const footerNode = <Button > Save </Button>;
//   const headerNode = <Heading>This is a Modal Header!!</Heading>;
//   const childBody = <span><h1>Hello, world</h1> <p> test L</p></span>;
//   const activatorNode = <Button>Modal</Button>;

//   describe('when default props are provided', () => {
//     it('basic Modal should have rendered 5 div elements with default props', () => {
//       const subject = mount(<Modal activator={activatorNode} active={false}>{childBody}</Modal>);
//       expect(subject.prop('active')).toBe(false);
//       expect(subject.find('div')).toHaveLength(4);
//       expect(subject.find('span')).toHaveLength(4);
//       expect(subject.find('button').exists()).toBe(true);
//     });
//   });

//   describe('Close Prop', () => {
//     it('When not set', () => {
//       const subject = mount(<Modal activator={activatorNode} active={false}>{childBody}</Modal>);
//       expect(subject.prop('active')).toBe(false);
//       expect(subject.find('div')).toHaveLength(4);
//       expect(subject.find('span')).toHaveLength(4);
//       expect(subject.find('button').exists()).toBe(true);
//     });

//     it('When set to false', () => {
//       const subject = mount(<Modal activator={activatorNode} close={false} active={false}>{childBody}</Modal>);
//       expect(subject.prop('active')).toBe(false);
//       expect(subject.prop('close')).toBe(false);
//       expect(subject.find('div')).toHaveLength(4);
//       expect(subject.find('span')).toHaveLength(4);
//       expect(subject.find('button').exists()).toBe(true);
//     });

//     it('When set to true', () => {
//       const subject = mount(<Modal activator={activatorNode} close={true} active={false}>{childBody}</Modal>);
//       expect(subject.prop('active')).toBe(false);
//       expect(subject.prop('close')).toBe(true);
//       expect(subject.find('div')).toHaveLength(5);
//       expect(subject.find('span')).toHaveLength(7);
//       expect(subject.find('button').exists()).toBe(true);
//     });
//   });
//   describe('closeOnBackgroud Prop', () => {
//     it('When not set', () => {
//       const subject = mount(<Modal activator={activatorNode} active={false}>{childBody}</Modal>);
//       expect(subject.prop('active')).toBe(false);
//       expect(subject.find('div')).toHaveLength(4);
//       expect(subject.find('span')).toHaveLength(4);
//       expect(subject.find('button').exists()).toBe(true);
//     });

//     it('When set to false', () => {
//       const subject = mount(<Modal activator={activatorNode} closeOnBackgroud={false} active={false}>{childBody}</Modal>);
//       expect(subject.prop('active')).toBe(false);
//       expect(subject.prop('closeOnBackgroud')).toBe(false);
//       expect(subject.find('div')).toHaveLength(4);
//       expect(subject.find('span')).toHaveLength(4);
//       expect(subject.find('button').exists()).toBe(true);
//     });

//     it('When set to true', () => {
//       const subject = mount(<Modal activator={activatorNode} closeOnBackgroud={true} active={false}>{childBody}</Modal>);
//       expect(subject.prop('active')).toBe(false);
//       expect(subject.prop('closeOnBackgroud')).toBe(true);
//       expect(subject.find('div')).toHaveLength(4);
//       expect(subject.find('span')).toHaveLength(4);
//       expect(subject.find('button').exists()).toBe(true);
//     });
//   });

//   describe('closeOnEsc Prop', () => {
//     it('When not set', () => {
//       const subject = mount(<Modal activator={activatorNode} active={false}>{childBody}</Modal>);
//       expect(subject.prop('active')).toBe(false);
//       expect(subject.find('div')).toHaveLength(4);
//       expect(subject.find('span')).toHaveLength(4);
//       expect(subject.find('button').exists()).toBe(true);
//     });
//     it('When set to false', () => {
//       const subject = mount(<Modal activator={activatorNode} closeOnEsc={false} active={false}>{childBody}</Modal>);
//       expect(subject.prop('active')).toBe(false);
//       expect(subject.prop('closeOnEsc')).toBe(false);
//       expect(subject.find('div')).toHaveLength(4);
//       expect(subject.find('span')).toHaveLength(4);
//       expect(subject.find('button').exists()).toBe(true);
//     });

//     it('When set to true', () => {
//       const subject = mount(<Modal activator={activatorNode} closeOnEsc={true} active={false}>{childBody}</Modal>);
//       expect(subject.prop('active')).toBe(false);
//       expect(subject.prop('closeOnEsc')).toBe(true);
//       expect(subject.find('div')).toHaveLength(4);
//       expect(subject.find('span')).toHaveLength(4);
//       expect(subject.find('button').exists()).toBe(true);
//     });
//   });

//   describe('modalOverflow Prop', () => {
//     it('When not set', () => {
//       const subject = mount(<Modal activator={activatorNode} active={false}>{childBody}</Modal>);
//       expect(subject.prop('active')).toBe(false);
//       expect(subject.find('div')).toHaveLength(4);
//       expect(subject.find('span')).toHaveLength(4);
//       expect(subject.find('button').exists()).toBe(true);
//     });
//     it('When set to false', () => {
//       const subject = mount(<Modal activator={activatorNode} modalOverflow={false} active={false}>{childBody}</Modal>);
//       expect(subject.prop('active')).toBe(false);
//       expect(subject.prop('modalOverflow')).toBe(false);
//       expect(subject.find('div')).toHaveLength(4);
//       expect(subject.find('span')).toHaveLength(4);
//       expect(subject.find('button').exists()).toBe(true);
//     });
//     it('When set to true', () => {
//       const subject = mount(<Modal activator={activatorNode} modalOverflow={true} active={false}>{childBody}</Modal>);
//       expect(subject.prop('active')).toBe(false);
//       expect(subject.prop('modalOverflow')).toBe(true);
//       expect(subject.find('div')).toHaveLength(4);
//       expect(subject.find('span')).toHaveLength(4);
//       expect(subject.find('button').exists()).toBe(true);
//     });
//   });

//   // describe('overlay Prop', () => {
//   //   it('When not set', () => {
//   //     const subject = mount(<Modal activator={activatorNode} active={false}>{childBody}</Modal>);
//   //     expect(subject.prop('active')).toBe(false);
//   //     expect(subject.find('div')).toHaveLength(4);
//   //     expect(subject.find('span')).toHaveLength(4);
//   //     expect(subject.find('button').exists()).toBe(true);
//   //   });

//   //   it('When set to false', () => {
//   //     const subject = mount(<Modal activator={activatorNode} overlay={false} active={false}>{childBody}</Modal>);
//   //     expect(subject.prop('active')).toBe(false);
//   //     expect(subject.prop('overlay')).toBe(false);
//   //     expect(subject.find('div')).toHaveLength(4);
//   //     expect(subject.find('span')).toHaveLength(4);
//   //     expect(subject.find('button').exists()).toBe(true);
//   //   });

//   //   it('When set to true', () => {
//   //     const subject = mount(<Modal activator={activatorNode} overlay={true} active={false}>{childBody}</Modal>);
//   //     expect(subject.prop('active')).toBe(false);
//   //     expect(subject.prop('overlay')).toBe(true);
//   //     expect(subject.find('div')).toHaveLength(4);
//   //     expect(subject.find('span')).toHaveLength(4);
//   //     expect(subject.find('button').exists()).toBe(true);
//   //   });
//   // });

//   describe('Width Prop', () => {
//     it('When Width type is string with undefined', () => {
//       const subject = mount(<Modal activator={activatorNode} active={false}>{childBody}</Modal>);
//       expect(subject.prop('active')).toBe(false);
//       expect(subject.find('div')).toHaveLength(4);
//       expect(subject.find('span')).toHaveLength(4);
//       expect(subject.find('button').exists()).toBe(true);
//     });

//     it('When Width type is string with Small', () => {
//       const subject = mount(<Modal activator={activatorNode} width="small" active={false}>{childBody}</Modal>);
//       expect(subject.prop('active')).toBe(false);
//       expect(subject.prop('width')).toBe('small');
//       expect(subject.find('div')).toHaveLength(4);
//       expect(subject.find('span')).toHaveLength(4);
//     });

//     it('When Width type is string with Medium', () => {
//       const subject = mount(<Modal activator={activatorNode} width="medium" active={false}>{childBody}</Modal>);
//       expect(subject.prop('active')).toBe(false);
//       expect(subject.prop('width')).toBe('medium');
//       expect(subject.find('div')).toHaveLength(4);
//       expect(subject.find('span')).toHaveLength(4);
//     });

//     it('When Width type is string with Large', () => {
//       const subject = mount(<Modal activator={activatorNode} width="large" active={false}>{childBody}</Modal>);
//       expect(subject.prop('active')).toBe(false);
//       expect(subject.prop('width')).toBe('large');
//       expect(subject.find('div')).toHaveLength(4);
//       expect(subject.find('span')).toHaveLength(4);
//     });

//     it('When Width type is Number', () => {
//       const subject = mount(<Modal activator={activatorNode} width={ '500px' } active={false}>{childBody}</Modal>);
//       expect(subject.prop('active')).toBe(false);
//       expect(subject.prop('width')).toBe('500px');
//       expect(subject.find('div')).toHaveLength(4);
//       expect(subject.find('span')).toHaveLength(4);
//       expect(subject.find('button').exists()).toBe(true);
//     });

//   });

//   describe('header Prop', () => {
//     it('When header type is string with undefined', () => {
//       const subject = mount(<Modal activator={activatorNode} header="" active={false}>{childBody}</Modal>);
//       expect(subject.prop('active')).toBe(false);
//       expect(subject.prop('header')).toBe('');
//       expect(subject.find('div')).toHaveLength(4);
//       expect(subject.find('span')).toHaveLength(4);
//       expect(subject.find('button').exists()).toBe(true);
//     });

//     it('When header type is string with any value', () => {
//       const subject = mount(<Modal activator={activatorNode} header="This is my header!!" active={false}>{childBody}</Modal>);
//       expect(subject.prop('active')).toBe(false);
//       expect(subject.prop('header')).toBe('This is my header!!');
//       expect(subject.find('div')).toHaveLength(5);
//       expect(subject.find('span')).toHaveLength(4);
//       expect(subject.find('button').exists()).toBe(true);
//     });
//     it('When header type is any React Node', () => {
//       const subject = mount(<Modal activator={activatorNode} header={headerNode} active={false}>{childBody}</Modal>);
//       expect(subject.prop('active')).toBe(false);
//       expect(subject.prop('header')).toMatchObject(headerNode);
//       expect(subject.find('div')).toHaveLength(5);
//       expect(subject.find('span')).toHaveLength(4);
//       expect(subject.find('button').exists()).toBe(true);
//     });

//   });

//   describe('footer Prop', () => {
//     it('When footer type is React Node', () => {
//       const subject = mount(<Modal activator={activatorNode} footer={footerNode} active={false}>{childBody}</Modal>);
//       expect(subject.prop('active')).toBe(false);
//       expect(subject.prop('footer')).toMatchObject(footerNode);
//       expect(subject.find('div')).toHaveLength(5);
//       expect(subject.find('span')).toHaveLength(6);
//       expect(subject.find('button').exists()).toBe(true);
//     });
//   });

// });
