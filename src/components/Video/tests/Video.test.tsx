import * as React from 'react';
import { mount } from 'enzyme';
import Video, { VideoType } from '../Video';

describe('<Video />', () => {

  const poster = new URL('http://placehold.it/150x150');
  const singleVideoSource = [
    {
      src: 'http://www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_1mb.mp4',
      type: VideoType.MP4,
    }];
  const multiVideoSource = [
    {
      src: 'http://www.sample-videos.com/video/mp4/480/big_buck_bunny_480p_30mb.mp4',
      type: VideoType.MP4,
    },
    {
      src: 'http://www.sample-videos.com/video/mp4/240/big_buck_bunny_240p_30mb.mp4',
      type: VideoType.MP4,
    }];

  describe('when default props are provided', () => {
    it('video should be rendered with default props', () => {
      const subject = mount(<Video poster={poster} src={singleVideoSource}/>);
      expect(subject.find('video')).toHaveLength(1);
      expect(subject.find('video').prop('poster')).toBe(poster.toString());
      expect(subject.find('video').childAt(0).prop('src')).toBe(singleVideoSource[0].src);
    });
  });

  describe('poster property', () => {
    describe('when set', () => {
      it('video should have poster image', () => {
        const subject = mount(<Video poster={poster} src={singleVideoSource}/>);
        expect(subject.find('video')).toHaveLength(1);
        expect(subject.find('video').prop('poster')).toBe(poster.toString());
      });
    });
  });

  describe('source property', () => {
    describe('when single source set', () => {
      it('video should have src property', () => {
        const subject = mount(<Video poster={poster} src={singleVideoSource}/>);
        expect(subject.find('video')).toHaveLength(1);
        expect(subject.find('video').childAt(0).prop('src')).toBe(singleVideoSource[0].src);
      });
    });
    describe('when multiple source set', () => {
      it('video should have source child elements', () => {
        const subject = mount(<Video poster={poster} src={multiVideoSource}/>);
        expect(subject.find('video')).toHaveLength(1);
        expect(subject.find('video').prop('src')).toBeUndefined();
        expect(subject.find('video').children()).toHaveLength(2);
        expect(subject.find('video').childAt(0).prop('src')).toBe(multiVideoSource[0].src);
        expect(subject.find('video').childAt(0).prop('type')).toBe('video/mp4');
        expect(subject.find('video').childAt(1).prop('src')).toBe(multiVideoSource[1].src);
        expect(subject.find('video').childAt(1).prop('type')).toBe('video/mp4');
      });
    });
  });

  describe('autoplay property', () => {
    describe('when not set', () => {
      it('video should have default autoplay property', () => {
        const subject = mount(<Video poster={poster} src={singleVideoSource} />);
        expect(subject.find('video')).toHaveLength(1);
        expect(subject.find('video').childAt(0).prop('src')).toBe(singleVideoSource[0].src);
        expect(subject.find('video').prop('autoPlay')).toBe(false);
      });
    });
    describe('when set to true', () => {
      it('video should have autoplay property true', () => {
        const subject = mount(<Video poster={poster} src={singleVideoSource} autoplay={true} />);
        expect(subject.find('video')).toHaveLength(1);
        expect(subject.find('video').childAt(0).prop('src')).toBe(singleVideoSource[0].src);
        expect(subject.find('video').prop('autoPlay')).toBe(true);
      });
    });
    describe('when set to false', () => {
      it('video should have autoplay property false', () => {
        const subject = mount(<Video poster={poster} src={singleVideoSource} autoplay={false} />);
        expect(subject.find('video')).toHaveLength(1);
        expect(subject.find('video').childAt(0).prop('src')).toBe(singleVideoSource[0].src);
        expect(subject.find('video').prop('autoPlay')).toBe(false);
      });
    });
  });

  describe('controls property', () => {
    describe('when not set', () => {
      it('video should have default controls property', () => {
        const subject = mount(<Video poster={poster} src={singleVideoSource} />);
        expect(subject.find('video')).toHaveLength(1);
        expect(subject.find('video').childAt(0).prop('src')).toBe(singleVideoSource[0].src);
        expect(subject.find('video').prop('controls')).toBeUndefined();
      });
    });
    describe('when set to true', () => {
      it('video should have controls property true', () => {
        const subject = mount(<Video poster={poster} src={singleVideoSource} controls={true} />);
        expect(subject.find('video')).toHaveLength(1);
        expect(subject.find('video').childAt(0).prop('src')).toBe(singleVideoSource[0].src);
        expect(subject.find('video').prop('controls')).toBe(true);
      });
    });
    describe('when set to false', () => {
      it('video should have controls property false', () => {
        const subject = mount(<Video poster={poster} src={singleVideoSource} controls={false} />);
        expect(subject.find('video')).toHaveLength(1);
        expect(subject.find('video').childAt(0).prop('src')).toBe(singleVideoSource[0].src);
        expect(subject.find('video').prop('controls')).toBe(false);
      });
    });
  });

  describe('crossorigin property', () => {
    describe('when not set', () => {
      it('video should have default crossorigin property', () => {
        const subject = mount(<Video poster={poster} src={singleVideoSource} />);
        expect(subject.find('video')).toHaveLength(1);
        expect(subject.find('video').childAt(0).prop('src')).toBe(singleVideoSource[0].src);
        expect(subject.find('video').prop('crossOrigin')).toBeUndefined();
      });
    });
    describe('when set to anonymous', () => {
      it('video should have crossorigin property anonymous', () => {
        const subject = mount(<Video poster={poster} src={singleVideoSource} crossorigin="anonymous" />);
        expect(subject.find('video')).toHaveLength(1);
        expect(subject.find('video').childAt(0).prop('src')).toBe(singleVideoSource[0].src);
        expect(subject.find('video').prop('crossOrigin')).toBe('anonymous');
      });
    });
    describe('when set to use-credentials', () => {
      it('video should have crossorigin property use-credentials', () => {
        const subject = mount(<Video poster={poster} src={singleVideoSource} crossorigin="use-credentials" />);
        expect(subject.find('video')).toHaveLength(1);
        expect(subject.find('video').childAt(0).prop('src')).toBe(singleVideoSource[0].src);
        expect(subject.find('video').prop('crossOrigin')).toBe('use-credentials');
      });
    });
  });

  describe('loop property', () => {
    describe('when not set', () => {
      it('video should have default loop property', () => {
        const subject = mount(<Video poster={poster} src={singleVideoSource} />);
        expect(subject.find('video')).toHaveLength(1);
        expect(subject.find('video').childAt(0).prop('src')).toBe(singleVideoSource[0].src);
        expect(subject.find('video').prop('loop')).toBe(false);
      });
    });
    describe('when set to true', () => {
      it('video should have loop property true', () => {
        const subject = mount(<Video poster={poster} src={singleVideoSource} loop={true} />);
        expect(subject.find('video')).toHaveLength(1);
        expect(subject.find('video').childAt(0).prop('src')).toBe(singleVideoSource[0].src);
        expect(subject.find('video').prop('loop')).toBe(true);
      });
    });
    describe('when set to false', () => {
      it('video should have loop property false', () => {
        const subject = mount(<Video poster={poster} src={singleVideoSource} loop={false} />);
        expect(subject.find('video')).toHaveLength(1);
        expect(subject.find('video').childAt(0).prop('src')).toBe(singleVideoSource[0].src);
        expect(subject.find('video').prop('loop')).toBe(false);
      });
    });
  });

  describe('muted property', () => {
    describe('when not set', () => {
      it('video should have default muted property', () => {
        const subject = mount(<Video poster={poster} src={singleVideoSource} />);
        expect(subject.find('video')).toHaveLength(1);
        expect(subject.find('video').childAt(0).prop('src')).toBe(singleVideoSource[0].src);
        expect(subject.find('video').prop('muted')).toBe(false);
      });
    });
    describe('when set to true', () => {
      it('video should have muted property true', () => {
        const subject = mount(<Video poster={poster} src={singleVideoSource} muted={true} />);
        expect(subject.find('video')).toHaveLength(1);
        expect(subject.find('video').childAt(0).prop('src')).toBe(singleVideoSource[0].src);
        expect(subject.find('video').prop('muted')).toBe(true);
      });
    });
    describe('when set to false', () => {
      it('video should have muted property false', () => {
        const subject = mount(<Video poster={poster} src={singleVideoSource} muted={false} />);
        expect(subject.find('video')).toHaveLength(1);
        expect(subject.find('video').childAt(0).prop('src')).toBe(singleVideoSource[0].src);
        expect(subject.find('video').prop('muted')).toBe(false);
      });
    });
  });

  describe('preload property', () => {
    describe('when not set', () => {
      it('video should have default preload property', () => {
        const subject = mount(<Video poster={poster} src={singleVideoSource} />);
        expect(subject.find('video')).toHaveLength(1);
        expect(subject.find('video').childAt(0).prop('src')).toBe(singleVideoSource[0].src);
        expect(subject.find('video').prop('preload')).toBeUndefined();
      });
    });
    describe('when set to auto', () => {
      it('video should have preload property auto', () => {
        const subject = mount(<Video poster={poster} src={singleVideoSource} preload="auto" />);
        expect(subject.find('video')).toHaveLength(1);
        expect(subject.find('video').childAt(0).prop('src')).toBe(singleVideoSource[0].src);
        expect(subject.find('video').prop('preload')).toBe('auto');
      });
    });
    describe('when set to none', () => {
      it('video should have preload property none', () => {
        const subject = mount(<Video poster={poster} src={singleVideoSource} preload="none" />);
        expect(subject.find('video')).toHaveLength(1);
        expect(subject.find('video').childAt(0).prop('src')).toBe(singleVideoSource[0].src);
        expect(subject.find('video').prop('preload')).toBe('none');
      });
    });
  });

  describe('style property', () => {
    describe('when not set', () => {
      it('video should have default style property', () => {
        const subject = mount(<Video poster={poster} src={singleVideoSource} />);
        expect(subject.find('video')).toHaveLength(1);
        expect(subject.find('video').childAt(0).prop('src')).toBe(singleVideoSource[0].src);
        expect(subject.find('video').props().style).toBeUndefined();
      });
    });
    describe('when height set', () => {
      it('video should have style property and height', () => {
        const subject = mount(<Video poster={poster} src={singleVideoSource} style={{ height: 300 }} />);
        expect(subject.find('video')).toHaveLength(1);
        expect(subject.find('video').childAt(0).prop('src')).toBe(singleVideoSource[0].src);
        expect(subject.find('video').props().style).toMatchObject({ height: 300 });
      });
    });
  });
});
