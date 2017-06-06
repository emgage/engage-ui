import * as React from 'react';
import { mount } from 'enzyme';
import { PeoplePickerSearchType, MoreInfoOn } from '../PickerEnum';
import { PeoplePickerSource } from '../PickerSource';
import Chip from '../../Chip/Chip';
import Button from '../../Button/Button';
import Picker from '..';

describe('when default props are provided', () => {
    it('div should have default picker elements', () => {
        const subject = mount(<Picker
            required={true}
            source={new PeoplePickerSource(PeoplePickerSearchType.Both)}
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
        expect(subject.find('div.showclass').length).toBe(1);
        expect(subject.find('div.LabelWrapper').length).toBe(1);
        expect(subject.find('div.Label').length).toBe(1);
        expect(subject.find('div.TextField').length).toBe(1);
        expect(subject.find('div.Backdrop').length).toBe(1);
        expect(subject.find('a').length).toBe(1);
        expect(subject.find('a').text()).toBe('Info');
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
                source={new PeoplePickerSource(PeoplePickerSearchType.Both)}
                chipComponent={Chip}
                searchResultComponent={Chip}
                peoplePickerSearchType={PeoplePickerSearchType.Both}
                searchBehavior = {spy}
            />);
            // console.log((subject.find('input') as any).node);
            (subject.find('input') as any).node.value = 'ran';
            subject.find('input').simulate('change');
            expect(spy).toHaveBeenCalledWith('ran');
            // expect(subject.find('span').length).toBe(10);
        });
    });
    describe('onSelect()', () => {
        it('is called with the select', () => {
            const spy = jest.fn();
            const subject = mount(<Picker
                source={new PeoplePickerSource(PeoplePickerSearchType.Both)}
                chipComponent={Chip}
                searchResultComponent={Chip}
                peoplePickerSearchType={PeoplePickerSearchType.Both}
                searchBehavior={spy}
                onSelect={spy}
            />);
            (subject.find('input') as any).node.value = 'ran';
            subject.find('input').simulate('change');
            expect(spy).toHaveBeenCalledWith('ran');
            subject.find('a').simulate('onclick');
            expect(spy).toHaveBeenCalled();
        });
    });
    describe('onRemove()', () => {
        it('is called with the remove', () => {
            const spy = jest.fn();
            const subject = mount(<Picker
                source={new PeoplePickerSource(PeoplePickerSearchType.Both)}
                chipComponent={Chip}
                searchResultComponent={Chip}
                peoplePickerSearchType={PeoplePickerSearchType.Both}
                searchBehavior={spy}
                onSelect={spy}
                onRemove={spy}
            />);
            (subject.find('input') as any).node.value = 'ran';
            subject.find('input').simulate('change');
            expect(spy).toHaveBeenCalledWith('ran');
            subject.find('a').simulate('onclick');
            expect(spy).toHaveBeenCalled();
            subject.find('button').simulate('onclick');
            expect(spy).toHaveBeenCalled();
        });
    });
});
