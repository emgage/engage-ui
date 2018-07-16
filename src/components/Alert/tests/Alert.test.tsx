import * as React from 'react';
import { mount } from 'enzyme';
import Alert from '../Alert';

const theme = {
  alert: 'Alert',
  isActive: 'true',
  alertSuccess: 'alertSuccess',
  alertWarning: 'alertWarning',
  alertDanger: 'alertDanger',
  alertPrimary: 'alertPrimary',
  style: 'style',
  color: 'color',
  type: 'type',
};

describe('<Alert />', () => {
  describe('when default props are provided', () => {
    it('basic alert should have rendered 1 div class element', () => {
      const alertWrapper = mount(
        <Alert theme = {theme} />
      );
      expect(alertWrapper.find('div')).toHaveLength(1);
    });
    it('basic alert should have default alert css class on div', () => {
      const alertWrapper = mount(
        <Alert  theme = {theme} />
      );
      console.log(alertWrapper.html());
      expect(alertWrapper.find('div').at(0).hasClass('Alert')).toBe(true);
    });
  });

  describe('isActive property', () => {
    describe('when set to true', () => {
      it('basic alert should have rendered 1 div element', () => {
        const alertWrapper = mount(
          <Alert theme = {theme} />
        );
        expect(alertWrapper.find('div')).toHaveLength(1);
      });
    });
  });

  describe('type property', () => {
    describe('when not set', () => {
      it('basic alert should have rendered one div class element', () => {
        const alertWrapper = mount(
          <Alert  theme = {theme} >
          Not set type of alert.
          </Alert>
        );
        expect(alertWrapper.find('div')).toHaveLength(1);
      });

      it('basic alert should have default alert css class on div', () => {
        const alertWrapper = mount(
          <Alert  theme = {theme} >
          Not set type of alert.
          </Alert>
        );
        expect(alertWrapper.find('div').at(0).hasClass('Alert')).toBe(true);
      });

      it('should verify the type when not set or consider default', () => {
        const alertWrapper = mount(
          <Alert  theme = {theme} >
          Not set type of alert.
          </Alert>
        );
        expect(alertWrapper.prop('componentType')).toBeFalsy();
      });
    });

    describe('when set', () => {
      it('basic alert should have rendered one div class element', () => {
        const alertWrapper = mount(
          <Alert componentType="primary" theme = {theme} >
          Set type of alert.
          </Alert>
        );
        expect(alertWrapper.find('div')).toHaveLength(1);
      });

      it('basic alert should have default Alert css class on div', () => {
        const alertWrapper = mount(
          <Alert  componentType="primary" theme = {theme} >
          Set type of alert.
          </Alert>
        );
        expect(alertWrapper.find('div').at(0).hasClass('Alert')).toBe(true);
      });

      it('should verify type set as primary', () => {
        const alertWrapper = mount(
          <Alert  componentType="primary" theme = {theme} >
          Set type of alert.
          </Alert>
        );
        expect(alertWrapper.prop('componentType')).toBe('primary');
      });

      it('should verify alertPrimary css class on div as per type', () => {
        const alertWrapper = mount(
          <Alert  componentType="primary" theme = {theme} >
          Set type of alert.
          </Alert>
        );
        expect(alertWrapper.find('div').at(0).hasClass('alertPrimary')).toBe(true);
      });

      it('should verify type set as success', () => {
        const alertWrapper = mount(
          <Alert componentType="success" theme={theme} >
          Set type of alert.
          </Alert>
        );
        expect(alertWrapper.prop('componentType')).toBe('success');
      });

      it('should verify alertSuccess css class on div as per type', () => {
        const alertWrapper = mount(
          <Alert componentType="success" theme={theme} >
          Set type of alert.
          </Alert>
        );
        expect(alertWrapper.find('div').at(0).hasClass('alertSuccess')).toBe(true);
      });

      it('should verify type set as danger', () => {
        const alertWrapper = mount(
          <Alert componentType="danger" theme={theme} >
          Set type of alert.
          </Alert>
        );
        expect(alertWrapper.prop('componentType')).toBe('danger');
      });
      it('should verify alertDanger css class on div as per type', () => {
        const alertWrapper = mount(
          <Alert componentType="danger" theme={theme} >
          Set type of alert.
          </Alert>
        );
        expect(alertWrapper.find('div').at(0).hasClass('alertDanger')).toBe(true);
      });

      it('should verify type set as warning', () => {
        const alertWrapper = mount(
          <Alert componentType="warning" theme={theme} >
          Set type of alert.
          </Alert>
        );
        expect(alertWrapper.prop('componentType')).toBe('warning');
      });

      it('should verify alertWarning css class on div as per type', () => {
        const alertWrapper = mount(
          <Alert componentType="warning" theme={theme} >
          Set type of alert.
          </Alert>
        );
        expect(alertWrapper.find('div').at(0).hasClass('alertWarning')).toBe(true);
      });
    });
  });

  describe('children property', () => {
    describe('when not set', () => {
      it('should verify alert when children not set', () => {
        const alertWrapper = mount(
          <Alert theme={theme} />
        );
        expect(alertWrapper.find('div')).toHaveLength(1);
        expect(alertWrapper.find('button')).toHaveLength(1);
        expect(alertWrapper.find('div').at(0).hasClass('Alert')).toBe(true);
        expect(alertWrapper.prop('children')).toBeUndefined();
      });
    });

    describe('when set', () => {
      it('should verify alert when children set', () => {
        const alertWrapper = mount(
          <Alert theme={theme} componentType="alertPrimary" />
        );
        expect(alertWrapper.find('div')).toHaveLength(1);
        expect(alertWrapper.find('button')).toHaveLength(1);
        expect(alertWrapper.find('p')).toHaveLength(1);
        expect(alertWrapper.find('div').at(0).hasClass('Alert')).toBe(true);
        expect(alertWrapper.prop('componentType')).toBe('alertPrimary');
      });
    });
  });

  describe('verify all property together', () => {
    it('should verify alert when all properties are set', () => {
      const alertWrapper = mount(
        <Alert theme={theme} componentType="alertPrimary" />
      );
      expect(alertWrapper.find('div')).toHaveLength(1);
      expect(alertWrapper.find('button')).toHaveLength(1);
      expect(alertWrapper.find('p')).toHaveLength(1);
      expect(alertWrapper.prop('componentType')).toBe('alertPrimary');
    });
  });
});
