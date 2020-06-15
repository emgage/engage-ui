import * as React from 'react';
import { mount } from 'enzyme';
import Scrollable from '../Scrollable';

const theme = {
  scrollable: 'Scrollable',
  horizontal: 'horizontal',
  shadow: 'shadow',
  vertical: 'vertical',
};

describe('<Scrollable />', () => {
  describe('when default props are provided', () => {
    it('should have rendered 1 div elements', () => {
      const subject = mount(<Scrollable theme={theme} vertical={false} horizontal={false} shadow={false} />);
      expect(subject.find('div')).toHaveLength(1);
    });
    it('should have default scrollable css class on div', () => {
      const subject = mount(<Scrollable theme={theme} vertical={false} horizontal={false} shadow={false} />);
      expect(subject.find('div').at(0).hasClass('Scrollable')).toBe(true);
    });
  });

  describe(' property', () => {
    describe('when not set', () => {
      it('should have rendered 1 div elements', () => {
        const subject = mount(<Scrollable theme={theme} vertical={false} horizontal={false} shadow={false} />);
        expect(subject.find('div')).toHaveLength(1);
      });
      it('should have default scrollable css class on div', () => {
        const subject = mount(<Scrollable theme={theme} vertical={false} horizontal={false} shadow={false} />);
        expect(subject.find('div').at(0).hasClass('Scrollable')).toBe(true);
      });
    });

    describe('when set to vertical', () => {
      it('should have rendered 1 div element', () => {
        const subject = mount(<Scrollable vertical theme={theme} horizontal={false} shadow={false} />);
        expect(subject.find('div')).toHaveLength(1);
      });
      it('should have default scrollable css class on div', () => {
        const subject = mount(<Scrollable vertical theme={theme} horizontal={false} shadow={false} />);
        expect(subject.find('div').at(0).hasClass('vertical')).toBe(true);
      });
      it('should verify set the vertical is true', () => {
        const scrollableWrapper = mount(<Scrollable vertical={true} theme={theme} horizontal={false} shadow={false} />);
        expect(scrollableWrapper.prop('vertical')).toBe(true);
      });
    });

    describe('when set to false for vertical', () => {
      it('should have rendered 1 div elements', () => {
        const subject = mount(<Scrollable vertical={false} theme={theme} horizontal={false} shadow={false} />);
        expect(subject.find('div')).toHaveLength(1);
      });
      it('should have default Scrollable css class on div', () => {
        const subject = mount(<Scrollable vertical={false} theme={theme} horizontal={false} shadow={false} />);
        expect(subject.find('div').at(0).hasClass('vertical')).toBe(false);
      });
      it('should verify set the vertical is false', () => {
        const scrollableWrapper = mount(<Scrollable vertical={false} horizontal={false} shadow={false} />);
        expect(scrollableWrapper.prop('vertical')).toBe(false);
      });
    });

    describe('horizontal property', () => {
      describe('when not set', () => {
        it('should have rendered 1 div elements', () => {
          const subject = mount(<Scrollable theme={theme} vertical={false} horizontal={false} shadow={false} />);
          expect(subject.find('div')).toHaveLength(1);
        });
        it('should have default scrollable css class on div', () => {
          const subject = mount(<Scrollable theme={theme} vertical={false} horizontal={false} shadow={false} />);
          expect(subject.find('div').at(0).hasClass('Scrollable')).toBe(true);
        });
      });

      describe('when set to horizontal', () => {
        it('should have rendered 1 div element', () => {
          const subject = mount(<Scrollable horizontal theme={theme} vertical={false} shadow={false} />);
          expect(subject.find('div')).toHaveLength(1);
        });
        it('should have default scrollable css class on div', () => {
          const subject = mount(<Scrollable horizontal theme={theme} vertical={false} shadow={false} />);
          expect(subject.find('div').at(0).hasClass('horizontal')).toBe(true);
        });
        it('should verify set the horizontal is true', () => {
          const scrollableWrapper = mount(<Scrollable horizontal theme={theme} vertical={false} shadow={false} />);
          expect(scrollableWrapper.prop('horizontal')).toBe(true);
        });
      });

      describe('when set to false for horizontal', () => {
        it('should have rendered 1 div elements', () => {
          const subject = mount(<Scrollable horizontal={false} theme={theme} vertical={false} shadow={false} />);
          expect(subject.find('div')).toHaveLength(1);
        });
        it('should have default Scrollable css class on div', () => {
          const subject = mount(<Scrollable horizontal={false} theme={theme} vertical={false} shadow={false} />);
          expect(subject.find('div').at(0).hasClass('horizontal')).toBe(false);
        });
        it('should verify set the horizontal is false', () => {
          const scrollableWrapper = mount(<Scrollable horizontal={false} vertical={false} shadow={false} />);
          expect(scrollableWrapper.prop('horizontal')).toBe(false);
        });
      });
    });

    describe('shadow property', () => {
      describe('when not set', () => {
        it('should have rendered 1 div elements', () => {
          const subject = mount(<Scrollable theme={theme} vertical={false} horizontal={false} shadow={false} />);
          expect(subject.find('div')).toHaveLength(1);
        });
        it('should have default scrollable css class on div', () => {
          const subject = mount(<Scrollable theme={theme} vertical={false} horizontal={false} shadow={false} />);
          expect(subject.find('div').at(0).hasClass('Scrollable')).toBe(true);
        });
      });

      describe('when set to shadow', () => {
        it('should have rendered 1 div element', () => {
          const subject = mount(<Scrollable shadow theme={theme} vertical={false} horizontal={false} />);
          expect(subject.find('div')).toHaveLength(1);
        });
        it('should have default scrollable css class on div', () => {
          const subject = mount(<Scrollable shadow theme={theme} vertical={false} horizontal={false} />);
          expect(subject.find('div').at(0).hasClass('Scrollable')).toBe(true);
        });
        it('should verify set the shadow is true', () => {
          const scrollableWrapper = mount(<Scrollable shadow theme={theme} vertical={false} horizontal={false} />);
          expect(scrollableWrapper.prop('shadow')).toBe(true);
        });
      });

      describe('when set to false for shadow', () => {
        it('should have rendered 1 div elements', () => {
          const subject = mount(<Scrollable shadow={false} theme={theme} vertical={false} horizontal={false} />);
          expect(subject.find('div')).toHaveLength(1);
        });
        it('should have default Scrollable css class on div', () => {
          const subject = mount(<Scrollable shadow={false} theme={theme} vertical={false} horizontal={false} />);
          expect(subject.find('div').at(0).hasClass('shadow')).toBe(false);
        });
        it('should verify set the shadow is false', () => {
          const scrollableWrapper = mount(<Scrollable shadow={false} vertical={false} horizontal={false} />);
          expect(scrollableWrapper.prop('shadow')).toBe(false);
        });
      });
    });
  });

  describe('set children property', () => {
    it('should verify children is defined as paragraph', () => {
      const scrollableWrapper = mount(
                                  <Scrollable vertical={false} horizontal={false} shadow={false}>
                                    <p>
                                      By signing up for the Shopify service (“Service”)
                                    </p>
                                  </Scrollable>
                                );

      expect(scrollableWrapper.children().prop('children').props.children).toBe('By signing up for the Shopify service (“Service”)');
    });
  });
});
