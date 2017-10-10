import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import { classNames } from '@shopify/react-utilities/styles';
import { DisplayMoreInfo } from '../Picker/PickerEnum';
import { CHIP } from '../ThemeIdentifiers';
import * as baseTheme from './Chip.scss';

export interface Props {
  clickable?: boolean;
  removable?: boolean;
  image?: {
    url: string,
  };
  transparent?: boolean;
  moreInfoComponent?: React.ReactNode;
  moreInfoComponentShowOn?: DisplayMoreInfo;
  style?: React.CSSProperties;
  theme?: any;
  onRemove?(event: any): void;
  onClick?(event: any): void;
  handleMoreInfo?(): void;
  key?: any;
  markedForDelete?: boolean;
  tabIndex?: number;
  autoSuggestMethods?: any;
  onfocus?(event: any): void;
}

class Chip extends React.PureComponent<Props, any> {
  render() {
    const {
      clickable,
      removable,
      image,
      transparent,
      theme,
    } = this.props;

    let className;

    if (this.props.markedForDelete) {
      className = classNames(
        theme.Chip,
        theme.markedForDelete,
        transparent && theme.transparent
      );
    } else {
      className = classNames(
          theme.Chip,
          transparent && theme.transparent
      );
    }

    const chipContents = [(
      image
      ?
      <img className={theme.Image} src={image.url} aria-hidden key="1" />
      : ''
    ),
      <span key="2">
        {this.props.children}
      </span>,
    ];

    const ariaLabel = this.props.markedForDelete ? 'label' : '';
    // console.log('tabIndex', this.props.tabIndex);
    return (
      <div
        className={className}
        tabIndex={this.props.tabIndex === 0 ? this.props.tabIndex : -1}
        onFocus={this.props.autoSuggestMethods ? this.props.autoSuggestMethods.onfocus : ''}
        /* onFocusOut={} */
        ref={this.props.autoSuggestMethods ? this.props.autoSuggestMethods.storeFocus : ''}
      >
        {
          clickable
            ?
            <a onClick={this.props.onClick} aria-disabled={false} role={'alert'} tabIndex={!this.props.tabIndex ? 0 : -1}>
              {chipContents}
            </a>
            :
            chipContents
        }
        {
          removable
              ?
              <button type="button" className={theme.Remove} aria-label={'Marked ' + this.props.children + ' for removal'} role={'alert'} onClick={this.props.onRemove} tabIndex={-1}>
                <span hidden>{ariaLabel}</span>
                <span aria-hidden="true">×</span>
              </button>
              : ''
        }
      </div>
    );
  }
}

export default themr(CHIP, baseTheme)(Chip) as ThemedComponentClass<Props, {}>;
