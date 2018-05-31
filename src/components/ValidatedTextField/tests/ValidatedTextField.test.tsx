import * as React from 'react';
import { mount } from 'enzyme';
import ValidatedTextField from '../ValidatedTextField';
import ValidatedForm from '../../ValidatedForm/ValidatedForm';

describe('<ValidatedTextField / >', () => {

  describe('when default props are provided', () => {
  it('basic validatedtextfield should be rendered with default props', () => {
    const validatedTextFieldWrapper = mount(
                                            <ValidatedForm>
                                                <ValidatedTextField
                                                customId="AppName"
                                                label="App Name"
                                                customName="App Name" />
                                            </ValidatedForm>);
  expect(validatedTextFieldWrapper.find('form')).toHaveLength(1);
  expect(validatedTextFieldWrapper.find('div')).toHaveLength(8);
  expect(validatedTextFieldWrapper.find('input')).toHaveLength(1);
  expect(validatedTextFieldWrapper.find('label')).toHaveLength(2);
  expect(validatedTextFieldWrapper.find('input').prop('customName')).toBe('App Name');
  expect(validatedTextFieldWrapper.find('label').at(1).prop('id')).toBe('AppNameLabel');
  expect(validatedTextFieldWrapper.find('label').at(1).text()).toBe('App Name');
  expect(validatedTextFieldWrapper.find('input').prop('customId')).toBe('AppName');
  expect(validatedTextFieldWrapper.find('input').prop('customName')).toBe('App Name');
  expect(validatedTextFieldWrapper.find('input').prop('customValue')).toBe('');
    });
  });

  describe('id property', () => {
    describe('when set', () => {
      it('should verify validatedtextfield when id prop is set', () => {
        const validatedTextFieldWrapper = mount(
                                            <ValidatedForm>
                                                <ValidatedTextField
                                                customId="AppName"
                                                label="App Name"
                                                customName="App Name" />
                                            </ValidatedForm>);
        expect(validatedTextFieldWrapper.find('form')).toHaveLength(1);
        expect(validatedTextFieldWrapper.find('div')).toHaveLength(8);
        expect(validatedTextFieldWrapper.find('input')).toHaveLength(1);
        expect(validatedTextFieldWrapper.find('label')).toHaveLength(2);
        expect(validatedTextFieldWrapper.find('input').prop('customName')).toBe('App Name');
        expect(validatedTextFieldWrapper.find('label').at(1).prop('id')).toBe('AppNameLabel');
        expect(validatedTextFieldWrapper.find('label').at(1).text()).toBe('App Name');
        expect(validatedTextFieldWrapper.find('input').prop('customId')).toBe('AppName');
        expect(validatedTextFieldWrapper.find('input').prop('customName')).toBe('App Name');
        expect(validatedTextFieldWrapper.find('input').prop('customValue')).toBe('');
      });
    });
  });

  describe('name property', () => {
    describe('when set', () => {
      it('should verify validatedtextfield when name prop is set', () => {
        const validatedTextFieldWrapper = mount(
                                            <ValidatedForm>
                                                <ValidatedTextField
                                                customId="AppName"
                                                label="App Name"
                                                customName ="App Name" />
                                            </ValidatedForm>);
        expect(validatedTextFieldWrapper.find('form')).toHaveLength(1);
        expect(validatedTextFieldWrapper.find('div')).toHaveLength(8);
        expect(validatedTextFieldWrapper.find('input')).toHaveLength(1);
        expect(validatedTextFieldWrapper.find('label')).toHaveLength(2);
        expect(validatedTextFieldWrapper.find('input').prop('customName')).toBe('App Name');
        expect(validatedTextFieldWrapper.find('label').at(1).prop('id')).toBe('AppNameLabel');
        expect(validatedTextFieldWrapper.find('label').at(1).text()).toBe('App Name');
        expect(validatedTextFieldWrapper.find('input').prop('customId')).toBe('AppName');
        expect(validatedTextFieldWrapper.find('input').prop('customName')).toBe('App Name');
        expect(validatedTextFieldWrapper.find('input').prop('customValue')).toBe('');
      });
    });
  });

  describe('validateTrigger property', () => {
    describe('when set with onBlur with value given', () => {
      it('should verify validatedtextfield when onBlur prop is set', () => {
        const spy = jest.fn();
        const validatedTextFieldWrapper = mount(
                                            <ValidatedForm>
                                                <ValidatedTextField
                                                customId="AppName"
                                                label="App Name"
                                                customName="App Name"
                                                customValue="Test"
                                                required={true}
                                                onBlur={ () => spy()}
                                                validateTrigger={['onBlur']}
                                                validateRules={[{ required: true, message: 'App Name is required.' },
                                                ]} />
                                            </ValidatedForm>);
        expect(validatedTextFieldWrapper.find('form')).toHaveLength(1);
        expect(validatedTextFieldWrapper.find('div')).toHaveLength(8);
        expect(validatedTextFieldWrapper.find('input')).toHaveLength(1);
        expect(validatedTextFieldWrapper.find('label')).toHaveLength(2);
        expect(validatedTextFieldWrapper.find('input').prop('customName')).toBe('App Name');
        expect(validatedTextFieldWrapper.find('label').at(1).prop('id')).toBe('AppNameLabel');
        expect(validatedTextFieldWrapper.find('label').at(1).text()).toBe('App Name');
        expect(validatedTextFieldWrapper.find('input').prop('customId')).toBe('AppName');
        expect(validatedTextFieldWrapper.find('input').prop('customName')).toBe('App Name');
        expect(validatedTextFieldWrapper.find('input').prop('customValue')).toBe('Test');
        expect(validatedTextFieldWrapper.find('input').prop('required')).toBe(true);
        validatedTextFieldWrapper.find('input').slice().simulate('blur');
        expect(validatedTextFieldWrapper.find('span')).toHaveLength(0);
      });
    });

    describe('when set with onBlur without value given', () => {
      it('should verify validatedtextfield when onBlur prop is set', () => {
        const spy = jest.fn();
        const validatedTextFieldWrapper = mount(
                                            <ValidatedForm>
                                                <ValidatedTextField
                                                customId="AppName"
                                                label="App Name"
                                                customName="App Name"
                                                customValue=""
                                                required={true}
                                                onBlur={ () => spy()}
                                                validateTrigger={['onBlur']}
                                                validateRules={[{ required: true, message: 'App Name is required.' },
                                                ]} />
                                            </ValidatedForm>);
        expect(validatedTextFieldWrapper.find('form')).toHaveLength(1);
        expect(validatedTextFieldWrapper.find('div')).toHaveLength(8);
        expect(validatedTextFieldWrapper.find('input')).toHaveLength(1);
        expect(validatedTextFieldWrapper.find('label')).toHaveLength(2);
        expect(validatedTextFieldWrapper.find('input').prop('customName')).toBe('App Name');
        expect(validatedTextFieldWrapper.find('label').at(1).prop('id')).toBe('AppNameLabel');
        expect(validatedTextFieldWrapper.find('label').at(1).text()).toBe('App Name');
        expect(validatedTextFieldWrapper.find('input').prop('customId')).toBe('AppName');
        expect(validatedTextFieldWrapper.find('input').prop('customName')).toBe('App Name');
        expect(validatedTextFieldWrapper.find('input').prop('customValue')).toBe('');
        expect(validatedTextFieldWrapper.find('input').prop('required')).toBe(true);
        validatedTextFieldWrapper.find('input').slice().simulate('blur');
        expect(validatedTextFieldWrapper.find('span').text()).toBe('App Name is required.');
      });
    });

    describe('when not set', () => {
      it('should verify validatedtextfield when onBlur prop is not set', () => {
        const validatedTextFieldWrapper = mount(
                                            <ValidatedForm>
                                                <ValidatedTextField
                                                customId="AppName"
                                                label="App Name"
                                                customName="App Name"
                                                customValue="Test"
                                                required={true}
                                                validateRules={[{ required: true, message: 'App Name is required.' },
                                                ]} />
                                            </ValidatedForm>);
        expect(validatedTextFieldWrapper.find('form')).toHaveLength(1);
        expect(validatedTextFieldWrapper.find('div')).toHaveLength(8);
        expect(validatedTextFieldWrapper.find('input')).toHaveLength(1);
        expect(validatedTextFieldWrapper.find('label')).toHaveLength(2);
        expect(validatedTextFieldWrapper.find('input').prop('customName')).toBe('App Name');
        expect(validatedTextFieldWrapper.find('label').at(1).prop('id')).toBe('AppNameLabel');
        expect(validatedTextFieldWrapper.find('label').at(1).text()).toBe('App Name');
        expect(validatedTextFieldWrapper.find('input').prop('customId')).toBe('AppName');
        expect(validatedTextFieldWrapper.find('input').prop('customName')).toBe('App Name');
        expect(validatedTextFieldWrapper.find('input').prop('customValue')).toBe('Test');
        expect(validatedTextFieldWrapper.find('input').prop('required')).toBe(true);
      });
    });
  });

  describe('validateRules property', () => {
    describe('when set', () => {
      it('should verify validatedtextfield when validateRules props are set', () => {
        const spy = jest.fn();
        const validatedTextFieldWrapper = mount(
                                            <ValidatedForm>
                                                <ValidatedTextField
                                                customId="AppName"
                                                label="App Name"
                                                required={true}
                                                onBlur={ () => spy()}
                                                customName="App Name"
                                                customValue=""
                                                validateTrigger={['onBlur']}
                                                validateRules={[{ required: true, message: 'App Name is required.' },
                                                ]} />
                                            </ValidatedForm>);
        expect(validatedTextFieldWrapper.find('form')).toHaveLength(1);
        expect(validatedTextFieldWrapper.find('div')).toHaveLength(8);
        expect(validatedTextFieldWrapper.find('input')).toHaveLength(1);
        expect(validatedTextFieldWrapper.find('label')).toHaveLength(2);
        expect(validatedTextFieldWrapper.find('input').prop('customName')).toBe('App Name');
        expect(validatedTextFieldWrapper.find('label').at(1).prop('id')).toBe('AppNameLabel');
        expect(validatedTextFieldWrapper.find('label').at(1).text()).toBe('App Name');
        expect(validatedTextFieldWrapper.find('input').prop('customId')).toBe('AppName');
        expect(validatedTextFieldWrapper.find('input').prop('customName')).toBe('App Name');
        expect(validatedTextFieldWrapper.find('input').prop('customValue')).toBe('');
        expect(validatedTextFieldWrapper.find('input').prop('required')).toBe(true);
        validatedTextFieldWrapper.find('input').slice().simulate('blur');
        expect(validatedTextFieldWrapper.find('span').text()).toBe('App Name is required.');
      });
    });

    describe('when not set', () => {
      it('should verify validatedtextfield when validateRules props are not set', () => {
        const spy = jest.fn();
        const validatedTextFieldWrapper = mount(
                                            <ValidatedForm>
                                                <ValidatedTextField
                                                customId="AppName"
                                                label="App Name"
                                                required={true}
                                                onBlur={ () => spy()}
                                                customName="App Name"
                                                customValue=""
                                                validateTrigger={['onBlur']} />
                                            </ValidatedForm>);
        expect(validatedTextFieldWrapper.find('form')).toHaveLength(1);
        expect(validatedTextFieldWrapper.find('div')).toHaveLength(8);
        expect(validatedTextFieldWrapper.find('input')).toHaveLength(1);
        expect(validatedTextFieldWrapper.find('label')).toHaveLength(2);
        expect(validatedTextFieldWrapper.find('input').prop('customName')).toBe('App Name');
        expect(validatedTextFieldWrapper.find('label').at(1).prop('id')).toBe('AppNameLabel');
        expect(validatedTextFieldWrapper.find('label').at(1).text()).toBe('App Name');
        expect(validatedTextFieldWrapper.find('input').prop('customId')).toBe('AppName');
        expect(validatedTextFieldWrapper.find('input').prop('customName')).toBe('App Name');
        expect(validatedTextFieldWrapper.find('input').prop('customValue')).toBe('');
        expect(validatedTextFieldWrapper.find('input').prop('required')).toBe(true);
        validatedTextFieldWrapper.find('input').slice().simulate('blur');
      });
    });
  });

  describe('all property', () => {
    describe('when set', () => {
      it('should verify validatedtextfield when all props are set', () => {
        const spy = jest.fn();
        const validatedTextFieldWrapper = mount(
                                            <ValidatedForm>
                                                <ValidatedTextField
                                                customId="AppName"
                                                required={true}
                                                label="App Name"
                                                placeholder=""
                                                helpText="We recommend keeping your app name under 23 characters."
                                                onChange={() => spy()}
                                                customName="App Name"
                                                customValue="Text Value"
                                                validateTrigger={['onBlur']}
                                                validateRules={[{ required: true, message: 'App Name is required.' },
                                                ]} />
                                            </ValidatedForm>);
        expect(validatedTextFieldWrapper.find('form')).toHaveLength(1);
        expect(validatedTextFieldWrapper.find('div')).toHaveLength(9);
        expect(validatedTextFieldWrapper.find('input')).toHaveLength(1);
        expect(validatedTextFieldWrapper.find('label')).toHaveLength(2);
        expect(validatedTextFieldWrapper.find('input').prop('customName')).toBe('App Name');
        expect(validatedTextFieldWrapper.find('label').at(1).prop('id')).toBe('AppNameLabel');
        expect(validatedTextFieldWrapper.find('label').at(1).text()).toBe('App Name');
        expect(validatedTextFieldWrapper.find('input').prop('customId')).toBe('AppName');
        expect(validatedTextFieldWrapper.find('input').prop('customName')).toBe('App Name');
        expect(validatedTextFieldWrapper.find('input').prop('customValue')).toBe('Text Value');
        expect(validatedTextFieldWrapper.find('input').prop('required')).toBe(true);
        expect(validatedTextFieldWrapper.find('div').at(8).prop('id')).toBe('AppNameHelpText');
        expect(validatedTextFieldWrapper.find('div').at(8).text()).toBe('We recommend keeping your app name under 23 characters.');
      });
    });
  });
});
