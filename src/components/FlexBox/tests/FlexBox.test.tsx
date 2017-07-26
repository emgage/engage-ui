import * as React from 'react';
import { mount } from 'enzyme';
import { FlexAlign, FlexDirection, FlexJustify } from '../FlexProps';
import FlexBox from '../FlexBox';

const theme = {
  flex: 'flex',
  inline: 'inline',
  column: 'column',
  rowReverse: 'rowReverse',
  columnReverse: 'columnReverse',
  row: 'row',
  contentEnd: 'contentEnd',
  contentCenter: 'contentCenter',
  contentAround: 'contentAround',
  contentBetween: 'contentBetween',
  contentStart: 'contentStart',
  alignStart: 'alignStart',
  alignEnd: 'alignEnd',
  alignCenter: 'alignCenter',
  alignStretch: 'alignStretch',
};

describe('when default props are provided', () => {
  it('div should have default flex inline style', () => {
    const subject = mount(<FlexBox theme={theme} />);

    console.log(subject.html());

    expect(subject.find('div').hasClass('flex')).toBe(true);
    expect(subject.find('div').hasClass('row')).toBe(true);
    expect(subject.find('div').hasClass('contentStart')).toBe(true);
    expect(subject.find('div').hasClass('alignStretch')).toBe(true);
  });
});

describe('inline property', () => {
  describe('when not set', () => {
    it('div should have default flex style', () => {
      const subject = mount(<FlexBox theme={theme} />);
      expect(subject.find('div').hasClass('flex')).toBe(true);
      expect(subject.find('div').hasClass('inline')).toBe(false);
    });
  });

  describe('when set to true', () => {
    it('div should have inline flex style', () => {
      const subject = mount(<FlexBox inline={true} theme={theme} />);
      expect(subject.find('div').hasClass('inline')).toBe(true);
      expect(subject.find('div').hasClass('flex')).toBe(false);
    });
  });

  describe('when set to false', () => {
    it('div should have default flex style when inline false', () => {
      const subject = mount(<FlexBox inline={false} theme={theme} />);
      expect(subject.find('div').hasClass('flex')).toBe(true);
      expect(subject.find('div').hasClass('inline')).toBe(false);
    });
  });
});

describe('direction property', () => {
  describe('when not set', () => {
    it('div should have default flex direction row style', () => {
      const subject = mount(<FlexBox theme={theme}/>);
      expect(subject.find('div').hasClass('row')).toBe(true);
    });
  });

  describe('when set to column', () => {
    it('div should have flex direction column style', () => {
      const subject = mount(<FlexBox direction={FlexDirection.Column} theme={theme}/>);
      expect(subject.find('div').hasClass('column')).toBe(true);
      expect(subject.find('div').hasClass('row')).toBe(false);
    });
  });

  describe('when set to column-reverse', () => {
    it('div should have flex direction column reverse style', () => {
      const subject = mount(<FlexBox direction={FlexDirection.ColumnReverse} theme={theme}/>);
      expect(subject.find('div').hasClass('columnReverse')).toBe(true);
      expect(subject.find('div').hasClass('column')).toBe(false);
    });
  });

  describe('when set to row', () => {
    it('div should have flex direction row style', () => {
      const subject = mount(<FlexBox direction={FlexDirection.Row} theme={theme} />);
      expect(subject.find('div').hasClass('row')).toBe(true);
      expect(subject.find('div').hasClass('columnReverse')).toBe(false);
    });
  });

  describe('when set to row-reverse', () => {
    it('div should have flex direction row reverse style', () => {
      const subject = mount(<FlexBox direction={FlexDirection.RowReverse} theme={theme} />);
      expect(subject.find('div').hasClass('rowReverse')).toBe(true);
      expect(subject.find('div').hasClass('row')).toBe(false);
    });
  });
});

