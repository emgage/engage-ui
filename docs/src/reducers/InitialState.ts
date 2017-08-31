import { IDocumentAppState } from '../Types';

import ChoiceListState from './componentState/ChoiceListState';
import PanelState from './componentState/PanelState';
import VideoState from './componentState/VideoState';

const intialState : IDocumentAppState = {
  components: [
    ChoiceListState,
    PanelState,
    VideoState,
  ],
};

export default intialState;
