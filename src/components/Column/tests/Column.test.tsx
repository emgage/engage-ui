import * as React from 'react';
import { mount } from 'enzyme';
import Column from '../Column';

const theme = {
  'column-width-small-1-1': 'column-width-small-1-1',
  'column-width-medium-1-1': 'column-width-medium-1-1',
  'column-width-large-1-1': 'column-width-large-1-1',
  'column-width-xlarge-1-1': 'column-width-xlarge-1-1',
  'column-width-small-2-3': 'column-width-small-2-3',
  'column-width-medium-2-3': 'column-width-medium-2-3',
  'column-width-large-2-3': 'column-width-large-2-3',
  'column-width-xlarge-2-3': 'column-width-xlarge-2-3',
};

describe('when default props are provided', () => {
  it('div should have default column style', () => {
    const subject = mount(<Column theme={theme} />);
    expect(subject.find('div')).toHaveLength(1);
  });
});

describe('small property', () => {
  describe('when not set', () => {
    it('div should have default column style', () => {
      const subject = mount(<Column theme={theme} />);
      expect(subject.find('div')).toHaveLength(1);
    });
  });

  describe('when set', () => {
    it('div should have column small style', () => {
      const subject = mount(<Column small="1-1" theme={theme} />);
      expect(subject.find('div')).toHaveLength(1);
      expect(subject.find('div').hasClass('column-width-small-1-1')).toBe(true);
    });
  });
});

describe('medium property', () => {
  describe('when not set', () => {
    it('div should have default column style', () => {
      const subject = mount(<Column theme={theme} />);
      expect(subject.find('div')).toHaveLength(1);
    });
  });

  describe('when set', () => {
    it('div should have column medium style', () => {
      const subject = mount(<Column medium="1-1" theme={theme} />);
      expect(subject.find('div')).toHaveLength(1);
      expect(subject.find('div').hasClass('column-width-medium-1-1')).toBe(true);
    });
  });
});

describe('large property', () => {
  describe('when not set', () => {
    it('div should have default column style', () => {
      const subject = mount(<Column theme={theme} />);
      expect(subject.find('div')).toHaveLength(1);
    });
  });

  describe('when set', () => {
    it('div should have column large style', () => {
      const subject = mount(<Column large="1-1" theme={theme} />);
      expect(subject.find('div')).toHaveLength(1);
      expect(subject.find('div').hasClass('column-width-large-1-1')).toBe(true);
    });
  });
});

describe('extraLarge property', () => {
  describe('when not set', () => {
    it('div should have default column style', () => {
      const subject = mount(<Column theme={theme} />);
      expect(subject.find('div')).toHaveLength(1);
    });
  });

  describe('when set', () => {
    it('div should have column extraLarge style', () => {
      const subject = mount(<Column extraLarge="1-1" theme={theme} />);
      expect(subject.find('div')).toHaveLength(1);
      expect(subject.find('div').hasClass('column-width-xlarge-1-1')).toBe(true);
    });
  });
});

describe('when all props are provided', () => {
  it('div should have all column style', () => {
    const subject = mount(<Column small="2-3" medium="2-3" large="2-3" extraLarge="2-3" theme={theme} />);
    expect(subject.find('div')).toHaveLength(1);
    expect(subject.find('div').hasClass('column-width-small-2-3')).toBe(true);
    expect(subject.find('div').hasClass('column-width-medium-2-3')).toBe(true);
    expect(subject.find('div').hasClass('column-width-large-2-3')).toBe(true);
    expect(subject.find('div').hasClass('column-width-xlarge-2-3')).toBe(true);
  });
});
