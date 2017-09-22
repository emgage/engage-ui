import * as React from 'react';

import { PeoplePickerSearchType } from './PickerEnum';
import { PeoplePickerSource } from './PickerSource';
import AutoSuggestText from '../../src/components/Picker/AutoSuggestText';

import {
  Button,
  Chip,
  Picker,
} from '../../src/components';

function escapeRegexCharacters(str:string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
class PickerAutoSuggestExample extends React.Component<{}, {}> {
  constructor(props:any) {
    super(props);
    this.state = {
      value: '',
      input: {},
      suggestions: [],
      chipListState: [],
      itemsList:
        [
          { key: 1, image: 'http://msaadvertising.com/wp-content/uploads/2014/06/Larry-cartoon-headshot.jpg', name: 'John Doe', email: 'test@gmail.com', markedForDelete: false },
          { key: 2, image: 'http://cdn.photographyproject.com.au/wp-content/uploads/2013/04/corporate-headshot.jpg', name: 'Pedro Sanchez', email: 'pedrosanchez@gmail.com' },
          { key: 3, image: 'https://media.licdn.com/mpr/mpr/p/5/005/08f/04d/02df10d.jpg', name: 'Jane Doe', email: 'jane@gmail.com' },
          { key: 4, image: 'http://www.roanokecreditrepair.com/wp-content/uploads/2016/06/Headshot-1.png', name: 'Person McPerson', email: 'yahoogmail@gmail.com' },
          { key: 5, image: 'https://d38zhw9ti31loc.cloudfront.net/wp-content/uploads/2013/07/Crystal-headshot-new.jpg', name: 'Laura Person', email: 'yahooldjadslkjgmail@gmail.com' },
          { key: 6, image: 'https://d38zhw9ti31loc.cloudfront.net/wp-content/uploads/2013/07/Crystal-headshot-new.jpg', name: 'Laura Person', email: 'slkjgmail@gmail.com' },
        ],
    };
  }
  render() {
    const autoSuggestMethods = {
      onSuggestionsClearRequested: () => this.setState({ suggestions: [] }),
      getSuggestions: (value:string) => {
        const escapedValue = escapeRegexCharacters(value.trim());
        if (escapedValue === '') {
          return [];
        }
        const regex = new RegExp(escapedValue, 'i');
        // console.log('itemslist', this.state.itemsList);
        return this.state.itemsList.filter(language => regex.test(language.name));
      },
      getSuggestionValue: (suggestion:object) => {
        return suggestion.name;
      },
      onChange: (event:object, { newValue, method }:any) => {
        this.setState({
          value: newValue,
        });
      },
      onKeyDown: (e:any) => {
        if ((e.keyCode === 8) && this.state.chipListState.length && !this.state.value.length) {
          const yellowed = this.state.chipListState.slice(this.state.chipListState.length - 1);
          if (yellowed[0]['markedForDelete']) {
            const chipListState = this.state.chipListState.slice(0, this.state.chipListState.length - 1);
            const language = this.state.chipListState.slice(this.state.chipListState.length - 1)[0];
            delete language['text'];
            language['markedForDelete'] = false;
            const itemsList = this.state.itemsList.concat(language);
            this.setState({
              chipListState,
              itemsList,
            });
          } else {
            yellowed[0]['markedForDelete'] = true;

            this.setState({
              chipListState: this.state.chipListState,
            });
          }
        } else if (this.state.chipListState.length && !this.state.value.length && !(e.keyCode === 38) && !(e.keyCode === 40)) {
          if (this.state.chipListState[this.state.chipListState.length - 1]['markedForDelete']) {
            this.state.chipListState[this.state.chipListState.length - 1]['markedForDelete'] = false;
            this.setState({ chipListState: this.state.chipListState });
          }
        }
      },

      onSuggestionsFetchRequested: ({ value }:any) => {
        console.log('value onSuggestionsFetchRequested', value);
        this.setState({
          suggestions: autoSuggestMethods.getSuggestions(value),
        });
      },

      updateList: (input: any) => {
        const langIndex = this.state.itemsList.indexOf(input);
        const itemsListLength = this.state.itemsList;
        const newLangState = itemsListLength.slice(0, langIndex).concat(itemsListLength.slice(langIndex + 1, itemsListLength.length));
        this.setState({ itemsList: newLangState });
      },

      onSuggestionSelected: (event:any, { suggestion }: any) => {
        suggestion.text = suggestion.name;

        autoSuggestMethods.updateList(suggestion);
        const chipListState = this.state.chipListState.concat(suggestion);
        this.setState({
          chipListState,
          value: '',
        });
      },

      chipRemove: (input:any) => {
        input['markedForDelete'] = false;
        const index = this.state.chipListState.indexOf(input);
        const chipLength = this.state.chipListState;
        const newChipState = chipLength.slice(0, index).concat(chipLength.slice(index + 1, chipLength.length));
        this.setState({ chipListState: newChipState });
        const itemsListList = this.state.itemsList.concat(input);
        this.setState({ itemsList: itemsListList });
        this.state.input.focus();
      },

      storeInputReference: (autosuggest:any) => {
        if (autosuggest !== null) {
          if (this.state.input !== autosuggest.input) {
            this.setState({ input: autosuggest.input });
          }
        }
      },
    }
    const { value, suggestions, chipListState }:any = this.state;
    const inputProps = {
      value,
      placeholder: chipListState.length ? '' : 'hello',
      onChange: autoSuggestMethods.onChange,
      onKeyDown: autoSuggestMethods.onKeyDown,
    };
    const stateProps = {value, suggestions, chipListState, inputProps}
    const itemsList = 
      [
        { key: 1, image: 'http://msaadvertising.com/wp-content/uploads/2014/06/Larry-cartoon-headshot.jpg', name: 'John Doe', email: 'test@gmail.com', markedForDelete: false },
        { key: 2, image: 'http://cdn.photographyproject.com.au/wp-content/uploads/2013/04/corporate-headshot.jpg', name: 'Pedro Sanchez', email: 'pedrosanchez@gmail.com' },
        { key: 3, image: 'https://media.licdn.com/mpr/mpr/p/5/005/08f/04d/02df10d.jpg', name: 'Jane Doe', email: 'jane@gmail.com' },
        { key: 4, image: 'http://www.roanokecreditrepair.com/wp-content/uploads/2016/06/Headshot-1.png', name: 'Person McPerson', email: 'yahoogmail@gmail.com' },
        { key: 5, image: 'https://d38zhw9ti31loc.cloudfront.net/wp-content/uploads/2013/07/Crystal-headshot-new.jpg', name: 'Laura Person', email: 'yahooldjadslkjgmail@gmail.com' },
        { key: 6, image: 'https://d38zhw9ti31loc.cloudfront.net/wp-content/uploads/2013/07/Crystal-headshot-new.jpg', name: 'Laura Person', email: 'slkjgmail@gmail.com' },
      ];

    return  (
      <Picker
        stateProps={stateProps}
        autoSuggestMethods={autoSuggestMethods}
        autoSuggest
        chipComponent={Chip}
        filterPlaceHolder={'hello'}
        searchResultComponent={Chip}
        source={new PeoplePickerSource(PeoplePickerSearchType.Both)}
        moreInfoComponent={<Button children="ranmal" />}  
        itemsList={itemsList}
      />
    );
  }
};

export default PickerAutoSuggestExample;