import * as React from 'react';
import { mount } from 'enzyme';
import Badge from '../../Badge/Badge';
import Button from '../../Button/Button';
import Tab from '../Tab';
import TabPanel from '../TabPanel';

const theme = {
  tab: 'tab',
  active: 'active',
  tabpanel: 'tabpanel',
  top: 'top',
  bottom: 'bottom',
  left: 'left',
  right: 'right',
  tabstrip: 'tabstrip',
  start: 'start',
  center: 'center',
  end: 'end',
  cardct: 'cardct',
  card: 'card'
};

describe('<Tab />', () => {
  describe('when default props are provided', () => {
    it('should have default tab elements', () => {
      const subject = mount(
        <TabPanel position={'top'} alignment={'center'} defaultTabId={'tab1'} theme={theme} >
          <Tab tabDescription={<Badge children={'Home'} status={'success'} />} tabId={'tab1'}>
            <p>content 0</p>
          </Tab>
          <Tab tabDescription="User" tabId={'tab2'}>
            <div>
              <p>content 1</p>
            </div>
          </Tab>
        </TabPanel>);
      expect(subject.find('div').exists()).toBeTruthy();
      expect(subject.find('li').length).toBe(2);
      expect(subject.find('badge').length).toBe(1);
    });

    it('should have tab with active tab panel', () => {
      const subject = mount(
        <TabPanel position={'top'} alignment={'center'} defaultTabId={'tab1'} theme={theme} >
          <Tab tabDescription={<Badge children={'Home'} status={'success'} />} tabId={'tab1'}>
            <p>content 0</p>
          </Tab>
          <Tab tabDescription="User" tabId={'tab2'}>
            <div>
              <p>content 1</p>
            </div>
          </Tab>
        </TabPanel>);
      expect(subject.find('div').exists()).toBeTruthy();
      expect(subject.find('div').at(0).hasClass('tabpanel')).toBe(true);
      expect(subject.find('div').at(1).hasClass('cardct')).toBe(true);
      expect(subject.find('div').at(1).children).toHaveLength(1);
    });

    it('should have 2 tabs with tabpanel', () => {
      const subject = mount(
        <TabPanel position={'top'} alignment={'center'} defaultTabId={'tab1'} theme={theme} >
          <Tab tabDescription={<Badge children={'Home'} status={'success'} />} tabId={'tab1'}>
            <p>content 0</p>
          </Tab>
          <Tab tabDescription="User" tabId={'tab2'}>
            <div>
              <p>content 1</p>
            </div>
          </Tab>
        </TabPanel>);
      expect(subject.find('div').exists()).toBeTruthy();
      expect(subject.find('div').at(0).hasClass('tabpanel')).toBe(true);
      expect(subject.find('ul').at(0).hasClass('tabstrip')).toBe(true);
      expect(subject.find('li').at(0).children).toHaveLength(1);
      expect(subject.find('li').at(1).children).toHaveLength(1);
    });
  });

  describe('when position props are provided', () => {
    it('should have value top as position prop', () => {
      const subject = mount(
        <TabPanel position={'top'} alignment={'center'} defaultTabId={'tab1'} theme={theme} >
          <Tab tabDescription={<Badge children={'Home'} status={'success'} />} tabId={'tab1'}>
            <p>content 0</p>
          </Tab>
          <Tab tabDescription="User" tabId={'tab2'}>
            <div>
              <p>content 1</p>
            </div>
          </Tab>
        </TabPanel>);
      expect(subject.find('div').exists()).toBeTruthy();
      expect(subject.find('div').at(0).hasClass('top')).toBe(true);
    });

    it('should have value bottom as position prop', () => {
      const subject = mount(
        <TabPanel position={'bottom'} alignment={'center'} defaultTabId={'tab1'} theme={theme} >
          <Tab tabDescription={<Badge children={'Home'} status={'success'} />} tabId={'tab1'}>
            <p>content 0</p>
          </Tab>
          <Tab tabDescription="User" tabId={'tab2'}>
            <div>
              <p>content 1</p>
            </div>
          </Tab>
        </TabPanel>);
      expect(subject.find('div').exists()).toBeTruthy();
      expect(subject.find('div').at(0).hasClass('bottom')).toBe(true);
    });

    it('should have value left as position prop', () => {
      const subject = mount(
        <TabPanel position={'left'} alignment={'center'} defaultTabId={'tab1'} theme={theme} >
          <Tab tabDescription={<Badge children={'Home'} status={'success'} />} tabId={'tab1'}>
            <p>content 0</p>
          </Tab>
          <Tab tabDescription="User" tabId={'tab2'}>
            <div>
              <p>content 1</p>
            </div>
          </Tab>
        </TabPanel>);
      expect(subject.find('div').exists()).toBeTruthy();
      expect(subject.find('div').at(0).hasClass('left')).toBe(true);
    });

    it('should have value right as position prop', () => {
      const subject = mount(
        <TabPanel position={'right'} alignment={'center'} defaultTabId={'tab1'} theme={theme} >
          <Tab tabDescription={<Badge children={'Home'} status={'success'} />} tabId={'tab1'}>
            <p>content 0</p>
          </Tab>
          <Tab tabDescription="User" tabId={'tab2'}>
            <div>
              <p>content 1</p>
            </div>
          </Tab>
        </TabPanel>);
      expect(subject.find('div').exists()).toBeTruthy();
      expect(subject.find('div').at(0).hasClass('right')).toBe(true);
    });
  });

  describe('when alignment props are provided', () => {
    it('should have value right as alignment prop', () => {
      const subject = mount(
        <TabPanel position={'top'} alignment={'right'} defaultTabId={'tab1'} theme={theme} >
          <Tab tabDescription={<Badge children={'Home'} status={'success'} />} tabId={'tab1'}>
            <p>content 0</p>
          </Tab>
          <Tab tabDescription="User" tabId={'tab2'}>
            <div>
              <p>content 1</p>
            </div>
          </Tab>
        </TabPanel>);
      expect(subject.find('div').exists()).toBeTruthy();
      expect(subject.find('ul').hasClass('end')).toBe(true);
    });

    it('should have value center as alignment prop', () => {
      const subject = mount(
        <TabPanel position={'top'} alignment={'center'} defaultTabId={'tab1'} theme={theme} >
          <Tab tabDescription={<Badge children={'Home'} status={'success'} />} tabId={'tab1'}>
            <p>content 0</p>
          </Tab>
          <Tab tabDescription="User" tabId={'tab2'}>
            <div>
              <p>content 1</p>
            </div>
          </Tab>
        </TabPanel>);
      expect(subject.find('div').exists()).toBeTruthy();
      expect(subject.find('ul').hasClass('center')).toBe(true);
    });

    it('should have value left as alignment prop', () => {
      const subject = mount(
        <TabPanel position={'top'} alignment={'left'} defaultTabId={'tab1'} theme={theme} >
          <Tab tabDescription={<Badge children={'Home'} status={'success'} />} tabId={'tab1'}>
            <p>content 0</p>
          </Tab>
          <Tab tabDescription="User" tabId={'tab2'}>
            <div>
              <p>content 1</p>
            </div>
          </Tab>
        </TabPanel>);
      expect(subject.find('div').exists()).toBeTruthy();
      expect(subject.find('ul').hasClass('start')).toBe(true);
    });
  });

  describe('when defaulttabId prop is provided', () => {
    it('should have value of first tab as alignment prop', () => {
      const subject = mount(
        <TabPanel position={'top'} alignment={'right'} defaultTabId={'tab1'} theme={theme} >
          <Tab tabDescription={<Badge children={'Home'} status={'success'} />} tabId={'tab1'}>
            <p>content 0</p>
          </Tab>
          <Tab tabDescription="User" tabId={'tab2'}>
            <div>
              <p>content 1</p>
            </div>
          </Tab>
        </TabPanel>);
      expect(subject.find('div').exists()).toBeTruthy();
      expect(subject.find('li').length).toBe(2);
      expect(subject.find('li').at(0).children).toHaveLength(1);
      expect(subject.find('p').text()).toBe('content 0');
    });
  });

  describe('when defaulttabId prop is not provided', () => {
    it('should have value of first tab as alignment prop', () => {
      const subject = mount(
        <TabPanel position={'top'} alignment={'right'} defaultTabId={'tab1'} theme={theme} >
          <Tab tabDescription={<Badge children={'Home'} status={'success'} />} tabId={'tab1'}>
            <p>content 0</p>
          </Tab>
          <Tab tabDescription="User" tabId={'tab2'}>
            <div>
              <p>content 1</p>
            </div>
          </Tab>
        </TabPanel>);
      expect(subject.find('div').exists()).toBeTruthy();
      expect(subject.find('li').length).toBe(2);
      expect(subject.find('li').at(0).children).toHaveLength(1);
      expect(subject.find('p').length).toBe(1);
    });
  });
});
