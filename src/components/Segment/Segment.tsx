import * as React from 'react';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { classNames } from '@shopify/react-utilities/styles';
import { SEGMENT } from '../ThemeIdentifiers';
import BodyText from '../BodyText';
import Icon, { IconList } from '../Icon';
import FlexBox from '../FlexBox';
import Button from '../Button';
import VisuallyHidden from '../VisuallyHidden';
import * as baseTheme from './Segment.scss';

interface IItem {
  id: string | number;
  label?: string | React.ReactNode;
  subText?: string | React.ReactNode;
  // Component can show any icon by passing the source
  iconSource?: keyof typeof IconList;
  title: string;
  [key: string]: any;
}

export interface Props {
  items: IItem[];
  activeItemId: string | number;
  // Callback function to be called when tab is clicked/selected
  onClick?(activeItem: IItem): void;
  // Set a custom class
  componentClass?: string;
  // User can Set style for TabPanel component
  componentStyle?: React.CSSProperties;
  // Set theme for TabPanel
  theme?: any;
}

const Segment: React.FC<Props> = (props) => {

  const { componentClass, theme } = props;
  const { activeItemId, items, onClick = () => { } } = props;
  const rootClasses = classNames(componentClass, theme.SegmentWrap);

  const getLabelComponent = (item: IItem) => {
    const { label, iconSource, title } = item;
    let labelComponent;
    const iconComponent = iconSource &&
      <>
        <Icon componentClass={theme.labelIcon} source={iconSource} />
        {title && <VisuallyHidden>{title}</VisuallyHidden>}
      </>;
    if (!label) {
      return iconComponent;
    }
    if (typeof label === 'string') {
      labelComponent = (
        <FlexBox justify="Center" componentClass={theme.labelIconWrap}>
          {iconComponent}
          <BodyText element="span" componentClass={theme.segmentLabel}>{label}</BodyText>
        </FlexBox>
      );
    } else {
      labelComponent = label;
    }
    return labelComponent;
  };

  const getSubTextComponent = (item: IItem) => {
    const { subText } = item;
    let subTextComponent;
    if (!subText) {
      return null;
    }
    if (typeof subText === 'string') {
      subTextComponent = <BodyText element="span" componentClass={theme.segmentSubText}>{subText}</BodyText>;
    } else {
      subTextComponent = subText;
    }
    return subTextComponent;
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <div className={rootClasses}>
      <FlexBox direction="Row">
        {items.map((item: IItem) => {
          const segmentClasses = classNames(theme.SegmentButton, activeItemId === item.id && theme.active);
          const isDisabled = activeItemId === item.id;
          return (
            <Button componentSize="slim" title={item.title} key={item.id} componentClass={segmentClasses} disabled={isDisabled} onClick={() => onClick(item)}>
              {getLabelComponent(item)}
              {getSubTextComponent(item)}
            </Button>
          );
        })}
      </FlexBox>
    </div>
  );
};

export default themr(SEGMENT, baseTheme)(Segment) as ThemedComponentClass<
  Props,
  {}
>;
