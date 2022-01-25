
import * as React from 'react';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
import {
  FlexBox,
  Icon,
  TextField,
  SearchHelper,
  Button,
  VisuallyHidden,
  Chip,
  Table,
  Drawer,
  DrawerContent
} from '../src/components';
import { TableData } from './data/TableData';
import Comments from './Comments';
const baseTheme = require('./styles/TableComponent.scss');
import * as DrawerStyle from './styles/PlatformDrawer.scss';
import Form from './Form';

declare var $: any;
const TableConfig = ({ theme }: any, commentClickHandler: any) =>  {
  const columns = [
    {
      label: 'Project',
      key: 'project',
      search: false,
      hideHeader: false,
      injectBody: (data: any) => {
        const { stage, project } = data;
        let stageColor = "planning";
        if (stage === "In Progress") {
          stageColor = "progress"
        }
        return (
          <div className={theme[stageColor]}>{project}</div>
        );
      },
    },
    {
      label: '',
      key: 'comments',
      style: { width: '30px' },
      search: false,
      hideHeader: true,
      injectBody: (data: any) => {
        const { comments } = data;
        let commentDisabled = true;
        if (comments > 0) {
          commentDisabled = false;
        }
        return (
          <div className={theme.commentContainer} onClick={commentClickHandler}>
            <Icon source="comments" componentColor={commentDisabled ? "inkLighter" : "blueLight"} />
            <div className={theme.commentCount}>{ !commentDisabled ? comments : ""}</div>
          </div>
        );
      },
    },
    {
      label: 'Owner',
      key: 'owner',
      style: { width: '150px' },
      search: false,
      hideHeader: false,
      injectBody: (data: any) => {
        // const images = ["EleanorPena.jpg", "JacobJones.jpg", "JaneCooper.jpg", "JaneHancock.jpg", "KristinWatson.jpg", "TrevorHansen.jpg"];
        // const image = images[Math.floor(Math.random() * images.length)]
        const { owner, image } = data;
        return (
          <div>
            <Chip
              image={{
                url: `/test/styles/images/${image}`,
                // alt: owner,
              }}
            >
              <div className={theme.chipData}>{ owner }</div>
            </Chip>
          </div>
        );
      },
    },
    {
      label: 'Status',
      key: 'status',
      style: { width: '81px' },
      search: false,
      hideHeader: true,
      injectBody: (data: any) => {
        const { status } = data;
        let statusClass = "med";
        if (status === "Stuck") {
          statusClass = "high";
        } else if (status === "Healthy") {
          statusClass = "low";
        }
        return (
          <div className={theme.statusContainer}>
            <div className={`${theme.status} ${theme[statusClass]}`}>{status}</div>
          </div>
        );
      },
    },
    {
      label: 'Timeline',
      key: 'timeline',
      style: { width: '130px' },
      search: false,
      hideHeader: true,
      injectBody: (data: any) => {
        const { status, completed, timeline } = data;
        let statusClass = "med";
        if (status === "Stuck") {
          statusClass = "high";
        } else if (status === "Healthy") {
          statusClass = "low";
        }
        return ( timeline &&
          <div className={theme.timelineContainer}>
            <div
              style={{
                background: `linear-gradient(90deg, ${theme[statusClass]} ${completed}%, #424242 ${completed}%)`
              }}
              className={theme.timeline}
            >
              {timeline}
            </div>
          </div>
        );
      },
    },
    {
      label: 'Budget',
      key: 'budget',
      style: { width: '72px' },
      search: false,
      hideHeader: false,
      injectBody: (data: any) => {
        const { budget } = data;
        return (
          <div>{budget}</div>
        );
      },
    },
    {
      label: 'Priority',
      key: 'priority',
      style: { width: '78px' },
      search: false,
      hideHeader: false,
      injectBody: (data: any) => {
        const { priority = "low" } = data;
        let priorityValue = "!";
        if (priority === "high") {
          priorityValue = "!!!";
        } else if (priority === "med") {
          priorityValue = "!!";
        }
        return (
          <div className={`${theme.priorityContainer} ${theme[priority]}`} >{priorityValue}</div>
        );
      },
    },
  ]

  return columns;
}

