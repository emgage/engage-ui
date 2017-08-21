import * as Autosuggest from 'react-autosuggest';
import * as React from 'react';
import Card from './Card';
import * as style from './Picker.scss';
import Chip from '../Chip';

// const languages = [
//   { key: 1, image: 'http://msaadvertising.com/wp-content/uploads/2014/06/Larry-cartoon-headshot.jpg', name: 'John Doe', email: 'test@gmail.com', grey: false },
//   { key: 2, image: 'http://cdn.photographyproject.com.au/wp-content/uploads/2013/04/corporate-headshot.jpg', name: 'Pedro Sanchez', email: 'pedrosanchez@gmail.com', grey: false },
//   { key: 3, image: 'https://media.licdn.com/mpr/mpr/p/5/005/08f/04d/02df10d.jpg', name: 'Jane Doe', email: 'jane@gmail.com', grey: false },
//   { key: 4, image: 'http://www.roanokecreditrepair.com/wp-content/uploads/2016/06/Headshot-1.png', name: 'Person McPerson', email: 'yahoogmail@gmail.com', grey: false },
//   { key: 5, image: 'https://d38zhw9ti31loc.cloudfront.net/wp-content/uploads/2013/07/Crystal-headshot-new.jpg', name: 'Laura Person', email: 'yahooldjadslkjgmail@gmail.com', grey: false },
//   { key: 6, image: 'https://d38zhw9ti31loc.cloudfront.net/wp-content/uploads/2013/07/Crystal-headshot-new.jpg', name: 'Laura Person', email: 'slkjgmail@gmail.com', grey: false },
// ];

// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
function escapeRegexCharacters(str:any) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function renderSuggestion(suggestion:any) {
  return (
    <Card image={suggestion.image} name={suggestion.name} email={suggestion.email} grey={suggestion.grey} />
  );
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
        { key: 1, image: 'http://msaadvertising.com/wp-content/uploads/2014/06/Larry-cartoon-headshot.jpg', name: 'John Doe', email: 'test@gmail.com', grey: false },
        { key: 2, image: 'http://cdn.photographyproject.com.au/wp-content/uploads/2013/04/corporate-headshot.jpg', name: 'Pedro Sanchez', email: 'pedrosanchez@gmail.com', grey: false },
        { key: 3, image: 'https://media.licdn.com/mpr/mpr/p/5/005/08f/04d/02df10d.jpg', name: 'Jane Doe', email: 'jane@gmail.com', grey: false },
        { key: 4, image: 'http://www.roanokecreditrepair.com/wp-content/uploads/2016/06/Headshot-1.png', name: 'Person McPerson', email: 'yahoogmail@gmail.com', grey: false },
        { key: 5, image: 'https://d38zhw9ti31loc.cloudfront.net/wp-content/uploads/2013/07/Crystal-headshot-new.jpg', name: 'Laura Person', email: 'yahooldjadslkjgmail@gmail.com', grey: false },
        { key: 6, image: 'https://d38zhw9ti31loc.cloudfront.net/wp-content/uploads/2013/07/Crystal-headshot-new.jpg', name: 'Laura Person', email: 'slkjgmail@gmail.com', grey: false },
      ],
    };
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
    suggestion.text = suggestion.name;
    const chipListState = this.state.chipListState.concat(suggestion);
    this.setState({ chipListState });
    this.updateList(suggestion);
    // this.languages.splice(languages.indexOf(suggestion), 1);
    // this.setState({ suggestions: [] });
    // this.state.chipListState.push({ text: suggestion.name });
    return '';
  }
  onChange = (event:any, { newValue, method }:any) => {
    this.setState({
      value: newValue,
    });
  }
  
  onSuggestionsFetchRequested = ({ value }:any) => {
    this.setState({
      suggestions: this.getSuggestions(value),
    });
  }

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  }

  chipClick = () => {
    console.log('chip clicked...');
  }

  updateList = (input: any) => {
    const langIndex = this.state.languages.indexOf(input);
    console.log('langIndex:', langIndex);
    const languagesLength = this.state.languages;
    console.log('languagesLength:', languagesLength);
    const newLangState = languagesLength.slice(0, langIndex).concat(languagesLength.slice(langIndex + 1, languagesLength.length));
    console.log('newLangState:', newLangState);

    this.setState({ languages: newLangState });
  }

  chipRemove = (input:any) => {
    console.log('input:', input);
    const index = this.state.chipListState.indexOf(input);
    console.log('index:', index);
    const chipLength = this.state.chipListState;
    const newChipState = chipLength.slice(0, index).concat(chipLength.slice(index + 1, chipLength.length));

    console.log('newChipState:', newChipState);
    this.setState({ chipListState: newChipState });

    const languagesList = this.state.languages.concat(input);
    this.setState({ languages: languagesList });

    // console.log('remove this:', this);

    console.log('chip removed...');

    // this.updateList(input);
  }

  render() {
    const { value, suggestions, chipListState }:any = this.state;
    const inputProps = {
      value,
      placeholder: 'please work',
      onChange: this.onChange,
    };

    return (
      <div>
        <div>
          { chipListState.map((input: any) => <div key={input.text}><Chip removable={true} onRemove={() => this.chipRemove(input)} key={input.text}>{input.text}</Chip></div>) }
        </div>
        <Autosuggest 
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={this.getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps} 
          theme={{ 
            suggestionsContainer: style.cardBorder,
            suggestion: style.cardItem,
          }} />
      </div>
    );
  }
}

// ReactDOM.render(<Test />, document.getElementById('app'));
export default AutoSuggestTest;
