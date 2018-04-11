import * as React from 'react';
import { mount } from 'enzyme';
import Tooltip from '../Tooltip';
import Link from '../../Link';

const theme = {
  tooltip: 'Tooltip',
  measuring: 'measuring',
  positionedAbove: 'positionedAbove',
  light: 'light',
  Wrapper: 'Wrapper',
  Content: 'Content',
  Tip: 'Tip',
  Label: 'Label',
};

describe('<Tooltip />', () => {

  describe('when default props are provided', () => {
    it('basic tooltip should have rendered one span element', () => {
      const tooltipWrapper = mount(
                                    <Tooltip content="This order has shipping labels." theme={theme} />
                             );
      expect(tooltipWrapper.find('span')).toHaveLength(1);
    });
  });

  describe('children property', () => {
    describe('when set', () => {
      it('basic tooltip should have rendered 1 span element', () => {
        const tooltipWrapper = mount(
                                     <Tooltip content="This order has shipping labels." theme={theme}>
                                          <Link>Order #1001</Link>
                                      </Tooltip>
                               );
        expect(tooltipWrapper.find('span')).toHaveLength(1);
      });
      it('should verify children property is defined as link', () => {
        const tooltipWrapper = mount(
                                      <Tooltip content="This order has shipping labels." theme={theme}>
                                          <Link>Order #1001</Link>
                                      </Tooltip>
                               );

        expect(tooltipWrapper.childAt(0).children().childAt(0).prop('children')).toBe('Order #1001');
      });
    });

    describe('when not set', () => {
      it('basic tooltip should have rendered one span element', () => {
        const tooltipWrapper = mount(
                                      <Tooltip content="This order has shipping labels." theme={theme} />
                               );
        expect(tooltipWrapper.find('span')).toHaveLength(1);
      });
      it('should not have children property', () => {
        const tooltipWrapper = mount(
                                      <Tooltip content="This order has shipping labels." theme={theme} />
                               );
        expect(tooltipWrapper.find('children')).toHaveLength(0);
      });
      it('should verify children property is not defined', () => {
        const tooltipWrapper = mount(
                                      <Tooltip content="This order has shipping labels."/>
                               );
        expect(tooltipWrapper.prop('children')).toBeUndefined();
      });
    });
  });
  describe('content property', () => {
    describe('when set', () => {
      it('basic tooltip should have rendered 1 span element', () => {
        const tooltipWrapper = mount(
                                      <Tooltip content="This order has shipping labels." theme={theme}>
                                          <Link>Order #1001</Link>
                                      </Tooltip>
                               );
        expect(tooltipWrapper.find('span')).toHaveLength(1);
      });
      it('should verify content property is available', () => {
        const tooltipWrapper = mount(
                                      <Tooltip content="This order has shipping labels." theme={theme}>
                                          <Link>Order #1001</Link>
                                      </Tooltip>
                               );
        expect(tooltipWrapper.prop('content')).toBe('This order has shipping labels.');
      });
    });
  });
  describe('active property', () => {
    describe('when set to true', () => {
      it('basic tooltip should have rendered 1 span element', () => {
        const tooltipWrapper = mount(
                                      <Tooltip content="This order has shipping labels." active theme={theme}>
                                          <Link>Order #1001</Link>
                                      </Tooltip>
                               );
        expect(tooltipWrapper.find('span')).toHaveLength(1);
      });
      it('should verify active property is available', () => {
        const tooltipWrapper = mount(
                                      <Tooltip content="This order has shipping labels." active theme={theme}>
                                          <Link>Order #1001</Link>
                                      </Tooltip>
                               );
        expect(tooltipWrapper.prop('active')).toBe(true);
      });
    });

    describe('when set to false', () => {
      it('basic tooltip should have rendered 1 span element', () => {
        const tooltipWrapper = mount(
                                      <Tooltip content="This order has shipping labels." active={false} theme={theme}>
                                          <Link>Order #1001</Link>
                                      </Tooltip>
                               );
        expect(tooltipWrapper.find('span')).toHaveLength(1);
      });
      it('should verify active property is available and set to false', () => {
        const tooltipWrapper = mount(
                                      <Tooltip content="This order has shipping labels." active={false} theme={theme}>
                                          <Link>Order #1001</Link>
                                      </Tooltip>
                               );
        expect(tooltipWrapper.prop('active')).toBe(false);
      });
    });
    describe('when not set', () => {
      it('basic tooltip should have rendered 1 span element', () => {
        const tooltipWrapper = mount(
                                      <Tooltip content="This order has shipping labels." theme={theme}>
                                          <Link>Order #1001</Link>
                                      </Tooltip>
                                 );
        expect(tooltipWrapper.find('span')).toHaveLength(1);
      });
      it('should verify active property is not defined', () => {
        const tooltipWrapper = mount(
                                      <Tooltip content="This order has shipping labels." theme={theme}>
                                          <Link>Order #1001</Link>
                                      </Tooltip>
                               );
        expect(tooltipWrapper.prop('active')).toBeUndefined();
      });
      it('should verify active property is not available', () => {
        const tooltipWrapper = mount(
                                      <Tooltip content="This order has shipping labels." theme={theme}>
                                          <Link>Order #1001</Link>
                                      </Tooltip>
                               );
        expect(tooltipWrapper.find('active')).toHaveLength(0);
      });
    });
  });

  describe('light property', () => {
    describe('when set to true', () => {
      it('basic tooltip should have rendered 1 span element', () => {
        const tooltipWrapper = mount(
                                      <Tooltip content="This order has shipping labels." light theme={theme}>
                                          <Link>Order #1001</Link>
                                      </Tooltip>
                               );
        expect(tooltipWrapper.find('span')).toHaveLength(1);
      });
      it('should verify light property is available', () => {
        const tooltipWrapper = mount(
                                      <Tooltip content="This order has shipping labels." light theme={theme}>
                                          <Link>Order #1001</Link>
                                      </Tooltip>
                               );
        expect(tooltipWrapper.prop('light')).toBe(true);
      });
    });
    describe('when set to false', () => {
      it('basic tooltip should have rendered 1 span element', () => {
        const tooltipWrapper = mount(
                                      <Tooltip content="This order has shipping labels." light={false} theme={theme}>
                                          <Link>Order #1001</Link>
                                      </Tooltip>
                               );
        expect(tooltipWrapper.find('span')).toHaveLength(1);
      });
      it('should verify light property is available and set as false', () => {
        const tooltipWrapper = mount(
                                      <Tooltip content="This order has shipping labels." light={false} theme={theme}>
                                          <Link>Order #1001</Link>
                                      </Tooltip>
                               );
        expect(tooltipWrapper.prop('light')).toBe(false);
      });
    });
    describe('when not set', () => {
      it('basic tooltip should have rendered 1 span element', () => {
        const tooltipWrapper = mount(
                                      <Tooltip content="This order has shipping labels." theme={theme}>
                                          <Link>Order #1001</Link>
                                      </Tooltip>
                               );
        expect(tooltipWrapper.find('span')).toHaveLength(1);
      });
      it('should verify light property is not defined', () => {
        const tooltipWrapper = mount(
                                      <Tooltip content="This order has shipping labels." theme={theme}>
                                          <Link>Order #1001</Link>
                                      </Tooltip>
                               );
        expect(tooltipWrapper.prop('light')).toBeUndefined();
      });
      it('should verify light property is not available', () => {
        const tooltipWrapper = mount(
                                      <Tooltip content="This order has shipping labels." theme={theme}>
                                          <Link>Order #1001</Link>
                                      </Tooltip>
                               );
        expect(tooltipWrapper.find('light')).toHaveLength(0);
      });
    });
  });

  describe('preferredPosition property', () => {
    describe('when set', () => {
      it('basic tooltip should have rendered 1 span element', () => {
        const tooltipWrapper = mount(
                                      <Tooltip content="This order has shipping labels." preferredPosition="below" theme={theme}>
                                          <Link>Order #1001</Link>
                                      </Tooltip>
                               );
        expect(tooltipWrapper.find('span')).toHaveLength(1);
      });
      it('should verify preferredPosition property when position as below', () => {
        const tooltipWrapper = mount(
                                      <Tooltip content="This order has shipping labels." preferredPosition="below" theme={theme}>
                                          <Link>Order #1001</Link>
                                      </Tooltip>
                               );
        expect(tooltipWrapper.prop('preferredPosition')).toBe('below');
      });
      it('should verify preferredPosition property when position as above', () => {
        const tooltipWrapper = mount(
                                      <Tooltip content="This order has shipping labels." preferredPosition="above" theme={theme}>
                                          <Link>Order #1001</Link>
                                      </Tooltip>
                               );
        expect(tooltipWrapper.prop('preferredPosition')).toBe('above');
      });
      it('should verify preferredPosition property when position as mostSpace', () => {
        const tooltipWrapper = mount(
                                      <Tooltip content="This order has shipping labels." preferredPosition="mostSpace" theme={theme}>
                                          <Link>Order #1001</Link>
                                      </Tooltip>
                               );
        expect(tooltipWrapper.prop('preferredPosition')).toBe('mostSpace');
      });
    });

    describe('when not set', () => {
      it('basic tooltip should have rendered 1 span element', () => {
        const tooltipWrapper = mount(
                                      <Tooltip content="This order has shipping labels." theme={theme}>
                                          <Link>Order #1001</Link>
                                      </Tooltip>
                               );
        expect(tooltipWrapper.find('span')).toHaveLength(1);
      });
      it('should verify preferredPosition property is not defined', () => {
        const tooltipWrapper = mount(
                                      <Tooltip content="This order has shipping labels." theme={theme}>
                                          <Link>Order #1001</Link>
                                      </Tooltip>
                               );
        expect(tooltipWrapper.prop('preferredPosition')).toBeUndefined();
      });
      it('should verify preferredPosition property is not available', () => {
        const tooltipWrapper = mount(
                                      <Tooltip content="This order has shipping labels." theme={theme}>
                                          <Link>Order #1001</Link>
                                      </Tooltip>
                               );
        expect(tooltipWrapper.find('preferredPosition')).toHaveLength(0);
      });
    });
  });

  describe('activatorWrapper property', () => {
    describe('when set', () => {
      it('basic tooltip should have rendered no span element', () => {
        const tooltipWrapper = mount(
                                      <Tooltip content="This order has shipping labels." activatorWrapper="Test" theme={theme}>
                                          <Link>Order #1001</Link>
                                      </Tooltip>
                               );
        expect(tooltipWrapper.find('span')).toHaveLength(0);
      });
      it('should have rendered with one activatorWrapper element', () => {
        const tooltipWrapper = mount(
                                      <Tooltip content="This order has shipping labels." activatorWrapper="Test" theme={theme}>
                                          <Link>Order #1001</Link>
                                      </Tooltip>
                               );
        expect(tooltipWrapper.find('Test')).toHaveLength(1);
      });
      it('should verify activatorWrapper property is available', () => {
        const tooltipWrapper = mount(<Tooltip content="This order has shipping labels." activatorWrapper="Test" theme={theme}>
                                        <Link>Order #1001</Link>
                                     </Tooltip>
                               );
        expect(tooltipWrapper.prop('activatorWrapper')).toBe('Test');
      });
    });

    describe('when not set', () => {
      it('basic tooltip should have rendered 1 span element', () => {
        const tooltipWrapper = mount(
                                      <Tooltip content="This order has shipping labels." theme={theme}>
                                        <Link>Order #1001</Link>
                                      </Tooltip>
                               );
        expect(tooltipWrapper.find('span')).toHaveLength(1);
      });
      it('should verify activatorWrapper property is not defined', () => {
        const tooltipWrapper = mount(
                                      <Tooltip content="This order has shipping labels." theme={theme}>
                                        <Link>Order #1001</Link>
                                      </Tooltip>
                               );
        expect(tooltipWrapper.prop('activatorWrapper')).toBeUndefined();
      });
      it('should verify activatorWrapper property is not available', () => {
        const tooltipWrapper = mount(
                                      <Tooltip content="This order has shipping labels." theme={theme}>
                                          <Link>Order #1001</Link>
                                      </Tooltip>
                               );
        expect(tooltipWrapper.find('activatorWrapper')).toHaveLength(0);
      });
    });
  });
});
