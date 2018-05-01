import * as React from 'react';
import { mount } from 'enzyme';
import DescriptionList from '../DescriptionList';

describe('<DescriptionList />', () => {
    let items: ({ term: string, description: string })[];

  beforeEach(() => {
    items = [
      { term: 'First term', description: 'One description.' },
      { term: 'Second term', description: 'Second description.' },
      { term: 'Third term', description: 'Third description.' },
    ];
  });
  it('sets the description list style to inline when type is default and style is inline', () => {
    const descriptionList = mount(<DescriptionList type="default" style="Inline" items={items} />);
    expect(descriptionList.find('dl').hasClass('')).toEqual(true);
  });

  it('sets the description list style to stacked when type is default and style is stacked', () => {
    const descriptionList = mount(<DescriptionList type="default" style="Stacked" items={items} />);
    expect(descriptionList.find('dl').hasClass('naked')).toEqual(true);
  });

  it('sets the description list type to divider when type is divider and style is stacked', () => {
    const descriptionList = mount(<DescriptionList type="divider" style="Stacked" items={items} />);
    expect(descriptionList.find('dl').hasClass('description-list-divider')).toEqual(true);
  });
});
