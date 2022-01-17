import * as React from 'react';
import { Icon, Stack, Tooltip } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';
import { IconList } from '../../../../src/components/Icon';

const IconListExample = () => {

  return (
    <div className={styles.example}>
      <Stack spacing="extraLoose">
        {Object.keys(IconList).map((iconName: any) => {
          return (
            <div key={iconName}>
              <Tooltip content={iconName}><Icon source={iconName} /></Tooltip>
            </div>
          );
        })}
      </Stack>
    </div>
  );
};

export default IconListExample;
