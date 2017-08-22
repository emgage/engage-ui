import * as Autosuggest from 'react-autosuggest';
import * as React from 'react';
import Card from './Card';
import * as style from './Picker.scss';
import Chip from '../Chip';

// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters

function escapeRegexCharacters(str:any) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function renderSuggestion(suggestion:any, { isHighlighted }:any) {
  if (isHighlighted) return <Card isHighlighted={true} image={suggestion.image} name={suggestion.name} email={suggestion.email}/>;
  else return (
    <Card image={suggestion.image} name={suggestion.name} email={suggestion.email}/>
  );
}

function suggestion() {
}

export interface Props {
  // array: { key: number, image: string, name: string, email: string, grey: boolean }[];
}

export interface State {
  chipListState: { key: any, image?: string, text: string, email?: string, grey?: boolean }[];
  value: string;
  suggestions: object[];
  languages: { key: any, image?: string, email?: string, grey?: boolean, name: any }[];
}

class AutoSuggestTest extends React.Component<Props, State> {
  constructor() {
    super();

    this.state = {
      value: '',
      suggestions: [],
      chipListState: [
      ],
      languages: [
        { key: 1, image: 'http://msaadvertising.com/wp-content/uploads/2014/06/Larry-cartoon-headshot.jpg', name: 'John Doe', email: 'test@gmail.com' },
        { key: 2, image: 'http://cdn.photographyproject.com.au/wp-content/uploads/2013/04/corporate-headshot.jpg', name: 'Pedro Sanchez', email: 'pedrosanchez@gmail.com' },
        { key: 3, image: 'https://media.licdn.com/mpr/mpr/p/5/005/08f/04d/02df10d.jpg', name: 'Jane Doe', email: 'jane@gmail.com' },
        { key: 4, image: 'http://www.roanokecreditrepair.com/wp-content/uploads/2016/06/Headshot-1.png', name: 'Person McPerson', email: 'yahoogmail@gmail.com' },
        { key: 5, image: 'https://d38zhw9ti31loc.cloudfront.net/wp-content/uploads/2013/07/Crystal-headshot-new.jpg', name: 'Laura Person', email: 'yahooldjadslkjgmail@gmail.com' },
        { key: 6, image: 'https://d38zhw9ti31loc.cloudfront.net/wp-content/uploads/2013/07/Crystal-headshot-new.jpg', name: 'Laura Person', email: 'slkjgmail@gmail.com' },
      ],
    };
  }
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  }
  getSuggestions = (value:any) => {
    const escapedValue = escapeRegexCharacters(value.trim());
    
    if (escapedValue === '') {
      return [];
    }

    const regex = new RegExp('^' + escapedValue, 'i');

    return this.state.languages.filter(language => regex.test(language.name));
  }

  getSuggestionValue = (suggestion:any) => {
    // this.languages.splice(languages.indexOf(suggestion), 1);
    // this.setState({ suggestions: [] });
    // this.state.chipListState.push({ text: suggestion.name });
    return suggestion.name;
  }
  onChange = (event:any, { newValue, method }:any) => {
    this.setState({
      value: newValue,
    });
  }
  // handler = (e:any) => {
  //   e.stopPropagation();
  //   e.preventDefault();
  //   console.log('clicks disabled!!');
  // }
  
  onSuggestionsFetchRequested = ({ value }:any) => {
    this.setState({
      suggestions: this.getSuggestions(value),
    });


    // document.addEventListener('click',this.handler,true);
  }

  chipClick = () => {
    console.log('chip clicked...');
  }

  updateList = (input: any) => {
    const langIndex = this.state.languages.indexOf(input);
    const languagesLength = this.state.languages;
    const newLangState = languagesLength.slice(0, langIndex).concat(languagesLength.slice(langIndex + 1, languagesLength.length));

    this.setState({ languages: newLangState });
  }

  onSuggestionSelected = (event:any, { suggestion }: any) => {
    suggestion.text = suggestion.name;
    this.updateList(suggestion);
    const chipListState = this.state.chipListState.concat(suggestion);
    this.setState({
      chipListState,
      value: '',
    });
  }

  chipRemove = (input:any) => {
    // console.log('input:', input);
    const index = this.state.chipListState.indexOf(input);
    const chipLength = this.state.chipListState;
    const newChipState = chipLength.slice(0, index).concat(chipLength.slice(index + 1, chipLength.length));

    this.setState({ chipListState: newChipState });

    const languagesList = this.state.languages.concat(input);
    this.setState({ languages: languagesList });

    console.log('chip removed...');
  }

  render() {
    const { value, suggestions, chipListState }:any = this.state;
    const inputProps = {
      value,
      placeholder: '',
      onChange: this.onChange,
    };

    return (
      <div className={style.inputOutline}>
        { chipListState.map((input: any) => <Chip removable={true} onRemove={() => this.chipRemove(input)} key={input.key}>{input.text}</Chip>) }
        <Autosuggest 
          className={style.suggestionsContainer}
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={this.getSuggestionValue}
          onSuggestionSelected={this.onSuggestionSelected}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps} 
          onSuggestionHighlighted={suggestion}
          highlightFirstSuggestion={true}
          theme={{ 
            container: style.container,
            suggestions: style.cardItem,
            suggestionsList: style.suggestionsList,
            input: style.autosuggestInput,
          }} 
          />
      </div>
    );
  }
}

// ReactDOM.render(<Test />, document.getElementById('app'));
export default AutoSuggestTest;
