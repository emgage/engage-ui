import * as React from 'react';
import { mount } from 'enzyme';
import Panel from '../Panel';
import Video, { VideoType } from '../../Video';

describe('<Panel />', () => {

  const theme = {
    panel: 'thm-pnl',
    heading: 'thm-hdr',
    body: 'thm-body',
  };

  const videoCmp = <Video
        poster={new URL('https://www.testimage.com/imgage.png')}
        src={[{
          src: 'http://www.yahoo.com/video3',
          type: VideoType.MP4,
        }]}
        />;

  describe('when default props are provided', () => {
    it('panel should be rendered with default props', () => {
      const subject = mount(<Panel heading="Panel" />);

      expect(subject.find('div')).toHaveLength(3);
      expect(subject.find('div').at(1).text()).toBe('Panel');
    });
  });

  describe('heading property', () => {
    describe('when set as string', () => {
      it('panel should have header', () => {
        const subject = mount(<Panel heading="Panel"/>);
        expect(subject.find('div')).toHaveLength(3);
        expect(subject.find('div').at(1).text()).toBe('Panel');
      });
    });

    describe('when set as react component', () => {
      const headCmp = <h3>Panel</h3>;
      it('panel should have header', () => {
        const subject = mount(<Panel heading={headCmp}/>);
        expect(subject.find('div')).toHaveLength(2);
        expect(subject.find('h3').text()).toBe('Panel');
      });
    });
  });

  describe('video property', () => {
    describe('when not set', () => {
      it('panel should not have video', () => {
        const subject = mount(<Panel heading="Panel"/>);
        expect(subject.find('div')).toHaveLength(3);
        expect(subject.find('div').at(1).text()).toBe('Panel');
        expect(subject.find('div').at(2).children()).toHaveLength(0);
      });
    });

    describe('when set', () => {
      it('panel should have video', () => {
        const subject = mount(<Panel heading="Panel with Video" video={videoCmp} />);
        expect(subject.find('div')).toHaveLength(3);
        expect(subject.find('div').at(1).text()).toBe('Panel with Video');
        expect(subject.find('div').at(2).children().html()).toBe('<video poster=\"https://www.testimage.com/imgage.png\"><source src=\"http://www.yahoo.com/video3\" type=\"video/mp4\"></video>');
      });
    });
  });

  describe('children property', () => {
    describe('when not set', () => {
      it('panel should render without children container', () => {
        const subject = mount(<Panel heading="Panel"/>);
        expect(subject.find('div')).toHaveLength(3);
        expect(subject.find('div').at(1).text()).toBe('Panel');
        expect(subject.find('div').at(2).children()).toHaveLength(0);
      });
    });

    describe('when set', () => {
      it('panel should render children', () => {
        const subject = mount(<Panel heading="Panel"><p>This is a paragraph!</p></Panel>);
        expect(subject.find('div')).toHaveLength(3);
        expect(subject.find('div').at(1).text()).toBe('Panel');
        expect(subject.find('div').at(2).children().html()).toBe('<p>This is a paragraph!</p>');
      });
    });
  });

  describe('theme property', () => {
    describe('when not set', () => {
      it('panel should render without theme css', () => {
        const subject = mount(<Panel heading="Panel"/>);

        expect(subject.find('div')).toHaveLength(3);
        expect(subject.find('div').at(1).text()).toBe('Panel');
        expect(subject.html()).toBe('<div><div>Panel</div><div></div></div>');
      });
    });

    describe('when set', () => {
      it('panel should render theme css', () => {
        const subject = mount(<Panel heading="Panel" theme={theme}>ABC</Panel>);
        expect(subject.find('div')).toHaveLength(3);
        expect(subject.find('div').at(1).text()).toBe('Panel');
        expect(subject.find('div').at(0).hasClass('thm-pnl')).toBe(true);
        expect(subject.find('div').at(1).hasClass('thm-hdr')).toBe(true);
        expect(subject.find('div').at(2).hasClass('thm-body')).toBe(true);
      });
    });
  });

  describe('all property', () => {
    describe('when set', () => {
      it('panel should render using all props', () => {
        const subject = mount(<Panel heading="Panel" video={videoCmp} theme={theme}><p>test</p></Panel>);
        expect(subject.find('div')).toHaveLength(3);
        expect(subject.find('div').at(1).text()).toBe('Panel');
        expect(subject.find('div').at(2).children()).toHaveLength(2);
        expect(subject.find('div').at(2).html()).toBe('<div class=\"thm-body\"><video poster=\"https://www.testimage.com/imgage.png\"><source src=\"http://www.yahoo.com/video3\" type=\"video/mp4\"></video><p>test</p></div>');
        expect(subject.find('div').at(0).hasClass('thm-pnl')).toBe(true);
        expect(subject.find('div').at(1).hasClass('thm-hdr')).toBe(true);
        expect(subject.find('div').at(2).hasClass('thm-body')).toBe(true);
      });
    });
  });
});
