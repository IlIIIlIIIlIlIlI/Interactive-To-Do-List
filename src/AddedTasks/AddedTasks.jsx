import React from "react";
import AddedTaskList from "./AddedTaskList.tsx/AddedTaskList";
import CompletedTask from "./CompletedTask/CompletedTask";
import WIPTask from "./WIPTask/WIPTask";
import "./AddedTask.css";

function AddedTasks() {
  return (
    <div className="addedTask">
      <div className="AddedTaskListList">
        <AddedTaskList />
      </div>

      <div className="WIPTaskList">
        <WIPTask />
      </div>

      <div className="CompletedTaskList">
        <CompletedTask />
      </div>
    </div>
  );
}

export default AddedTasks;
