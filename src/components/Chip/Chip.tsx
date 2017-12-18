import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import { classNames } from '@shopify/react-utilities/styles';
import { DisplayMoreInfo } from '../Picker/PickerEnum';
import { CHIP } from '../ThemeIdentifiers';
import * as baseTheme from './Chip.scss';
import { IAutoSuggestMethods } from '../Picker/Picker';

export interface Props {
  clickable?: boolean;
  removable?: boolean;
  image?: {
    url: string,
    alt?: string,
  };
  transparent?: boolean;
  moreInfoComponent?: React.ReactNode;
  moreInfoComponentShowOn?: DisplayMoreInfo;
  style?: React.CSSProperties;
  theme?: any;
  onRemove?(event: React.FormEvent<HTMLElement>): void;
  onClick?(event: React.FormEvent<HTMLElement>): void;
  handleMoreInfo?(): void;
  key?: number;
  tabIndex?: number;
  autoSuggestMethods?: IAutoSuggestMethods;
  onfocus?(event: Event): void;
  id?: number;
}

class Chip extends React.PureComponent<Props, {}> {

  onFocus = () => {
    return this.props.autoSuggestMethods ? this.props.autoSuggestMethods.onfocus : '';
  }

  onBlur = () => {
    return this.props.autoSuggestMethods ? this.props.autoSuggestMethods.onFocusOut : '';
  }

  onClick = (item: React.FormEvent<HTMLElement>) => {
    return this.props.onClick ? this.props.onClick(item) : '';
  }

  render() {
    const {
      clickable,
      removable,
      image,
      transparent,
      theme,
    } = this.props;

    const className = classNames(
      theme.Chip,
      transparent && theme.transparent
    );

    const deleteInstruct = this.props.removable ? 'Press delete to remove this chip' : '';

    const chipContents = [(
      image
        ?
        <img className={theme.Image} src={image.url} alt={image.alt} aria-hidden key="1" />
        : ''
    ),
      <span key="2">
      {this.props.children}
      <span className={theme.hidden}>{deleteInstruct}</span>
    </span>,
    ];

    return (
      <div
        className={className}
        tabIndex={this.props.tabIndex === 0 ? this.props.tabIndex : -1}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        role="option"
      >
        {
          clickable
            ?
            <a onClick={this.onClick.bind(this)} aria-disabled={false} role={'alert'} tabIndex={!this.props.tabIndex ? 0 : -1}>
              {chipContents}
            </a>
            :
            chipContents
        }
        {
          removable
            ?
            <button type="button" className={theme.Remove} role={'alert'} onClick={this.props.onRemove} tabIndex={-1}>
              <span aria-hidden="true">×</span>
            </button>
            : ''
        }
      </div>
    );
  }
}

export default themr(CHIP, baseTheme)(Chip) as ThemedComponentClass<Props, {}>;
