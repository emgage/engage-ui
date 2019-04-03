import * as React from 'react';
import { mount } from 'enzyme';
import Badge from '../Badge';

const theme = {
  badge: 'Badge',
  statusSuccess: 'statusSuccess',
  statusInfo: 'statusInfo',
  statusAttention: 'statusAttention',
  statusWarning: 'statusWarning',
  styleTwo: 'styleTwo',
  progressIncomplete: 'progressIncomplete',
  progressPartiallyComplete: 'progressPartiallyComplete',
  progressComplete: 'progressComplete',
  pip: 'Pip',
};

describe('<Badge />', () => {
  describe('when default props are provided', () => {
    it('basic badge should have rendered 1 span clss element', () => {
      const badgeWrapper = mount(
                                 <Badge  theme = {theme} />
                           );
      expect(badgeWrapper.find('span')).toHaveLength(1);
    });
    it('basic badge should have default Badge css clss on span', () => {
      const badgeWrapper = mount(
                                 <Badge  theme = {theme} />
                           );
      console.log(badgeWrapper.html());
      expect(badgeWrapper.find('span').at(0).hasClass('Badge')).toBe(true);
    });
  });

  describe('status property', () => {
    describe('when not set', () => {
      it('basic badge should have rendered one span clss element', () => {
        const badgeWrapper = mount(
                                   <Badge  theme = {theme} >
                                       Not set status of badge.
                                   </Badge>
                             );
        expect(badgeWrapper.find('span')).toHaveLength(1);
      });
      it('basic badge should have default Badge css clss on span', () => {
        const badgeWrapper = mount(
                                   <Badge  theme = {theme} >
                                       Not set status of badge.
                                   </Badge>
                             );
        expect(badgeWrapper.find('span').at(0).hasClass('Badge')).toBe(true);
      });
      it('should verify the status when not set or consider default', () => {
        const badgeWrapper = mount(
                                   <Badge  theme = {theme} >
                                       Not set status of badge.
                                   </Badge>
                             );
        expect(badgeWrapper.prop('status')).toBeFalsy();
      });
    });

    describe('when set', () => {
      it('basic badge should have rendered 2 span element', () => {
        const badgeWrapper = mount(
                                   <Badge  status="success" theme = {theme} >
                                       Set status of badge.
                                   </Badge>
                             );
        expect(badgeWrapper.find('span')).toHaveLength(2);
      });
      it('basic badge should have default Badge css clss on span', () => {
        const badgeWrapper = mount(
                                   <Badge  status="success" theme = {theme} >
                                       Set status of badge.
                                   </Badge>
                             );
        expect(badgeWrapper.find('span').at(0).hasClass('Badge')).toBe(true);
      });

      it('should verify status set as success', () => {
        const badgeWrapper = mount(
                                   <Badge  status="success" theme = {theme} >
                                       Set status of badge.
                                   </Badge>
                             );
        expect(badgeWrapper.prop('status')).toBe('success');
      });
      it('should verify statusSuccess css clss on span as per stuats', () => {
        const badgeWrapper = mount(
                                   <Badge  status="success" theme = {theme} >
                                       Set status of badge.
                                   </Badge>
                             );
        expect(badgeWrapper.find('span').at(0).hasClass('statusSuccess')).toBe(true);
      });
      it('should verify text on span as per status', () => {
        const text = 'Set status of badge.';
        const badgeWrapper = mount(
                                   <Badge  status="success" theme = {theme} >
                                       {text}
                                   </Badge>
                             );
        expect(badgeWrapper.find('span').at(1).text()).toBe('Success');
      });

      it('should verify status set as info', () => {
        const badgeWrapper = mount(
                                   <Badge status="info" theme={theme} >
                                      Set status of badge.
                                   </Badge>
                             );
        expect(badgeWrapper.prop('status')).toBe('info');
      });
      it('should verify statusInfo css clss on span as per stuats', () => {
        const badgeWrapper = mount(
                                   <Badge status="info" theme={theme} >
                                       Set status of badge.
                                   </Badge>
                             );
        expect(badgeWrapper.find('span').at(0).hasClass('statusInfo')).toBe(true);
      });
      it('should verify text on span as per status', () => {
        const text = 'Set status of badge.';
        const badgeWrapper = mount(
                                   <Badge status="info" theme={theme} >
                                       {text}
                                   </Badge>
                             );
        expect(badgeWrapper.find('span').at(1).text()).toBe('Info');
      });

      it('should verify stauts set as attention', () => {
        const badgeWrapper = mount(
                                   <Badge status="attention" theme={theme} >
                                       Set status of badge.
                                   </Badge>
                             );
        expect(badgeWrapper.prop('status')).toBe('attention');
      });
      it('should verify statusAttention css clss on span as per stuats', () => {
        const badgeWrapper = mount(
                                   <Badge status="attention" theme={theme} >
                                      Set status of badge.
                                   </Badge>
                             );
        expect(badgeWrapper.find('span').at(0).hasClass('statusAttention')).toBe(true);
      });
      it('should verify text on span as per status', () => {
        const text = 'Set status of badge.';
        const badgeWrapper = mount(
                                   <Badge status="attention" theme={theme} >
                                      {text}
                                   </Badge>
                             );
        expect(badgeWrapper.find('span').at(1).text()).toBe('Attention');
      });

      it('should verify stauts set as warning', () => {
        const badgeWrapper = mount(
                                   <Badge status="warning" theme={theme} >
                                      Set status of badge.
                                   </Badge>
                             );
        expect(badgeWrapper.prop('status')).toBe('warning');
      });
      it('should verify statusWarning css clss on span as per stuats', () => {
        const badgeWrapper = mount(
                                   <Badge status="warning" theme={theme} >
                                      Set status of badge.
                                   </Badge>
                             );
        expect(badgeWrapper.find('span').at(0).hasClass('statusWarning')).toBe(true);
      });
      it('should verify text on span as per status', () => {
        const text = 'Set status of badge.';
        const badgeWrapper = mount(
                                   <Badge status="warning" theme={theme} >
                                      {text}
                                   </Badge>
                             );
        expect(badgeWrapper.find('span').at(1).text()).toBe('Warning');
      });
    });
  });

  describe('children property' , () => {
    describe('when not set' , () => {
      it('basic badge should have rendered 1 span clss element', () => {
        const badgeWrapper = mount(
                                  <Badge  theme = {theme} />
                            );
        expect(badgeWrapper.find('span')).toHaveLength(1);
      });
      it('basic badge should have default Badge css clss on span', () => {
        const badgeWrapper = mount(
                                  <Badge  theme = {theme} />
                            );
        expect(badgeWrapper.find('span').at(0).hasClass('Badge')).toBe(true);
      });
      it('should verify the children when not set', () => {
        const badgeWrapper = mount(
                                   <Badge  theme = {theme} />
                             );
        expect(badgeWrapper.prop('children')).toBeFalsy();
      });
    });

    describe('when set' , () => {
      it('basic badge should have rendered 1 span clss element', () => {
        const badgeWrapper = mount(
                                   <Badge theme={theme} >
                                       Sample Badge
                                   </Badge>
                             );
        expect(badgeWrapper.find('span')).toHaveLength(1);
      });
      it('basic badge should have default Badge css clss on span', () => {
        const badgeWrapper = mount(
                                   <Badge theme={theme} >
                                       Sample Badge
                                   </Badge>
                             );
        expect(badgeWrapper.find('span').at(0).hasClass('Badge')).toBe(true);
      });
      it('should verify the children property of badge', () => {
        const badgeWrapper = mount(
                                   <Badge theme={theme} >
                                       Sample Badge
                                   </Badge>
                             );
        expect(badgeWrapper.prop('children')).toBe('Sample Badge');
        expect(badgeWrapper.prop('children')).toBeDefined();
      });
      it('should verify the children property of badge in same tag', () => {
        const badgeWrapper = mount(
                                   <Badge children="Sample Badge" theme={theme} />
                             );
        expect(badgeWrapper.prop('children')).toBe('Sample Badge');
        expect(badgeWrapper.prop('children')).toBeDefined();
      });
      it('should verify the children property of badge when set as blank', () => {
        const badgeWrapper = mount(
                                   <Badge children="" theme={theme} />
                             );
        expect(badgeWrapper.prop('children')).toBeDefined();
      });
    });
  });

  describe('progress property' , () => {
    describe('when not set' , () => {
      it('basic badge should have rendered 1 span clss element', () => {
        const badgeWrapper = mount(
                                   <Badge  theme = {theme} >,
                                       Not set progress of badge.
                                   </Badge>
                             );
        expect(badgeWrapper.find('span')).toHaveLength(1);
      });
      it('basic badge should have default Badge css clss on span', () => {
        const badgeWrapper = mount(
                                   <Badge  theme = {theme} >,
                                       Not set progress of badge.
                                   </Badge>
                             );
        expect(badgeWrapper.find('span').at(0).hasClass('Badge')).toBe(true);
      });
      it('should verify the progress when not set', () => {
        const badgeWrapper = mount(
                                   <Badge  theme = {theme} />
                             );
        expect(badgeWrapper.prop('progress')).toBeFalsy();
      });
    });

    describe('when set' , () => {
      it('basic badge should have rendered 3 span clss element', () => {
        const badgeWrapper = mount(
                                   <Badge progress="incomplete" theme={theme} >
                                       Not set progress of badge.
                                   </Badge>
                             );
        expect(badgeWrapper.find('span')).toHaveLength(3);
      });
      it('basic badge should have default Badge css clss on span', () => {
        const badgeWrapper = mount(
                                   <Badge progress="incomplete" theme={theme} >
                                       Not set progress of badge.
                                   </Badge>
                             );
        expect(badgeWrapper.find('span').at(0).hasClass('Badge')).toBe(true);
      });
      it('basic badge should have Pip css clss on span', () => {
        const badgeWrapper = mount(
                                   <Badge progress="incomplete" theme={theme} >
                                       Not set progress of badge.
                                   </Badge>
                             );
        expect(badgeWrapper.find('span').at(1).hasClass('Pip')).toBe(true);
      });

      it('should verify progress set as incomplete', () => {
        const badgeWrapper = mount(
                                   <Badge progress="incomplete" theme={theme} >
                                       Set progress of badge.
                                   </Badge>
                             );
        expect(badgeWrapper.prop('progress')).toBe('incomplete');
      });
      it('should verify progressIncomplete css clss on span as per progress', () => {
        const badgeWrapper = mount(
                                   <Badge progress="incomplete" theme={theme} >
                                       Set progress of badge.
                                   </Badge>
                             );
        expect(badgeWrapper.find('span').at(0).hasClass('progressIncomplete')).toBe(true);
      });
      it('should verify text on span as per progress', () => {
        const text = 'Set progress of badge.';
        const badgeWrapper = mount(
                                   <Badge progress="incomplete" theme={theme} >
                                       {text}
                                   </Badge>
                             );
        expect(badgeWrapper.find('span').at(1).text()).toBe('Incomplete');
      });

      it('should verify progress set as partiallyComplete', () => {
        const badgeWrapper = mount(
                                   <Badge progress="partiallyComplete" theme={theme} >
                                       Set progress of badge.
                                   </Badge>
                             );
        expect(badgeWrapper.prop('progress')).toBe('partiallyComplete');
      });
      it('should verify progressPartiallyComplete css clss on span as per progress', () => {
        const badgeWrapper = mount(
                                   <Badge progress="partiallyComplete" theme={theme} >
                                       Set progress of badge.
                                   </Badge>
                             );
        expect(badgeWrapper.find('span').at(0).hasClass('progressPartiallyComplete')).toBe(true);
      });
      it('should verify text on span as per progress', () => {
        const text = 'Set progress of badge.';
        const badgeWrapper = mount(
                                   <Badge progress="partiallyComplete" theme={theme} >
                                       {text}
                                   </Badge>
                             );
        expect(badgeWrapper.find('span').at(1).text()).toBe('Partially complete');
      });

      it('should verify progress set as complete', () => {
        const badgeWrapper = mount(
                                  <Badge progress="complete" theme={theme} />
                            );
        expect(badgeWrapper.prop('progress')).toBe('complete');
      });
      it('should verify progressComplete css clss on span as per progress', () => {
        const badgeWrapper = mount(
                                   <Badge progress="complete" theme={theme} >
                                       Set progress of badge.
                                   </Badge>
                             );
        expect(badgeWrapper.find('span').at(0).hasClass('progressComplete')).toBe(true);
      });
      it('should verify text on span as per progress', () => {
        const text = 'Set progress of badge.';
        const badgeWrapper = mount(
                                   <Badge progress="complete" theme={theme} >
                                       {text}
                                   </Badge>
                             );
        expect(badgeWrapper.find('span').at(1).text()).toBe('Complete');
      });
    });
  });
  describe('verify all property together', () => {
    it('basic badge should have rendered 4 span clss element', () => {
      const badgeWrapper = mount(
                                  <Badge progress="complete" status="info" theme={theme}  >
                                      All properties are set for Badge.
                                  </Badge>
                            );
      expect(badgeWrapper.find('span')).toHaveLength(4);
    });
    it('should verify default Badge css clss on span', () => {
      const badgeWrapper = mount(
                                  <Badge progress="complete" status="info" theme={theme}  >
                                      All properties are set for Badge.
                                  </Badge>
                            );
      expect(badgeWrapper.find('span').at(0).hasClass('Badge')).toBe(true);
    });
    it('should verify statusInfo css clss on span as per stuats', () => {
      const badgeWrapper = mount(
                                  <Badge status="info" theme={theme} >
                                      Set status of badge.
                                  </Badge>
                            );
      expect(badgeWrapper.find('span').at(0).hasClass('statusInfo')).toBe(true);
    });
    it('should verify progressComplete css clss on span as per progress', () => {
      const badgeWrapper = mount(
                                  <Badge progress="complete" theme={theme} >
                                      Set progress of badge.
                                  </Badge>
                            );
      expect(badgeWrapper.find('span').at(0).hasClass('progressComplete')).toBe(true);
    });
    it('should verify have Pip css clss on span', () => {
      const badgeWrapper = mount(
                                  <Badge progress="complete" status="info" theme={theme} >
                                      All properties are set for Badge.
                                  </Badge>
                            );
      expect(badgeWrapper.find('span').at(2).hasClass('Pip')).toBe(true);
    });
    it('should verify text on span as per status', () => {
      const text = 'All properties are set for Badge.';
      const badgeWrapper = mount(
                                  <Badge progress="complete" status="info" theme={theme} >
                                      {text}
                                  </Badge>
                            );
      expect(badgeWrapper.find('span').at(1).text()).toBe('Info');
    });
    it('should verify text on span as per progress', () => {
      const text = 'All properties are set for Badge.';
      const badgeWrapper = mount(
                                  <Badge progress="complete" status="info" theme={theme} >
                                      {text}
                                  </Badge>
                            );
      expect(badgeWrapper.find('span').at(2).text()).toBe('Complete');
    });
    it('should verify all properties are set', () => {
      const badgeWrapper = mount(
                                  <Badge progress="complete" status="info" theme={theme} >
                                      All properties are set for Badge.
                                  </Badge>
                            );
      expect(badgeWrapper.prop('status')).toBe('info');
      expect(badgeWrapper.prop('progress')).toBe('complete');
      expect(badgeWrapper.prop('children')).toBe('All properties are set for Badge.');
    });
  });
});
