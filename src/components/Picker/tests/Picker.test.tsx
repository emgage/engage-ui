import * as React from 'react';
import { mount } from 'enzyme';
import Button from '../../Button/Button';
import Chip from '../../Chip/Chip';
import { PeoplePickerSearchType, MoreInfoOn } from '../PickerEnum';
import { PeoplePickerSource } from './PickerSource';
import Picker from '..';

const searchData = [
    { Id: 0, Name: 'ranmal0', Description: 'r', ImageUrl: '', Url: '', Type: PeoplePickerSearchType.Groups },
    { Id: 1, Name: 'ranmal1', Description: 'r', ImageUrl: '', Url: '', Type: PeoplePickerSearchType.Groups },
    { Id: 2, Name: 'ranmal2', Description: 'r', ImageUrl: '', Url: '', Type: PeoplePickerSearchType.Groups },
    { Id: 3, Name: 'ranmal3', Description: 'r', ImageUrl: '', Url: '', Type: PeoplePickerSearchType.Groups },
    { Id: 4, Name: 'ranmal4', Description: 'r', ImageUrl: '', Url: '', Type: PeoplePickerSearchType.Groups },
    { Id: 5, Name: 'ranmal5', Description: 'r', ImageUrl: '', Url: '', Type: PeoplePickerSearchType.Users },
    { Id: 6, Name: 'ranmal6', Description: 'r', ImageUrl: '', Url: '', Type: PeoplePickerSearchType.Users },
    { Id: 7, Name: 'ranmal7', Description: 'r', ImageUrl: '', Url: '', Type: PeoplePickerSearchType.Users },
    { Id: 8, Name: 'ranmal8', Description: 'r', ImageUrl: '', Url: '', Type: PeoplePickerSearchType.Users },
    { Id: 9, Name: 'ranmal9', Description: 'r', ImageUrl: '', Url: '', Type: PeoplePickerSearchType.Users },
];
const selectedData = [
    { Id: 0, Name: 'ranmal0', Description: 'r', ImageUrl: '', Url: '', Type: PeoplePickerSearchType.Groups },
    { Id: 1, Name: 'ranmal1', Description: 'r', ImageUrl: '', Url: '', Type: PeoplePickerSearchType.Groups },
];
describe('when default props are provided', () => {
    it('div should have default picker elements', () => {
        const subject = mount(<Picker
            required={true}
            source={new PeoplePickerSource()}
            chipComponent={Chip}
            searchResultComponent={Chip}
            peoplePickerSearchType={PeoplePickerSearchType.Both}
            filterPlaceHolder="Search people and group"
            maxSelectedItems={3}
            millisecondsToWaitBeforeSearch={3}
            minSelectedItems={2}
            moreInfoComponent={<Button children="More Info about picker" />}
            moreInfoComponentShowOn={MoreInfoOn.onHover}
            selectedResultsBehavior="mark"
        />);
        expect(subject.find('div.showClass').length).toBe(1);
        expect(subject.find('div.LabelWrapper').length).toBe(1);
        expect(subject.find('div.Label').length).toBe(1);
        expect(subject.find('div.TextField').length).toBe(1);
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
                source={new PeoplePickerSource()}
                chipComponent={Chip}
                searchResultComponent={Chip}
                peoplePickerSearchType={PeoplePickerSearchType.Both}
                searchBehavior = {spy}
            />).setState({ ['searchItems']: searchData});
            (subject.find('input') as any).node.value = 'ran';
            subject.find('input').simulate('change');
            expect(spy).toHaveBeenCalledWith('ran');
            expect(subject.find('span.cm-chip-clickable').length).toBe(searchData.length);
        });
    });
    describe('onSelect()', () => {
        it('is called with the select', () => {
            const spySearch = jest.fn();
            const spyClick = jest.fn();
            const subject = mount(<Picker
                source={new PeoplePickerSource()}
                chipComponent={Chip}
                searchResultComponent={Chip}
                peoplePickerSearchType={PeoplePickerSearchType.Both}
                searchBehavior={spySearch}
                onSelect={spyClick}
            />).setState({ ['searchItems']: searchData});
            (subject.find('input') as any).node.value = 'ran';
            subject.find('input').simulate('change');
            expect(spySearch).toHaveBeenCalledWith('ran');
            expect(subject.find('span.cm-chip-clickable').length).toBe(searchData.length);
            subject.find('span.cm-chip-clickable').first().find('a').simulate('click');
            expect(spyClick).toHaveBeenCalled();
        });
    });
    describe('onRemove()', () => {
        it('is called with the remove', () => {
            const spySearch = jest.fn();
            const spyClick = jest.fn();
            const spyRemove = jest.fn();
            const subject = mount(<Picker
                source={new PeoplePickerSource()}
                chipComponent={Chip}
                searchResultComponent={Chip}
                peoplePickerSearchType={PeoplePickerSearchType.Both}
                searchBehavior={spySearch}
                onSelect={spyClick}
                onRemove={spyRemove}
            />).setState({ ['searchItems']: searchData, ['selectedItems']: selectedData });
            (subject.find('input') as any).node.value = 'ran';
            subject.find('input').simulate('change');
            expect(spySearch).toHaveBeenCalledWith('ran');
            expect(subject.find('span.cm-chip-clickable').length).toBe(searchData.length);
            subject.find('span.cm-chip-clickable').first().find('a').simulate('click');
            expect(spyClick).toHaveBeenCalled();
            expect(subject.find('span.cm-chip-removable').length).toBe(selectedData.length);
            subject.find('span.cm-chip-removable').first().find('button').simulate('click');
            expect(spyRemove).toHaveBeenCalled();
        });
    });
});
