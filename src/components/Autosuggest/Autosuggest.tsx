import * as React from 'react';
import Autowhatever from './Autowhatever';
import { defaultTheme, mapToAutowhateverTheme } from './theme';
import { AUTOSUGGEST } from '../ThemeIdentifiers';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import * as baseTheme from './Autosuggest.scss';
const shallowEqualArrays = require('shallow-equal/arrays');

const alwaysTrue = () => true;
const defaultShouldRenderSuggestions = (value: any) => value.trim().length > 0;
const defaultRenderSuggestionsContainer = ({ containerProps, children }: any) => (
  <div {...containerProps}>{children}</div>
);

const REASON_SUGGESTIONS_REVEALED = 'suggestions-revealed';
const REASON_SUGGESTIONS_UPDATED = 'suggestions-updated';
const REASON_SUGGESTION_SELECTED = 'suggestion-selected';
const REASON_INPUT_FOCUSED = 'input-focused';
const REASON_INPUT_CHANGED = 'input-changed';
const REASON_INPUT_BLURRED = 'input-blurred';
const REASON_ESCAPE_PRESSED = 'escape-pressed';

export interface Props {
  suggestions: any[],
  onSuggestionsFetchRequested?(props?: any): void;
  onSuggestionsClearRequested?(item?: object): void;
  shouldKeepSuggestionsOnSelect?(): void,
  onSuggestionSelected?(): void,
  onSuggestionHighlighted?(): void,
  renderInputComponent?(): void,
  renderSuggestionsContainer?(): void,
  getSuggestionValue(): void,
  renderSuggestion?: any,
  inputProps?(props: any): void,
  shouldRenderSuggestions?(): void,
  alwaysRenderSuggestions?: boolean,
  multiSection?: boolean,
  getSectionSuggestions?: any,
  focusInputOnSuggestionClick?: boolean,
  highlightFirstSuggestion?: boolean,
  theme?: any,
  id?: string,
  containerProps?: any, // Arb
}

export interface State {

}


class Autosuggest extends React.Component<Props, State> {
  blurEvent(blurEvent: any, arg1: { highlightedSuggestion: any; }) {
    throw new Error('Method not implemented.');
  }

  static defaultProps = {
    renderSuggestionsContainer: defaultRenderSuggestionsContainer,
    shouldRenderSuggestions: defaultShouldRenderSuggestions,
    alwaysRenderSuggestions: false,
    multiSection: false,
    shouldKeepSuggestionsOnSelect: () => false,
    focusInputOnSuggestionClick: true,
    highlightFirstSuggestion: false,
    theme: defaultTheme,
    id: '1',
    containerProps: {},
  };
  justPressedUpDown: boolean;
  justMouseEntered: boolean;
  pressedSuggestion: null;
  input: any;
  autowhatever: any;
  suggestionsContainer: any;
  justSelectedSuggestion: any;
  justClickedOnSuggestionsContainer: boolean;

  constructor(props: any) {
    super(props);

    this.state = {
      isFocused: false,
      isCollapsed: !props.alwaysRenderSuggestions,
      highlightedSectionIndex: null,
      highlightedSuggestionIndex: null,
      highlightedSuggestion: null,
      valueBeforeUpDown: null,
    };

    this.justPressedUpDown = false;
    this.justMouseEntered = false;

    this.pressedSuggestion = null;
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.onDocumentMouseDown);
    document.addEventListener('mouseup', this.onDocumentMouseUp);

