import * as React from 'react';
import {shallow} from 'enzyme';
import { FlexAlign, FlexDirection, FlexJustify } from '../FlexProps';
import FlexBox from '..';

describe('when default props are provided', () => {
    it('div should have default flex inline style', () => {
      const subject = shallow(<FlexBox />);
      expect(subject.find('div').hasClass('d-flex')).toBe(true);
      expect(subject.find('div').hasClass('flex-row')).toBe(true);
      expect(subject.find('div').hasClass('justify-content-start')).toBe(true);
      expect(subject.find('div').hasClass('align-items-stretch')).toBe(true);
    });
});

 describe('inline property', () => {
    describe('when not set', () => {
      it('div should have default flex style', () => {
        const subject = shallow(<FlexBox />);
        expect(subject.find('div').hasClass('d-flex')).toBe(true);
        expect(subject.find('div').hasClass('d-inline-flex')).toBe(false);
      });
    });

    describe('when set to true', () => {
      it('div should have inline flex style', () => {
        const subject = shallow(<FlexBox inline={true} />);
        expect(subject.find('div').hasClass('d-inline-flex')).toBe(true);
        expect(subject.find('div').hasClass('d-flex')).toBe(false);
      });
    });

    describe('when set to false', () => {
      it('div should have default flex style when inline false', () => {
        const subject = shallow(<FlexBox inline={false} />);
        expect(subject.find('div').hasClass('d-flex')).toBe(true);
        expect(subject.find('div').hasClass('d-inline-flex')).toBe(false);
      });
    });
 });

 describe('direction property', () => {
    describe('when not set', () => {
      it('div should have default flex direction row style', () => {
        const subject = shallow(<FlexBox />);
        expect(subject.find('div').hasClass('flex-row')).toBe(true);
      });
    });

    describe('when set to column', () => {
      it('div should have flex direction column style', () => {
        const subject = shallow(<FlexBox direction={FlexDirection.COLUMN} />);
        expect(subject.find('div').hasClass('flex-column')).toBe(true);
        expect(subject.find('div').hasClass('flex-row')).toBe(false);
      });
    });

    describe('when set to column-reverse', () => {
      it('div should have flex direction column reverse style', () => {
        const subject = shallow(<FlexBox direction={FlexDirection.COLUMN_REVERSE} />);
        expect(subject.find('div').hasClass('flex-column-reverse')).toBe(true);
        expect(subject.find('div').hasClass('flex-column')).toBe(false);
      });
    });

    describe('when set to row', () => {
      it('div should have flex direction row style', () => {
        const subject = shallow(<FlexBox direction={FlexDirection.ROW} />);
        expect(subject.find('div').hasClass('flex-row')).toBe(true);
        expect(subject.find('div').hasClass('flex-column-reverse')).toBe(false);
      });
    });

    describe('when set to row-reverse', () => {
      it('div should have flex direction row reverse style', () => {
        const subject = shallow(<FlexBox direction={FlexDirection.ROW_REVERSE} />);
        expect(subject.find('div').hasClass('flex-row-reverse')).toBe(true);
        expect(subject.find('div').hasClass('flex-row')).toBe(false);
      });
    });
});

 describe('justify property', () => {
    describe('when not set', () => {
      it('div should have default flex justify start style', () => {
        const subject = shallow(<FlexBox />);
        expect(subject.find('div').hasClass('justify-content-start')).toBe(true);
      });
    });

    describe('when set to start', () => {
      it('div should have flex justify start style', () => {
        const subject = shallow(<FlexBox justify={FlexJustify.START}/>);
        expect(subject.find('div').hasClass('justify-content-start')).toBe(true);
      });
    });

    describe('when set to center', () => {
      it('div should have flex justify center style', () => {
        const subject = shallow(<FlexBox justify={FlexJustify.CENTER}/>);
        expect(subject.find('div').hasClass('justify-content-center')).toBe(true);
        expect(subject.find('div').hasClass('justify-content-start')).toBe(false);
      });
    });

    describe('when set to end', () => {
      it('div should have flex justify end style', () => {
        const subject = shallow(<FlexBox justify={FlexJustify.END}/>);
        expect(subject.find('div').hasClass('justify-content-end')).toBe(true);
        expect(subject.find('div').hasClass('justify-content-center')).toBe(false);
      });
    });

    describe('when set to space around', () => {
      it('div should have flex justify space around style', () => {
        const subject = shallow(<FlexBox justify={FlexJustify.SPACE_AROUND}/>);
        expect(subject.find('div').hasClass('justify-content-around')).toBe(true);
        expect(subject.find('div').hasClass('justify-content-end')).toBe(false);
      });
    });

    describe('when set to space between', () => {
      it('div should have flex justify space between style', () => {
        const subject = shallow(<FlexBox justify={FlexJustify.SPACE_BETWEEN}/>);
        expect(subject.find('div').hasClass('justify-content-between')).toBe(true);
        expect(subject.find('div').hasClass('justify-content-around')).toBe(false);
      });
    });
});

 describe('align property', () => {
    describe('when not set', () => {
      it('div should have default flex align stretch style', () => {
        const subject = shallow(<FlexBox />);
        expect(subject.find('div').hasClass('align-items-stretch')).toBe(true);
      });
    });

    describe('when set to start', () => {
      it('div should have flex align start style', () => {
        const subject = shallow(<FlexBox align={FlexAlign.START}/>);
        expect(subject.find('div').hasClass('align-items-start')).toBe(true);
        expect(subject.find('div').hasClass('align-items-stretch')).toBe(false);
      });
    });

    describe('when set to center', () => {
      it('div should have flex align center style', () => {
        const subject = shallow(<FlexBox align={FlexAlign.CENTER}/>);
        expect(subject.find('div').hasClass('align-items-center')).toBe(true);
        expect(subject.find('div').hasClass('align-items-start')).toBe(false);
      });
    });

    describe('when set to end', () => {
      it('div should have flex align end style', () => {
        const subject = shallow(<FlexBox align={FlexAlign.END}/>);
        expect(subject.find('div').hasClass('align-items-end')).toBe(true);
        expect(subject.find('div').hasClass('align-items-center')).toBe(false);
      });
    });

    describe('when set to stretch', () => {
      it('div should have flex align stretch style', () => {
        const subject = shallow(<FlexBox align={FlexAlign.STRETCH}/>);
        expect(subject.find('div').hasClass('align-items-stretch')).toBe(true);
        expect(subject.find('div').hasClass('align-items-end')).toBe(false);
      });
    });
});