const TableSearch = ({ addButtonHandler }: any) => {
  const [ searchTerm, setSearchTerm ] = React.useState("");
  return (
    <div style={{ marginBottom: 20 }}>
    <FlexBox>
        <div style={{ flex: 1, marginRight: "16px" }}>
          <TextField
            label="Search"
            type="text"
            onChange={(value) => setSearchTerm(value)}
            prefix={<Icon source="search" componentColor="inkLighter"/>}
            suffix={searchTerm && <Icon source="cancelSmall" componentColor="inkLighter" />}
            helpText={<SearchHelper />}
          />
        </div>
        <div style={{ marginLeft: 8, marginRight: 8 }}>
          <Button
            primary
            icon="add"
            onClick={addButtonHandler}
          >
            <span style={{ marginLeft: 6, fontSize: 16}}>Create Project</span>
          </Button>
        </div>
        <div>
          <Button
            componentSize="large"
            icon="horizontalDots"
          >
            <VisuallyHidden>More Actions</VisuallyHidden>
          </Button>
        </div>
    </FlexBox>
  </div>
  ); 
}

// function move(elem: any, px: number, reset: boolean) {
//   var left = reset ? px : 0;
//   function frame() {
//     if (reset) {
//       left -= 10  // update parameters
//       elem.style.width = `calc(100% - ${left}px)` // show frame
//       if (left == 0)  // check finish condition
//           clearInterval(id)
//     } else {
//       left += 10 // update parameters
//       elem.style.width = `calc(100% - ${left}px)` // show frame
//       if (left == px)  // check finish condition
//           clearInterval(id)
//     }
//   }
//   var id = setInterval(frame, 1) // draw every 10ms
// }

const TableComponent = (props: any) => {
  console.log("Table Props = ", props);
  const { theme, onDrawerClick } = props;
  const [ drawerState, setDrawerState ]: any = React.useState(undefined);
  const [ projectDrawerState, setProjectDrawerState ]: any = React.useState(undefined);

  const containerRef = React.useRef(null);

  const onClose = React.useCallback(() => {
    setDrawerState(false);
  }, []);

  const onCommentClickHandler = React.useCallback(() => {
    setDrawerState(! drawerState);
  }, [drawerState]);

  React.useEffect(() => {
    if (drawerState === undefined) return;
    if (drawerState) {
      onDrawerClick(drawerState);
      // document.body.classList.add("shrinkTable");
      // move(containerRef.current, 270, false);
    } else {
      onDrawerClick(drawerState);
      // document.body.classList.remove("shrinkTable");
      // move(containerRef.current, 270, true);
    }
  }, [drawerState]);
  let columns: any = TableConfig(props, onCommentClickHandler);

  return (
    <div ref={containerRef}>
      <TableSearch addButtonHandler={() =>setProjectDrawerState(true) }/>
      <div>
        <Table
          bordered={true}
          highlight={true}
          sorting="all"
          data={TableData}
          column={columns}
          rowAction={[]}
          rowCallbackValue="id"
          noDataLabel={` No Data available`}
        />
      </div>
      <div>
        <Drawer
          overlay={false}
          flip={true}
          // toggleDrawer={this.toggleDrawer}
          active={drawerState}
          activeContentId="comments"
          onClose={onClose}
          mode="push"
          zIndex={200}
          componentWidth="small"
          id="commentDrawer"
          componentClass={theme.drawerStyle}
        >
          <DrawerContent style={{padding: '15px 0', top: 50, position: "relative"}} componentId="comments" mode="slide">
            <Comments name="Project 9" onClose={setDrawerState} />
          </DrawerContent>
        </Drawer>
      </div>
      <div>
      <Drawer
        key={`Create_Project`}
        closeButton
        overlay
        flip
        toggleDrawer={() => setProjectDrawerState(false)}
        onClose={() => setProjectDrawerState(false)}
        id={`projectDrawer`}
        active={projectDrawerState}
        activeContentId="form"
        mode="push"
        master
        componentWidth={"820px"}
        zIndex={500}
        theme={DrawerStyle}
        fixedCloseButton={false}
      >
        <DrawerContent componentId="form" mode="slide">
          <Form />
        </DrawerContent>
      </Drawer>
      </div>
    </div>
  )
}

export default themr("TABLE_COMPONENT", baseTheme)(TableComponent) as ThemedComponentClass<any, {}>;
