/*
  label: Table header lable which will be visible
  key: Match it with json data, this will help to get specific value from the data
  headerValue: In case of custom component, if any value is required, here it can be stored
  classname: any custom classname, this can be used to set width or any other style
  style: same like class but for inline styling
  noSort: if sorting="all" & we want to disable sorting of specifc column
  sort: Enable sorting for specific column
  injectBody: To inject custom component in td
  injectHeader: To inject custom component in th
*/

export interface ColumnConfig {
  label?: string;
  key: string;
  headerValue?: any;
  className?: string;
  style?: any;
  noSort?: boolean;
  sort?: boolean;
  injectBody?(value?: any): void;
  injectHeader?(value?: any): void;
}

export interface NestedChild {
  rowId: number | string;
  component: any;
}
