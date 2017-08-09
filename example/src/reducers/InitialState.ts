import { IDocumentAppState } from '../Types';

import LinkState from './componentState/LinkState';
import ListState from './componentState/ListState';

const intialState : IDocumentAppState = {
  components: [
    LinkState,
    ListState,
  ],
};

export default intialState;
