import * as React from 'react';
import { mount } from 'enzyme';
import Accordion, { AccordionItemProps } from './../Accordion';
import AccordionItem from './../AccordionItem';

describe('<Accordion />', () => {
  const items : AccordionItemProps[] = [{
    children: <h4>this is the item 1 desc</h4>,
    header: <h2>item 1</h2>
  },{
    children: <h4>this is the item 2 desc</h4>,
    header: <h2>item 2</h2>
  },{
    children: <h4>this is the item 3 desc</h4>,
    header: <h2>item 3</h2>
  }];

  it('Render Properly', () => {
    const accordionWrapper = mount(<Accordion items={items}/>);
    expect(accordionWrapper.find('div')).toHaveLength(10);
    expect(accordionWrapper.find('h4')).toHaveLength(3);
    expect(accordionWrapper.find('h2')).toHaveLength(3);
    expect(accordionWrapper.find('div').at(1).hasClass('accordionItem')).toBeTruthy();
    expect(accordionWrapper.find('div').at(2).hasClass('headerCollapsed')).toBeTruthy();
    expect(accordionWrapper.find('div').at(3).hasClass('bodyCollapsed')).toBeTruthy();
    expect(accordionWrapper.find('div').at(4).hasClass('accordionItem')).toBeTruthy();
    expect(accordionWrapper.find('div').at(5).hasClass('headerCollapsed')).toBeTruthy();
    expect(accordionWrapper.find('div').at(6).hasClass('bodyCollapsed')).toBeTruthy();
    expect(accordionWrapper.find('div').at(7).hasClass('accordionItem')).toBeTruthy();
    expect(accordionWrapper.find('div').at(8).hasClass('headerCollapsed')).toBeTruthy();
    expect(accordionWrapper.find('div').at(9).hasClass('bodyCollapsed')).toBeTruthy();
    expect(accordionWrapper.prop('mode')).toBeUndefined();
  });

  it('When openIndex is provided', () => {
    const accordionWrapper = mount(<Accordion items={items} openIndex={1} mode="multiple" />);
    expect(accordionWrapper.find('div')).toHaveLength(10);
    expect(accordionWrapper.find('h4')).toHaveLength(3);
    expect(accordionWrapper.find('h2')).toHaveLength(3);
    expect(accordionWrapper.find('div').at(1).hasClass('accordionItem')).toBeTruthy();
    expect(accordionWrapper.find('div').at(2).hasClass('headerCollapsed')).toBeTruthy();
    expect(accordionWrapper.find('div').at(3).hasClass('bodyCollapsed')).toBeTruthy();
    expect(accordionWrapper.find('div').at(4).hasClass('accordionItem')).toBeTruthy();
    expect(accordionWrapper.find('div').at(5).hasClass('header')).toBeTruthy();
    expect(accordionWrapper.find('div').at(6).hasClass('body')).toBeTruthy();
    expect(accordionWrapper.find('div').at(7).hasClass('accordionItem')).toBeTruthy();
    expect(accordionWrapper.find('div').at(8).hasClass('headerCollapsed')).toBeTruthy();
    expect(accordionWrapper.find('div').at(9).hasClass('bodyCollapsed')).toBeTruthy();
    expect(accordionWrapper.prop('mode')).toBe('multiple');
  });

  it('Call toggle on click header', () => {
    const spy = jest.fn();
    const accordionItemWrapper = mount(<AccordionItem index={1} header={<h2>item 1</h2>} children={<h4>this is the item 1 desc</h4>} toggle={spy} />);
    accordionItemWrapper.find('div').at(1).simulate('click');
    expect(accordionItemWrapper.find('div')).toHaveLength(3);
    expect(accordionItemWrapper.find('h4')).toHaveLength(1);
    expect(accordionItemWrapper.find('h2')).toHaveLength(1);
    expect(spy).toHaveBeenCalled();
  });
});
