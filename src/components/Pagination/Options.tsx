import * as React from 'react';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { default as KEYCODE }  from './KeyCode';
import * as baseTheme from './Pagination.scss';
import Select from '../Select';

interface IProps {
  disabled: boolean;
  changeSize?(value: number): void;
  quickGo?(callback: any): void;
  selectComponentClass: any;
  current: number;
  pageSizeOptions: string[];
  pageSize: number;
  buildOptionText?(value: number | string): void;
  locale: any;
  rootPrefixCls: string;
  selectPrefixCls: string;
  goButton: any;
  theme?: any;
  selectValue?: string;
}

interface IState {
  goInputText: any;
  selectValue?: string;
  current?: any;
}

class Options extends React.PureComponent<IProps, IState> {
  static defaultProps = {
    pageSizeOptions: ['10', '20', '30', '40'],
  };

  constructor(props: IProps) {
    super(props);

    this.state = {
      goInputText: '',
      selectValue: props.selectValue || (props.pageSize || props.pageSizeOptions[0]).toString()
    };
  }

  static getDerivedStateFromProps(props: IProps, state: IState) {
    const newState = { ...state };
    if (props.selectValue !== state.selectValue) {
      newState['selectValue'] = props.selectValue;
    }

    return newState;
  }

  getValidValue() {
    const { goInputText, current } = this.state;
    return !goInputText || isNaN(goInputText) ? current : Number(goInputText);
  }

  buildOptionText = (value: string | number) => {
    return `${value} ${this.props.locale.items_per_page}`;
  }

  changeSize = (value: any) => {
    if (this.props.changeSize) {
      this.setState({
        selectValue: value
      },            () => {
        this.props.changeSize!(Number(value));
      });
    }
  }

  handleChange = (e: any) => {
    this.setState({
      goInputText: e.target.value,
    });
  }

  handleBlur = (e: any) => {
    const { goButton, quickGo, theme } = this.props;
    if (goButton) {
      return;
    }
    if (
      e.relatedTarget &&
      (
        e.relatedTarget.className.indexOf(theme['rc-pagination-prev']) >= 0 ||
        e.relatedTarget.className.indexOf(theme['rc-pagination-next']) >= 0
      )
    ) {
      return;
    }

    if (quickGo) {
      quickGo(this.getValidValue());
    }
  }

  go = (e: any) => {
    const { goInputText } = this.state;
    if (goInputText === '') {
      return;
    }
    if (e.keyCode === KEYCODE.ENTER || e.type === 'click') {
      this.setState({
        goInputText: '',
      });

      if (this.props.quickGo) {
        this.props.quickGo(this.getValidValue());
      }
    }
  }

  render() {
    const {
      pageSizeOptions, locale, changeSize,
      quickGo, goButton,
      disabled, theme
    } = this.props;
    const { goInputText } = this.state;
    let changeSelect = null;
    let goInput = null;
    let gotoButton = null;

    if (!changeSize && !quickGo) {
      return null;
    }

    if (changeSize && Select) {

      changeSelect = (
        <Select
          disabled={disabled}
          label=""
          labelHidden={true}
          options={pageSizeOptions}
          value={this.state.selectValue}
          onChange={this.changeSize}
        >

       </Select>
      );
    }

    if (quickGo) {
      if (goButton) {
        gotoButton = typeof goButton === 'boolean' ? (
          <button
            type="button"
            onClick={this.go}
            onKeyUp={this.go}
            disabled={disabled}
          >
            {locale.jump_to_confirm}
          </button>
        ) : (
          <span
            onClick={this.go}
            onKeyUp={this.go}
          >
            {goButton}
          </span>
        );
      }
      goInput = (
        <div className={theme['rc-pagination-options-quick-jumper']}>
          {locale.jump_to}
          <input
            disabled={disabled}
            type="text"
            value={goInputText}
            onChange={this.handleChange}
            onKeyUp={this.go}
            onBlur={this.handleBlur}
          />
          {locale.page}
          {gotoButton}
        </div>
      );
    }

    return (
      <li className={theme['rc-pagination-options']}>
        {changeSelect}
        {goInput}
      </li>
    );
  }
}

export default themr('ThPaginationOption', baseTheme)(Options) as ThemedComponentClass<IProps, IState>;
