import * as React from 'react';

import '../../styles/subheading.scss';

export interface IProps {
  value: string;
  className?: string;
}
  
// tslint:disable-next-line:variable-name
const Description = ({ value, className }: IProps) => {
  const containerClass = `default-heading ${className}`;
  return (
    <div className={containerClass}>
      <p>{value}</p>
    </div>
  );
};

export default Description;
