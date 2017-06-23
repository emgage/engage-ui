import * as React from 'react';
import { mount } from 'enzyme';
import Button from '../../Button/Button';
import Chip from '../../Chip/Chip';
import { DisplayMoreInfo } from '../PickerEnum';
import { MockPickerSource } from './MockPickerSource';
import Picker from '..';

const theme = {
    pickerResultHide: 'pickerResultHide',
    pickerResultShow: 'pickerResultShow',
};
const chipTheme = {
    chip: 'chip',
    chipClickable: 'chipClickable',
    chipImage: 'chipImage',
    chipRemovable: 'chipRemovable',
    chipTransparent: 'chipTransparent',
    chipRemove: 'chipRemove',
};
const searchData = [
    { Id: 0, Name: 'ranmal0', Description: 'r', ImageUrl: '', Url: '' },
    { Id: 1, Name: 'ranmal1', Description: 'r', ImageUrl: '', Url: '' },
    { Id: 2, Name: 'ranmal2', Description: 'r', ImageUrl: '', Url: '' },
    { Id: 3, Name: 'ranmal3', Description: 'r', ImageUrl: '', Url: '' },
    { Id: 4, Name: 'ranmal4', Description: 'r', ImageUrl: '', Url: '' },
    { Id: 5, Name: 'ranmal5', Description: 'r', ImageUrl: '', Url: '' },
    { Id: 6, Name: 'ranmal6', Description: 'r', ImageUrl: '', Url: '' },
    { Id: 7, Name: 'ranmal7', Description: 'r', ImageUrl: '', Url: '' },
    { Id: 8, Name: 'ranmal8', Description: 'r', ImageUrl: '', Url: '' },
    { Id: 9, Name: 'ranmal9', Description: 'r', ImageUrl: '', Url: '' },
];
const selectedData = [
    { Id: 0, Name: 'ranmal0', Description: 'r', ImageUrl: '', Url: '' },
    { Id: 1, Name: 'ranmal1', Description: 'r', ImageUrl: '', Url: '' },
];
describe('when default props are provided', () => {
    it('div should have default picker elements', () => {
        const subject = mount(<Picker
            required={true}
            source={new MockPickerSource()}
            chipComponent={Chip}
            searchResultComponent={Chip}
            filterPlaceHolder="Search people and group"
            maxSelectedItems={3}
            millisecondsToWaitBeforeSearch={3}
            minSelectedItems={2}
            moreInfoComponent={<Button children="More Info about picker" />}
            moreInfoComponentShowOn={DisplayMoreInfo.onHover}
            selectedResultsBehavior="mark"
            theme={theme}
        />);
        expect(subject.find('label').length).toBe(1);
        expect(subject.find('label').text()).toBe('lbl');
        expect(subject.find('input').length).toBe(1);
        const input = subject.find('input');
        expect(input.prop('id')).toBe('TextField1');
        expect(input.prop('placeholder')).toBe('Search people and group');
    });
    describe('searchBehavior()', () => {
        it('is called with the search', () => {
            const spy = jest.fn();
            const subject = mount(<Picker
                source={new MockPickerSource()}
                chipComponent={<Chip theme={chipTheme} />}
                searchResultComponent={<Chip theme={chipTheme} />}
                searchBehavior={spy}
                theme={theme}
            />);
            (subject.find('input') as any).node.value = 'ran';
            subject.find('input').simulate('change');
            expect(spy).toHaveBeenCalledWith('ran');
        });
    });
    describe('onSelect()', () => {
        it('is called with the select', () => {
            const spySearch = jest.fn();
            const spyClick = jest.fn();
            const subject = mount(<Picker
                source={new MockPickerSource()}
                chipComponent={<Chip theme={chipTheme} />}
                searchResultComponent={<Chip theme={chipTheme} />}
                searchBehavior={spySearch}
                onSelect={spyClick}
                theme={theme}
            />).setState({ ['searchItems']: searchData });
            (subject.find('input') as any).node.value = 'ran';
            subject.find('input').simulate('change');
            expect(spySearch).toHaveBeenCalledWith('ran');
            expect(subject.find('span').length).toBe(searchData.length);
            subject.find('span').first().find('a').simulate('click');
            expect(spyClick).toHaveBeenCalled();
        });
    });
    describe('onRemove()', () => {
        it('is called with the remove', () => {
            const spySearch = jest.fn();
            const spyClick = jest.fn();
            const spyRemove = jest.fn();
            const subject = mount(<Picker
                source={new MockPickerSource()}
                chipComponent={<Chip theme={chipTheme} />}
                searchResultComponent={<Chip theme={chipTheme} />}
                searchBehavior={spySearch}
                onSelect={spyClick}
                onRemove={spyRemove}
                theme={theme}
            />).setState({ ['searchItems']: searchData, ['selectedItems']: selectedData });
            (subject.find('input') as any).node.value = 'ran';
            subject.find('input').simulate('change');
            expect(spySearch).toHaveBeenCalledWith('ran');
            expect(subject.find('span').length).toBe(searchData.length);
            subject.find('span').first().find('a').simulate('click');
            expect(spyClick).toHaveBeenCalled();
            expect(subject.find('span').length).toBe(selectedData.length);
            subject.find('span').first().find('button').simulate('click');
            expect(spyRemove).toHaveBeenCalled();
        });
    });
});
