import * as React from 'react';
import { mount } from 'enzyme';
import Modal from '../Modal';
import Button from '../../Button';
import Heading from '../../Heading';

describe('<Modal />', () => {

  const footerNode = <Button > Save </Button>;
  const headerNode = <Heading>This is a Modal Header!!</Heading>;
  const childBody = <span><h1>Hello, world</h1> <p> test L</p></span>;
  const activatorNode = <Button>Modal</Button>;

  describe('when default props are provided', () => {
    it('basic Modal should have rendered 5 div elements with default props', () => {
      const subject = mount(<Modal activator={activatorNode} show={false}>{childBody}</Modal>);
      expect(subject.prop('show')).toBe(false);
      expect(subject.find('div')).toHaveLength(4);
      expect(subject.find('span')).toHaveLength(4);
      expect(subject.find('button').exists()).toBe(true);
    });
  });

  describe('Close Prop', () => {
    it('When not set', () => {
      const subject = mount(<Modal activator={activatorNode} show={false}>{childBody}</Modal>);
      expect(subject.prop('show')).toBe(false);
      expect(subject.find('div')).toHaveLength(4);
      expect(subject.find('span')).toHaveLength(4);
      expect(subject.find('button').exists()).toBe(true);
    });

    it('When set to false', () => {
      const subject = mount(<Modal activator={activatorNode} close={false} show={false}>{childBody}</Modal>);
      expect(subject.prop('show')).toBe(false);
      expect(subject.prop('close')).toBe(false);
      expect(subject.find('div')).toHaveLength(4);
      expect(subject.find('span')).toHaveLength(4);
      expect(subject.find('button').exists()).toBe(true);
    });

    it('When set to true', () => {
      const subject = mount(<Modal activator={activatorNode} close={true} show={false}>{childBody}</Modal>);
      expect(subject.prop('show')).toBe(false);
      expect(subject.prop('close')).toBe(true);
      expect(subject.find('div')).toHaveLength(4);
      expect(subject.find('span')).toHaveLength(7);
      expect(subject.find('button').exists()).toBe(true);
    });
  });
  describe('closeOnBackgroud Prop', () => {
    it('When not set', () => {
      const subject = mount(<Modal activator={activatorNode} show={false}>{childBody}</Modal>);
      expect(subject.prop('show')).toBe(false);
      expect(subject.find('div')).toHaveLength(4);
      expect(subject.find('span')).toHaveLength(4);
      expect(subject.find('button').exists()).toBe(true);
    });

    it('When set to false', () => {
      const subject = mount(<Modal activator={activatorNode} closeOnBackgroud={false} show={false}>{childBody}</Modal>);
      expect(subject.prop('show')).toBe(false);
      expect(subject.prop('closeOnBackgroud')).toBe(false);
      expect(subject.find('div')).toHaveLength(4);
      expect(subject.find('span')).toHaveLength(4);
      expect(subject.find('button').exists()).toBe(true);
    });

    it('When set to true', () => {
      const subject = mount(<Modal activator={activatorNode} closeOnBackgroud={true} show={false}>{childBody}</Modal>);
      expect(subject.prop('show')).toBe(false);
      expect(subject.prop('closeOnBackgroud')).toBe(true);
      expect(subject.find('div')).toHaveLength(4);
      expect(subject.find('span')).toHaveLength(4);
      expect(subject.find('button').exists()).toBe(true);
    });
  });

  describe('closeOnEsc Prop', () => {
    it('When not set', () => {
      const subject = mount(<Modal activator={activatorNode} show={false}>{childBody}</Modal>);
      expect(subject.prop('show')).toBe(false);
      expect(subject.find('div')).toHaveLength(4);
      expect(subject.find('span')).toHaveLength(4);
      expect(subject.find('button').exists()).toBe(true);
    });
    it('When set to false', () => {
      const subject = mount(<Modal activator={activatorNode} closeOnEsc={false} show={false}>{childBody}</Modal>);
      expect(subject.prop('show')).toBe(false);
      expect(subject.prop('closeOnEsc')).toBe(false);
      expect(subject.find('div')).toHaveLength(4);
      expect(subject.find('span')).toHaveLength(4);
      expect(subject.find('button').exists()).toBe(true);
    });

    it('When set to true', () => {
      const subject = mount(<Modal activator={activatorNode} closeOnEsc={true} show={false}>{childBody}</Modal>);
      expect(subject.prop('show')).toBe(false);
      expect(subject.prop('closeOnEsc')).toBe(true);
      expect(subject.find('div')).toHaveLength(4);
      expect(subject.find('span')).toHaveLength(4);
      expect(subject.find('button').exists()).toBe(true);
    });
  });

  describe('modalOverflow Prop', () => {
    it('When not set', () => {
      const subject = mount(<Modal activator={activatorNode} show={false}>{childBody}</Modal>);
      expect(subject.prop('show')).toBe(false);
      expect(subject.find('div')).toHaveLength(4);
      expect(subject.find('span')).toHaveLength(4);
      expect(subject.find('button').exists()).toBe(true);
    });
    it('When set to false', () => {
      const subject = mount(<Modal activator={activatorNode} modalOverflow={false} show={false}>{childBody}</Modal>);
      expect(subject.prop('show')).toBe(false);
      expect(subject.prop('modalOverflow')).toBe(false);
      expect(subject.find('div')).toHaveLength(4);
      expect(subject.find('span')).toHaveLength(4);
      expect(subject.find('button').exists()).toBe(true);
    });
    it('When set to true', () => {
      const subject = mount(<Modal activator={activatorNode} modalOverflow={true} show={false}>{childBody}</Modal>);
      expect(subject.prop('show')).toBe(false);
      expect(subject.prop('modalOverflow')).toBe(true);
      expect(subject.find('div')).toHaveLength(4);
      expect(subject.find('span')).toHaveLength(4);
      expect(subject.find('button').exists()).toBe(true);
    });
  });

  describe('backdropEnabled Prop', () => {
    it('When not set', () => {
      const subject = mount(<Modal activator={activatorNode} show={false}>{childBody}</Modal>);
      expect(subject.prop('show')).toBe(false);
      expect(subject.find('div')).toHaveLength(4);
      expect(subject.find('span')).toHaveLength(4);
      expect(subject.find('button').exists()).toBe(true);
    });

    it('When set to false', () => {
      const subject = mount(<Modal activator={activatorNode} backdropEnabled={false} show={false}>{childBody}</Modal>);
      expect(subject.prop('show')).toBe(false);
      expect(subject.prop('backdropEnabled')).toBe(false);
      expect(subject.find('div')).toHaveLength(4);
      expect(subject.find('span')).toHaveLength(4);
      expect(subject.find('button').exists()).toBe(true);
    });

    it('When set to true', () => {
      const subject = mount(<Modal activator={activatorNode} backdropEnabled={true} show={false}>{childBody}</Modal>);
      expect(subject.prop('show')).toBe(false);
      expect(subject.prop('backdropEnabled')).toBe(true);
      expect(subject.find('div')).toHaveLength(4);
      expect(subject.find('span')).toHaveLength(4);
      expect(subject.find('button').exists()).toBe(true);
    });
  });

  describe('Size Prop', () => {
    it('When Size type is string with undefined', () => {
      const subject = mount(<Modal activator={activatorNode} show={false}>{childBody}</Modal>);
      expect(subject.prop('show')).toBe(false);
      expect(subject.find('div')).toHaveLength(4);
      expect(subject.find('span')).toHaveLength(4);
      expect(subject.find('button').exists()).toBe(true);
    });

    it('When Size type is string with Small', () => {
      const subject = mount(<Modal activator={activatorNode} size="Small" show={false}>{childBody}</Modal>);
      expect(subject.prop('show')).toBe(false);
      expect(subject.prop('size')).toBe('Small');
      expect(subject.find('div')).toHaveLength(4);
      expect(subject.find('span')).toHaveLength(4);
    });

    it('When Size type is string with Medium', () => {
      const subject = mount(<Modal activator={activatorNode} size="Medium" show={false}>{childBody}</Modal>);
      expect(subject.prop('show')).toBe(false);
      expect(subject.prop('size')).toBe('Medium');
      expect(subject.find('div')).toHaveLength(4);
      expect(subject.find('span')).toHaveLength(4);
    });

    it('When Size type is string with Large', () => {
      const subject = mount(<Modal activator={activatorNode} size="Large" show={false}>{childBody}</Modal>);
      expect(subject.prop('show')).toBe(false);
      expect(subject.prop('size')).toBe('Large');
      expect(subject.find('div')).toHaveLength(4);
      expect(subject.find('span')).toHaveLength(4);
    });

    it('When Size type is Number', () => {
      const subject = mount(<Modal activator={activatorNode} size={ 500 } show={false}>{childBody}</Modal>);
      expect(subject.prop('show')).toBe(false);
      expect(subject.prop('size')).toBe(500);
      expect(subject.find('div')).toHaveLength(4);
      expect(subject.find('span')).toHaveLength(4);
      expect(subject.find('button').exists()).toBe(true);
    });

  });

  describe('header Prop', () => {
    it('When header type is string with undefined', () => {
      const subject = mount(<Modal activator={activatorNode} header="" show={false}>{childBody}</Modal>);
      expect(subject.prop('show')).toBe(false);
      expect(subject.prop('header')).toBe('');
      expect(subject.find('div')).toHaveLength(4);
      expect(subject.find('span')).toHaveLength(4);
      expect(subject.find('button').exists()).toBe(true);
    });

    it('When header type is string with any value', () => {
      const subject = mount(<Modal activator={activatorNode} header="This is my header!!" show={false}>{childBody}</Modal>);
      expect(subject.prop('show')).toBe(false);
      expect(subject.prop('header')).toBe('This is my header!!');
      expect(subject.find('div')).toHaveLength(5);
      expect(subject.find('span')).toHaveLength(4);
      expect(subject.find('button').exists()).toBe(true);
    });
    it('When header type is any React Node', () => {
      const subject = mount(<Modal activator={activatorNode} header={headerNode} show={false}>{childBody}</Modal>);
      expect(subject.prop('show')).toBe(false);
      expect(subject.prop('header')).toMatchObject(headerNode);
      expect(subject.find('div')).toHaveLength(5);
      expect(subject.find('span')).toHaveLength(4);
      expect(subject.find('button').exists()).toBe(true);
    });

  });

  describe('footer Prop', () => {
    it('When footer type is React Node', () => {
      const subject = mount(<Modal activator={activatorNode} footer={footerNode} show={false}>{childBody}</Modal>);
      expect(subject.prop('show')).toBe(false);
      expect(subject.prop('footer')).toMatchObject(footerNode);
      expect(subject.find('div')).toHaveLength(5);
      expect(subject.find('span')).toHaveLength(6);
      expect(subject.find('button').exists()).toBe(true);
    });
  });

});