describe('justify property', () => {
  describe('when not set', () => {
    it('div should have default flex justify start style', () => {
      const subject = mount(<FlexBox theme={theme}/>);
      expect(subject.find('div').hasClass('contentStart')).toBe(true);
    });
  });

  describe('when set to start', () => {
    it('div should have flex justify start style', () => {
      const subject = mount(<FlexBox justify={FlexJustify.Start} theme={theme}/>);
      expect(subject.find('div').hasClass('contentStart')).toBe(true);
    });
  });

  describe('when set to center', () => {
    it('div should have flex justify center style', () => {
      const subject = mount(<FlexBox justify={FlexJustify.Center} theme={theme}/>);
      expect(subject.find('div').hasClass('contentCenter')).toBe(true);
      expect(subject.find('div').hasClass('contentStart')).toBe(false);
    });
  });

  describe('when set to end', () => {
    it('div should have flex justify end style', () => {
      const subject = mount(<FlexBox justify={FlexJustify.End} theme={theme}/>);
      expect(subject.find('div').hasClass('contentEnd')).toBe(true);
      expect(subject.find('div').hasClass('contentCenter')).toBe(false);
    });
  });

  describe('when set to space around', () => {
    it('div should have flex justify space around style', () => {
      const subject = mount(<FlexBox justify={FlexJustify.SpaceAround} theme={theme}/>);
      expect(subject.find('div').hasClass('contentAround')).toBe(true);
      expect(subject.find('div').hasClass('contentEnd')).toBe(false);
    });
  });

  describe('when set to space between', () => {
    it('div should have flex justify space between style', () => {
      const subject = mount(<FlexBox justify={FlexJustify.SpaceBetween} theme={theme}/>);
      expect(subject.find('div').hasClass('contentBetween')).toBe(true);
      expect(subject.find('div').hasClass('contentAround')).toBe(false);
    });
  });
});

describe('align property', () => {
  describe('when not set', () => {
    it('div should have default flex align stretch style', () => {
      const subject = mount(<FlexBox theme={theme}/>);
      expect(subject.find('div').hasClass('alignStretch')).toBe(true);
    });
  });

  describe('when set to start', () => {
    it('div should have flex align start style', () => {
      const subject = mount(<FlexBox align={FlexAlign.Start} theme={theme}/>);
      expect(subject.find('div').hasClass('alignStart')).toBe(true);
      expect(subject.find('div').hasClass('alignStretch')).toBe(false);
    });
  });

  describe('when set to center', () => {
    it('div should have flex align center style', () => {
      const subject = mount(<FlexBox align={FlexAlign.Center} theme={theme}/>);
      expect(subject.find('div').hasClass('alignCenter')).toBe(true);
      expect(subject.find('div').hasClass('alignStart')).toBe(false);
    });
  });

  describe('when set to end', () => {
    it('div should have flex align end style', () => {
      const subject = mount(<FlexBox align={FlexAlign.End} theme={theme}/>);
      expect(subject.find('div').hasClass('alignEnd')).toBe(true);
      expect(subject.find('div').hasClass('alignCenter')).toBe(false);
    });
  });

  describe('when set to stretch', () => {
    it('div should have flex align stretch style', () => {
      const subject = mount(<FlexBox align={FlexAlign.Stretch} theme={theme}/>);
      expect(subject.find('div').hasClass('alignStretch')).toBe(true);
      expect(subject.find('div').hasClass('alignEnd')).toBe(false);
    });
  });
});

describe('when direction and alignment are set', () => {
  const subject = mount(<FlexBox align={FlexAlign.Stretch} direction={FlexDirection.RowReverse} theme={theme}/>);
  it('div should have default flex inline style', () => {
    expect(subject.find('div').hasClass('flex')).toBe(true);
    expect(subject.find('div').hasClass('inline')).toBe(false);
  });
  it('div should have flex direction row-reverse style', () => {
    expect(subject.find('div').hasClass('rowReverse')).toBe(true);
    expect(subject.find('div').hasClass('row')).toBe(false);
  });
  it('div should have flex align end style', () => {
    expect(subject.find('div').hasClass('alignEnd')).toBe(false);
    expect(subject.find('div').hasClass('alignStretch')).toBe(true);
  });
  it('div should have default flex justify start style', () => {
    expect(subject.find('div').hasClass('contentStart')).toBe(true);
  });
});

describe('when direction, justify and alignment are set', () => {
  const subject = mount(<FlexBox justify={FlexJustify.SpaceBetween} align={FlexAlign.Start} direction={FlexDirection.RowReverse} theme={theme}/>);
  it('div should have default flex inline style', () => {
    expect(subject.find('div').hasClass('flex')).toBe(true);
    expect(subject.find('div').hasClass('inline')).toBe(false);
  });
  it('div should have flex direction column-reverse style', () => {
    expect(subject.find('div').hasClass('rowReverse')).toBe(true);
    expect(subject.find('div').hasClass('row')).toBe(false);
  });
  it('div should have flex justify space-between style', () => {
    expect(subject.find('div').hasClass('contentBetween')).toBe(true);
    expect(subject.find('div').hasClass('contentStart')).toBe(false);
  });
  it('div should have flex align start style', () => {
    expect(subject.find('div').hasClass('alignStart')).toBe(true);
    expect(subject.find('div').hasClass('alignStretch')).toBe(false);
  });
});
  
