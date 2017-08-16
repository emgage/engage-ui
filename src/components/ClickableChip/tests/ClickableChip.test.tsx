import * as React from 'react';
import { mount } from 'enzyme';
import Chip from '../../Chip';
import ClickableChip from '../ClickableChip';

const theme = {
  chip: 'chip',
};

describe('<ClickableChip />', () => {

  describe('when default props are provided', () => {
    it('basic clickablechip should be rendered with default props', () => {
      const clickablechipWrapper = mount(
                                        <ClickableChip chip={<Chip>Batman</Chip>} theme={theme} />,
                                    );
      expect(clickablechipWrapper.find('div')).toHaveLength(1);
      expect(clickablechipWrapper.find('span')).toHaveLength(2);
      expect(clickablechipWrapper.find('span').at(0).hasClass(''));
      expect(clickablechipWrapper.find('span').at(1).hasClass('Batman'));
      expect(clickablechipWrapper.find('a')).toHaveLength(1);
      //expect(clickablechipWrapper.prop('children'));
    });
  });

  describe('chip property', () => {
    describe('when set', () => {
      it('should verify clickablechip when chip is set', () => {
        const clickablechipWrapper = mount(
                                        <ClickableChip chip={<Chip>Batman</Chip>} theme={theme} />,
                                    );
        expect(clickablechipWrapper.find('div')).toHaveLength(1);
        expect(clickablechipWrapper.find('span')).toHaveLength(2);
        expect(clickablechipWrapper.find('span').at(0).hasClass(''));
        expect(clickablechipWrapper.find('span').at(1).hasClass('Batman'));
        expect(clickablechipWrapper.find('a')).toHaveLength(1);
        //expect(clickablechipWrapper.prop('children'));
      });
    });
  });

  describe('onClick() property', () => {
    describe('when set', () => {
      it('should verify clickablechip when onClick() is set', () => {
        const onChipClick = jest.fn();
        const clickablechipWrapper = mount(
                                        <ClickableChip chip={<Chip>Batman</Chip>} onClick={onChipClick} theme={theme} />,
                                    );
        clickablechipWrapper.find('a').simulate('click');
        expect(onChipClick).toHaveBeenCalledTimes(1);
        expect(onChipClick).toHaveBeenCalled();
        expect(clickablechipWrapper.find('div')).toHaveLength(1);
        expect(clickablechipWrapper.find('span')).toHaveLength(2);
        expect(clickablechipWrapper.find('span').at(0).hasClass(''));
        expect(clickablechipWrapper.find('span').at(1).hasClass('Batman'));
        expect(clickablechipWrapper.find('a')).toHaveLength(1);
        //expect(clickablechipWrapper.prop('children'));
      });
    });

    describe('when not set', () => {
      it('should verify clickablechip when onClick() is not set', () => {
        const clickablechipWrapper = mount(
                                        <ClickableChip chip={<Chip>Batman</Chip>} theme={theme} />,
                                    );

        expect(clickablechipWrapper.find('div')).toHaveLength(1);
        expect(clickablechipWrapper.find('span')).toHaveLength(2);
        expect(clickablechipWrapper.find('span').at(0).hasClass(''));
        expect(clickablechipWrapper.find('span').at(1).hasClass('Batman'));
        expect(clickablechipWrapper.find('a')).toHaveLength(1);
      });
    });
  });

  describe('all property', () => {
    describe('when set', () => {
      it('should verify clickablechip when all props are set', () => {
        const onChipClick = jest.fn();
        const clickablechipWrapper = mount(
                                        <ClickableChip chip={<Chip>Batman</Chip>} onClick={onChipClick} theme={theme} />,
                                    );
        clickablechipWrapper.find('a').simulate('click');
        expect(onChipClick).toHaveBeenCalledTimes(1);
        expect(onChipClick).toHaveBeenCalled();
        expect(clickablechipWrapper.find('div')).toHaveLength(1);
        expect(clickablechipWrapper.find('span')).toHaveLength(2);
        expect(clickablechipWrapper.find('span').at(0).hasClass(''));
        expect(clickablechipWrapper.find('span').at(1).hasClass('Batman'));
        expect(clickablechipWrapper.find('a')).toHaveLength(1);
      });
    });
  });

  describe('theme property', () => {
    describe('when not set', () => {
      it('should verify choice when theme is not set', () => {
        const clickablechipWrapper = mount(
                                        <ClickableChip chip={<Chip>Batman</Chip>} />,
                                    );
        expect(clickablechipWrapper.find('div')).toHaveLength(1);
        expect(clickablechipWrapper.find('span')).toHaveLength(2);
        expect(clickablechipWrapper.find('span').at(0).hasClass(''));
        expect(clickablechipWrapper.find('span').at(1).hasClass('Batman'));
        expect(clickablechipWrapper.find('a')).toHaveLength(1);
      });
    });
  });
});
