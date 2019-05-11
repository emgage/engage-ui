import * as React from 'react';
import { mount } from 'enzyme';
import ValidatedTextField from '../../ValidatedTextField/ValidatedTextField';
import ValidatedForm from '../ValidatedForm';

describe('<ValidatedForm / >', () => {

  describe('children property', () => {
    describe('when set', () => {
      it('should verify ValidatedForm when children prop is set', () => {
        const validatedFormWrapper = mount(
                                            <ValidatedForm
                                              formFields={['AppName']}
                                            >
                                                <ValidatedTextField
                                                componentId="AppName"
                                                label="App Name"
                                                name ="App Name" />
                                            </ValidatedForm>);
        expect(validatedFormWrapper.find('form')).toHaveLength(1);
        // expect(validatedFormWrapper.prop('children')).toBeDefined();
        // expect(validatedFormWrapper.find('div')).toHaveLength(8);
        expect(validatedFormWrapper.find('input')).toHaveLength(1);
        expect(validatedFormWrapper.find('label')).toHaveLength(2);
        expect(validatedFormWrapper.find('label').at(1).prop('id')).toBe('AppNameLabel');
        expect(validatedFormWrapper.find('label').at(1).text()).toBe('App Name');
      });
    });
  });

  describe('style property', () => {
    describe('when set', () => {
      it('should verify ValidatedForm when style prop is set', () => {
        const style = { color: 'red' };
        const validatedFormWrapper = mount(<ValidatedForm componentStyle={style} formFields={[]} />);
        expect(validatedFormWrapper.find('form')).toHaveLength(1);
        expect(validatedFormWrapper.prop('componentStyle')).toBe(style);
        expect(validatedFormWrapper.html()).toBe('<form style="color: red;"></form>');
      });
    });

    describe('when not set', () => {
      it('should verify ValidatedForm when style prop is not set', () => {
        const validatedFormWrapper = mount(<ValidatedForm formFields={[]} />);
        expect(validatedFormWrapper.find('form')).toHaveLength(1);
        expect(validatedFormWrapper.prop('componentStyle')).toBeUndefined();
      });
    });
  });

  describe('onSubmit() property', () => {
    describe('when set', () => {
      it('should verify ValidatedForm when onSubmit prop is set', () => {
        const form = {
          getFieldProps: jest.fn(),
          getFieldError: jest.fn(),
          validateFields: jest.fn((callback: any) => { callback(); }),
        };
        const submit = jest.fn();
        const validatedFormWrapper = mount(<ValidatedForm onSubmit={submit} form={form} formFields={[]} />);
        expect(validatedFormWrapper.find('form')).toHaveLength(1);
        expect(validatedFormWrapper.prop('onSubmit')).toBeDefined();
        validatedFormWrapper.find('form').simulate('submit');
        expect(submit).toHaveBeenCalledTimes(1);
        expect(form.validateFields).toHaveBeenCalledTimes(1);
      });
    });

    describe('when not set', () => {
      it('should verify ValidatedForm when onSubmit prop is not set', () => {
        const validatedFormWrapper = mount(<ValidatedForm formFields={[]} />);
        expect(validatedFormWrapper.find('form')).toHaveLength(1);
        expect(validatedFormWrapper.prop('onSubmit')).toBeUndefined();
      });
    });
  });

  describe('onSubmitError() property', () => {
    describe('when set', () => {
      it('should verify ValidatedForm when onSubmitError prop is set', () => {
        const form = {
          getFieldProps: jest.fn(),
          getFieldError: jest.fn(),
          validateFields: jest.fn((callback: any) => { callback(new Error()); }),
        };
        const submitError = jest.fn();
        const validatedFormWrapper = mount(<ValidatedForm onSubmitError={submitError} form={form} formFields={[]} />);
        expect(validatedFormWrapper.find('form')).toHaveLength(1);
        expect(validatedFormWrapper.prop('onSubmitError')).toBeDefined();
        validatedFormWrapper.find('form').simulate('submit');
        expect(submitError).toHaveBeenCalledTimes(1);
        expect(form.validateFields).toHaveBeenCalledTimes(1);
      });
    });

    describe('when not set', () => {
      it('should verify ValidatedForm when onSubmitError prop is not set', () => {
        const validatedFormWrapper = mount(<ValidatedForm formFields={[]} />);
        expect(validatedFormWrapper.find('form')).toHaveLength(1);
        expect(validatedFormWrapper.prop('onSubmitError')).toBeUndefined();
      });
    });
  });

  describe('all property', () => {
    describe('when set', () => {
      it('should verify ValidatedForm when all props are set', () => {
        const style = { color: 'red' };
        const form = {
          getFieldProps: jest.fn(),
          getFieldError: jest.fn(),
          validateFields: jest.fn((callback: any) => { callback(); }),
        };
        const submit = jest.fn();
        const submitError = jest.fn();
        const validatedFormWrapper = mount(
                                            <ValidatedForm
                                                componentStyle={style} onSubmit={submit} onSubmitError={submitError} form={form} formFields={['AppName']}>
                                                <ValidatedTextField
                                                componentId="AppName"
                                                label="App Name"
                                                name="App Name"
                                                value="test"
                                                />
                                            </ValidatedForm>);
        expect(validatedFormWrapper.find('form')).toHaveLength(1);
        expect(validatedFormWrapper.prop('children')).toBeDefined();
        expect(validatedFormWrapper.find('input')).toHaveLength(1);
        expect(validatedFormWrapper.find('label')).toHaveLength(2);
        expect(validatedFormWrapper.find('label').at(1).prop('id')).toBe('AppNameLabel');
        expect(validatedFormWrapper.find('label').at(1).text()).toBe('App Name');
        expect(validatedFormWrapper.prop('componentStyle')).toBe(style);
        expect(validatedFormWrapper.html().indexOf('<form style="color: red;">')).toBe(0);
        expect(validatedFormWrapper.prop('onSubmit')).toBeDefined();
        expect(validatedFormWrapper.prop('onSubmitError')).toBeDefined();
        validatedFormWrapper.find('form').simulate('submit');
        expect(submit).toHaveBeenCalledTimes(1);
        expect(submitError).toHaveBeenCalledTimes(0);
        expect(form.validateFields).toHaveBeenCalledTimes(1);
      });
    });
  });
});
