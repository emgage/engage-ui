import * as React from 'react';
import { mount } from 'enzyme';
import Message from '../Message';

describe('<Message />', () => {
  const theme = {
    messageBlock: 'messageBlock',
    messagePrompt: 'messagePrompt',
    after: 'after',
  };
  describe('when default props are provided', () => {
    it('basic message should have rendered 1 noscript element', () => {
      const messageWrapper = mount(
                                    <Message componentId="10101" theme={theme} />
                               );
      expect(messageWrapper.find('noscript')).toHaveLength(1);
    });
  });

  describe('id property', () => {
    describe('when set', () => {
      it('basic message should have rendered 1 noscript element', () => {
        const messageWrapper = mount(
                                      <Message componentId="10101" theme={theme} />
                               );
        expect(messageWrapper.find('noscript')).toHaveLength(1);
      });

      it('should verify id when set', () => {
        const messageWrapper = mount(
                                      <Message componentId="10101" theme={theme} />
                               );
        expect(messageWrapper.prop('componentId')).toBe('10101');
      });
    });
  });

  describe('children property', () => {
    describe('when not set', () => {
      it('basic message should have rendered 1 noscript element', () => {
        const messageWrapper = mount(
                                      <Message componentId="10101" theme={theme} />
                                   );
        expect(messageWrapper.find('noscript')).toHaveLength(1);
      });
      it('should verify children when is not set/defined', () => {
        const messageWrapper = mount(
                                      <Message componentId="10101" theme={theme} />
                               );
        expect(messageWrapper.prop('children')).toBeUndefined();
        expect(messageWrapper.find('children')).toHaveLength(0);
      });
    });
    describe('when set', () => {
      it('basic message should have rendered 1 noscript element', () => {
        const messageWrapper = mount(
                                      <Message componentId="10101" theme={theme} >
                                          Click Here
                                      </Message>
                               );
        expect(messageWrapper.find('noscript')).toHaveLength(1);
        expect(messageWrapper.prop('children')).toBe('Click Here');
      });
      it('should verify children when is set', () => {
        const messageWrapper = mount(
                                      <Message componentId="10101" theme={theme} >
                                          Click Here
                                      </Message>
                               );
        expect(messageWrapper.prop('children')).toBe('Click Here');
      });
    });
  });

  describe('isVisible property', () => {
    describe('when not set', () => {
      it('basic message should have rendered 1 noscript element', () => {
        const messageWrapper = mount(
                                      <Message componentId = "10101" theme={theme}>
                                        Click Here
                                      </Message>
                               );
        expect(messageWrapper.find('noscript')).toHaveLength(1);
      });
    });

    describe('when set to true', () => {
      it('basic message should have rendered 1 div element', () => {
        const messageWrapper = mount(
                                      <Message componentId="10101" isVisible={true} theme={theme} >
                                          Click Here
                                      </Message>
                               );
        expect(messageWrapper.find('div')).toHaveLength(1);
      });
      it('basic message should have rendered 1 span element', () => {
        const messageWrapper = mount(
                                      <Message componentId="10101" isVisible={true} theme={theme} >
                                        Click Here
                                      </Message>
                               );
        expect(messageWrapper.find('span')).toHaveLength(1);
      });
      it('basic message should have messageBlock css class on div', () => {
        const messageWrapper = mount(
                                      <Message componentId="10101" isVisible={true} theme={theme} >
                                          Click Here
                                      </Message>
                               );
        expect(messageWrapper.find('div').hasClass('messageBlock')).toBe(true);
      });
      it('basic message should have messagePrompt css class on span', () => {
        const messageWrapper = mount(
                                      <Message componentId="10101" isVisible={true} theme={theme} >
                                          Click Here
                                      </Message>
                               );
        expect(messageWrapper.find('span').hasClass('messagePrompt')).toBe(true);
      });
      it('should verify isVisible set as true', () => {
        const messageWrapper = mount(
                                      <Message componentId = "10101" isVisible={true} theme={theme}>
                                          Click Here
                                      </Message>
                               );
        expect(messageWrapper.prop('isVisible')).toBe(true);
      });
      it('should verify children when isVisible set as true', () => {
        const messageWrapper = mount(
                                      <Message componentId = "10101" isVisible={true} theme={theme}>
                                        Click Here
                                      </Message>
                               );
        expect(messageWrapper.prop('children')).toBe('Click Here');
      });
    });

    describe('when set to false', () => {
      it('basic message should have rendered 1 noscript element', () => {
        const messageWrapper = mount(
                                      <Message componentId = "10101" isVisible={false} theme={theme}>
                                        Click Here
                                      </Message>
                               );
        expect(messageWrapper.find('noscript')).toHaveLength(1);
      });
      it('should verify isVisible set as false', () => {
        const messageWrapper = mount(
                                      <Message componentId = "10101" isVisible={false} theme={theme}>
                                          Click Here
                                      </Message>
                               );
        expect(messageWrapper.prop('isVisible')).toBe(false);
      });
    });
  });

  describe('verify all property together', () => {
    it('basic message should have rendered 1 div and 1 span element', () => {
      const messageWrapper = mount(
                                    <Message componentId="10101" isVisible={true} theme={theme} >
                                        Click Here
                                    </Message>
                             );
      expect(messageWrapper.find('div')).toHaveLength(1);
      expect(messageWrapper.find('span')).toHaveLength(1);
    });
    it('basic message should have messageBlock css class on div', () => {
      const messageWrapper = mount(
                                    <Message componentId="10101" isVisible={true} theme={theme} >
                                        Click Here
                                    </Message>
                             );
      expect(messageWrapper.find('div').hasClass('messageBlock')).toBe(true);
    });
    it('basic message should have messagePrompt css class on span', () => {
      const messageWrapper = mount(
                                    <Message componentId="10101" isVisible={true} theme={theme} >
                                    Click Here
                                    </Message>
                             );
      expect(messageWrapper.find('span').hasClass('messagePrompt')).toBe(true);
    });
    it('should verify all properties are set', () => {
      const messageWrapper = mount(
                                    <Message componentId = "10101" isVisible={true} theme={theme}>
                                      Click Here
                                    </Message>
                                );
      expect(messageWrapper.prop('componentId')).toBe('10101');
      expect(messageWrapper.prop('isVisible')).toBe(true);
      expect(messageWrapper.prop('children')).toBe('Click Here');
    });
  });
});
