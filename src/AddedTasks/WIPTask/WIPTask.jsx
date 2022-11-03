import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectWIPTask } from "../../Redux/Store/selector";
import "./WIPTask.css";

function WIPTask() {
  const wipTask = useSelector(selectWIPTask);
  const dispatch = useDispatch();
  return (
    <div className="WIPMainDiv">
      <div className="WIPHeadDiv">Task In Progress</div>
      <div>
        {!wipTask.length ? (
          <div className="completedNoTask">No task availeble</div>
        ) : (
          wipTask.map((task, index) => (
            <div className="WIPWrapper" key="task">
              <div className="WIPEntitee">
                <button
                  className="WIPButton"
                  onClick={() =>
                    dispatch({
                      type: "MOVE_BACK_TO_PENDING",
                      payload: {
                        task: task,
                        index: index,
                      },
                    })
                  }
                >
                  🡨
                </button>

                <span>{task}</span>

                <button
                  className="WIPButton"
                  onClick={() =>
                    dispatch({
                      type: "MOVE_TO_COMPLETED_TASK",
                      payload: {
                        task: task,
                        index: index,
                      },
                    })
                  }
                >
                  🡪
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="WIPHeadDiv" style={{ visibility: "hidden" }}>
        Task In Progress
      </div>
    </div>
  );
}

export default WIPTask;
