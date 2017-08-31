import { IDocumentAppState } from '../Types';

import ChoiceListState from './componentState/ChoiceListState';
import PanelState from './componentState/PanelState';
import TagState from './componentState/TagState';

const intialState : IDocumentAppState = {
  components: [
    ChoiceListState,
    PanelState,
    TagState,
  ],
};

export default intialState;
