import * as React from 'react';
import { mount } from 'enzyme';
import Labelled from '../Labelled';
import { Action } from '../../../types';

describe('<Labelled /> - Test Suit', () => {
  const spy = jest.fn();
  const action: Action = {
    content: ' Action Content ',
    onAction: () => {
      spy();
    },
  };
  const theme = {
    hidden: 'hidden',
    required: 'required',
    focused: 'focused',
    invalid: 'invalid',
    empty: 'empty',
    HelpText: 'HelpText',
  };
  describe('should verify default props', () => {
    it('should verify that it contains 3 <div> elements', () => {
      const labelledWrapper = mount(
        <Labelled componentId="Id" label="Click Here" action={action}>
          Hello World
        </Labelled>
      );
      expect(labelledWrapper.find('div').length).toBe(3);
    });
    it('should verify that it contains 1 <span> element', () => {
      const labelledWrapper = mount(
        <Labelled componentId="Id" label="Click Here" action={action}>
          Hello World
        </Labelled>
      );
      expect(labelledWrapper.find('span').length).toBe(2);
    });
    it('should verify value of id property', () => {
      const labelledWrapper = mount(
        <Labelled componentId="Id" label="Click Here" action={action}>
          Hello World
        </Labelled>
      );
      expect(labelledWrapper.prop('componentId')).toBe('Id');
    });
    it('should verify value of label property', () => {
      const labelledWrapper = mount(
        <Labelled componentId="Id" label="Click Here" action={action}>
          Hello World
        </Labelled>
      );
      expect(labelledWrapper.prop('label')).toBe('Click Here');
    });
    it('should verify Labelled text set as children of Labelled', () => {
      const labelledWrapper = mount(
        <Labelled componentId="Id" label="Click Here" action={action}>
          Hello World
        </Labelled>
      );
      expect(labelledWrapper.prop('children')).toBe('Hello World');
    });
  });
  describe('should verify required property', () => {
    it('should verify required property when it is set as true', () => {
      const labelledWrapper = mount(
        <Labelled componentId="Id" label="Click Here" action={action} required>
          Hello World
        </Labelled>
      );
      expect(labelledWrapper.prop('required')).toBe(true);
    });
    it('should verify required property when it is not set', () => {
      const labelledWrapper = mount(
        <Labelled componentId="Id" label="Click Here" action={action}>
          Hello World
        </Labelled>
      );
      expect(labelledWrapper.prop('required')).toBe(undefined);
    });
    it('should verify required property when it is set as false', () => {
      const labelledWrapper = mount(
        <Labelled componentId="Id" label="Click Here" action={action} required={false}>
          Hello World
        </Labelled>
      );
      expect(labelledWrapper.prop('required')).toBe(false);
    });
    it('should verify default props with required property set', () => {
      const labelledWrapper = mount(
        <Labelled componentId="Id" label="Click Here" action={action} required>
          Hello World
        </Labelled>
      );
      expect(labelledWrapper.find('div').length).toBe(3);
      expect(labelledWrapper.find('span').length).toBe(2);
      expect(labelledWrapper.prop('componentId')).toBe('Id');
      expect(labelledWrapper.prop('label')).toBe('Click Here');
      expect(labelledWrapper.prop('children')).toBe('Hello World');
    });
  });
  describe('should verify helptext property', () => {
    it('should verify helptext property value', () => {
      const labelledWrapper = mount(
        <Labelled componentId="Id" label="Click Here" action={action} helpText="HelpText">
          Hello World
        </Labelled>
      );
      expect(labelledWrapper.prop('helpText')).toBe('HelpText');
    });
    it('should verify default props with helpText property set', () => {
      const labelledWrapper = mount(
        <Labelled componentId="Id" label="Click Here" action={action} helpText="HelpText">
          Hello World
        </Labelled>
      );
      expect(labelledWrapper.find('div').length).toBe(4);
      expect(labelledWrapper.find('span').length).toBe(2);
      expect(labelledWrapper.prop('componentId')).toBe('Id');
      expect(labelledWrapper.prop('label')).toBe('Click Here');
      expect(labelledWrapper.prop('children')).toBe('Hello World');
    });
  });
  describe('should verify labelHidden property', () => {
    it('should verify labelHidden property when set', () => {
      const labelledWrapper = mount(
        <Labelled componentId="Id" label="Click Here" action={action} labelHidden>
          Hello World
        </Labelled>
      );
      expect(labelledWrapper.prop('labelHidden')).toBe(true);
    });
    it('should verify labelHidden property when set as false', () => {
      const labelledWrapper = mount(
        <Labelled componentId="Id" label="Click Here" action={action} labelHidden={false}>
          Hello World
        </Labelled>
      );
      expect(labelledWrapper.prop('labelHidden')).toBe(false);
    });
    it('should verify labelHidden property when not set', () => {
      const labelledWrapper = mount(
        <Labelled componentId="Id" label="Click Here" action={action}>
          Hello World
        </Labelled>
      );
      expect(labelledWrapper.prop('labelHidden')).toBeFalsy();
    });
    it('should verify default props with labelHidden property set', () => {
      const labelledWrapper = mount(
        <Labelled componentId="Id" label="Click Here" action={action} labelHidden>
          Hello World
        </Labelled>
      );
      expect(labelledWrapper.find('div').length).toBe(3);
      expect(labelledWrapper.find('span').length).toBe(2);
      expect(labelledWrapper.prop('componentId')).toBe('Id');
      expect(labelledWrapper.prop('label')).toBe('Click Here');
      expect(labelledWrapper.prop('children')).toBe('Hello World');
    });
  });
  describe('should verify focused property', () => {
    it('should verify focused property set', () => {
      const labelledWrapper = mount(
        <Labelled componentId="Id" label="Click Here" action={action} focused>
          Hello World
        </Labelled>
      );
      expect(labelledWrapper.prop('focused')).toBe(true);
    });
    it('should verify focused property when set as false', () => {
      const labelledWrapper = mount(
        <Labelled componentId="Id" label="Click Here" action={action} focused={false}>
          Hello World
        </Labelled>
      );
      expect(labelledWrapper.prop('focused')).toBe(false);
    });
    it('should verify focused property when not set', () => {
      const labelledWrapper = mount(
        <Labelled componentId="Id" label="Click Here" action={action}>
          Hello World
        </Labelled>
      );
      expect(labelledWrapper.prop('focused')).toBeFalsy();
    });
    it('should verify default props with focused property set', () => {
      const labelledWrapper = mount(
        <Labelled componentId="Id" label="Click Here" action={action} focused>
          Hello World
        </Labelled>
      );
      expect(labelledWrapper.find('div').length).toBe(3);
      expect(labelledWrapper.find('span').length).toBe(2);
      expect(labelledWrapper.prop('componentId')).toBe('Id');
      expect(labelledWrapper.prop('label')).toBe('Click Here');
      expect(labelledWrapper.prop('children')).toBe('Hello World');
    });
  });
  describe('should verify hasValue property', () => {
    it('should verify hasValue property set', () => {
      const labelledWrapper = mount(
        <Labelled componentId="Id" label="Click Here" action={action} hasValue>
          Hello World
        </Labelled>
      );
      expect(labelledWrapper.prop('hasValue')).toBe(true);
    });
    it('should verify hasValue property when set as false', () => {
      const labelledWrapper = mount(
        <Labelled componentId="Id" label="Click Here" action={action} hasValue={false}>
          Hello World
        </Labelled>
      );
      expect(labelledWrapper.prop('hasValue')).toBe(false);
    });
    it('should verify hasValue property when not set', () => {
      const labelledWrapper = mount(
        <Labelled componentId="Id" label="Click Here" action={action}>
          Hello World
        </Labelled>
      );
      expect(labelledWrapper.prop('hasValue')).toBeFalsy();
    });
    it('should verify default props with hasValue property set', () => {
      const labelledWrapper = mount(
        <Labelled componentId="Id" label="Click Here" action={action} hasValue>
          Hello World
        </Labelled>
      );
      expect(labelledWrapper.find('div').length).toBe(3);
      expect(labelledWrapper.find('span').length).toBe(2);
      expect(labelledWrapper.prop('componentId')).toBe('Id');
      expect(labelledWrapper.prop('label')).toBe('Click Here');
      expect(labelledWrapper.prop('children')).toBe('Hello World');
    });
  });
  describe('should verify labelled component with all properties set', () => {
    it('should verify hasValue property set', () => {
      const labelledWrapper = mount(
        <Labelled componentId="Id" label="Click Here" action={action} theme={theme} required helpText="HelpText" labelHidden focused hasValue>
          Hello World
        </Labelled>
      );
      expect(labelledWrapper.prop('required')).toBe(true);
      expect(labelledWrapper.prop('helpText')).toBe('HelpText');
      expect(labelledWrapper.prop('labelHidden')).toBe(true);
      expect(labelledWrapper.prop('focused')).toBe(true);
      expect(labelledWrapper.prop('hasValue')).toBe(true);
      expect(labelledWrapper.find('div').length).toBe(4);
      expect(labelledWrapper.find('span').length).toBe(2);
      expect(labelledWrapper.prop('componentId')).toBe('Id');
      expect(labelledWrapper.prop('label')).toBe('Click Here');
      expect(labelledWrapper.prop('children')).toBe('Hello World');
    });
  });
});
