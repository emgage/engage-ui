import * as Autosuggest from 'react-autosuggest';
import * as React from 'react';
import Card from './Card';
import * as style from './Picker.scss';
import Chip from '../Chip';

// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters

function escapeRegexCharacters(str:any) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function renderSuggestion(suggestion:any, { isHighlighted, query }:any) {
  const index = suggestion.name.toLowerCase().indexOf(query.toLowerCase());
  const nameBefore = suggestion.name.slice(0, index);
  const queryData = suggestion.name.slice(index, index + query.length);
  const nameAfter = suggestion.name.slice(index + query.length);

  if (isHighlighted) return <Card isHighlighted={true} image={suggestion.image} nameBefore={nameBefore} bold={queryData} nameAfter={nameAfter} email={suggestion.email}/>;
  else return (
    <Card image={suggestion.image} nameBefore={nameBefore} bold={queryData} nameAfter={nameAfter} email={suggestion.email}/>
  );
}
export interface State {
  chipListState: { key: any, image?: string, text: string, email?: string, grey?: boolean, markedForDelete?:boolean }[];
  value: string;
  suggestions: object[];
  languages: { key: any, image?: string, email?: string, grey?: boolean, name?: any, markedForDelete?: boolean }[];
  autoFocus: boolean;
}
class AutoSuggestTest extends React.Component<{}, State> {
  constructor() {
    super();

    this.state = {
      value: '',
      suggestions: [],
      chipListState: [
      ],
      autoFocus: false,
      languages: [
        { key: 1, image: 'http://msaadvertising.com/wp-content/uploads/2014/06/Larry-cartoon-headshot.jpg', name: 'John Doe', email: 'test@gmail.com', markedForDelete: false },
        { key: 2, image: 'http://cdn.photographyproject.com.au/wp-content/uploads/2013/04/corporate-headshot.jpg', name: 'Pedro Sanchez', email: 'pedrosanchez@gmail.com' },
        { key: 3, image: 'https://media.licdn.com/mpr/mpr/p/5/005/08f/04d/02df10d.jpg', name: 'Jane Doe', email: 'jane@gmail.com' },
        { key: 4, image: 'http://www.roanokecreditrepair.com/wp-content/uploads/2016/06/Headshot-1.png', name: 'Person McPerson', email: 'yahoogmail@gmail.com' },
        { key: 5, image: 'https://d38zhw9ti31loc.cloudfront.net/wp-content/uploads/2013/07/Crystal-headshot-new.jpg', name: 'Laura Person', email: 'yahooldjadslkjgmail@gmail.com' },
        { key: 6, image: 'https://d38zhw9ti31loc.cloudfront.net/wp-content/uploads/2013/07/Crystal-headshot-new.jpg', name: 'Laura Person', email: 'slkjgmail@gmail.com' },
      ],
    };
    this.componentWillMount = () => {
      console.log('componentWillMount');
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

    const regex = new RegExp(escapedValue, 'i');

    return this.state.languages.filter(language => regex.test(language.name));
  }

  getSuggestionValue = (suggestion:any) => {
    // this.languages.splice(languages.indexOf(suggestion), 1);
    // this.setState({ suggestions: [] });
    // this.state.chipListState.push({ text: suggestion.name });
    return suggestion.name;
  }
  onChange = (event:object, { newValue, method }:any) => {
    // console.log('onChange');
    this.setState({
      value: newValue,
    });
  }

  onKeyDown = (e:any) => {
    if ((e.keyCode === 8) && this.state.chipListState.length && !this.state.value.length) {
      const yellowed = this.state.chipListState.slice(this.state.chipListState.length - 1);
      console.log(yellowed[0]['markedForDelete']);
      if (yellowed[0]['markedForDelete']) {
        console.log('isyellow');
        const chipListState = this.state.chipListState.slice(0, this.state.chipListState.length - 1);
        const language = this.state.chipListState.slice(this.state.chipListState.length - 1)[0];
        delete language['text'];
        language['markedForDelete'] = false;
        const languages = this.state.languages.concat(language);
        console.log('language:', language);
        console.log('this.state.language:', languages);
        this.setState({
          chipListState,
          languages,
        });
      } else {
        console.log('not yet?');
        yellowed[0]['markedForDelete'] = true;
        this.setState({
          chipListState: this.state.chipListState,
        });
      }
    } else if (this.state.chipListState.length && !this.state.value.length) {
      if (this.state.chipListState[this.state.chipListState.length - 1]['markedForDelete']) {
        this.state.chipListState[this.state.chipListState.length - 1]['markedForDelete'] = false;
        this.setState({ chipListState: this.state.chipListState });
      }
    }
  }
  // handler = (e:any) => {
  //   e.stopPropagation();
  //   e.preventDefault();
  // }

  makeFocus = () => {
    // console.log('what is e?',e);
    console.log('focused?');
    this.setState({ autoFocus: true });
    console.log('this.state', this.state);
  }
  
  onSuggestionsFetchRequested = ({ value }:any) => {
    this.setState({
      suggestions: this.getSuggestions(value),
    });
    // document.addEventListener('click',this.handler,true);
  }

  // chipClick = () => {
  //   console.log('chip clicked...');
  // }

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
    console.log('input:', input);
    input['markedForDelete'] = false;
    const index = this.state.chipListState.indexOf(input);
    const chipLength = this.state.chipListState;
    const newChipState = chipLength.slice(0, index).concat(chipLength.slice(index + 1, chipLength.length));

    this.setState({ chipListState: newChipState });

    const languagesList = this.state.languages.concat(input);
    console.log('languagesList:', languagesList);
    this.setState({ languages: languagesList });

    this.makeFocus();
  }

  render() {
    const { value, suggestions, chipListState, autoFocus }:any = this.state;
    const inputProps = {
      value,
      autoFocus,
      placeholder: '',
      onChange: this.onChange,
      onKeyDown: this.onKeyDown,
    };

    // const autoFocus = () => {
    //   inputProps.autoFocus = true;
    // };

    return (
      <div className={style.inputOutline}>
        { chipListState.map((input: any) => <Chip image={{ url: input.image }} removable={true} onRemove={() => this.chipRemove(input)} key={input.key} markedForDelete={input.markedForDelete}>{input.text} </Chip>) }
        <Autosuggest 
          className={style.suggestionsContainer}
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={this.getSuggestionValue}
          onSuggestionSelected={this.onSuggestionSelected}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps} 
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
