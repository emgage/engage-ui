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
    alt?: string,
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
        transparent && theme.transparent,
      );
    } else {
      className = classNames(
          theme.Chip,
          transparent && theme.transparent,
      );
    }

    const chipContents = [(
      image
      ?
      <img className={theme.Image} src={image.url} alt={image.alt} key="1" />
      : ''
    ),
      <span key="2">
        {this.props.children}
      </span>,
    ];

    return (
            <div className={className}>
                {
                    clickable
                        ?
                        <a onClick={this.props.onClick} aria-disabled={false} tabIndex={0}>
                            {chipContents}
                        </a>
                        :
                        chipContents
                }
                {
                    removable
                        ?
                        <button type="button" className={theme.Remove} aria-label="Remove" onClick={this.props.onRemove}>
                            <span aria-hidden="true">×</span>
                        </button>
                        : ''
                }
            </div>
    );
  }
}

export default themr(CHIP, baseTheme)(Chip) as ThemedComponentClass<Props, {}>;
