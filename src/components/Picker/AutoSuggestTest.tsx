import * as Autosuggest from 'react-autosuggest';
import * as React from 'react';
import Card from './Card';
import * as style from './Picker.scss';


const languages = [
  { key: 1, image: 'http://msaadvertising.com/wp-content/uploads/2014/06/Larry-cartoon-headshot.jpg', name: 'John Doe', email: 'test@gmail.com', grey: false },
  { key: 2, image: 'http://cdn.photographyproject.com.au/wp-content/uploads/2013/04/corporate-headshot.jpg', name: 'Pedro Sanchez', email: 'pedrosanchez@gmail.com', grey: false },
  { key: 3, image: 'https://media.licdn.com/mpr/mpr/p/5/005/08f/04d/02df10d.jpg', name: 'Jane Doe', email: 'jane@gmail.com', grey: true },
  { key: 4, image: 'http://www.roanokecreditrepair.com/wp-content/uploads/2016/06/Headshot-1.png', name: 'Person McPerson', email: 'yahoogmail@gmail.com', grey: false },
  { key: 5, image: 'https://d38zhw9ti31loc.cloudfront.net/wp-content/uploads/2013/07/Crystal-headshot-new.jpg', name: 'Laura Person', email: 'yahooldjadslkjgmail@gmail.com', grey: false },
  { key: 6, image: 'https://d38zhw9ti31loc.cloudfront.net/wp-content/uploads/2013/07/Crystal-headshot-new.jpg', name: 'Laura Person', email: 'slkjgmail@gmail.com', grey: false },
];

// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
function escapeRegexCharacters(str:any) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestions(value:any) {
  const escapedValue = escapeRegexCharacters(value.trim());
  
  if (escapedValue === '') {
    return [];
  }

  const regex = new RegExp('^' + escapedValue, 'i');

  return languages.filter(language => regex.test(language.name));
}

function getSuggestionValue(suggestion:any) {
  return suggestion.name;
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
  // array?: object[];
}

class AutoSuggestTest extends React.Component<Props, {}> {
  constructor() {
    super();

    this.state = {
      value: '',
      suggestions: [],
    };    
  }

  onChange = (event:any, { newValue, method }:any) => {
    this.setState({
      value: newValue,
    });
  }
  
  onSuggestionsFetchRequested = ({ value }:any) => {
    this.setState({
      suggestions: getSuggestions(value),
    });
  }

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  }

  render() {
    const { value, suggestions }:any = this.state;
    const inputProps = {
      value,
      placeholder: 'please work',
      onChange: this.onChange,
    };

    return (
      <div>
        <Autosuggest 
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps} 
          theme={style.cardBorder} />
      </div>
    );
  }
}

// ReactDOM.render(<Test />, document.getElementById('app'));
export default AutoSuggestTest;
