import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import autobind from '@shopify/javascript-utilities/autobind';
import { classNames } from '@shopify/react-utilities/styles';
import AutoSuggestText from './AutoSuggestText';

import Labelled from '../Labelled';
import { TEXT_FIELD } from '../ThemeIdentifiers';

import * as baseTheme from './TextField.scss';

export type Type = 'text' | 'email' | 'number' | 'password' | 'search' | 'tel' | 'url' | 'date' | 'datetime-local' | 'month' | 'time' | 'week';

export interface State {
  height?: number | null;
  focused?: boolean;
}

export interface Props {
  placeholder?: string;
  value?: string;
  label: string;
  required?: boolean;
  theme?: any;
  onChange?(value: string): void;
}

class TextField extends React.PureComponent<Props, State> {
  state: State = { height: null };

  private input: HTMLElement;

  render() {
    const {
      value = '',
      placeholder,
      // label,
      required,
      theme,
    } = this.props;

    const className = classNames(
      theme.textField,
      Boolean(value) && theme.hasValue,
      theme.disabled,
      theme.readOnly,
      theme.error,
      theme.multiline,
      theme.backdrop
    );
    const input = React.createElement('input', {
      name,
      value,
      placeholder,
      required,
      formNoValidate: true,
      className: theme.input,
      onChange: this.handleChange,
      ref: this.setInput,
      'aria-required': required ? true : false,
    });
    console.log('input:', input);

    const hasValue = (!!this.props.value && this.props.value.length > 0);

    return (
      <Labelled
        label={'label'}
        id={'hi'}
        action={undefined}
        focused={this.state.focused}
        hasValue={hasValue}
        required={required}
      >
             <div id={'lookatme!!'}
            className={className}
            >
               {/* {input}  */}
                <AutoSuggestText
              itemsList={[
                { key: 1, image: 'http://msaadvertising.com/wp-content/uploads/2014/06/Larry-cartoon-headshot.jpg', name: 'John Doe', email: 'test@gmail.com', markedForDelete: false },
                { key: 2, image: 'http://cdn.photographyproject.com.au/wp-content/uploads/2013/04/corporate-headshot.jpg', name: 'Pedro Sanchez', email: 'pedrosanchez@gmail.com' },
                { key: 3, image: 'https://media.licdn.com/mpr/mpr/p/5/005/08f/04d/02df10d.jpg', name: 'Jane Doe', email: 'jane@gmail.com' },
                { key: 4, image: 'http://www.roanokecreditrepair.com/wp-content/uploads/2016/06/Headshot-1.png', name: 'Person McPerson', email: 'yahoogmail@gmail.com' },
                { key: 5, image: 'https://d38zhw9ti31loc.cloudfront.net/wp-content/uploads/2013/07/Crystal-headshot-new.jpg', name: 'Laura Person', email: 'yahooldjadslkjgmail@gmail.com' },
                { key: 6, image: 'https://d38zhw9ti31loc.cloudfront.net/wp-content/uploads/2013/07/Crystal-headshot-new.jpg', name: 'Laura Person', email: 'slkjgmail@gmail.com' },
              ]}
            />
            {/* <div
              className={theme.backdrop}
              id={'backdrop!!'}
            >
            </div> */}
          </div>
      </Labelled>
    );
  }

  @autobind
  private setInput(input: HTMLElement) {
    this.input = input;
  }
  @autobind
  private handleChange(event: React.FormEvent<HTMLInputElement>) {
    const { onChange } = this.props;
    if (onChange == null) { return; }
    onChange(event.currentTarget.value);
  }
}

export { TextField as UnthemedTextField };
export default themr(TEXT_FIELD, baseTheme)(TextField) as ThemedComponentClass<Props, State>;
