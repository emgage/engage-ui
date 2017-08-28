import { IDocumentAppState } from '../Types';

import ChoiceListState from './componentState/ChoiceListState';
import PanelState from './componentState/PanelState';
import ImageState from './componentState/ImageState';

const intialState : IDocumentAppState = {
  components: [
    ChoiceListState,
    PanelState,
    ImageState,
  ],
};

export default intialState;
