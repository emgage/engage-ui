import * as React from 'react';
import { MoreInfoOn } from '../Picker/PickerEnum';

export interface Props {
    clickable?: boolean,
    removable?: boolean,
    image?: {
                url: string,
                alt: string,
            },
    transparent?: boolean,
    moreInfoComponent?: React.ReactNode,
    moreInfoComponentShowOn?: MoreInfoOn,
    onRemove?(event: any): void,
    onClick?(event: any): void,
    handleMoreInfo?(): void,
};

export default class Chip extends React.PureComponent<Props, any> {
    public static defaultProps: Partial<Props> = {
        clickable: false,
        removable: false,
        image: undefined,
        transparent: false,
        onRemove: () => undefined,
        onClick: () => undefined,
        handleMoreInfo: () => undefined,
    };

    getChipCssClass(): string {
        let chipCssClass = 'cm-chip';

        if (this.props.clickable) {
            chipCssClass += ' cm-chip-clickable';
        }

        if (this.props.removable) {
            chipCssClass += ' cm-chip-removable';
        }

        if (this.props.transparent) {
            chipCssClass += ' cm-chip-transparent';
        }

        return chipCssClass;
    }

    render() {
        const chipCssClass = this.getChipCssClass();

        const chipContents = [(
        this.props.image
            ?
            <img className="cm-chip-image" src={this.props.image.url} alt={this.props.image.alt} key="1" />
            : ''
        ),
        <span key="2">
            {this.props.children}
        </span>,
        ];

        return (
            <span className={chipCssClass}>
                {
                this.props.clickable
                    ?
                    <a onClick={this.props.onClick} aria-disabled={false} tabIndex={0}>
                        {chipContents}
                    </a>
                    :
                    chipContents
                }
                {
                this.props.removable
                ?
                  <button type="button" className="cm-remove" aria-label="Remove" onClick={this.props.onRemove}>
                     <span aria-hidden="true">×</span>
                  </button>
                : ''
                }
            </span>
        );
    }
}
