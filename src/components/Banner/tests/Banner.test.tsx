import * as React from 'react';
import { mount } from 'enzyme';
import Banner from '../Banner';
import { Action } from '../../../types';

describe('<Banner />', () => {
  const theme = {
    banner: 'Banner',
    hasDismiss: 'hasDismiss',
    statusSuccess: 'statusSuccess',
    statusInfo: 'statusInfo',
    statusWarning: 'statusWarning',
    statusCritical: 'statusCritical',
    ribbon: 'Ribbon',
    heading: 'Heading',
    actions: 'Actions',
    content: 'Content',
    secondaryAction: 'SecondaryAction',
    text: 'Text',
  };

  describe('when default props are provided', () => {
    it('basic banner should have rendered div, span element and class on it', () => {
      const bannerWrapper = mount(
                                    <Banner theme={theme} />
                                  );
      expect(bannerWrapper.find('div')).toHaveLength(3);
      expect(bannerWrapper.find('span')).toHaveLength(1);
      expect(bannerWrapper.find('span')).toHaveLength(1);
      expect(bannerWrapper.find('div').at(0).hasClass('Banner')).toBe(true);
      expect(bannerWrapper.find('div').at(1).hasClass('Ribbon')).toBe(true);
      expect(bannerWrapper.find('div').at(0).prop('role')).toBe('banner undefined');
    });
  });
  describe('title property', () => {
    describe('when not set', () => {
      it('should verify banner when title not set', () => {
        const bannerWrapper = mount(
                                     <Banner theme={theme} />
                                   );
        expect(bannerWrapper.find('div')).toHaveLength(3);
        expect(bannerWrapper.find('span')).toHaveLength(1);
        expect(bannerWrapper.find('div').at(0).hasClass('Banner')).toBe(true);
        expect(bannerWrapper.find('div').at(1).hasClass('Ribbon')).toBe(true);
        expect(bannerWrapper.find('div').at(0).prop('role')).toBe('banner undefined');
        expect(bannerWrapper.prop('componentTitle')).toBeUndefined();
      });
    });

    describe('when set', () => {
      it('should verify banner when title set', () => {
        const bannerWrapper = mount(
                                     <Banner componentTitle="Order archived" theme={theme} />
                                   );
        expect(bannerWrapper.find('div')).toHaveLength(4);
        expect(bannerWrapper.find('span')).toHaveLength(1);
        expect(bannerWrapper.find('h6')).toHaveLength(1);
        expect(bannerWrapper.find('div').at(0).hasClass('Banner')).toBe(true);
        expect(bannerWrapper.find('div').at(0).prop('role')).toBe('banner undefined');
        expect(bannerWrapper.find('div').at(1).hasClass('Ribbon')).toBe(true);
        expect(bannerWrapper.find('div').at(3).hasClass('Heading')).toBe(true);
        expect(bannerWrapper.prop('componentTitle')).toBe('Order archived');
      });
    });
  });

  describe('status property', () => {
    describe('when not set', () => {
      it('should verify banner when status not set', () => {
        const bannerWrapper = mount(
                                    <Banner theme={theme} />
                                   );
        expect(bannerWrapper.find('div')).toHaveLength(3);
        expect(bannerWrapper.find('span')).toHaveLength(1);
        expect(bannerWrapper.find('div').at(0).hasClass('Banner')).toBe(true);
        expect(bannerWrapper.find('div').at(1).hasClass('Ribbon')).toBe(true);
        expect(bannerWrapper.find('div').at(0).prop('role')).toBe('banner undefined');
        expect(bannerWrapper.prop('status')).toBeUndefined();
      });
    });

    describe('when set', () => {
      it('should verify banner when status set as success', () => {
        const bannerWrapper = mount(
                                     <Banner status="success" theme={theme} />
                                   );
        expect(bannerWrapper.find('div')).toHaveLength(3);
        expect(bannerWrapper.find('span')).toHaveLength(1);
        expect(bannerWrapper.find('div').at(1).hasClass('Ribbon')).toBe(true);
        expect(bannerWrapper.prop('status')).toBe('success');
        expect(bannerWrapper.find('div').at(0).hasClass('statusSuccess')).toBe(true);
        expect(bannerWrapper.find('div').at(0).prop('role')).toBe('banner success');
      });
      it('should verify banner when status set as info', () => {
        const bannerWrapper = mount(
                                     <Banner status="info" theme={theme} />
                                    );
        expect(bannerWrapper.find('div')).toHaveLength(3);
        expect(bannerWrapper.find('span')).toHaveLength(1);
        expect(bannerWrapper.find('div').at(1).hasClass('Ribbon')).toBe(true);
        expect(bannerWrapper.prop('status')).toBe('info');
        expect(bannerWrapper.find('div').at(0).hasClass('statusInfo')).toBe(true);
        expect(bannerWrapper.find('div').at(0).prop('role')).toBe('banner info');
      });

      it('should verify banner when status set as warning', () => {
        const bannerWrapper = mount(
                                    <Banner status="warning" theme={theme} />
                                   );
        expect(bannerWrapper.find('div')).toHaveLength(3);
        expect(bannerWrapper.find('span')).toHaveLength(1);
        expect(bannerWrapper.find('div').at(1).hasClass('Ribbon')).toBe(true);
        expect(bannerWrapper.prop('status')).toBe('warning');
        expect(bannerWrapper.find('div').at(0).hasClass('statusWarning')).toBe(true);
        expect(bannerWrapper.find('div').at(0).prop('role')).toBe('banner warning');
      });

      it('should verify banner when status set as critical', () => {
        const bannerWrapper = mount(
                                    <Banner status="critical" theme={theme} />
                                );
        expect(bannerWrapper.find('div')).toHaveLength(3);
        expect(bannerWrapper.find('span')).toHaveLength(1);
        expect(bannerWrapper.find('div').at(1).hasClass('Ribbon')).toBe(true);
        expect(bannerWrapper.prop('status')).toBe('critical');
        expect(bannerWrapper.find('div').at(0).hasClass('statusCritical')).toBe(true);
        expect(bannerWrapper.find('div').at(0).prop('role')).toBe('banner critical');
      });
    });
  });

  describe('icon property', () => {
    describe('when not set', () => {
      it('should verify banner when icon not set', () => {
        const bannerWrapper = mount(
                                    <Banner theme={theme} />
                                   );
        expect(bannerWrapper.find('div')).toHaveLength(3);
        expect(bannerWrapper.find('span')).toHaveLength(1);
        expect(bannerWrapper.find('div').at(0).hasClass('Banner')).toBe(true);
        expect(bannerWrapper.find('div').at(1).hasClass('Ribbon')).toBe(true);
        expect(bannerWrapper.find('div').at(0).prop('role')).toBe('banner undefined');
        expect(bannerWrapper.prop('icon')).toBeUndefined();
      });
    });

    describe('when set', () => {
      it('should verify banner when icon when set as placeholder ', () => {
        const bannerWrapper = mount(
                                     <Banner icon="placeholder" theme={theme} />
                                   );
        expect(bannerWrapper.find('div')).toHaveLength(4);
        expect(bannerWrapper.find('span')).toHaveLength(1);
        expect(bannerWrapper.find('div').at(0).hasClass('Banner')).toBe(true);
        expect(bannerWrapper.find('div').at(1).hasClass('Ribbon')).toBe(true);
        expect(bannerWrapper.find('div').at(0).prop('role')).toBe('banner undefined');
        expect(bannerWrapper.prop('icon')).toBe('placeholder');
      });
      it('should verify banner when icon when set from Bundled_Icons', () => {
        const bannerWrapper = mount(
                                    <Banner icon="arrowDown" theme={theme} />
                                );
        expect(bannerWrapper.find('div')).toHaveLength(3);
        expect(bannerWrapper.find('span')).toHaveLength(1);
        expect(bannerWrapper.find('div').at(0).hasClass('Banner')).toBe(true);
        expect(bannerWrapper.find('div').at(1).hasClass('Ribbon')).toBe(true);
        expect(bannerWrapper.find('div').at(0).prop('role')).toBe('banner undefined');
        expect(bannerWrapper.prop('icon')).toBe('arrowDown');
      });
    });
  });

  describe('children property', () => {
    describe('when not set', () => {
      it('should verify banner when children not set', () => {
        const bannerWrapper = mount(
                                     <Banner theme={theme} />
                                   );
        expect(bannerWrapper.find('div')).toHaveLength(3);
        expect(bannerWrapper.find('span')).toHaveLength(1);
        expect(bannerWrapper.find('div').at(0).hasClass('Banner')).toBe(true);
        expect(bannerWrapper.find('div').at(1).hasClass('Ribbon')).toBe(true);
        expect(bannerWrapper.find('div').at(0).prop('role')).toBe('banner undefined');
        expect(bannerWrapper.prop('children')).toBeUndefined();
      });
    });

    describe('when set', () => {
      it('should verify banner when children set', () => {
        const bannerWrapper = mount(
                                    <Banner theme={theme} >
                                      <p>
                                        Add weights to show accurate rates.
                                      </p>
                                    </Banner>
                                   );
        expect(bannerWrapper.find('div')).toHaveLength(4);
        expect(bannerWrapper.find('span')).toHaveLength(1);
        expect(bannerWrapper.find('p')).toHaveLength(1);
        expect(bannerWrapper.find('div').at(0).hasClass('Banner')).toBe(true);
        expect(bannerWrapper.find('div').at(0).prop('role')).toBe('banner undefined');
        expect(bannerWrapper.find('div').at(1).hasClass('Ribbon')).toBe(true);
        expect(bannerWrapper.find('div').at(3).hasClass('Content')).toBe(true);
        expect(bannerWrapper.prop('children').props.children).toBe('Add weights to show accurate rates.');
      });
    });
  });

  describe('action property', () => {
    describe('when not set', () => {
      it('should verify banner when action property is not set', () => {
        const bannerWrapper = mount(
                                    <Banner theme={theme} />
                                   );
        expect(bannerWrapper.find('div')).toHaveLength(3);
        expect(bannerWrapper.find('span')).toHaveLength(1);
        expect(bannerWrapper.find('div').at(0).hasClass('Banner')).toBe(true);
        expect(bannerWrapper.find('div').at(1).hasClass('Ribbon')).toBe(true);
        expect(bannerWrapper.find('div').at(0).prop('role')).toBe('banner undefined');
        expect(bannerWrapper.prop('status')).toBeUndefined();
      });
    });

    describe('when set', () => {
      it('should verify banner when action property is set', () => {
        const spy = jest.fn();
        const mainAction: Action = {
          content: 'mainAction Content',
          onAction: () => { spy(); },
        };
        const bannerWrapper = mount(
                                    <Banner componentTitle="Order archived" status="success"
                                    action={mainAction} theme={theme} >
                                      <p>
                                          This order was archived.
                                      </p>
                                    </Banner>
                                    );
        expect(bannerWrapper.find('div')).toHaveLength(8);
        expect(bannerWrapper.find('span')).toHaveLength(3);
        expect(bannerWrapper.find('button')).toHaveLength(2);
        expect(bannerWrapper.find('h6')).toHaveLength(1);
        expect(bannerWrapper.find('p')).toHaveLength(1);
        expect(bannerWrapper.find('div').at(0).hasClass('statusSuccess')).toBe(true);
        expect(bannerWrapper.find('div').at(0).prop('role')).toBe('banner success');
        expect(bannerWrapper.find('div').at(1).hasClass('Ribbon')).toBe(true);
        expect(bannerWrapper.find('div').at(3).hasClass('Heading')).toBe(true);
        expect(bannerWrapper.find('div').at(4).hasClass('Content')).toBe(true);
        expect(bannerWrapper.prop('componentTitle')).toBe('Order archived');
        expect(bannerWrapper.prop('status')).toBe('success');
        expect(bannerWrapper.prop('children').props.children).toBe('This order was archived.');
        expect(bannerWrapper.find('button').at(0).text()).toBe('mainAction Content');
        bannerWrapper.find('button').at(0).simulate('click');
        expect(spy).toBeCalled();
      });
    });
  });

  describe('secondary action property', () => {
    describe('when not set', () => {
      it('should verify banner when secondary action property is not set', () => {
        const bannerWrapper = mount(
                                    <Banner theme={theme} />
                                );
        expect(bannerWrapper.find('div')).toHaveLength(3);
        expect(bannerWrapper.find('span')).toHaveLength(1);
        expect(bannerWrapper.find('div').at(0).hasClass('Banner')).toBe(true);
        expect(bannerWrapper.find('div').at(1).hasClass('Ribbon')).toBe(true);
        expect(bannerWrapper.find('div').at(0).prop('role')).toBe('banner undefined');
        expect(bannerWrapper.prop('status')).toBeUndefined();
      });
    });

    describe('when set', () => {
      it('should verify banner when secondary action property is set', () => {
        const spy1 = jest.fn();
        const spy2 = jest.fn();
        const mainAction: Action = {
          content: 'mainAction Content',
          onAction: () => { spy1(); },
        };
        const secondaryAction: Action = {
          content: 'secondaryAction Content',
          onAction: () => { spy2(); },
        };

        const bannerWrapper = mount(
                                    <Banner componentTitle="Order archived" status="success" action={mainAction}
                                    secondaryAction={secondaryAction} theme={theme} >
                                        <p>
                                            This order was archived.
                                        </p>
                                    </Banner>
                            );
        expect(bannerWrapper.find('div')).toHaveLength(9);
        expect(bannerWrapper.find('span')).toHaveLength(4);
        expect(bannerWrapper.find('button')).toHaveLength(3);
        expect(bannerWrapper.find('h6')).toHaveLength(1);
        expect(bannerWrapper.find('p')).toHaveLength(1);
        expect(bannerWrapper.find('div').at(0).hasClass('statusSuccess')).toBe(true);
        expect(bannerWrapper.find('div').at(0).prop('role')).toBe('banner success');
        expect(bannerWrapper.find('div').at(1).hasClass('Ribbon')).toBe(true);
        expect(bannerWrapper.find('div').at(3).hasClass('Heading')).toBe(true);
        expect(bannerWrapper.find('div').at(4).hasClass('Content')).toBe(true);
        expect(bannerWrapper.find('div').at(5).hasClass('Actions')).toBe(true);
        expect(bannerWrapper.find('span').at(3).hasClass('Text')).toBe(true);
        expect(bannerWrapper.find('button').at(2).hasClass('SecondaryAction')).toBe(true);
        expect(bannerWrapper.prop('componentTitle')).toBe('Order archived');
        expect(bannerWrapper.prop('status')).toBe('success');
        expect(bannerWrapper.prop('children').props.children).toBe('This order was archived.');
        expect(bannerWrapper.find('button').at(0).text()).toBe('mainAction Content');
        expect(bannerWrapper.find('button').at(2).text()).toBe('secondaryAction Content');
        bannerWrapper.find('button').at(0).simulate('click');
        expect(spy1).toBeCalled();
        bannerWrapper.find('button').at(2).simulate('click');
        expect(spy2).toBeCalled();
      });
    });
  });

  describe('onDismiss function', () => {
    it('should verify banner onDismiss function is called', () => {
      const spy = jest.fn(() => 'default')
        .mockImplementationOnce(() => 'first call');
      spy();
      const bannerWrapper = mount(
                                 <Banner componentTitle="DismissCheck" onDismiss={() => spy()} theme={theme} >
                                    <p>
                                      Use your finance report. Dismissed.
                                    </p>
                                 </Banner>
                                 );
      expect(bannerWrapper.find('div')).toHaveLength(6);
      expect(bannerWrapper.find('span')).toHaveLength(4);
      expect(bannerWrapper.find('h6')).toHaveLength(1);
      expect(bannerWrapper.find('p')).toHaveLength(1);
      expect(bannerWrapper.find('button')).toHaveLength(2);
      expect(bannerWrapper.find('div').at(0).hasClass('hasDismiss')).toBe(true);
      expect(bannerWrapper.find('div').at(0).prop('role')).toBe('banner undefined');
      expect(bannerWrapper.find('div').at(2).hasClass('Ribbon')).toBe(true);
      expect(bannerWrapper.find('div').at(4).hasClass('Heading')).toBe(true);
      expect(typeof bannerWrapper.prop('onDismiss')).toBeDefined();
      bannerWrapper.find('button').at(0).simulate('click');
      expect(spy).toBeCalled();
      expect(spy.mock.calls.length).toBe(2);
    });
  });

  describe('verify all property together', () => {
    const spy1 = jest.fn();
    const spy2 = jest.fn();
    const mainAction: Action = {
      content: 'mainAction Content',
      onAction: () => { spy1(); },
    };
    const secondaryAction: Action = {
      content: 'secondaryAction Content',
      onAction: () => { spy2(); },
    };
    it('should verify banner when all properties are set', () => {
      const bannerWrapper = mount(
                                  <Banner icon="arrowDown" componentTitle="Order archived" status="success"
                                   action={mainAction} secondaryAction={secondaryAction} theme={theme} >
                                     <p>
                                       Add weights to show accurate rates.
                                     </p>
                                   </Banner>
                                  );
      expect(bannerWrapper.find('div')).toHaveLength(9);
      expect(bannerWrapper.find('span')).toHaveLength(4);
      expect(bannerWrapper.find('button')).toHaveLength(3);
      expect(bannerWrapper.find('h6')).toHaveLength(1);
      expect(bannerWrapper.find('p')).toHaveLength(1);
      expect(bannerWrapper.find('div').at(0).hasClass('statusSuccess')).toBe(true);
      expect(bannerWrapper.find('div').at(0).prop('role')).toBe('banner success');
      expect(bannerWrapper.find('div').at(1).hasClass('Ribbon')).toBe(true);
      expect(bannerWrapper.find('div').at(3).hasClass('Heading')).toBe(true);
      expect(bannerWrapper.find('div').at(4).hasClass('Content')).toBe(true);
      expect(bannerWrapper.find('div').at(5).hasClass('Actions')).toBe(true);
      expect(bannerWrapper.find('span').at(3).hasClass('Text')).toBe(true);
      expect(bannerWrapper.find('button').at(2).hasClass('SecondaryAction')).toBe(true);
      expect(bannerWrapper.prop('icon')).toBe('arrowDown');
      expect(bannerWrapper.prop('componentTitle')).toBe('Order archived');
      expect(bannerWrapper.prop('status')).toBe('success');
      expect(bannerWrapper.prop('children').props.children).toBe('Add weights to show accurate rates.');
      expect(bannerWrapper.find('button').at(0).text()).toBe('mainAction Content');
      expect(bannerWrapper.find('button').at(2).text()).toBe('secondaryAction Content');
      bannerWrapper.find('button').at(0).simulate('click');
      expect(spy1).toBeCalled();
      bannerWrapper.find('button').at(2).simulate('click');
      expect(spy2).toBeCalled();
    });
  });
});
