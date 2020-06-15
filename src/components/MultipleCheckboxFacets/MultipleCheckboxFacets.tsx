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
  showMore: boolean;
  showSearch: boolean;
}

function multiCheckboxFacet({
  className = '',
  label,
  onMoreClick,
  onRemove,
  onSelect,
  options,
  showMore,
  showSearch,
  onSearch,
  searchPlaceholder
}: IProps) {
  return (
    <fieldset className={appendClassName('facets-container', className)}>
      <legend className="facets-title">{label}</legend>
      {showSearch && (
        <div className="facet-search">
          <TextField
            placeholder={searchPlaceholder || 'Search'}
            onChange={(value) => {
              if (onSearch) {
                onSearch(value);
              }
            }}
            autoComplete={false}
            autoFocus={false}
            autoSuggest={false}
            alphanumeric={false}
            backdropHidden={false}
            capital={false}
            disabled={false}
            enableTextCounter={false}
            hasValue={false}
            isFocused={false}
            itemSelected={false}
            labelHidden={false}
            loading={false}
            readOnly={false}
            required={false}
            resizable={false}
            showNumberIcon={false}
            spellCheck={false}
          />
        </div>
      )}

      <div className="facet-checkbox-container">
        {options.length < 1 && <div>No matching options</div>}
        {options.map((option: any) => {
          const checked = option.selected;
          return (
            <div style={{ display:'flex', flex: 1 }}>
              <div style={{ flex: 1 }}>
                <Checkbox
                  checked={checked}
                  componentId={`example_facet_${label}${getFilterValueDisplay(
                    option.value
                  )}`}
                  label={getFilterValueDisplay(option.name)}
                  onChange={() =>
                    checked ? onRemove(option.value) : onSelect(option.value)
                  }
                  disabled={false}
                  labelHidden={false}
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
          fullWidth={false}
          primary={false}
          outline={false}
          destructive={false}
          disabled={false}
          disclosure={false}
          submit={false}
          external={false}
        >
          + More
        </Button>
      )}
    </fieldset>
  );
}

export default multiCheckboxFacet;
