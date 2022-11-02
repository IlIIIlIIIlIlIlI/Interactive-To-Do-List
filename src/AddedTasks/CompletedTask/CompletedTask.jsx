import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCompletedTask } from "../../Redux/Store/selector";
import "./CompletedTask.css";

function CompletedTask() {
  const completedTask = useSelector(selectCompletedTask);
  const dispatch = useDispatch();
  return (
    <div className="CompletedTaskDiv">
      <div className="CompletedTaskTitle">Completed Task</div>
      {!completedTask.length ? (
        <div className="completedNoTask">No task availeble</div>
      ) : (
        completedTask.map((task, index) => (
          <div className="CompletedTaskEntitee">
            <button
              className="completedbuttontowip"
              onClick={() => {
                dispatch({
                  type: "MOVE_BACK_TO_WIP",
                  payload: { task: task, index: index },
                });
              }}
            >
              🡨
            </button>
            {task}
            <span></span>
          </div>
        ))
      )}
    </div>
  );
}

export default CompletedTask;
