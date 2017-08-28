import { IDocument } from '../../Types';
import VideoExampleFirst from '../../examples/VideoExample/VideoExampleFirst';
import VideoExampleSecond from '../../examples/VideoExample/VideoExampleSecond';

const VideoExampleFirstCode = require('!raw-loader!../../examples/VideoExample/VideoExampleFirst') as string;
const VideoExampleSecondCode = require('!raw-loader!../../examples/VideoExample/VideoExampleSecond') as string;

const VideoState: IDocument = {
  id: 'video',
  heading: 'Video Component',
  subheading: `Video component is used to view videos with different types and with diffrent sources(supports single source as well as multi source).Also supports single source as well as multi source for Video.The video component renders a HTML 5 video tag and applies their attributes`,
  property: [
    {
      name: 'poster',
      type: 'URL',
      desc: 'To give Image URL for Video.',
    }, {
      name: 'src',
      type: 'VideoSource[](src: string,type: VideoType)',
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
      type: 'CrossOrigin(anonymous,use-credentials)',
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
      type: 'Preload(none,metadata,auto)',
      desc: 'Provide preload.',
    }, {
      name: 'theme',
      type: 'any',
      desc: 'Theme to be injected via css-themr.',
    },{
      name: 'style',
      type: 'React.CSSProperties',
      desc: 'To provide styling.',
    },
  ],
  exampleCode: VideoExampleFirstCode,
  exampleComponent: VideoExampleFirst,
  exampleCodeExtra: VideoExampleSecondCode,
  exampleComponentExtra: VideoExampleSecond,
};

export default VideoState;
