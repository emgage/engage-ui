import * as React from 'react';
import { mount } from 'enzyme';
import Chip from '../../Chip';
import ClickableChip from '../ClickableChip';

const theme = {
  chip: 'chip',
};

describe('<ClickableChip />', () => {

  describe('when default props are provided', () => {
    it('basic clickablechip should be rendered with default props', (event) => {
      const onChipClick = jest.fn(event);
      const clickablechipWrapper = mount(
                                        <ClickableChip chip={<Chip>Batman</Chip>} onClick={onChipClick()} theme={theme} />
                                    );
      expect(clickablechipWrapper.find('div')).toHaveLength(1);
      expect(clickablechipWrapper.find('span')).toHaveLength(2);
      expect(clickablechipWrapper.find('span').at(0).hasClass(''));
      expect(clickablechipWrapper.find('span').at(1).hasClass('Batman'));
      expect(clickablechipWrapper.find('a')).toHaveLength(1);
    });
  });

  describe('chip property', () => {
    describe('when set', () => {
      it('should verify clickablechip when chip is set', (event) => {
        const onChipClick = jest.fn(event);
        const clickablechipWrapper = mount(
                                        <ClickableChip chip={<Chip>Batman</Chip>} onClick={onChipClick()} theme={theme} />
                                    );
        expect(clickablechipWrapper.find('div')).toHaveLength(1);
        expect(clickablechipWrapper.find('span')).toHaveLength(2);
        expect(clickablechipWrapper.find('span').at(0).hasClass(''));
        expect(clickablechipWrapper.find('span').at(1).hasClass('Batman'));
        expect(clickablechipWrapper.find('a')).toHaveLength(1);
      });
    });
  });

  describe('onClick() property', () => {
    describe('when set', () => {
      it('should verify clickablechip when onClick() is set', (event) => {
        const onChipClick = jest.fn(event);
        const clickablechipWrapper = mount(
                                        <ClickableChip chip={<Chip>Batman</Chip>} onClick={onChipClick()} theme={theme} />
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

    describe('when not set', () => {
      it('should verify clickablechip when onClick() is not set', (event) => {
        const onChipfocus = jest.fn(event);
        const clickablechipWrapper = mount(
                                        <ClickableChip chip={<Chip>Batman</Chip>} onClick={onChipfocus()} theme={theme} />
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
      it('should verify clickablechip when all props are set', (event) => {
        const onChipClick = jest.fn(event);
        const clickablechipWrapper = mount(
                                        <ClickableChip chip={<Chip>Batman</Chip>} onClick={onChipClick()} theme={theme} />
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
      it('should verify choice when theme is not set', (event) => {
        const onChipClick = jest.fn(event);
        const clickablechipWrapper = mount(
                                        <ClickableChip chip={<Chip>Batman</Chip>} onClick={onChipClick()} />
                                    );
        expect(clickablechipWrapper.find('div')).toHaveLength(1);
        expect(clickablechipWrapper.find('span')).toHaveLength(2);
        expect(clickablechipWrapper.find('span').at(0).hasClass(''));
        expect(clickablechipWrapper.find('span').at(1).hasClass('Batman'));
        expect(clickablechipWrapper.find('a')).toHaveLength(1);
      });
    });

    describe('when set', () => {
      it('should verify choice when theme is set', (event) => {
        const onChipClick = jest.fn(event);
        const clickablechipWrapper = mount(
                                        <ClickableChip chip={<Chip>Batman</Chip>} onClick={onChipClick()} theme={theme} />
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
