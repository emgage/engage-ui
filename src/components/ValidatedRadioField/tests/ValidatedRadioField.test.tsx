import * as React from 'react';
import { mount } from 'enzyme';
import ValidatedRadioField from '../ValidatedRadioField';
import ValidatedForm from '../../ValidatedForm/ValidatedForm';

describe('<ValidatedRadioField / >', () => {

  describe('when default props are provided', () => {
  it('basic ValidatedRadioField should be rendered with default props', () => {
    const validatedRadioFieldWrapper = mount(
                                            <ValidatedForm>
                                                <ValidatedRadioField
                                                    id="appStatus"
                                                    label="Publish App"
                                                    name="Publish App" value=""/>
                                            </ValidatedForm>);
  expect(validatedRadioFieldWrapper.find('form')).toHaveLength(1);
  expect(validatedRadioFieldWrapper.find('div')).toHaveLength(6);
  expect(validatedRadioFieldWrapper.find('input')).toHaveLength(1);
  expect(validatedRadioFieldWrapper.find('label')).toHaveLength(1);
  expect(validatedRadioFieldWrapper.find('input').prop('id')).toBe('appStatus');
  expect(validatedRadioFieldWrapper.find('input').prop('name')).toBe('Publish App');
  expect(validatedRadioFieldWrapper.find('input').prop('value')).toBe('');
    });
  });

  describe('id property', () => {
    describe('when set', () => {
      it('should verify ValidatedRadioField when id prop is set', () => {
        const validatedRadioFieldWrapper = mount(
                                            <ValidatedForm>
                                                <ValidatedRadioField
                                                    id="appStatus"
                                                    label="Publish App"
                                                    name="Publish App"
                                                    value=""/>
                                            </ValidatedForm>);
        expect(validatedRadioFieldWrapper.find('form')).toHaveLength(1);
        expect(validatedRadioFieldWrapper.find('div')).toHaveLength(6);
        expect(validatedRadioFieldWrapper.find('input')).toHaveLength(1);
        expect(validatedRadioFieldWrapper.find('label')).toHaveLength(1);
        expect(validatedRadioFieldWrapper.find('input').prop('id')).toBe('appStatus');
        expect(validatedRadioFieldWrapper.find('input').prop('name')).toBe('Publish App');
        expect(validatedRadioFieldWrapper.find('input').prop('value')).toBe('');
      });
    });
  });

  describe('name property', () => {
    describe('when set', () => {
      it('should verify ValidatedRadioField when name prop is set', () => {
        const validatedRadioFieldWrapper = mount(
                                            <ValidatedForm>
                                                <ValidatedRadioField
                                                    id="appStatus"
                                                    label="Publish App"
                                                    name="Publish App" value=""/>
                                            </ValidatedForm>);
        expect(validatedRadioFieldWrapper.find('form')).toHaveLength(1);
        expect(validatedRadioFieldWrapper.find('div')).toHaveLength(6);
        expect(validatedRadioFieldWrapper.find('input')).toHaveLength(1);
        expect(validatedRadioFieldWrapper.find('label')).toHaveLength(1);
        expect(validatedRadioFieldWrapper.find('input').prop('id')).toBe('appStatus');
        expect(validatedRadioFieldWrapper.find('input').prop('name')).toBe('Publish App');
        expect(validatedRadioFieldWrapper.find('input').prop('value')).toBe('');
      });
    });
  });

  describe('validateTrigger property', () => {
    describe('when set with onBlur with value given', () => {
      it('should verify ValidatedRadioField when onBlur prop is set', () => {
        const spy = jest.fn();
        const validatedRadioFieldWrapper = mount(
                                            <ValidatedForm>
                                                <ValidatedRadioField
                                                    id="appStatus"
                                                    label="Publish App"
                                                    name="Publish App"
                                                    value="true"
                                                    required={true}
                                                    onBlur={ () => spy()}
                                                    validateTrigger={['onBlur']}
                                                    validateRules={[{ required: true, message: 'Publish App is required.' },
                                                ]} />
                                            </ValidatedForm>);
        expect(validatedRadioFieldWrapper.find('form')).toHaveLength(1);
        expect(validatedRadioFieldWrapper.find('div')).toHaveLength(6);
        expect(validatedRadioFieldWrapper.find('input')).toHaveLength(1);
        expect(validatedRadioFieldWrapper.find('label')).toHaveLength(1);
        expect(validatedRadioFieldWrapper.find('input').prop('id')).toBe('appStatus');
        expect(validatedRadioFieldWrapper.find('input').prop('name')).toBe('Publish App');
        expect(validatedRadioFieldWrapper.find('input').prop('value')).toBe('true');
        validatedRadioFieldWrapper.find('input').slice().simulate('blur');
        expect(validatedRadioFieldWrapper.find('span')).toHaveLength(0);
      });
    });

    describe('when set with onBlur without value given', () => {
      it('should verify ValidatedRadioField when onBlur prop is set', () => {
        const spy = jest.fn();
        const validatedRadioFieldWrapper = mount(
                                            <ValidatedForm>
                                              <ValidatedRadioField
                                                    id="appStatus"
                                                    label="Publish App"
                                                    name="Publish App"
                                                    value=""
                                                    required={true}
                                                    onBlur={ () => spy()}
                                                    validateTrigger={['onBlur']}
                                                    validateRules={[{ required: true, message: 'Publish App is required.' },
                                                ]} />
                                            </ValidatedForm>);
        expect(validatedRadioFieldWrapper.find('form')).toHaveLength(1);
        expect(validatedRadioFieldWrapper.find('div')).toHaveLength(6);
        expect(validatedRadioFieldWrapper.find('input')).toHaveLength(1);
        expect(validatedRadioFieldWrapper.find('label')).toHaveLength(1);
        expect(validatedRadioFieldWrapper.find('input').prop('id')).toBe('appStatus');
        expect(validatedRadioFieldWrapper.find('input').prop('name')).toBe('Publish App');
        expect(validatedRadioFieldWrapper.find('input').prop('value')).toBe('');
        validatedRadioFieldWrapper.find('input').slice().simulate('blur');
        expect(validatedRadioFieldWrapper.find('span').text()).toBe('Publish App is required.');
      });
    });

    describe('when not set', () => {
      it('should verify ValidatedRadioField when onBlur prop is not set', () => {
        const validatedRadioFieldWrapper = mount(
                                            <ValidatedForm>
                                                <ValidatedRadioField
                                                    id="appStatus"
                                                    label="Publish App"
                                                    name="Publish App"
                                                    value="true"
                                                    required={true}
                                                    validateRules={[{ required: true, message: 'App Name is required.' },
                                                ]} />
                                            </ValidatedForm>);
        expect(validatedRadioFieldWrapper.find('form')).toHaveLength(1);
        expect(validatedRadioFieldWrapper.find('div')).toHaveLength(6);
        expect(validatedRadioFieldWrapper.find('input')).toHaveLength(1);
        expect(validatedRadioFieldWrapper.find('label')).toHaveLength(1);
        expect(validatedRadioFieldWrapper.find('input').prop('id')).toBe('appStatus');
         expect(validatedRadioFieldWrapper.find('input').prop('name')).toBe('Publish App');
         expect(validatedRadioFieldWrapper.find('input').prop('value')).toBe('true');
      });
    });
  });

  describe('validateRules property', () => {
    describe('when set', () => {
      it('should verify ValidatedRadioField when validateRules props are set', () => {
        const spy = jest.fn();
        const validatedRadioFieldWrapper = mount(
                                            <ValidatedForm>
                                                <ValidatedRadioField
                                                    id="appStatus"
                                                    label="Publish App"
                                                    name="Publish App"
                                                    value=""
                                                    required={true}
                                                    onBlur={ () => spy()}
                                                    validateTrigger={['onBlur']}
                                                    validateRules={[{ required: true, message: 'Publish App is required.' },
                                                ]} />
                                            </ValidatedForm>);
        expect(validatedRadioFieldWrapper.find('form')).toHaveLength(1);
        expect(validatedRadioFieldWrapper.find('div')).toHaveLength(6);
        expect(validatedRadioFieldWrapper.find('input')).toHaveLength(1);
        expect(validatedRadioFieldWrapper.find('label')).toHaveLength(1);
        expect(validatedRadioFieldWrapper.find('input').prop('id')).toBe('appStatus');
         expect(validatedRadioFieldWrapper.find('input').prop('name')).toBe('Publish App');
        expect(validatedRadioFieldWrapper.find('input').prop('value')).toBe('');
        validatedRadioFieldWrapper.find('input').slice().simulate('blur');
        expect(validatedRadioFieldWrapper.find('span').text()).toBe('Publish App is required.');
      });
    });

    describe('when not set', () => {
      it('should verify ValidatedRadioField when validateRules props are not set', () => {
        const spy = jest.fn();
        const validatedRadioFieldWrapper = mount(
                                            <ValidatedForm>
                                                <ValidatedRadioField
                                                    id="appStatus"
                                                    label="Publish App"
                                                    name="Publish App"
                                                    value=""
                                                    required={true}
                                                    onBlur={ () => spy()}
                                                validateTrigger={['onBlur']} />
                                            </ValidatedForm>);
        expect(validatedRadioFieldWrapper.find('form')).toHaveLength(1);
        expect(validatedRadioFieldWrapper.find('div')).toHaveLength(6);
        expect(validatedRadioFieldWrapper.find('input')).toHaveLength(1);
        expect(validatedRadioFieldWrapper.find('label')).toHaveLength(1);
        expect(validatedRadioFieldWrapper.find('input').prop('id')).toBe('appStatus');
        expect(validatedRadioFieldWrapper.find('input').prop('name')).toBe('Publish App');
        expect(validatedRadioFieldWrapper.find('input').prop('value')).toBe('');
        validatedRadioFieldWrapper.find('input').slice().simulate('blur');
      });
    });
  });

  describe('all property', () => {
    describe('when set', () => {
      it('should verify ValidatedRadioField when all props are set', () => {
        const spy = jest.fn();
        const validatedRadioFieldWrapper = mount(
                                            <ValidatedForm>
                                                <ValidatedRadioField
                                                    id="appStatus"
                                                    label="Publish App"
                                                    name="Publish App"
                                                    value="true"
                                                    required={true}
                                                    onChange={() => spy()}
                                                    validateTrigger={['onBlur']}
                                                    validateRules={[{ required: true, message: 'Publish App is required.' },
                                                ]} />
                                            </ValidatedForm>);
        expect(validatedRadioFieldWrapper.find('form')).toHaveLength(1);
        expect(validatedRadioFieldWrapper.find('div')).toHaveLength(6);
        expect(validatedRadioFieldWrapper.find('input')).toHaveLength(1);
        expect(validatedRadioFieldWrapper.find('label')).toHaveLength(1);
        expect(validatedRadioFieldWrapper.find('input').prop('id')).toBe('appStatus');
        expect(validatedRadioFieldWrapper.find('input').prop('name')).toBe('Publish App');
        expect(validatedRadioFieldWrapper.find('input').prop('value')).toBe('true');
      });
    });
  });
});
