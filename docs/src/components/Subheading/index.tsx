import * as React from 'react';

import '../../styles/subheading.scss';

export interface IProps {
  value: string;
  className?: string;
}

// tslint:disable-next-line:variable-name
const Subheading = ({ value, className }: IProps) => {
  return (
      <p>{value}</p>
  );
};

export default Subheading;
