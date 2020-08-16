import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import {
  AddStoryList,
  ViewAsScrumMaster,
  ViewAsDeveloper,
  Error,
} from "./pages";

export default function Routes() {
  return (
    <Switch>
      <Redirect exact from="/" to="/add-story-list" />
      <Route exact path="/add-story-list" component={AddStoryList} />
      <Route exact path="/view-planning-as-scrum-master/:sessionName" component={ViewAsScrumMaster} />
      <Route exact path="/view-planning-as-developer/:sessionName" component={ViewAsDeveloper} />
      <Route path="/error" component={Error} />
      <Redirect to="/error" />
    </Switch>
  );
}
