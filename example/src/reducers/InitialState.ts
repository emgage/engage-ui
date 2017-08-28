import { IDocumentAppState } from '../Types';

import ChoiceListState from './componentState/ChoiceListState';
import PanelState from './componentState/PanelState';
import BannerState from './componentState/BannerState';

const intialState : IDocumentAppState = {
  components: [
    ChoiceListState,
    PanelState,
    BannerState,
  ],
};

export default intialState;
