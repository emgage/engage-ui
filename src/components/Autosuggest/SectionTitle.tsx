import * as React from 'react';
import compareObjects from './compareObjects';

export interface Props {
  section: any,
  renderSectionTitle(): void,
  theme(): void,
  sectionKeyPrefix: string
}

export interface State {

}

export default class SectionTitle extends React.Component<Props, State> {
  shouldComponentUpdate(nextProps: any) {
    return compareObjects(nextProps, this.props);
  }

  render() {
    const { section, renderSectionTitle, theme, sectionKeyPrefix }: any = this.props;
    const sectionTitle = renderSectionTitle(section as any);

    if (!sectionTitle) {
      return null;
    }

    return (
      <div {...theme(`${sectionKeyPrefix}title`, 'sectionTitle')}>
        {sectionTitle}
      </div>
    );
  }
}
