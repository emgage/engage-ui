import { IDocument } from '../../Types';
import VideoExample from '../../examples/VideoExample/VideoExample';
import VideoExample1 from '../../examples/VideoExample/VideoExample1';
import VideoExample2 from '../../examples/VideoExample/VideoExample2';
import VideoExample3 from '../../examples/VideoExample/VideoExample3';

const VideoExampleCode = require('!raw-loader!../../examples/VideoExample/VideoExample') as string;
const VideoExample1Code = require('!raw-loader!../../examples/VideoExample/VideoExample1') as string;
const VideoExample2Code = require('!raw-loader!../../examples/VideoExample/VideoExample2') as string;
const VideoExample3Code = require('!raw-loader!../../examples/VideoExample/VideoExample3') as string;

const VideoState: IDocument = {
  id: 'video',
  heading: 'Video',
  subheading: `Video component is used to view videos with different types and with diffrent sources(supports single source as well as multi source). The video component renders a HTML 5 video tag and applies their attributes.`,
  property: [
    {
      name: 'poster',
      type: 'URL',
      desc: 'To give Image URL for Video.',
    }, {
      name: 'src',
      type: 'VideoSource[ ] ( src: string, type: VideoType )',
      desc: 'Provide source of any video.',
    }, {
      name: 'autoplay',
      type: 'boolean',
      desc: 'To autoplay or not.',
    }, {
      name: 'controls',
      type: 'boolean',
      desc: 'See controls i.e.Play/Pause,Volume etc.',
    }, {
      name: 'crossorigin',
      type: 'CrossOrigin ( anonymous | use-credentials )',
      desc: 'Give cross origine to video.',
    }, {
      name: 'loop',
      type: 'boolean',
      desc: 'If true, upon reaching the end, the video will automatically replay.',
    }, {
      name: 'muted',
      type: 'boolean',
      desc: 'To mute video or not.',
    }, {
      name: 'preload',
      type: 'Preload ( none | metadata | auto )',
      desc: 'Provide preload.',
    }, {
      name: 'theme',
      type: 'any',
      desc: 'Theme to be injected via css-themr.',
    }, {
      name: 'style',
      type: 'React.CSSProperties',
      desc: 'To provide styling.',
    },
  ],
  exampleCodeHeader: 'Example 1: Default Video',
  exampleCodeDescription: 'Use when user need to use the Video component without any controls',
  exampleCode: VideoExampleCode,
  exampleComponent: VideoExample,
  exampleCodeHeader1: 'Example 2: Video with Controls',
  exampleCodeDescription1: 'Use when user need to use the Video component with controls.',
  exampleCode1: VideoExample1Code,
  exampleComponent1: VideoExample1,
  exampleCodeHeader2: 'Example 3: Video with Multi Source',
  exampleCodeDescription2: 'Use when user need to use the Video component with multiple source.',
  exampleCode2: VideoExample2Code,
  exampleComponent2: VideoExample2,
  exampleCodeHeader3: 'Example 4: Video with all properties',
  exampleCodeDescription3: 'Use this when user need the Video component with all the properties.',
  exampleCode3: VideoExample3Code,
  exampleComponent3: VideoExample3,
};

export default VideoState;
