import Heading from '../Heading';
import * as React from 'react';
import Button from '../Button';
import Checkbox from '../Checkbox';
import TextField from '../TextField';

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
  options: IOptions[];
  searchPlaceholder?: string;
  showMore?: boolean;
  showSearch?: boolean;
  hideLabel?: boolean;
  labelId?: string;
}

function multiCheckboxFacet({
  className = '',
  label,
  onMoreClick,
  onRemove,
  onSelect,
  options,
  showMore = false,
  showSearch = false,
  onSearch,
  searchPlaceholder,
  labelId
}: IProps) {
  return (
    <div className={appendClassName('facets-container', className)} style={{ background: '#fff', borderRadius: 8, paddingTop: 10, paddingBottom: 10, paddingLeft:20, paddingRight:20 }}>
       <Heading componentClass="facets-title" element="h4" componentStyle={{ marginBottom: 12 }}>{label}</Heading>
      {showSearch && (
        <div className="facet-search"  style={{ marginBottom: 12 }}>
          <TextField
            type="text"
            placeholder={searchPlaceholder || 'Search'}
            onChange={(value) => {
              if (onSearch) {
                onSearch(value);
              }
            }}
          />
        </div>
      )}

      <div className="facet-checkbox-container">
        {options.length < 1 && <div>No matching options</div>}
        {options.map((option: any) => {
          const checked = option.selected;
          return (
            <div style={{ display:'flex', flex: 1, marginBottom: 8 }}>
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
              <div style={{ display: 'flex', alignItems: 'center', color: '#9e9e9e' }} className="facet-option-count">
                {option.count && option.count.toLocaleString('en')}
              </div>
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
  );
}

export default multiCheckboxFacet;
