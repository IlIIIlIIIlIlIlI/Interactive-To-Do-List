import produce from "immer";

const initialState = {
  task: [],
  addedTask: [],
  WIPTask: [],
  completedTask: [],
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "TASK_ADDED": {
      return produce(state, (draft) => {
        draft.task = [...draft.task, action.payload.task];
        draft.addedTask = [...draft.addedTask, action.payload.task];
      });
    }
    case "MOVE_TO_WIP": {
      const indexAt = state.addedTask.indexOf(action.payload.task);
      return produce(state, (draft) => {
        draft.addedTask.splice(indexAt, 1);
        draft.WIPTask = [action.payload.task, ...state.WIPTask];
      });
    }
    case "MOVE_BACK_TO_PENDING": {
      return produce(state, (draft) => {
        draft.WIPTask.splice(action.payload.index, 1);
        draft.addedTask = [action.payload.task, ...draft.addedTask];
      });
    }
    case "MOVE_TO_COMPLETED_TASK": {
      return produce(state, (draft) => {
        draft.completedTask = [action.payload.task, ...draft.completedTask];
        draft.WIPTask.splice(action.payload.index, 1);
      });
    }
    case "MOVE_BACK_TO_WIP": {
      return produce(state, (draft) => {
        draft.completedTask.splice(action.payload.index, 1);
        draft.WIPTask = [...draft.WIPTask, action.payload.task];
      });
    }
    default:
      return state;
  }
};
