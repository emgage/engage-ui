import * as React from 'react';
import { mount } from 'enzyme';
import Slider from '../Slider';

describe('<Slider />', () => {

  const children = <div><p>This is a slider component</p></div>;

  describe('when default props are provided', () => {
    it('default slider with default props', () => {
      const sliderMenu = mount(<Slider flip overlay componentWidth="large">{children}</Slider>);
      expect(sliderMenu.prop('flip')).toBe(true);
      expect(sliderMenu.prop('overlay')).toBe(true);
    });
  });
});