describe('when direction and alignment are set', () => {
    const subject = shallow(<FlexBox align={FlexAlign.STRETCH} direction={FlexDirection.ROW_REVERSE} />);
    it('div should have default flex inline style', () => {
      expect(subject.find('div').hasClass('d-flex')).toBe(true);
      expect(subject.find('div').hasClass('flex-inline')).toBe(false);
    });
    it('div should have flex direction row-reverse style', () => {
      expect(subject.find('div').hasClass('flex-row-reverse')).toBe(true);
      expect(subject.find('div').hasClass('flex-row')).toBe(false);
    });
    it('div should have flex align end style', () => {
      expect(subject.find('div').hasClass('align-items-end')).toBe(true);
      expect(subject.find('div').hasClass('align-items-stretch')).toBe(false);
    });
    it('div should have default flex justify start style', () => {
      expect(subject.find('div').hasClass('justify-content-start')).toBe(true);
    });
});

describe('when direction, justify and alignment are set', () => {
    const subject = shallow(<FlexBox justify={FlexJustify.SPACE_BETWEEN} align={FlexAlign.START} direction={FlexDirection.ROW_REVERSE} />);
    it('div should have default flex inline style', () => {
      expect(subject.find('div').hasClass('d-flex')).toBe(true);
      expect(subject.find('div').hasClass('flex-inline')).toBe(false);
    });
    it('div should have flex direction column-reverse style', () => {
      expect(subject.find('div').hasClass('flex-column-reverse')).toBe(true);
      expect(subject.find('div').hasClass('flex-row')).toBe(false);
    });
    it('div should have flex justify space-between style', () => {
      expect(subject.find('div').hasClass('justify-content-between')).toBe(true);
      expect(subject.find('div').hasClass('justify-content-start')).toBe(false);
    });
    it('div should have flex align start style', () => {
      expect(subject.find('div').hasClass('align-items-start')).toBe(true);
      expect(subject.find('div').hasClass('align-items-stretch')).toBe(false);
    });
  });

