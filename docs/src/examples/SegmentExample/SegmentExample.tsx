import * as React from 'react';
import { Segment } from '../../../../src/components/';
import * as styles from '../../styles/components-page.scss';

const SegmentExample = () => {
  const items = React.useMemo(() => {
    return [
      {
        id: 1,
        label: 'label1',
        title: 'label1',
        subText: 'subText1',
        iconSource:'image' as any
      },
      {
        id: 2,
        label: 'label2',
        title: 'label2',
        subText: 'subText2',
      },
      {
        id: 3,
        title:'icon only',
        iconSource:'image' as any,
      },
      {
        id: 4,
        label: 'only label',
        title: 'only label',
      },
      {
        id: 5,
        label: <div>test</div>,
        title: 'custom component',
      },
      {
        id: 6,
        label: <div>test</div>,
        subText: <div>test</div>,
        title: 'custom component 2',
      },
    ];
  }, []);
  const [activeItemId, setActiveItemId] = React.useState<string | number>(1);
  return (
    <div className={styles.example}>
      <Segment items={items} activeItemId={activeItemId} onClick={item => setActiveItemId(item.id)}>
      </Segment>
    </div>
  );
};

export default SegmentExample;
