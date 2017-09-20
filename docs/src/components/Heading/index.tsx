import * as React from 'react';
import '../../styles/heading.scss';

export interface IProps {
  value: string;
  className?: string;
}

// tslint:disable-next-line:variable-name
const Heading = ({ value, className }: IProps) => {
  const containerClass = `default-heading ${className}`;
  return (
      <div className={containerClass}>
        <h1>{value}</h1>
      </div>
  );
};

export default Heading;
