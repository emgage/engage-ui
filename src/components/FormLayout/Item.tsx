import * as React from 'react';
import * as styles from './FormLayout.scss';

export interface Props {
  children?: React.ReactNode,
}

export default function Item(props: Props) {
  const {
    children,
    ...otherProps,
  } = props;

  return (
    <div className={styles.Item}>
      {React.Children.map(children, (child: React.ReactElement<{}>) => {
          return React.cloneElement(child, otherProps);
      })}
    </div>
  );
}
