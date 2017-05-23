import * as React from 'react';
import {shallow} from 'enzyme';
// import { FlexAlign, FlexDirection, FlexJustify } from '../FlexProps';
import FlexBox from '..';

describe('<FlexBox/>', () => {
    it('div should have default flex inline style', () => {
      const subject = shallow(<FlexBox />);
      expect(subject.find('div').hasClass('d-flex')).toBe(true);
      expect(subject.find('div').hasClass('flex-row')).toBe(true);
      expect(subject.find('div').hasClass('justify-content-start')).toBe(true);
      expect(subject.find('div').hasClass('align-items-stretch')).toBe(true);
    });
 });
