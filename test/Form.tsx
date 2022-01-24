
import * as React from 'react';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import {
  Sticky,
  BreadCrumb,
  FlexBox,
  Heading,
  Picker,
  Card,
  SwitchCheckbox,
  Button,
  // Column,
  TextField,
  Icon
} from '../src/components';

const baseTheme = require('./styles/Form.scss');
// import * as ReadStyle from './styles/ReadStyle.scss';

const source = [
  {
    id: 1,
    name: "11 Agriculture, Forestry, Fishing and Hunting",
    key: 1,
  },
  {
    id: 2,
    name: "11 Agriculture, Forestry, Fishing and Hunting",
    key: 2,
  }
]

const Form = (props: any) => {
  const { DrawerStyle, theme } = props;
  const [ minoritySwitch, setMinoritySwitch] = React.useState(false);
  const [ businessSwitch, setBusinessSwitch] = React.useState(false);
  const [ slbeSwitch, setSlbeSwitch] = React.useState(false);
  return (
    <div>
      <Sticky
        position="top"
        theme={DrawerStyle}
        // componentClass={((editContentProperty || readContent || readField) || createStep === 0) && activeDrawer !== 'selectFieldType' && activeDrawer !== 'selectRelationship' ? theme.stickyEditHeader : ''}
      >
        <BreadCrumb
          source={[{name: "Internal Projects", type: "default"}, { name: "Create New Project", type: "text"}]}
          displayStyle="primary"
          theme={DrawerStyle}
        />
      </Sticky>
      <div className={theme.formBody}>
        <div style={{ maxWidth: '395px' }}>
          <FlexBox direction="Column">
            <FlexBox align="Center" componentClass={theme.drawerViewHeader}>
              <Heading element="h3" headingSize="h3" theme={theme}>Create New Project</Heading>
            </FlexBox>
            {/* <BodyText componentColor="darker" componentClass={theme.paddingRight}>{currentContentIns.description}</BodyText> */}
          </FlexBox>
        </div>
        <Card theme={theme} componentClass={theme.introCard}>
          <Heading element="h4" headingSize="subtitle" className={theme.cardHeader}>Project Details</Heading>
          <FlexBox direction="Column" theme={theme} componentClass={theme.cardContent}>
            <div className={theme.formFieldContainer}>
              <TextField
                type="text"
                componentId="name"
                label="Name"
              />
            </div>
            <div className={theme.formFieldContainer}>
              <TextField
                type="text"
                componentId="description"
                label="Description (optional)"
                multiline={true}
                minLength={0}
                maxLength={500}
              />
            </div>
            <div className={theme.formFieldContainer}>
              <TextField
                type="number"
                componentId="budget"
                label="Budget"
                prefix={<span>$</span>}
              />
            </div>
          </FlexBox>
        </Card>
        <Card theme={theme} componentClass={theme.introCard}>
          <Heading element="h4" headingSize="subtitle" className={theme.cardHeader}>Project Timeline</Heading>
          <FlexBox direction="Column" theme={theme} componentClass={theme.cardContent}>
            <div className={theme.formFieldContainer}>
              <TextField
                type="text"
                componentId="priority"
                label="Priority"
              />
            </div>
            <div className={theme.formFieldContainer}>
              <TextField
                type="date"
                componentId="startDate"
                label="Start Date"
              />
            </div>
            <div className={theme.formFieldContainer}>
              <TextField
                type="date"
                componentId="endDate"
                label="End Date"
              />
            </div>
          </FlexBox>
        </Card>
        <Card theme={theme} componentClass={theme.introCard}>
          <Heading element="h4" headingSize="subtitle" className={theme.cardHeader}>Business Type</Heading>
          <FlexBox direction="Column" theme={theme} componentClass={theme.cardContent}>
            <div className={theme.formFieldContainer}>
              <Picker
                label="NAICS Classification"
                source={source}
                defaultSelectedItems={[{ name: "11 Agriculture, Forestry, Fishing and Hunting"}]}
                maxSelectedItems={1}
                autoSuggest={true}
                noOptionsMessage="No items Available"
                shouldRenderSuggestions={true}
                suffix="users"
                componentId="coworkerPicker"
                helpText="Please provide one or more NAICS classification codes."
              />
            </div>
            <div className={theme.switchContainer}>
              <SwitchCheckbox componentClass={theme.formSwitch} isOpen={minoritySwitch} handleToggle={() => setMinoritySwitch(!minoritySwitch)} switchType="yesNo">
                Minority Owned Business
              </SwitchCheckbox>
              <div className={theme.switchDescription}>Is this company a 51% minority-owned business? </div>
            </div>
            <div className={theme.switchContainer}>
              <SwitchCheckbox componentClass={theme.formSwitch} isOpen={businessSwitch} handleToggle={() => setBusinessSwitch(!businessSwitch)} switchType="yesNo">
                Woman Owned Business
              </SwitchCheckbox>
              <div className={theme.switchDescription}>Is this company a 51% woman-owned business? </div>
            </div>
            <div className={theme.switchContainer}>
              <SwitchCheckbox componentClass={theme.formSwitch} isOpen={slbeSwitch} handleToggle={() => setSlbeSwitch(!slbeSwitch)} switchType="yesNo">
                Certified SLBE Business
              </SwitchCheckbox>
              <div className={theme.switchDescription}>Are you certified as an SLBE? </div>
            </div>
          </FlexBox>
        </Card>
      </div>
      <Sticky position="bottom" componentClass={theme.formFooter}>
          <div className={theme.flexBox}>
            <FlexBox justify="End">
              <Button
                componentSize="large"
                primary={true}
              >
                Create 
              </Button>
              <div className={theme.commonLeftMargin}>
                <Button
                  componentSize="large"
                >
                  Cancel
                </Button>
              </div>
            </FlexBox>
          </div>
        </Sticky>
    </div>
  )
}

export default themr("FORM_COMPONENT", baseTheme)(Form) as ThemedComponentClass<any, {}>;
