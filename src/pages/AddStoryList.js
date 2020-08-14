import React from "react";
import { StoryListForm } from './../components';

export default function AddStoryList({ history }) {
  return (
    <React.Fragment>
      <StoryListForm history={history} />
    </React.Fragment>
  )
}
