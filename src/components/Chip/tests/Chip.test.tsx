import * as React from 'react';
import { mount } from 'enzyme';
import Chip from '../Chip';

const theme = {
  chip: 'chip',
  chipClickable: 'chipClickable',
  chipImage: 'chipImage',
  chipRemovable: 'chipRemovable',
  chipTransparent: 'chipTransparent',
  chipRemove: 'chipRemove',
};

describe('<Chip />', () => {

  describe('when default props are provided', () => {
    it('basic chip should have rendered 2 span elements', () => {
      const subject = mount(<Chip theme={theme} />);
      expect(subject.find('span')).toHaveLength(2);
    });
    it('basic chip should have default chip css class on span', () => {
      const subject = mount(<Chip theme={theme} />);
      expect(subject.find('span').at(0).hasClass('chip')).toBe(true);
    });
  });

  describe('image property', () => {
    describe('when not set', () => {
      it('should have rendered 2 span elements', () => {
        const subject = mount(<Chip theme={theme} />);
        expect(subject.find('span')).toHaveLength(2);
      });
      it('should have default chip css class on span', () => {
        const subject = mount(<Chip theme={theme} />);
        expect(subject.find('span').at(0).hasClass('chip')).toBe(true);
      });
      it('should not have image element', () => {
        const subject = mount(<Chip theme={theme} />);
        expect(subject.find('img')).toHaveLength(0);
      });
    });

    describe('when set to valid image object', () => {
      const imageUrl = 'http://placehold.it/50x50';
      const altText = 'Hello World';
      const image = {
        url: imageUrl,
        alt: altText,
      };

      it('should have rendered 2 span elements', () => {
        const subject = mount(<Chip image={image} theme={theme} />);
        expect(subject.find('span')).toHaveLength(2);
      });
      it('should have default chip css class on span', () => {
        const subject = mount(<Chip image={image} theme={theme} />);
        expect(subject.find('span').at(0).hasClass('chip')).toBe(true);
      });
      it('should have image element', () => {
        const subject = mount(<Chip image={image} theme={theme} />);
        expect(subject.find('img')).toHaveLength(1);
      });
      it('should have image element with given image url', () => {
        const subject = mount(<Chip image={image} theme={theme} />);
        expect(subject.find('img').prop('src')).toBe(imageUrl);
      });
      it('should have image element with given alternate text', () => {
        const subject = mount(<Chip image={image} theme={theme} />);
        expect(subject.find('img').prop('alt')).toBe(altText);
      });
    });

    describe('when set to undefined', () => {
      it('should have rendered 2 span elements', () => {
        const subject = mount(<Chip image={undefined} theme={theme} />);
        expect(subject.find('span')).toHaveLength(2);
      });
      it('should have default chip css class on span', () => {
        const subject = mount(<Chip image={undefined} theme={theme} />);
        expect(subject.find('span').at(0).hasClass('chip')).toBe(true);
      });
      it('should not have image element', () => {
        const subject = mount(<Chip image={undefined} theme={theme} />);
        expect(subject.find('img')).toHaveLength(0);
      });
    });
  });

  describe('clickable property', () => {
    describe('when not set', () => {
      it('should have rendered 2 span elements', () => {
        const subject = mount(<Chip theme={theme} />);
        expect(subject.find('span')).toHaveLength(2);
      });
      it('should have default chip css class on span', () => {
        const subject = mount(<Chip theme={theme} />);
        expect(subject.find('span').at(0).hasClass('chip')).toBe(true);
      });
      it('should not have <a> element', () => {
        const subject = mount(<Chip theme={theme} />);
        expect(subject.find('a')).toHaveLength(0);
      });
      it('should not have clickable chip css class on span', () => {
        const subject = mount(<Chip theme={theme} />);
        expect(subject.find('span').at(0).hasClass('chipClickable')).toBe(false);
      });
    });

    describe('when set to true', () => {
      it('should have rendered 2 span elements', () => {
        const subject = mount(<Chip clickable={true} theme={theme} />);
        expect(subject.find('span')).toHaveLength(2);
      });
      it('should have default chip css class on span', () => {
        const subject = mount(<Chip clickable={true} theme={theme} />);
        expect(subject.find('span').at(0).hasClass('chip')).toBe(true);
      });
      it('should have <a> element', () => {
        const subject = mount(<Chip clickable={true} theme={theme} />);
        expect(subject.find('a')).toHaveLength(1);
      });
      it('should have clickable chip css class on span', () => {
        const subject = mount(<Chip clickable={true} theme={theme} />);
        expect(subject.find('span').at(0).hasClass('chipClickable')).toBe(true);
      });
      it('simulate chip click event', () => {
        const onChipClick = jest.fn();
        const subject = mount(<Chip clickable={true} onClick={onChipClick} theme={theme} />);
        subject.find('a').simulate('click');
        expect(onChipClick).toHaveBeenCalledTimes(1);
      });
    });

    describe('when set to false', () => {
      it('should have rendered 2 span elements', () => {
        const subject = mount(<Chip clickable={false} theme={theme} />);
        expect(subject.find('span')).toHaveLength(2);
      });
      it('should have default chip css class on span', () => {
        const subject = mount(<Chip clickable={false} theme={theme} />);
        expect(subject.find('span').at(0).hasClass('chip')).toBe(true);
      });
      it('should not have <a> element', () => {
        const subject = mount(<Chip clickable={false} theme={theme} />);
        expect(subject.find('a')).toHaveLength(0);
      });
      it('should not have clickable chip css class on span', () => {
        const subject = mount(<Chip clickable={false} theme={theme} />);
        expect(subject.find('span').at(0).hasClass('chipClickable')).toBe(false);
      });
    });
  });

  describe('removable property', () => {
    describe('when not set', () => {
      it('should have rendered 2 span elements', () => {
        const subject = mount(<Chip theme={theme} />);
        expect(subject.find('span')).toHaveLength(2);
      });
      it('should have default chip css class on span', () => {
        const subject = mount(<Chip theme={theme} />);
        expect(subject.find('span').at(0).hasClass('chip')).toBe(true);
      });
      it('should not have <button> element', () => {
        const subject = mount(<Chip theme={theme} />);
        expect(subject.find('button')).toHaveLength(0);
      });
      it('should not have removable chip css class on span', () => {
        const subject = mount(<Chip theme={theme} />);
        expect(subject.find('span').at(0).hasClass('chipRemovable')).toBe(false);
      });
    });

    describe('when set to true', () => {
      it('should have rendered 3 span elements', () => {
        const subject = mount(<Chip removable={true} theme={theme} />);
        expect(subject.find('span')).toHaveLength(3);
      });
      it('should have default chip css class on span', () => {
        const subject = mount(<Chip removable={true} theme={theme} />);
        expect(subject.find('span').at(0).hasClass('chip')).toBe(true);
      });
      it('should have <button> element', () => {
        const subject = mount(<Chip removable={true} theme={theme} />);
        expect(subject.find('button')).toHaveLength(1);
      });
      it('should have button remove css style', () => {
        const subject = mount(<Chip removable={true} theme={theme} />);
        expect(subject.find('button').hasClass('chipRemove')).toBe(true);
      });
      it('should have removable chip css class on span', () => {
        const subject = mount(<Chip removable={true} theme={theme} />);
        expect(subject.find('span').at(0).hasClass('chipRemovable')).toBe(true);
      });
      it('simulate remove button click event', () => {
        const onRemoveClick = jest.fn();
        const subject = mount(<Chip removable={true} onRemove={onRemoveClick} theme={theme} />);
        subject.find('button').simulate('click');
        expect(onRemoveClick).toHaveBeenCalledTimes(1);
      });
    });

    describe('when set to false', () => {
      it('should have rendered 2 span elements', () => {
        const subject = mount(<Chip removable={false} theme={theme} />);
        expect(subject.find('span')).toHaveLength(2);
      });
      it('should have default chip css class on span', () => {
        const subject = mount(<Chip removable={false} theme={theme} />);
        expect(subject.find('span').at(0).hasClass('chip')).toBe(true);
      });
      it('should not have <button> element', () => {
        const subject = mount(<Chip removable={false} theme={theme} />);
        expect(subject.find('button')).toHaveLength(0);
      });
      it('should not have removable chip css class on span', () => {
        const subject = mount(<Chip removable={false} theme={theme} />);
        expect(subject.find('span').at(0).hasClass('chipRemovable')).toBe(false);
      });
    });
  });

  describe('transparent property', () => {
    describe('when not set', () => {
      it('should have rendered 2 span elements', () => {
        const subject = mount(<Chip theme={theme} />);
        expect(subject.find('span')).toHaveLength(2);
      });
      it('should have default chip css class on span', () => {
        const subject = mount(<Chip theme={theme} />);
        expect(subject.find('span').at(0).hasClass('chip')).toBe(true);
      });
      it('should not have transparent chip css class on span', () => {
        const subject = mount(<Chip theme={theme} />);
        expect(subject.find('span').at(0).hasClass('chipTransparent')).toBe(false);
      });
    });

    describe('when set to true', () => {
      it('should have rendered 2 span elements', () => {
        const subject = mount(<Chip transparent={true} theme={theme} />);
        expect(subject.find('span')).toHaveLength(2);
      });
      it('should have default chip css class on span', () => {
        const subject = mount(<Chip transparent={true} theme={theme} />);
        expect(subject.find('span').at(0).hasClass('chip')).toBe(true);
      });
      it('should have transparent chip css class on span', () => {
        const subject = mount(<Chip transparent={true} theme={theme} />);
        expect(subject.find('span').at(0).hasClass('chipTransparent')).toBe(true);
      });
    });

    describe('when set to false', () => {
      it('should have rendered 2 span elements', () => {
        const subject = mount(<Chip transparent={false} theme={theme} />);
        expect(subject.find('span')).toHaveLength(2);
      });
      it('should have default chip css class on span', () => {
        const subject = mount(<Chip transparent={false} theme={theme} />);
        expect(subject.find('span').at(0).hasClass('chip')).toBe(true);
      });
      it('should not have transparent chip css class on span', () => {
        const subject = mount(<Chip transparent={false} theme={theme} />);
        expect(subject.find('span').at(0).hasClass('chipTransparent')).toBe(false);
      });
    });
  });

  describe('when clickable, removable, transparent chip with image is provided', () => {
    const onChipClick = jest.fn();
    const onRemoveClick = jest.fn();
    const image = {
      url: 'http://placehold.it/50x50',
      alt: 'Alternate Text',
    };

    it('should have rendered 3 span elements', () => {
      const subject = mount(<Chip theme={theme}  transparent={true} clickable={true} removable={true} image={image} onClick={onChipClick} onRemove={onRemoveClick} />);
      expect(subject.find('span')).toHaveLength(3);
    });
    it('should have default chip css class on span', () => {
      const subject = mount(<Chip theme={theme}  transparent={true} clickable={true} removable={true} image={image} onClick={onChipClick} onRemove={onRemoveClick} />);
      expect(subject.find('span').at(0).hasClass('chip')).toBe(true);
    });
    it('should have <a> element', () => {
      const subject = mount(<Chip theme={theme}  transparent={true} clickable={true} removable={true} image={image} onClick={onChipClick} onRemove={onRemoveClick} />);
      expect(subject.find('a')).toHaveLength(1);
    });
    it('should have image element', () => {
      const subject = mount(<Chip theme={theme}  transparent={true} clickable={true} removable={true} image={image} onClick={onChipClick} onRemove={onRemoveClick} />);
      expect(subject.find('img')).toHaveLength(1);
    });
    it('should have image element with given image url', () => {
      const subject = mount(<Chip theme={theme}  transparent={true} clickable={true} removable={true} image={image} onClick={onChipClick} onRemove={onRemoveClick} />);
      expect(subject.find('img').prop('src')).toBe(image.url);
    });
    it('should have image element with given alternate text', () => {
      const subject = mount(<Chip theme={theme}  transparent={true} clickable={true} removable={true} image={image} onClick={onChipClick} onRemove={onRemoveClick} />);
      expect(subject.find('img').prop('alt')).toBe(image.alt);
    });
    it('should have <button> element', () => {
      const subject = mount(<Chip theme={theme}  transparent={true} clickable={true} removable={true} image={image} onClick={onChipClick} onRemove={onRemoveClick} />);
      expect(subject.find('button')).toHaveLength(1);
    });
    it('should have button remove css style', () => {
      const subject = mount(<Chip theme={theme}  transparent={true} clickable={true} removable={true} image={image} onClick={onChipClick} onRemove={onRemoveClick} />);
      expect(subject.find('button').hasClass('chipRemove')).toBe(true);
    });
    it('should have clickable chip css class on span', () => {
      const subject = mount(<Chip theme={theme}  transparent={true} clickable={true} removable={true} image={image} onClick={onChipClick} onRemove={onRemoveClick} />);
      expect(subject.find('span').at(0).hasClass('chipClickable')).toBe(true);
    });
    it('should have removable chip css class on span', () => {
      const subject = mount(<Chip theme={theme}  transparent={true} clickable={true} removable={true} image={image} onClick={onChipClick} onRemove={onRemoveClick} />);
      expect(subject.find('span').at(0).hasClass('chipClickable')).toBe(true);
    });
    it('should have transparent chip css class on span', () => {
      const subject = mount(<Chip theme={theme} transparent={true} clickable={true} removable={true} image={image} onClick={onChipClick} onRemove={onRemoveClick} />);
      expect(subject.find('span').at(0).hasClass('chipTransparent')).toBe(true);
    });
    it('simulate chip click event', () => {
      const subject = mount(<Chip theme={theme} transparent={true} clickable={true} removable={true} image={image} onClick={onChipClick} onRemove={onRemoveClick} />);
      subject.find('a').simulate('click');
      expect(onChipClick).toHaveBeenCalledTimes(1);
    });
    it('simulate remove button click event', () => {
      const subject = mount(<Chip theme={theme} transparent={true} clickable={true} removable={true} image={image} onClick={onChipClick} onRemove={onRemoveClick} />);
      subject.find('button').simulate('click');
      expect(onRemoveClick).toHaveBeenCalledTimes(1);
    });
  });
});
