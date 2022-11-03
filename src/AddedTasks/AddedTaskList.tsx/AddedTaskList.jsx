import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAddedTask } from "../../Redux/Store/selector";
import "./AddedTaskList.css";

function AddedTaskList() {
  const addedTask = useSelector(selectAddedTask);
  const dispatch = useDispatch();
  return (
    <div className="AddedTaskList">
      <div className="PendingTask">Pending Task</div>
      <div>
        {!addedTask.length ? (
          <div className="completedNoTask">No task availeble</div>
        ) : (
          addedTask.map((task, index) => {
            return (
              <div className="taskListAddeeEntitee" key={task}>
                <div className="taskListAddeeEntiteeDiv">
                  <button
                    className="taskListAddeeEntiteeButton"
                    onClick={() => {
                      dispatch({
                        type: "DELETE_TASK_FROM_ADDED_TASK",
                        payload: { task: task, index: index },
                      });
                    }}
                  >
                    🗑️
                  </button>
                  <div className="taskListAddeeEntiteeText">{task}</div>
                  <button
                    className="taskListAddeeEntiteeButton"
                    onClick={() => {
                      dispatch({
                        type: "MOVE_TO_WIP",
                        payload: {
                          task: task,
                        },
                      });
                    }}
                  >
                    🡪
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default AddedTaskList;
