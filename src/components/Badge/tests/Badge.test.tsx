import * as React from 'react';
import {mount} from 'enzyme';
import Badge from '../Badge';

describe('<DisplayText />', () => {

    it('Verify the default badge.', () => {
      const badgeWrapper = mount(<Badge>Status of badge is default</Badge>);
      expect(badgeWrapper.prop('status')).toBeFalsy();
      });

    it('Verify the Success badge.', () => {
      const badgeWrapper = mount(<Badge status="success">Status of badge is success.</Badge>);
      expect(badgeWrapper.prop('status')).toBe('success');
      });

    it('Verify the Informational badge.', () => {
      const badgeWrapper = mount( <Badge status="info">Status of badge is info.</Badge>);
      expect(badgeWrapper.prop('status')).toBe('info');
      });

    it('Verify the Attention badge.', () => {
      const badgeWrapper = mount(<Badge status="attention">Status of badge is attention.</Badge>);
      expect(badgeWrapper.prop('status')).toBe('attention');
      });

      it('Verify the Warning badge.', () => {
      const badgeWrapper = mount(<Badge status="warning">Status of badge is warning.</Badge>);
      expect(badgeWrapper.prop('status')).toBe('warning');
      });

    it('Verify the children prop of badge.', () => {
      const badgeWrapper = mount(<Badge status="warning">Status of badge is warning.</Badge>);
      expect(badgeWrapper.prop('children')).toBe('Status of badge is warning.');
      });

    it('Verify the children prop of badge.', () => {
      const badgeWrapper = mount(<Badge children="Hardik Mehta"></Badge>);
      expect(badgeWrapper.prop('children')).toBe('Hardik Mehta');
      });

    it('Verify the children prop of badge is blank.', () => {
      const badgeWrapper = mount(<Badge status="warning" children=""></Badge>);
      expect(badgeWrapper.prop('children')).toBeDefined;
      });

    it('Verify the progress prop of badge is incomplete.', () => {
      const badgeWrapper = mount(<Badge progress="incomplete"></Badge>);
      expect(badgeWrapper.prop('progress')).toBe('incomplete');
      });

      it('Verify the progress prop of badge is partiallyComplete.', () => {
      const badgeWrapper = mount(<Badge progress="partiallyComplete"></Badge>);
      expect(badgeWrapper.prop('progress')).toBe('partiallyComplete');
      });

    it('Verify the progress prop of badge is complete.', () => {
      const badgeWrapper = mount(<Badge progress="complete"></Badge>);
      expect(badgeWrapper.prop('progress')).toBe('complete');
      });

});
