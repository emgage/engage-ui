import Heading from '../Heading';
import * as React from 'react';
import Button from '../Button';
import Checkbox from '../Checkbox';
import TextField from '../TextField';
import { Card, CardBody } from '../Card';
import BodyText from '../BodyText';
import * as baseTheme from './MultipleCheckboxFacets.scss'
import FlexBox from '../FlexBox/FlexBox';
import Icon from '../Icon/Icon';

function getNewClassName(newClassName: string) {
  if (!Array.isArray(newClassName)) return newClassName;
  return newClassName.filter(name => name).join(' ');
}

export function appendClassName(baseClassName: string, newClassName: string) {
  if (!newClassName) return baseClassName || '';
  if (!baseClassName) return getNewClassName(newClassName) || '';
  return `${baseClassName} ${getNewClassName(newClassName)}`;
}

export function getFilterValueDisplay(filterValue: any) {
  if (filterValue === undefined || filterValue === null) return '';
  if (filterValue.hasOwnProperty('name')) return filterValue.name;
  return String(filterValue);
}

interface IOptions {
  name: string;
  value: string | number;
  count?: number;
  selected: boolean;
}

interface IProps {
  className?: string;
  label?: string;
  onMoreClick?(events: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
  onRemove(value?: string): void;
  onSelect(value?: string): void;
  onSearch?(value?: string): void;
  defaultOptions?: IOptions[];
  options: IOptions[];
  searchPlaceholder?: string;
  showMore?: boolean;
  showSearch?: boolean;
  hideLabel?: boolean;
  labelId?: string;
  isAccordion?: boolean;
}

function multiCheckboxFacet({
  className = '',
  label,
  onMoreClick,
  onRemove,
  onSelect,
  options,
  defaultOptions = [],
  showMore = false,
  showSearch = false,
  onSearch,
  searchPlaceholder,
  labelId,
  isAccordion

}: IProps) {

  const ref:any = React.useRef(null);
  const [open, toggle] = React.useState(!isAccordion);

  const handleClickOutside = (event: any) => {
    if (ref && ref.current && !ref.current.contains(event.target)) {
      toggle(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  const labelStyle = {
    paddingLeft: '1.25rem',
    paddingTop: '1.25rem'
  }

  const labelStyleIfAccordion = {
    paddingLeft: '1.6rem',
    paddingTop: '.8rem',
    cursor: 'pointer',
    fontWeight:'normal',
  }

  return (
    <div ref={ref}>
      <Card componentClass={isAccordion && baseTheme.card}>
        {label ?
          <div onClick={() => { isAccordion && toggle(!open) }} style={{ cursor: 'pointer' }}>
            <FlexBox justify='SpaceBetween' align='Center'>
              <Heading
                componentClass="facets-title" element="h4" componentStyle={isAccordion ? labelStyleIfAccordion : labelStyle}>
                {label}
              </Heading>
              {isAccordion && <Icon componentClass={baseTheme.arrowIcon} source='caretDown'></Icon>}
            </FlexBox>
          </div>
          : <></>
        }
        <CardBody theme={{ 'body': isAccordion ? baseTheme.cardBody : '' }}>
          {(open && isAccordion) && <div className={baseTheme.tip}></div>}
          <div className={!isAccordion ? baseTheme.defaultStyle : open ? baseTheme.isAccordion : baseTheme.isAccordionNot}>
            {showSearch && (
              <div className="facet-search" style={{ marginBottom: 12 }}>
                <TextField
                  type="text"
                  label={searchPlaceholder || 'Search'}
                  onChange={(value) => {
                    if (onSearch) {
                      onSearch(value);
                    }
                  }}
                />
              </div>
            )}

            <div className="facet-checkbox-container">
              {[...options, ...defaultOptions].length < 1 && <div>No matching options</div>}
              {defaultOptions && defaultOptions.length > 0 && <div style={{ borderBottom: '1px solid #e5e5e5', marginBottom: '7px' }}>
                {defaultOptions.map((option: any) => {
                  const checked = option.selected;
                  return (
                    <div style={{ display: 'flex', flex: 1, marginBottom: 8 }} key={option.value}>
                      <div style={{ flex: 1 }}>
                        <Checkbox
                          checked={checked}
                          componentId={`defaultOptions_example_facet_${labelId ? labelId : label}${getFilterValueDisplay(
                            option.value
                          )}`}
                          label={getFilterValueDisplay(option.name)}
                          onChange={() =>
                            checked ? onRemove(option.value) : onSelect(option.value)
                          }
                        />
                      </div>
                      {option.count &&
                        <div style={{ display: 'flex', alignItems: 'center' }} className="facet-option-count">
                          <BodyText element="span" componentColor="mid">{option.count && option.count.toLocaleString('en')}</BodyText>
                        </div>
                      }
                    </div>
                  );
                })}
              </div>}
              {options.map((option: any) => {
                const checked = option.selected;
                return (
                  <div style={{ display: 'flex', flex: 1, marginBottom: 8 }} key={option.value}>
                    <div style={{ flex: 1 }}>
                      <Checkbox
                        checked={checked}
                        componentId={`example_facet_${labelId ? labelId : label}${getFilterValueDisplay(
                          option.value
                        )}`}
                        label={getFilterValueDisplay(option.name)}
                        onChange={() =>
                          checked ? onRemove(option.value) : onSelect(option.value)
                        }
                      />
                    </div>
                    {option.count &&
                      <div style={{ display: 'flex', alignItems: 'center' }} className="facet-option-count">
                        <BodyText element="span" componentColor="mid">{option.count && option.count.toLocaleString('en')}</BodyText>
                      </div>
                    }
                  </div>
                );
              })}
            </div>
            {showMore && (
              <Button
                plain
                onClick={onMoreClick}
              >
                + More
              </Button>
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default multiCheckboxFacet;
