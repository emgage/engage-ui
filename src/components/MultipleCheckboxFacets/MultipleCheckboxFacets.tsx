import PropTypes from "prop-types";
import * as React from 'react';

// import { FacetValue } from "./types";

function getNewClassName(newClassName: string) {
    if (!Array.isArray(newClassName)) return newClassName;
  
    return newClassName.filter(name => name).join(" ");
  }
  
  export function appendClassName(baseClassName: string, newClassName: string) {
    if (!newClassName) return baseClassName || "";
    if (!baseClassName) return getNewClassName(newClassName) || "";
    return `${baseClassName} ${getNewClassName(newClassName)}`;
  }

export function getFilterValueDisplay(filterValue: any) {
    if (filterValue === undefined || filterValue === null) return "";
    if (filterValue.hasOwnProperty("name")) return filterValue.name;
    return String(filterValue);
  }

function MultiCheckboxFacet({
  className,
  label,
  onMoreClick,
  onRemove,
  onSelect,
  options,
  showMore,
  showSearch,
  onSearch,
  searchPlaceholder
}: any) {
  return (
    <fieldset className={appendClassName("facets-container", className)}>
      <legend className="facets-title">{label}</legend>

      {showSearch && (
        <div className="facet-search">
          <input
            className="facet-search-input"
            type="search"
            placeholder={searchPlaceholder || "Search"}
            onChange={e => {
              onSearch(e.target.value);
            }}
          />
        </div>
      )}

      <div className="facet-checkbox-container">
        {options.length < 1 && <div>No matching options</div>}
        {options.map((option: any) => {
          const checked = option.selected;
          return (
            <label
              key={`${getFilterValueDisplay(option.value)}`}
              htmlFor={`example_facet_${label}${getFilterValueDisplay(
                option.value
              )}`}
              className="facet-option-label"
            >
              <div className="facet-option-input-wrapper">
                <input
                  id={`example_facet_${label}${getFilterValueDisplay(
                    option.value
                  )}`}
                  type="checkbox"
                  checked={checked}
                  onChange={() =>
                    checked ? onRemove(option.value) : onSelect(option.value)
                  }
                />
                <span>
                  {getFilterValueDisplay(option.name)}
                </span>
              </div>
              <span className="facet-option-count">
                {option.count && option.count.toLocaleString("en")}
              </span>
            </label>
          );
        })}
      </div>

      {showMore && (
        <button
          type="button"
          className="facet-view-more"
          onClick={onMoreClick}
          aria-label="Show more options"
        >
          + More
        </button>
      )}
    </fieldset>
  );
}

MultiCheckboxFacet.propTypes = {
  label: PropTypes.string.isRequired,
  onMoreClick: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    selected: PropTypes.bool.isRequired
  })).isRequired,
  showMore: PropTypes.bool.isRequired,
  className: PropTypes.string,
  showSearch: PropTypes.bool,
  searchPlaceholder: PropTypes.string
};

export default MultiCheckboxFacet;