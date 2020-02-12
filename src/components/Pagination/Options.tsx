import * as React from 'react';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import { default as KEYCODE }  from './KeyCode';
import * as baseTheme from './Pagination.scss';

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
}

interface IState {
  goInputText: any;
  current?: any;
}

class Options extends React.Component<IProps, IState> {
  static defaultProps = {
    pageSizeOptions: ['10', '20', '30', '40'],
  };

  constructor(props: IProps) {
    super(props);

    this.state = {
      goInputText: '',
    };
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
      this.props.changeSize(Number(value));
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
      pageSize, pageSizeOptions, locale, changeSize,
      quickGo, goButton, selectComponentClass, buildOptionText,
      selectPrefixCls, disabled, theme
    } = this.props;
    const { goInputText } = this.state;
    const Select = selectComponentClass;
    let changeSelect = null;
    let goInput = null;
    let gotoButton = null;

    if (!changeSize && !quickGo) {
      return null;
    }

    if (changeSize && Select) {
      const options = pageSizeOptions.map((opt, i) => (
        <Select.Option key={i} value={opt}>
          {(buildOptionText || this.buildOptionText)(opt)}
        </Select.Option>
      ));

      changeSelect = (
        <Select
          disabled={disabled}
          prefixCls={selectPrefixCls}
          showSearch={false}
          className={theme['rc-pagination-options-size-changer']}
          optionLabelProp="children"
          dropdownMatchSelectWidth={false}
          value={(pageSize || pageSizeOptions[0]).toString()}
          onChange={this.changeSize}
          getPopupContainer={(triggerNode: any) => triggerNode.parentNode}
        >
          {options}
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