    this.input = this.autowhatever.input;
    this.suggestionsContainer = this.autowhatever.itemsContainer;
  }

  // eslint-disable-next-line camelcase, react/sort-comp
  UNSAFE_componentWillReceiveProps(nextProps: any) {
    // When highlightFirstSuggestion becomes deactivated, if the first suggestion was
    // set, we should reset the suggestion back to the unselected default state.
    const shouldResetHighlighting =
      (this as any).state.highlightedSuggestionIndex === 0 &&
      (this as any).props.highlightFirstSuggestion &&
      !nextProps.highlightFirstSuggestion;

    if (shallowEqualArrays(nextProps.suggestions, (this as any).props.suggestions)) {
      if (
        nextProps.highlightFirstSuggestion &&
        nextProps.suggestions.length > 0 &&
        this.justPressedUpDown === false &&
        this.justMouseEntered === false
      ) {
        this.highlightFirstSuggestion();
      } else if (shouldResetHighlighting) {
        this.resetHighlightedSuggestion();
      }
    } else {
      if (this.willRenderSuggestions(nextProps, REASON_SUGGESTIONS_UPDATED)) {
        if ((this as any).state.isCollapsed && !(this as any).justSelectedSuggestion) {
          this.revealSuggestions();
        }

        if (shouldResetHighlighting) {
          this.resetHighlightedSuggestion();
        }
      } else {
        this.resetHighlightedSuggestion();
      }
    }
  }

  componentDidUpdate(prevProps: any, prevState: any) {
    const {
      suggestions,
      onSuggestionHighlighted,
      highlightFirstSuggestion,
    } = (this as any).props;

    if (
      !shallowEqualArrays(suggestions, prevProps.suggestions) &&
      suggestions.length > 0 &&
      highlightFirstSuggestion
    ) {
      this.highlightFirstSuggestion();
      return;
    }

    if (onSuggestionHighlighted) {
      const highlightedSuggestion = this.getHighlightedSuggestion();
      const prevHighlightedSuggestion = prevState.highlightedSuggestion;

      if (highlightedSuggestion != prevHighlightedSuggestion) {
        onSuggestionHighlighted({
          suggestion: highlightedSuggestion,
        });
      }
    }
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.onDocumentMouseDown);
    document.removeEventListener('mouseup', this.onDocumentMouseUp);
  }

  updateHighlightedSuggestion(sectionIndex: any, suggestionIndex?: any, prevValue?: any) {
    this.setState((state: any) => {
      let { valueBeforeUpDown } = state;

      if (suggestionIndex === null) {
        valueBeforeUpDown = null;
      } else if (
        valueBeforeUpDown === null &&
        typeof prevValue !== 'undefined'
      ) {
        valueBeforeUpDown = prevValue;
      }

      return {
        highlightedSectionIndex: sectionIndex,
        highlightedSuggestionIndex: suggestionIndex,
        highlightedSuggestion:
          suggestionIndex === null
            ? null
            : this.getSuggestion(sectionIndex, suggestionIndex),
        valueBeforeUpDown,
      };
    });
  }

  resetHighlightedSuggestion(shouldResetValueBeforeUpDown = true) {
    this.setState((state: any) => {
      const { valueBeforeUpDown } = state;

      return {
        highlightedSectionIndex: null,
        highlightedSuggestionIndex: null,
        highlightedSuggestion: null,
        valueBeforeUpDown: shouldResetValueBeforeUpDown
          ? null
          : valueBeforeUpDown,
      };
    });
  }

  revealSuggestions() {
    this.setState({
      isCollapsed: false,
    });
  }

  closeSuggestions() {
    this.setState({
      highlightedSectionIndex: null,
      highlightedSuggestionIndex: null,
      highlightedSuggestion: null,
      valueBeforeUpDown: null,
      isCollapsed: true,
    });
  }

  getSuggestion(sectionIndex: any, suggestionIndex: any) {
    const { suggestions, multiSection, getSectionSuggestions } = (this as any).props;

    if (multiSection) {
      return getSectionSuggestions(suggestions[sectionIndex])[suggestionIndex];
    }

    return suggestions[suggestionIndex];
  }

  getHighlightedSuggestion() {
    const { highlightedSectionIndex, highlightedSuggestionIndex } = (this as any).state;

    if (highlightedSuggestionIndex === null) {
      return null;
    }

    return this.getSuggestion(
      highlightedSectionIndex,
      highlightedSuggestionIndex
    );
  }

  getSuggestionValueByIndex(sectionIndex: any, suggestionIndex: any) {
    const { getSuggestionValue } = (this as any).props;

    return getSuggestionValue(
      this.getSuggestion(sectionIndex, suggestionIndex)
    );
  }

  getSuggestionIndices(suggestionElement: any) {
    const sectionIndex = suggestionElement.getAttribute('data-section-index');
    const suggestionIndex = suggestionElement.getAttribute(
      'data-suggestion-index'
    );

    return {
      sectionIndex:
        typeof sectionIndex === 'string' ? parseInt(sectionIndex, 10) : null,
      suggestionIndex: parseInt(suggestionIndex, 10),
    };
  }

  onDocumentMouseDown = (event: any) => {
    this.justClickedOnSuggestionsContainer = false;

    let node =
      (event.detail && event.detail.target) || // This is for testing only. Please show me a better way to emulate this.
      event.target;

    while (node !== null && node !== document) {
      if (
        node.getAttribute &&
        node.getAttribute('data-suggestion-index') !== null
      ) {
        // Suggestion was clicked
        return;
      }

      if (node === this.suggestionsContainer) {
        // Something else inside suggestions container was clicked
        this.justClickedOnSuggestionsContainer = true;
        return;
      }

      node = node.parentNode;
    }
  };

  findSuggestionElement(startNode: any) {
    let node = startNode;

    do {
      if (
        node.getAttribute &&
        node.getAttribute('data-suggestion-index') !== null
      ) {
        return node;
      }

      node = node.parentNode;
    } while (node !== null);

    console.error('Clicked element:', startNode); // eslint-disable-line no-console
    throw new Error("Couldn't find suggestion element");
  }

  maybeCallOnChange(event: any, newValue: any, method: any) {
    const { value, onChange } = (this as any).props.inputProps;

    if (newValue !== value) {
      onChange(event, { newValue, method });
    }
  }

  willRenderSuggestions(props: any, reason: any) {
    const { suggestions, inputProps, shouldRenderSuggestions } = props;
    const { value } = inputProps;

    return suggestions.length > 0 && shouldRenderSuggestions(value, reason);
  }

  storeAutowhateverRef = (autowhatever: any) => {
    if (autowhatever !== null) {
      this.autowhatever = autowhatever;
    }
  };

  onSuggestionMouseEnter = (event: any, { sectionIndex, itemIndex }: any) => {
    this.updateHighlightedSuggestion(sectionIndex, itemIndex);

    if (event.target === this.pressedSuggestion) {
      this.justSelectedSuggestion = true;
    }

    this.justMouseEntered = true;

    setTimeout(() => {
      this.justMouseEntered = false;
    });
  };

  highlightFirstSuggestion = () => {
    this.updateHighlightedSuggestion((this as any).props.multiSection ? 0 : null, 0);
  };

  onDocumentMouseUp = () => {
    if (this.pressedSuggestion && !this.justSelectedSuggestion) {
      this.input.focus();
    }
    this.pressedSuggestion = null;
  };

  onSuggestionMouseDown = (event: any) => {
    // Checking if this.justSelectedSuggestion is already true to not duplicate touch events in chrome
    // See: https://github.com/facebook/react/issues/9809#issuecomment-413978405
    if (!this.justSelectedSuggestion) {
      this.justSelectedSuggestion = true;
      this.pressedSuggestion = event.target;
    }
  };

  onSuggestionsClearRequested = () => {
    const { onSuggestionsClearRequested } = (this as any).props;

    onSuggestionsClearRequested && onSuggestionsClearRequested();
  };

  onSuggestionSelected = (event: any, data: any) => {
    const {
      alwaysRenderSuggestions,
      onSuggestionSelected,
      onSuggestionsFetchRequested,
    } = (this as any).props;

    onSuggestionSelected && onSuggestionSelected(event, data);

    const keepSuggestionsOnSelect = (this as any).props.shouldKeepSuggestionsOnSelect(
      data.suggestion
    );

    if (alwaysRenderSuggestions || keepSuggestionsOnSelect) {
      onSuggestionsFetchRequested({
        value: data.suggestionValue,
        reason: REASON_SUGGESTION_SELECTED,
      });
    } else {
      this.onSuggestionsClearRequested();
    }

    this.resetHighlightedSuggestion();
  };

  onSuggestionClick = (event: any) => {
    const { alwaysRenderSuggestions, focusInputOnSuggestionClick } = (this as any).props;
    const { sectionIndex, suggestionIndex } = this.getSuggestionIndices(
      this.findSuggestionElement(event.target)
    );
    const clickedSuggestion = this.getSuggestion(sectionIndex, suggestionIndex);
    const clickedSuggestionValue = (this as any).props.getSuggestionValue(
      clickedSuggestion
    );

    this.maybeCallOnChange(event, clickedSuggestionValue, 'click');
    this.onSuggestionSelected(event, {
      suggestion: clickedSuggestion,
      suggestionValue: clickedSuggestionValue,
      suggestionIndex: suggestionIndex,
      sectionIndex,
      method: 'click',
    });

    const keepSuggestionsOnSelect = (this as any).props.shouldKeepSuggestionsOnSelect(
      clickedSuggestion
    );

    if (!(alwaysRenderSuggestions || keepSuggestionsOnSelect)) {
      this.closeSuggestions();
    }

    if (focusInputOnSuggestionClick === true) {
      this.input.focus();
    } else {
      this.onBlur();
    }

    setTimeout(() => {
      this.justSelectedSuggestion = false;
    });
  };

  onBlur = () => {
    const { inputProps, shouldRenderSuggestions } = (this as any).props;
    const { value, onBlur } = inputProps;
    const highlightedSuggestion = this.getHighlightedSuggestion();
    const shouldRender = shouldRenderSuggestions(value, REASON_INPUT_BLURRED);

    this.setState({
      isFocused: false,
      highlightedSectionIndex: null,
      highlightedSuggestionIndex: null,
      highlightedSuggestion: null,
      valueBeforeUpDown: null,
      isCollapsed: !shouldRender,
    });

    onBlur && onBlur(this.blurEvent, { highlightedSuggestion });
  };

  onSuggestionMouseLeave = (event: any) => {
    this.resetHighlightedSuggestion(false); // shouldResetValueBeforeUpDown

    if (
      this.justSelectedSuggestion &&
      event.target === this.pressedSuggestion
    ) {
      this.justSelectedSuggestion = false;
    }
  };

  onSuggestionTouchStart = () => {
    this.justSelectedSuggestion = true;
    // todo: event.preventDefault when https://github.com/facebook/react/issues/2043
    // todo: gets released so onSuggestionMouseDown won't fire in chrome
  };

  onSuggestionTouchMove = () => {
    this.justSelectedSuggestion = false;
    this.pressedSuggestion = null;
    this.input.focus();
  };

  itemProps = ({ sectionIndex, itemIndex }: any) => {
    return {
      'data-section-index': sectionIndex,
      'data-suggestion-index': itemIndex,
      onMouseEnter: this.onSuggestionMouseEnter,
      onMouseLeave: this.onSuggestionMouseLeave,
      onMouseDown: this.onSuggestionMouseDown,
      onTouchStart: this.onSuggestionTouchStart,
      onTouchMove: this.onSuggestionTouchMove,
      onClick: this.onSuggestionClick,
    };
  };

  getQuery() {
    const { inputProps } = (this as any).props;
    const { value } = inputProps;
    const { valueBeforeUpDown } = (this as any).state;

    return (valueBeforeUpDown === null ? value : valueBeforeUpDown).trim();
  }

  renderSuggestionsContainer = ({ containerProps, children }: any) => {
    const { renderSuggestionsContainer } = (this as any).props;

    return renderSuggestionsContainer({
      containerProps,
      children,
      query: this.getQuery(),
    });
  };

  render() {
    const {
      suggestions,
      renderInputComponent,
      onSuggestionsFetchRequested,
      renderSuggestion,
      inputProps,
      multiSection,
      renderSectionTitle,
      id,
      getSectionSuggestions,
      theme,
      getSuggestionValue,
      alwaysRenderSuggestions,
      highlightFirstSuggestion,
      containerProps,
    } = (this as any).props;
    const {
      isFocused,
      isCollapsed,
      highlightedSectionIndex,
      highlightedSuggestionIndex,
      valueBeforeUpDown,
    } = (this as any).state;
    const shouldRenderSuggestions = alwaysRenderSuggestions
      ? alwaysTrue
      : (this as any).props.shouldRenderSuggestions;
    const { value, onFocus, onKeyDown } = inputProps;
    const willRenderSuggestions = this.willRenderSuggestions(
      this.props,
      'render'
    );
    const isOpen =
      alwaysRenderSuggestions ||
      (isFocused && !isCollapsed && willRenderSuggestions);
    const items = isOpen ? suggestions : [];
    const autowhateverInputProps = {
      ...inputProps,
      onFocus: (event: any) => {
        if (
          !this.justSelectedSuggestion &&
          !this.justClickedOnSuggestionsContainer
        ) {
          const shouldRender = shouldRenderSuggestions(
            value,
            REASON_INPUT_FOCUSED
          );

          this.setState({
            isFocused: true,
            isCollapsed: !shouldRender,
          });

          onFocus && onFocus(event);

          if (shouldRender) {
            onSuggestionsFetchRequested({
              value,
              reason: REASON_INPUT_FOCUSED,
            });
          }
        }
      },
      onBlur: (event: any) => {
        if (this.justClickedOnSuggestionsContainer) {
          this.input.focus();
          return;
        }

        this.blurEvent = event;

        if (!this.justSelectedSuggestion) {
          this.onBlur();
          this.onSuggestionsClearRequested();
        }
      },
      onChange: (event: any) => {
        const { value } = event.target;
        const shouldRender = shouldRenderSuggestions(
          value,
          REASON_INPUT_CHANGED
        );

        this.maybeCallOnChange(event, value, 'type');

        if (this.suggestionsContainer) {
          this.suggestionsContainer.scrollTop = 0;
        }

        this.setState({
          ...(highlightFirstSuggestion
            ? {}
            : {
                highlightedSectionIndex: null,
                highlightedSuggestionIndex: null,
                highlightedSuggestion: null,
              }),
          valueBeforeUpDown: null,
          isCollapsed: !shouldRender,
        });

        if (shouldRender) {
          onSuggestionsFetchRequested({ value, reason: REASON_INPUT_CHANGED });
        } else {
          this.onSuggestionsClearRequested();
        }
      },
      onKeyDown: (event: any, data: any) => {
        const { keyCode } = event;

        switch (keyCode) {
          case 40: // ArrowDown
          case 38: // ArrowUp
            if (isCollapsed) {
              if (shouldRenderSuggestions(value, REASON_SUGGESTIONS_REVEALED)) {
                onSuggestionsFetchRequested({
                  value,
                  reason: REASON_SUGGESTIONS_REVEALED,
                });
                this.revealSuggestions();
                event.preventDefault(); // We act on the key.
              }
            } else if (suggestions.length > 0) {
              const {
                newHighlightedSectionIndex,
                newHighlightedItemIndex,
              } = data;

              let newValue;

              if (newHighlightedItemIndex === null) {
                // valueBeforeUpDown can be null if, for example, user
                // hovers on the first suggestion and then pressed Up.
                // If that happens, use the original input value.
                newValue =
                  valueBeforeUpDown === null ? value : valueBeforeUpDown;
              } else {
                newValue = this.getSuggestionValueByIndex(
                  newHighlightedSectionIndex,
                  newHighlightedItemIndex
                );
              }

              this.updateHighlightedSuggestion(
                newHighlightedSectionIndex,
                newHighlightedItemIndex,
                value
              );
              this.maybeCallOnChange(
                event,
                newValue,
                keyCode === 40 ? 'down' : 'up'
              );
              event.preventDefault(); // We act on the key.
            }

            this.justPressedUpDown = true;

            setTimeout(() => {
              this.justPressedUpDown = false;
            });

            break;

          // Enter
          case 13: {
            // See #388
            if (event.keyCode === 229) {
              break;
            }

            const highlightedSuggestion = this.getHighlightedSuggestion();

            if (isOpen && !alwaysRenderSuggestions) {
              this.closeSuggestions();
            }

            if (highlightedSuggestion != null) {
              event.preventDefault();
              const newValue = getSuggestionValue(highlightedSuggestion);

              this.maybeCallOnChange(event, newValue, 'enter');

              this.onSuggestionSelected(event, {
                suggestion: highlightedSuggestion,
                suggestionValue: newValue,
                suggestionIndex: highlightedSuggestionIndex,
                sectionIndex: highlightedSectionIndex,
                method: 'enter',
              });

              this.justSelectedSuggestion = true;

              setTimeout(() => {
                this.justSelectedSuggestion = false;
              });
            }

            break;
          }

          // Escape
          case 27: {
            if (isOpen) {
              // If input.type === 'search', the browser clears the input
              // when Escape is pressed. We want to disable this default
              // behaviour so that, when suggestions are shown, we just hide
              // them, without clearing the input.
              event.preventDefault();
            }

            const willCloseSuggestions = isOpen && !alwaysRenderSuggestions;

            if (valueBeforeUpDown === null) {
              // Didn't interact with Up/Down
              if (!willCloseSuggestions) {
                const newValue = '';

                this.maybeCallOnChange(event, newValue, 'escape');

                if (shouldRenderSuggestions(newValue, REASON_ESCAPE_PRESSED)) {
                  onSuggestionsFetchRequested({
                    value: newValue,
                    reason: REASON_ESCAPE_PRESSED,
                  });
                } else {
                  this.onSuggestionsClearRequested();
                }
              }
            } else {
              // Interacted with Up/Down
              this.maybeCallOnChange(event, valueBeforeUpDown, 'escape');
            }

            if (willCloseSuggestions) {
              this.onSuggestionsClearRequested();
              this.closeSuggestions();
            } else {
              this.resetHighlightedSuggestion();
            }

            break;
          }
        }

        onKeyDown && onKeyDown(event);
      },
    };
    const renderSuggestionData = {
      query: this.getQuery(),
    };

    return (
      <Autowhatever
        multiSection={multiSection}
        items={items}
        renderInputComponent={renderInputComponent}
        renderItemsContainer={this.renderSuggestionsContainer}
        renderItem={renderSuggestion}
        renderItemData={renderSuggestionData}
        renderSectionTitle={renderSectionTitle}
        getSectionItems={getSectionSuggestions}
        highlightedSectionIndex={highlightedSectionIndex}
        highlightedItemIndex={highlightedSuggestionIndex}
        containerProps={containerProps}
        inputProps={autowhateverInputProps}
        itemProps={this.itemProps}
        theme={mapToAutowhateverTheme(theme)}
        id={id}
        ref={this.storeAutowhateverRef}
      />
    );
  }
}


export { Autosuggest as UnthemedAutosuggest };
export default themr(AUTOSUGGEST, baseTheme)(Autosuggest) as ThemedComponentClass<any, any>;
