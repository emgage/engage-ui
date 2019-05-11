import * as React from 'react';
import { mount } from 'enzyme';
import ValidatedTextField from '../ValidatedTextField';
import ValidatedForm from '../../ValidatedForm/ValidatedForm';

describe('<ValidatedTextField / >', () => {

  describe('when default props are provided', () => {
  it('basic validatedtextfield should be rendered with default props', () => {
    const validatedTextFieldWrapper = mount(
                                            <ValidatedForm formFields={['AppName']}>
                                                <ValidatedTextField
                                                componentId="AppName"
                                                label="App Name"
                                                name="App Name" />
                                            </ValidatedForm>);
  expect(validatedTextFieldWrapper.find('form')).toHaveLength(1);
  expect(validatedTextFieldWrapper.find('div')).toHaveLength(8);
  expect(validatedTextFieldWrapper.find('input')).toHaveLength(1);
  expect(validatedTextFieldWrapper.find('label')).toHaveLength(2);
  expect(validatedTextFieldWrapper.find('input').prop('name')).toBe('App Name');
  expect(validatedTextFieldWrapper.find('label').at(1).prop('id')).toBe('AppNameLabel');
  expect(validatedTextFieldWrapper.find('label').at(1).text()).toBe('App Name');
  expect(validatedTextFieldWrapper.find('input').prop('id')).toBe('AppName');
  expect(validatedTextFieldWrapper.find('input').prop('name')).toBe('App Name');
  expect(validatedTextFieldWrapper.find('input').prop('value')).toBe('');
    });
  });

  describe('id property', () => {
    describe('when set', () => {
      it('should verify validatedtextfield when id prop is set', () => {
        const validatedTextFieldWrapper = mount(
                                            <ValidatedForm formFields={['AppName']}>
                                                <ValidatedTextField
                                                componentId="AppName"
                                                label="App Name"
                                                name="App Name" />
                                            </ValidatedForm>);
        expect(validatedTextFieldWrapper.find('form')).toHaveLength(1);
        expect(validatedTextFieldWrapper.find('div')).toHaveLength(8);
        expect(validatedTextFieldWrapper.find('input')).toHaveLength(1);
        expect(validatedTextFieldWrapper.find('label')).toHaveLength(2);
        expect(validatedTextFieldWrapper.find('input').prop('name')).toBe('App Name');
        expect(validatedTextFieldWrapper.find('label').at(1).prop('id')).toBe('AppNameLabel');
        expect(validatedTextFieldWrapper.find('label').at(1).text()).toBe('App Name');
        expect(validatedTextFieldWrapper.find('input').prop('id')).toBe('AppName');
        expect(validatedTextFieldWrapper.find('input').prop('name')).toBe('App Name');
        expect(validatedTextFieldWrapper.find('input').prop('value')).toBe('');
      });
    });
  });

  describe('name property', () => {
    describe('when set', () => {
      it('should verify validatedtextfield when name prop is set', () => {
        const validatedTextFieldWrapper = mount(
                                            <ValidatedForm formFields={['AppName']}>
                                                <ValidatedTextField
                                                componentId="AppName"
                                                label="App Name"
                                                name ="App Name" />
                                            </ValidatedForm>);
        expect(validatedTextFieldWrapper.find('form')).toHaveLength(1);
        expect(validatedTextFieldWrapper.find('div')).toHaveLength(8);
        expect(validatedTextFieldWrapper.find('input')).toHaveLength(1);
        expect(validatedTextFieldWrapper.find('label')).toHaveLength(2);
        expect(validatedTextFieldWrapper.find('input').prop('name')).toBe('App Name');
        expect(validatedTextFieldWrapper.find('label').at(1).prop('id')).toBe('AppNameLabel');
        expect(validatedTextFieldWrapper.find('label').at(1).text()).toBe('App Name');
        expect(validatedTextFieldWrapper.find('input').prop('id')).toBe('AppName');
        expect(validatedTextFieldWrapper.find('input').prop('name')).toBe('App Name');
        expect(validatedTextFieldWrapper.find('input').prop('value')).toBe('');
      });
    });
  });

  describe('validateTrigger property', () => {
    describe('when set with onBlur with value given', () => {
      it('should verify validatedtextfield when onBlur prop is set', () => {
        const spy = jest.fn();
        const validatedTextFieldWrapper = mount(
                                            <ValidatedForm formFields={['AppName']}>
                                                <ValidatedTextField
                                                componentId="AppName"
                                                label="App Name"
                                                name="App Name"
                                                value="Test"
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
        expect(validatedTextFieldWrapper.find('input').prop('name')).toBe('App Name');
        expect(validatedTextFieldWrapper.find('label').at(1).prop('id')).toBe('AppNameLabel');
        expect(validatedTextFieldWrapper.find('label').at(1).text()).toBe('App Name');
        expect(validatedTextFieldWrapper.find('input').prop('id')).toBe('AppName');
        expect(validatedTextFieldWrapper.find('input').prop('name')).toBe('App Name');
        expect(validatedTextFieldWrapper.find('input').prop('value')).toBe('Test');
        expect(validatedTextFieldWrapper.find('input').prop('required')).toBe(true);
        validatedTextFieldWrapper.find('input').slice().simulate('blur');
        expect(validatedTextFieldWrapper.find('span')).toHaveLength(0);
      });
    });

    describe('when set with onBlur without value given', () => {
      it('should verify validatedtextfield when onBlur prop is set', () => {
        const spy = jest.fn();
        const validatedTextFieldWrapper = mount(
                                            <ValidatedForm formFields={['AppName']}>
                                                <ValidatedTextField
                                                componentId="AppName"
                                                label="App Name"
                                                name="App Name"
                                                value=""
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
        expect(validatedTextFieldWrapper.find('input').prop('name')).toBe('App Name');
        expect(validatedTextFieldWrapper.find('label').at(1).prop('id')).toBe('AppNameLabel');
        expect(validatedTextFieldWrapper.find('label').at(1).text()).toBe('App Name');
        expect(validatedTextFieldWrapper.find('input').prop('id')).toBe('AppName');
        expect(validatedTextFieldWrapper.find('input').prop('name')).toBe('App Name');
        expect(validatedTextFieldWrapper.find('input').prop('value')).toBe('');
        expect(validatedTextFieldWrapper.find('input').prop('required')).toBe(true);
        validatedTextFieldWrapper.find('input').slice().simulate('blur');
        expect(validatedTextFieldWrapper.find('span').text()).toBe('App Name is required.');
      });
    });

    describe('when not set', () => {
      it('should verify validatedtextfield when onBlur prop is not set', () => {
        const validatedTextFieldWrapper = mount(
                                            <ValidatedForm formFields={['AppName']}>
                                                <ValidatedTextField
                                                componentId="AppName"
                                                label="App Name"
                                                name="App Name"
                                                value="Test"
                                                required={true}
                                                validateRules={[{ required: true, message: 'App Name is required.' },
                                                ]} />
                                            </ValidatedForm>);
        expect(validatedTextFieldWrapper.find('form')).toHaveLength(1);
        expect(validatedTextFieldWrapper.find('div')).toHaveLength(8);
        expect(validatedTextFieldWrapper.find('input')).toHaveLength(1);
        expect(validatedTextFieldWrapper.find('label')).toHaveLength(2);
        expect(validatedTextFieldWrapper.find('input').prop('name')).toBe('App Name');
        expect(validatedTextFieldWrapper.find('label').at(1).prop('id')).toBe('AppNameLabel');
        expect(validatedTextFieldWrapper.find('label').at(1).text()).toBe('App Name');
        expect(validatedTextFieldWrapper.find('input').prop('id')).toBe('AppName');
        expect(validatedTextFieldWrapper.find('input').prop('name')).toBe('App Name');
        expect(validatedTextFieldWrapper.find('input').prop('value')).toBe('Test');
        expect(validatedTextFieldWrapper.find('input').prop('required')).toBe(true);
      });
    });
  });

  describe('validateRules property', () => {
    describe('when set', () => {
      it('should verify validatedtextfield when validateRules props are set', () => {
        const spy = jest.fn();
        const validatedTextFieldWrapper = mount(
                                            <ValidatedForm formFields={['AppName']}>
                                                <ValidatedTextField
                                                componentId="AppName"
                                                label="App Name"
                                                required={true}
                                                onBlur={ () => spy()}
                                                name="App Name"
                                                value=""
                                                validateTrigger={['onBlur']}
                                                validateRules={[{ required: true, message: 'App Name is required.' },
                                                ]} />
                                            </ValidatedForm>);
        expect(validatedTextFieldWrapper.find('form')).toHaveLength(1);
        expect(validatedTextFieldWrapper.find('div')).toHaveLength(8);
        expect(validatedTextFieldWrapper.find('input')).toHaveLength(1);
        expect(validatedTextFieldWrapper.find('label')).toHaveLength(2);
        expect(validatedTextFieldWrapper.find('input').prop('name')).toBe('App Name');
        expect(validatedTextFieldWrapper.find('label').at(1).prop('id')).toBe('AppNameLabel');
        expect(validatedTextFieldWrapper.find('label').at(1).text()).toBe('App Name');
        expect(validatedTextFieldWrapper.find('input').prop('id')).toBe('AppName');
        expect(validatedTextFieldWrapper.find('input').prop('name')).toBe('App Name');
        expect(validatedTextFieldWrapper.find('input').prop('value')).toBe('');
        expect(validatedTextFieldWrapper.find('input').prop('required')).toBe(true);
        validatedTextFieldWrapper.find('input').slice().simulate('blur');
        expect(validatedTextFieldWrapper.find('span').text()).toBe('App Name is required.');
      });
    });

    describe('when not set', () => {
      it('should verify validatedtextfield when validateRules props are not set', () => {
        const spy = jest.fn();
        const validatedTextFieldWrapper = mount(
                                            <ValidatedForm formFields={['AppName']}>
                                                <ValidatedTextField
                                                componentId="AppName"
                                                label="App Name"
                                                required={true}
                                                onBlur={ () => spy()}
                                                name="App Name"
                                                value=""
                                                validateTrigger={['onBlur']} />
                                            </ValidatedForm>);
        expect(validatedTextFieldWrapper.find('form')).toHaveLength(1);
        expect(validatedTextFieldWrapper.find('div')).toHaveLength(8);
        expect(validatedTextFieldWrapper.find('input')).toHaveLength(1);
        expect(validatedTextFieldWrapper.find('label')).toHaveLength(2);
        expect(validatedTextFieldWrapper.find('input').prop('name')).toBe('App Name');
        expect(validatedTextFieldWrapper.find('label').at(1).prop('id')).toBe('AppNameLabel');
        expect(validatedTextFieldWrapper.find('label').at(1).text()).toBe('App Name');
        expect(validatedTextFieldWrapper.find('input').prop('id')).toBe('AppName');
        expect(validatedTextFieldWrapper.find('input').prop('name')).toBe('App Name');
        expect(validatedTextFieldWrapper.find('input').prop('value')).toBe('');
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
                                            <ValidatedForm formFields={['AppName']}>
                                                <ValidatedTextField
                                                componentId="AppName"
                                                required={true}
                                                label="App Name"
                                                placeholder=""
                                                helpText="We recommend keeping your app name under 23 characters."
                                                onChange={() => spy()}
                                                name="App Name"
                                                value="Text Value"
                                                validateTrigger={['onBlur']}
                                                validateRules={[{ required: true, message: 'App Name is required.' },
                                                ]} />
                                            </ValidatedForm>);
        expect(validatedTextFieldWrapper.find('form')).toHaveLength(1);
        expect(validatedTextFieldWrapper.find('div')).toHaveLength(9);
        expect(validatedTextFieldWrapper.find('input')).toHaveLength(1);
        expect(validatedTextFieldWrapper.find('label')).toHaveLength(2);
        expect(validatedTextFieldWrapper.find('input').prop('name')).toBe('App Name');
        expect(validatedTextFieldWrapper.find('label').at(1).prop('id')).toBe('AppNameLabel');
        expect(validatedTextFieldWrapper.find('label').at(1).text()).toBe('App Name');
        expect(validatedTextFieldWrapper.find('input').prop('id')).toBe('AppName');
        expect(validatedTextFieldWrapper.find('input').prop('name')).toBe('App Name');
        expect(validatedTextFieldWrapper.find('input').prop('value')).toBe('Text Value');
        expect(validatedTextFieldWrapper.find('input').prop('required')).toBe(true);
        expect(validatedTextFieldWrapper.find('div').at(8).prop('id')).toBe('AppNameHelpText');
        expect(validatedTextFieldWrapper.find('div').at(8).text()).toBe('We recommend keeping your app name under 23 characters.');
      });
    });
  });
});
