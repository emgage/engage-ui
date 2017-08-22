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
                                                id="AppName"                                            
                                                label="App Name"                                            
                                                name="App Name" />
                                            </ValidatedForm>);
  expect(validatedTextFieldWrapper.find('form')).toHaveLength(1);
  expect(validatedTextFieldWrapper.find('div')).toHaveLength(5);
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
                                            <ValidatedForm>
                                                <ValidatedTextField
                                                id="AppName"                                            
                                                label="App Name"                                            
                                                name="App Name" />
                                            </ValidatedForm>);
        expect(validatedTextFieldWrapper.find('form')).toHaveLength(1);
        expect(validatedTextFieldWrapper.find('div')).toHaveLength(5);
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
                                            <ValidatedForm>
                                                <ValidatedTextField
                                                id="AppName"                                            
                                                label="App Name"                                            
                                                name="App Name" />
                                            </ValidatedForm>);
        expect(validatedTextFieldWrapper.find('form')).toHaveLength(1);
        expect(validatedTextFieldWrapper.find('div')).toHaveLength(5);
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
    describe('when set with onBlur', () => {
      it('should verify validatedtextfield when validateTrigger props are set', () => {
        const spy = jest.fn();
        const validatedTextFieldWrapper = mount(
                                            <ValidatedForm>
                                                <ValidatedTextField
                                                id="AppName"                                            
                                                label="App Name"                                            
                                                name="App Name"
                                                value=""
                                                onBlur={ () => spy()}
                                                validateTrigger={['onBlur']} />
                                            </ValidatedForm>);
        expect(validatedTextFieldWrapper.find('form')).toHaveLength(1);
        expect(validatedTextFieldWrapper.find('div')).toHaveLength(5);
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
                                                id="AppName"                                            
                                                label="App Name"  
                                                required={true}                                          
                                                name="App Name"
                                                value=""
                                                validateTrigger={['onBlur']}
                                                validateRules={[{ required: true, message: 'App Name is required.' },
                                                ]} />
                                            </ValidatedForm>);
        //console.log('validateRules: '+ validatedTextFieldWrapper.html());
        expect(validatedTextFieldWrapper.find('form')).toHaveLength(1);
        expect(validatedTextFieldWrapper.find('div')).toHaveLength(5);
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
        //expect(validatedTextFieldWrapper.prop('message')).toBe('App Name is required');

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
                                                id="AppName"
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
    //console.log('1: '+ validatedTextFieldWrapper.html());
        expect(validatedTextFieldWrapper.find('form')).toHaveLength(1);
        expect(validatedTextFieldWrapper.find('div')).toHaveLength(6);
        expect(validatedTextFieldWrapper.find('input')).toHaveLength(1);
        expect(validatedTextFieldWrapper.find('label')).toHaveLength(2);
        expect(validatedTextFieldWrapper.find('input').prop('name')).toBe('App Name');
        expect(validatedTextFieldWrapper.find('label').at(1).prop('id')).toBe('AppNameLabel');
        expect(validatedTextFieldWrapper.find('label').at(1).text()).toBe('App Name');
        expect(validatedTextFieldWrapper.find('input').prop('id')).toBe('AppName');
        expect(validatedTextFieldWrapper.find('input').prop('name')).toBe('App Name');
        expect(validatedTextFieldWrapper.find('input').prop('value')).toBe('Text Value');
        expect(validatedTextFieldWrapper.find('input').prop('required')).toBe(true);
        expect(validatedTextFieldWrapper.find('div').at(5).prop('id')).toBe('AppNameHelpText');
        expect(validatedTextFieldWrapper.find('div').at(5).text()).toBe('We recommend keeping your app name under 23 characters.');
      });
    });
  });
});
