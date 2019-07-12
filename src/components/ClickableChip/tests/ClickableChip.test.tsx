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
      const onChipClick = jest.fn();
      const clickablechipWrapper = mount(
                                        <ClickableChip chip={<Chip>Batman</Chip>} onClick={onChipClick} theme={theme} />
                                    );
      expect(clickablechipWrapper.find('div')).toHaveLength(2);
      expect(clickablechipWrapper.find('span')).toHaveLength(1);
      expect(clickablechipWrapper.find('span').at(0).hasClass(''));
    });
  });

  describe('chip property', () => {
    describe('when set', () => {
      it('should verify clickablechip when chip is set', () => {
        const onChipClick = jest.fn();
        const clickablechipWrapper = mount(
                                        <ClickableChip chip={<Chip>Batman</Chip>} onClick={onChipClick} theme={theme} />
                                    );
        expect(clickablechipWrapper.find('div')).toHaveLength(2);
        expect(clickablechipWrapper.find('span')).toHaveLength(1);
        expect(clickablechipWrapper.find('span').at(0).hasClass(''));
      });
    });
  });

  describe('all property', () => {
    describe('when set', () => {
      it('should verify clickablechip when all props are set', () => {
        const onChipClick = jest.fn();
        const clickablechipWrapper = mount(
                                        <ClickableChip chip={<Chip>Batman</Chip>} onClick={onChipClick} theme={theme} />
                                    );
        expect(clickablechipWrapper.find('div')).toHaveLength(2);
        expect(clickablechipWrapper.find('span')).toHaveLength(1);
        expect(clickablechipWrapper.find('span').at(0).hasClass(''));
      });
    });
  });

  describe('theme property', () => {
    describe('when not set', () => {
      it('should verify choice when theme is not set', () => {
        const onChipClick = jest.fn();
        const clickablechipWrapper = mount(
                                        <ClickableChip chip={<Chip>Batman</Chip>} onClick={onChipClick} />
                                    );
        expect(clickablechipWrapper.find('div')).toHaveLength(2);
        expect(clickablechipWrapper.find('span')).toHaveLength(1);
        expect(clickablechipWrapper.find('span').at(0).hasClass(''));
      });
    });

    describe('when set', () => {
      it('should verify choice when theme is set', () => {
        const onChipClick = jest.fn();
        const clickablechipWrapper = mount(
                                        <ClickableChip chip={<Chip>Batman</Chip>} onClick={onChipClick} theme={theme} />
                                    );
        expect(clickablechipWrapper.find('div')).toHaveLength(2);
        expect(clickablechipWrapper.find('span')).toHaveLength(1);
        expect(clickablechipWrapper.find('span').at(0).hasClass(''));
      });
    });
  });
});
