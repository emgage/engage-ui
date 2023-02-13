import * as React from 'react';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { classNames } from '@shopify/react-utilities/styles';
import { CHIP } from '../ThemeIdentifiers';
import * as baseTheme from './Chip.scss';
import Icon, { IconList } from '../Icon';
import Button from '../Button';

export interface Props {
  // Makes the chips body area clickable.
  clickable?: boolean;
  // Enables the deletion of chips through the remove icon or the Delete/Backspace key.
  removable?: boolean;
  // The image url and alt tag that will be shown in the chip.
  image?: {
    url: string,
    alt?: string,
  };
  // Make the chip transparent.
  transparent?: boolean;
  // Theme to be injected via css-themr
  theme?: any;
  // Fired when remove button on chip is clicked.
  onRemove?(event: React.FormEvent<HTMLElement>): void;
  // Makes the chips body area clickable.
  onClick?(event: React.FormEvent<HTMLElement>): void;
  // The content to display inside chip.
  children?: string | React.ReactNode;
  // Icon replace default cancel icon
  icon?: keyof typeof IconList;
  // Icon click handler
  onIconClick?(): void;
  label?: string;
  outlined?: boolean
}

export interface State {
  iconHover: boolean;
}
class Chip extends React.PureComponent<Props, any, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
    iconHover:false
    };
  }
  

  onKeyDown = (item: React.FormEvent<HTMLElement>, e: KeyboardEvent) => {
    if (e.keyCode === 8 || e.keyCode === 46) {
      return this.props.onRemove ? this.props.onRemove(item) : null;
    }
  }

  render() {
    const {
      clickable = false,
      removable = false,
      image,
      transparent = false,
      theme,
      onRemove,
      onClick,
      children,
      label,
      outlined,
    } = this.props;

    const className = classNames(
      theme.Chip,
      outlined && theme.outlinedChip,
      transparent && theme.transparent);

    const firstIconComponent = (
      image && image.url
        ?
        (typeof image.url === 'object' ?
          <span className={theme.firstIcon}>
            <Icon source={image.url} theme={theme} />
          </span>
          : <span className={theme.ChipImage}><img className={theme.Image} src={image.url} alt={image.alt} key="1" aria-hidden /></span>
        )
        : ''
    );

    const chipTextComponent = (
      <span onMouseEnter={()=>this.setState({iconHover:true})} style={{paddingRight: !removable? 0 : 9}} className={theme.chipContent} key="2">
        {(firstIconComponent || label) &&
          <Button onClick={clickable && onClick || (() => { })} componentSize="slim" plain componentClass={theme.chipButtonContent} title={label}>
            {firstIconComponent}
            <span className={this.state.iconHover ? theme.ChipLabel : theme.ChipLabelHover}>{label}</span>                                                                                                                                                                                                                             
          </Button>
        }
        {children &&
          <span onMouseEnter={()=>this.setState({iconHover:false})} onMouseLeave={()=>this.setState({iconHover:true})} className={removable ? theme.ChipChildSpace : theme.ChipChild}>{children}</span>
        }
        {removable &&
        <span style={{ marginLeft : !children ? '-5px':'0px'}} className={theme.removeIcon} onMouseEnter={()=>this.setState({iconHover:false})} onMouseLeave={()=>this.setState({iconHover:true})}>
          <Button componentClass={theme.Remove} aria-label={'Remove ' + children} onClick={onRemove} componentSize="slim" plain accessibilityLabel="Remove" title="Remove">
            <Icon  source='cancelSmall' theme={theme} />
          </Button>
          </span>
        }
      </span>
    );

    // const isRemovable = removable &&
    //   (<Button componentClass={theme.Remove} aria-label={'Remove ' + children} onClick={onRemove} componentSize="slim" plain accessibilityLabel="Remove" title="Remove">
    //     <Icon source="cancel" theme={theme} />
    //   </Button>
    //   );

    return (
      <div className={className} onKeyDown={removable ? this.onKeyDown.bind(this, Event) : null}>
        {chipTextComponent}
        {/* {isRemovable} */}
      </div>
    );
  }
}

export default themr(CHIP, baseTheme)(Chip) as ThemedComponentClass<Props, {}>;
