import * as React from 'react';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';

import { SEARCH_HELPER } from '../ThemeIdentifiers';
import * as baseTheme from './SearchHelper.scss';
import { FlexBox, Tooltip, List, Item, BodyText, Icon } from './../../components';

export interface Props {
  // Css class name
  componentClass?: string;
  theme?: any;
}

const SearchHelper = ({ componentClass = '' }: Props) => {

  return (
    <FlexBox componentClass={componentClass} justify="Start">
      Use special operators ( +, |, –, ", * ) to narrow your search.
      <Tooltip content={
        <List componentType="default">
          <Item>
            <FlexBox justify="SpaceBetween" componentStyle={{ maxWidth: 350 }}>
              <BodyText componentSize="default" element="div" componentColor="reverse">+</BodyText>
              <BodyText componentSize="default" element="div" componentColor="reverse" componentStyle={{ flex: 1, paddingLeft: '1rem' }}>Put + between words to search for matches including both words. Ex: both+words</BodyText>
            </FlexBox>
          </Item>
          <Item>
            <FlexBox justify="SpaceBetween" componentStyle={{ maxWidth: 350 }}>
              <BodyText componentSize="default" element="div" componentColor="reverse">|</BodyText>
              <BodyText componentSize="default" element="div" componentColor="reverse" componentStyle={{ flex: 1, paddingLeft: '1rem' }}>Put | between words to search for matches with at least one word included. Ex: either|word</BodyText>
            </FlexBox>
          </Item>
          <Item>
            <FlexBox justify="SpaceBetween" componentStyle={{ maxWidth: 350 }}>
              <BodyText componentSize="default" element="div" componentColor="reverse">-</BodyText>
              <BodyText componentSize="default" element="div" componentColor="reverse" componentStyle={{ flex: 1, paddingLeft: '1rem' }}>Put - before a word to exclude that word from your search. Ex: cat -hat</BodyText>
            </FlexBox>
          </Item>
          <Item>
            <FlexBox justify="SpaceBetween" componentStyle={{ maxWidth: 350 }}>
              <BodyText componentSize="default" element="div" componentColor="reverse">"</BodyText>
              <BodyText componentSize="default" element="div" componentColor="reverse" componentStyle={{ flex: 1, paddingLeft: '1rem' }}>Use quotes to search for an exact phrase. Ex: “exact match”</BodyText>
            </FlexBox>
          </Item>
          <Item>
            <FlexBox justify="SpaceBetween" componentStyle={{ maxWidth: 350 }}>
              <BodyText componentSize="default" element="div" componentColor="reverse">*</BodyText>
              <BodyText componentSize="default" element="div" componentColor="reverse" componentStyle={{ flex: 1, paddingLeft: '1rem' }}>Add * after a term to search for matches starting with that “term”. Ex: prefix*</BodyText>
            </FlexBox>
          </Item>
          <Item>
            <FlexBox justify="SpaceBetween" componentStyle={{ maxWidth: 350 }}>
              <BodyText componentSize="default" element="p" componentColor="reverse">To use any of these characters literally, simply add a preceding backslash (\).</BodyText>
            </FlexBox>
          </Item>
        </List>
      }>
        <Icon source="infoCircle" componentColor="inkLight" />
      </Tooltip>
    </FlexBox>
  );
};

export default themr(SEARCH_HELPER, baseTheme)(SearchHelper) as ThemedComponentClass<
  Props,
  {}
>;
