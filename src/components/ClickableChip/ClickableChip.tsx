import * as React from 'react';
import { themr, ThemedComponentClass } from 'react-css-themr';
import Popover from '../Popover/Popover';
import { CLICKABLECHIP } from '../ThemeIdentifiers';
import * as baseTheme from './ClickableChip.scss';

export interface State {
    active: boolean,
}
export interface Props {
    chip: React.ReactElement<any>,
    style?: React.CSSProperties,
    theme?: any,
    onClick?(): void,
};

class ClickableChip extends React.PureComponent<Props, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            active: false,
        };
    }
    render() {
        const {
            chip,
            onClick = this.handleClick,
        } = this.props;
        const updatedChip = React.cloneElement(chip, { clickable: true, onClick });
        return (
            <Popover active={this.state.active} activator={updatedChip} >
                {this.props.children}
            </Popover>
        );
    }
    private handleClick = () => {
        this.setState({ ['active']: !this.state.active });
    }
}

export default themr(CLICKABLECHIP, baseTheme)(ClickableChip) as ThemedComponentClass<Props, State>;
