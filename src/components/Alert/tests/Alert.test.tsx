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
        expect(alertWrapper.prop('customType')).toBeFalsy();
      });
    });

    describe('when set', () => {
      it('basic alert should have rendered one div class element', () => {
        const alertWrapper = mount(
          <Alert customType="primary" theme = {theme} >
          Set type of alert.
          </Alert>
        );
        expect(alertWrapper.find('div')).toHaveLength(1);
      });

      it('basic alert should have default Alert css class on div', () => {
        const alertWrapper = mount(
          <Alert  customType="primary" theme = {theme} >
          Set type of alert.
          </Alert>
        );
        expect(alertWrapper.find('div').at(0).hasClass('Alert')).toBe(true);
      });

      it('should verify type set as primary', () => {
        const alertWrapper = mount(
          <Alert  customType="primary" theme = {theme} >
          Set type of alert.
          </Alert>
        );
        expect(alertWrapper.prop('customType')).toBe('primary');
      });

      it('should verify alertPrimary css class on div as per type', () => {
        const alertWrapper = mount(
          <Alert  customType="primary" theme = {theme} >
          Set type of alert.
          </Alert>
        );
        expect(alertWrapper.find('div').at(0).hasClass('alertPrimary')).toBe(true);
      });

      it('should verify type set as success', () => {
        const alertWrapper = mount(
          <Alert customType="success" theme={theme} >
          Set type of alert.
          </Alert>
        );
        expect(alertWrapper.prop('customType')).toBe('success');
      });

      it('should verify alertSuccess css class on div as per type', () => {
        const alertWrapper = mount(
          <Alert customType="success" theme={theme} >
          Set type of alert.
          </Alert>
        );
        expect(alertWrapper.find('div').at(0).hasClass('alertSuccess')).toBe(true);
      });

      it('should verify type set as danger', () => {
        const alertWrapper = mount(
          <Alert customType="danger" theme={theme} >
          Set type of alert.
          </Alert>
        );
        expect(alertWrapper.prop('customType')).toBe('danger');
      });
      it('should verify alertDanger css class on div as per type', () => {
        const alertWrapper = mount(
          <Alert customType="danger" theme={theme} >
          Set type of alert.
          </Alert>
        );
        expect(alertWrapper.find('div').at(0).hasClass('alertDanger')).toBe(true);
      });

      it('should verify type set as warning', () => {
        const alertWrapper = mount(
          <Alert customType="warning" theme={theme} >
          Set type of alert.
          </Alert>
        );
        expect(alertWrapper.prop('customType')).toBe('warning');
      });

      it('should verify alertWarning css class on div as per type', () => {
        const alertWrapper = mount(
          <Alert customType="warning" theme={theme} >
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
          <Alert theme={theme} >
          <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
          </p>
          </Alert>
        );
        expect(alertWrapper.find('div')).toHaveLength(1);
        expect(alertWrapper.find('button')).toHaveLength(1);
        expect(alertWrapper.find('p')).toHaveLength(2);
        expect(alertWrapper.find('div').at(0).hasClass('Alert')).toBe(true);
        expect(alertWrapper.prop('children').props.children).toBe('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.');
      });
    });
  });

  describe('verify all property together', () => {
    it('should verify alert when all properties are set', () => {
      const alertWrapper = mount(
        <Alert theme={theme} >
        <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
        </p>
        </Alert>
      );
      expect(alertWrapper.find('div')).toHaveLength(1);
      expect(alertWrapper.find('button')).toHaveLength(1);
      expect(alertWrapper.find('p')).toHaveLength(2);
      expect(alertWrapper.prop('customType')).toBeFalsy();
      expect(alertWrapper.prop('children').props.children).toBe('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.');
    });
  });
});
