import * as React from 'react';
import { themr, ThemedComponentClass } from '@friendsofreactjs/react-css-themr';
const baseTheme = require('./styles/Comments.scss');
import {
  Icon
} from '../src/components';

const commentData: any = [
  {
    name: "Jane Hancock",
    refName: "Trevor Hansen",
    comment: "Project 9 added. Please take a look and let me know if anything is missing.",
    time: "7:12 AM",
    image: "JaneHancock.jpg"
  },
  {
    name: "Trevor Hansen",
    refName: "Jane Hancock",
    comment: "this looks great. Why not add the activity picker as well?",
    time: "8:23 AM",
    image: "TrevorHansen.jpg"
  },
  {
    name: "Jane Hancock",
    refName: "Trevor Hansen",
    comment: "thanks for the feedback . I totally overlooked that picker. I’ve added it as you’re correct in that it shold be applied.",
    time: "10:57 AM",
    image: "JaneHancock.jpg"
  }
]

const Comments = (props:  any) => {

  const { name, theme, onClose } = props;
  return (
    <div className={theme.commentMainContainer}>
      <div className={theme.commentTitleContainer}>
        <div className={theme.title}>{name}</div>
        <div onClick={() => onClose(false)} className={theme.icon}><Icon source="cancel" componentColor="inkLighter"/></div>
      </div>
      <div>
        <hr />
        <div className={theme.todayContainer}>Today</div>
      </div>
      <div>{
        commentData.map((comment: any, index: number) => {
          const { name, refName, comment: text, time, image } = comment;
          return (
            <div className={`${theme.commentContainer} ${ (index === commentData.length - 1) ? theme.highlight: ""}`}>
              <div className={theme.imageContainer}><img className={theme.image} src={`/test/styles/images/${image}`} /></div>
              <div className={theme.name}>{name}</div>
              <div className={theme.time}>{time}</div>
              <div className={theme.comment}>
                <span className={theme.refName}>{refName}</span>
                <span className={theme.text}>{text}</span>
              </div>
            </div>
          )
        })
      }</div>
    </div>
  )
}

export default themr("COMMENTS", baseTheme)(Comments) as ThemedComponentClass<any, {}>;