import { UnstyledLink, LinkLikeComponent } from './components';

export function useLinkComponent(linkComponent: LinkLikeComponent) {
  UnstyledLink.use(linkComponent);
}
