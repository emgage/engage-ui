import * as React from 'react';
import { mount } from 'enzyme';
import Badge from '../../Badge/Badge';
import { BreadCrumb } from '../';

export type Type = 'default' | 'disabled' | 'active';

export interface ISourceData {
  name: React.ReactNode;
  style?: React.CSSProperties;
  type: Type;
  onBreadcrumbClick?(): void;
}

const theme = {
  breadcrumb: 'breadcrumb',
  left: 'left',
  right: 'right',
  breadcrumbPrimary: 'breadcrumbPrimary',
  yellow: 'yellow',
  green: 'green',
  blue: 'blue',
};

const breadcrumbData: ISourceData[] = [
  {
    name: 'Home',
    type: 'default',
    onBreadcrumbClick: () => {
      console.log('Home is clicked');
    }
  }, {
    name: <Badge children={'Home1'} status={'success'} />,
    type: 'active',
    onBreadcrumbClick: () => {
      console.log('Badge is clicked');
    }
  }, {
    name: 'Home2',
    type: 'disabled'
  }, {
    name: 'Home3',
    type: 'active',
    onBreadcrumbClick: () => {
      console.log('Home3 is clicked');
    }
  },
];
describe('<Breadcrumb />', () => {
  describe('when default props are provided', () => {
    it('should have default breadcrumb elements', () => {
      const subject = mount(
        <BreadCrumb
          theme={theme}
          direction={'left'}
          source={breadcrumbData}
          displayStyle={'blue'}
        />);
      expect(subject.find('ul').exists()).toBeTruthy();
      expect(subject.find('li').exists()).toBeTruthy();
      expect(subject.find('li').length).toBe(4);
      expect(subject.find('badge').length).toBe(1);
    });
  });

  describe('when direction prop is provided', () => {
    it('ul should have left class as direction', () => {
      const subject = mount(
        <BreadCrumb
          theme={theme}
          direction={'left'}
          source={breadcrumbData}
          displayStyle={'blue'}
        />);
      expect(subject.find('ul').exists()).toBeTruthy();
      expect(subject.find('li').exists()).toBeTruthy();
      expect(subject.find('li').length).toBe(4);
      expect(subject.find('ul').hasClass('breadcrumb')).toBe(true);
      expect(subject.find('ul').hasClass('left')).toBe(true);
      expect(subject.find('li').at(3).hasClass('left')).toBe(true);
      expect(subject.find('badge').length).toBe(1);
    });
  });

  describe('when displayStyle prop is provided', () => {
    it('ul should have blue color theme as displayStyle', () => {
      const subject = mount(
        <BreadCrumb
          theme={theme}
          direction={'left'}
          source={breadcrumbData}
          displayStyle={'blue'}
        />);
      expect(subject.find('ul').exists()).toBeTruthy();
      expect(subject.find('li').exists()).toBeTruthy();
      expect(subject.find('li').length).toBe(4);
      expect(subject.find('ul').hasClass('blue')).toBe(true);
      expect(subject.find('badge').length).toBe(1);
    });
  });

  describe('when displayStyle prop is provided', () => {
    it('ul should have basic/primary theme provided for Breadcrumb component', () => {
      const subject = mount(
        <BreadCrumb
          theme={theme}
          direction={'left'}
          source={breadcrumbData}
          displayStyle={'primary'}
        />);
      expect(subject.find('ul').exists()).toBeTruthy();
      expect(subject.find('li').exists()).toBeTruthy();
      expect(subject.find('li').length).toBe(4);
      expect(subject.find('ul').hasClass('breadcrumbPrimary')).toBe(true);
      expect(subject.find('badge').length).toBe(1);
    });
  });
});
