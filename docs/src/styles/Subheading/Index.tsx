import * as React from 'react';

import '../../styles/subheading.scss';

export interface IProps {
  value: string;
  className?: string;
}

// tslint:disable-next-line:variable-name
const Subheading = ({ value, className }: IProps) => {
  const containerClass = `default-heading ${className}`;
  return (
    <div className={containerClass}>
      <h3>{value}</h3>
    </div>
  );
};

export default Subheading;
