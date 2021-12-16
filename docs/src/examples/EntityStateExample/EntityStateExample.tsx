import * as React from 'react';
import { EntityState } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const EntityStateExample = () => {

  return (
    <div className={styles.example}>
      <EntityState item={{
        // processing: 'Publishing',
        entityState: {
          itemName: 'New',
          itemID: 1,
        },
        locked: {
          itemName: 'locked',
          itemID: 0,
        }
      }} />
      <EntityState item={{
        entityState: {
          itemName: 'Draft',
          itemID: 2,
        },
        locked: {
          itemName: 'locked',
          itemID: 0,
        }
      }} />
      <EntityState item={{
        entityState: {
          itemName: 'Archive',
          itemID: 3,
        },
        locked: {
          itemName: 'locked',
          itemID: 0,
        }
      }} />
      <EntityState item={{
        entityState: {
          itemName: 'Delete',
          itemID: 4,
        },
        locked: {
          itemName: 'locked',
          itemID: 0,
        }
      }} />
      <EntityState item={{
        entityState: {
          itemName: 'Published',
          itemID: 5,
        },
        locked: {
          itemName: 'locked',
          itemID: 0,
        }
      }} />
      <EntityState item={{
        entityState: {
          itemName: 'Archived',
          itemID: 6,
        },
        locked: {
          itemName: 'locked',
          itemID: 0,
        }
      }} />
      <EntityState item={{
        entityState: {
          itemName: 'Deleted',
          itemID: 7,
        },
        locked: {
          itemName: 'locked',
          itemID: 0,
        }
      }} />
      <EntityState item={{
        processing: 'Publishing',
        entityState: {
          itemName: 'Publishing',
          itemID: 8,
        },
        locked: {
          itemName: 'locked',
          itemID: 1,
        }
      }} />
      <EntityState item={{
        entityState: {
          itemName: 'Locked',
          itemID: 9,
        },
        locked: {
          itemName: 'locked',
          itemID: 0,
        }
      }} />
    </div>
  );
};

export default EntityStateExample;
