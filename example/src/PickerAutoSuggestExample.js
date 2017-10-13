import * as React from 'react';

import AutoSuggestText from '../../src/components/Picker/AutoSuggestText';
import Card from '../../src/components/Picker/Card';

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
      focusArr: [],
      itemsList:
        [
          { key: 1, image: 'http://msaadvertising.com/wp-content/uploads/2014/06/Larry-cartoon-headshot.jpg',  name: 'John Doe', email: 'test@gmail.com' },
          { key: 2, image: 'http://cdn.photographyproject.com.au/wp-content/uploads/2013/04/corporate-headshot.jpg', name: 'Pedro Sanchez', email: 'pedrosanchez@gmail.com' },
          { key: 3, image: 'https://media.licdn.com/mpr/mpr/p/5/005/08f/04d/02df10d.jpg', name: 'Jane Doe', email: 'jane@gmail.com' },
          { key: 4, image: 'http://www.roanokecreditrepair.com/wp-content/uploads/2016/06/Headshot-1.png', name: 'Person McPerson', email: 'yahoogmail@gmail.com' },
          { key: 5, image: 'https://d38zhw9ti31loc.cloudfront.net/wp-content/uploads/2013/07/Crystal-headshot-new.jpg', name: 'Laura Person', email: 'yahooldjadslkjgmail@gmail.com' },
          { key: 6, image: 'https://d38zhw9ti31loc.cloudfront.net/wp-content/uploads/2013/07/Crystal-headshot-new.jpg', name: 'Laura Person', email: 'slkjgmail@gmail.com' },
        ],
      focused: -1,
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
      onfocus: (e:any) => {
        const chipListState = this.state.chipListState.slice()
        const item = Object.assign({}, chipListState[0], {tabIndex: -1});
        chipListState[0] = item;
        if (this.state.focused === -1) this.setState({chipListState});
        this.setState({focused: 0})
      },
      onFocusOut: (e: any) => {
        const chipListState = this.state.chipListState.slice()
        const item = Object.assign({}, chipListState[0], {tabIndex: 0});
        chipListState[0] = item;
        if (this.state.focused === 0) this.setState({chipListState});
        this.setState({focused: -1})
      },
      onInputFocus: (e:any) => {
        const chipListState = this.state.chipListState.slice();
        if (chipListState.length && this.state.focused !== -1) {
          const item = Object.assign({}, chipListState[0], {tabIndex: 0});
          chipListState[0] = item;
          this.setState({chipListState});
        }
        this.setState({focused: -1})
      },
      storeFocus: (e: any) => {
        if (!this.state.focusArr.includes(e) && e !== null) {
          const focusArr = this.state.focusArr.length ? this.state.focusArr.concat([e]) : [e];
          this.setState({ focusArr });
        }
      },
      onKeyDown: (e:any, focusArr, chipListState) => {
        if (e.keyCode === 37) {
          const focused = this.state.focused === 0 ? this.state.chipListState.length - 1 : this.state.focused - 1;
          this.state.focusArr[focused].focus();
          this.setState({focused})
        } else if (e.keyCode === 39) {
          const focused = this.state.focused === this.state.chipListState.length - 1 ? 0 : this.state.focused + 1;
          this.state.focusArr[focused].focus();
          this.setState({focused})
        } else if (e.keyCode === 8) {
          autoSuggestMethods.chipRemove(this.state.focused);
        } else if (typeof e.chipRemove === 'number') {
          let focused;
          const number = e.chipRemove;
          if (number === chipListState.length) focused = number - 1;
          else if (number > 0) focused = number;
          else focused = 0;
          if (focusArr.length) focusArr[focused].focus();
          else this.state.input.focus();
          this.setState({focused})
        }
      },
      onClick: (e: any) => {
        console.log('clicked!')
      },
      onSuggestionsFetchRequested: ({ value }:any) => {
        this.setState({
          suggestions: autoSuggestMethods.getSuggestions(value),
        });
      },
      updateList: (input: any) => {
        const langIndex = this.state.itemsList.indexOf(input);
        const itemsListLength = this.state.itemsList;
        const newLangState = itemsListLength.slice(0, langIndex).concat(itemsListLength.slice(langIndex + 1, itemsListLength.length));
        this.setState({ 
          itemsList: newLangState,
        });
      },

      onSuggestionSelected: (event:any, { suggestion }: any) => {
        suggestion.text = suggestion.name;
        autoSuggestMethods.updateList(suggestion);
        const chipListState = this.state.chipListState.concat(suggestion);
        const item = Object.assign({}, chipListState[0], {tabIndex: 0});
        chipListState[0] = item;
        this.setState({
          chipListState,
          value: '',
        });
      },

      chipRemove: (item: any) => {
        const number = typeof item === 'number' ? item : this.state.chipListState.indexOf(item)
        const existingChipList = this.state.chipListState;
        const addedItem = this.state.chipListState.slice(number, number + 1);
        const addedItemObj = Object.assign({}, addedItem[0], {tabIndex: -1});
        const chipListState = existingChipList.slice(0, number).concat(existingChipList.slice(number + 1));
        const itemsList = this.state.itemsList.concat([addedItemObj]);
        const focusArr = this.state.focusArr.slice(0, number).concat(this.state.focusArr.slice(number + 1));
        if (chipListState.length) chipListState[0].tabIndex = 0;
        let focused;
        if (number === chipListState.length) focused = number - 1;
        else if (number === chipListState.length && number > 0) focused = number;
        else focused = 0;
        this.setState({ 
          itemsList,
          chipListState,
          focusArr,
        }, autoSuggestMethods.onKeyDown({chipRemove: number}, focusArr, chipListState));

      },
      renderSuggestion: (suggestion:any, { isHighlighted, query }:any) => {
        const index = suggestion.name.toLowerCase().indexOf(query.toLowerCase());
        const nameBefore = suggestion.name.slice(0, index);
        const queryData = suggestion.name.slice(index, index + query.length);
        const nameAfter = suggestion.name.slice(index + query.length);

        if (isHighlighted) return <Card isHighlighted={true} image={suggestion.image} nameBefore={nameBefore} bold={queryData} nameAfter={nameAfter} email={suggestion.email} alt={suggestion.alt}/>;
        else return (
          <Card image={suggestion.image} nameBefore={nameBefore} bold={queryData} nameAfter={nameAfter} email={suggestion.email} alt={suggestion.alt}/>
        )
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
      onChange: autoSuggestMethods.onChange,
      onFocus: autoSuggestMethods.onInputFocus,
      'aria-label': 'Picker input',
    };
    const stateProps = {value, suggestions, chipListState, inputProps}

    return  (
      <Picker
        stateProps={stateProps}
        autoSuggestMethods={autoSuggestMethods}
        autoSuggest
        chipComponent={Chip}
        filterPlaceHolder={'hello'}
        searchResultComponent={Chip}
      />
    );
  }
};

export default PickerAutoSuggestExample;