import { IDocumentAppState } from '../Types';

import ChoiceListState from './componentState/ChoiceListState';
import PanelState from './componentState/PanelState';
import FlexBoxState from './componentState/FlexBoxState';

const intialState : IDocumentAppState = {
  components: [
    ChoiceListState,
    PanelState,
    FlexBoxState,
  ],
};

export default intialState;
