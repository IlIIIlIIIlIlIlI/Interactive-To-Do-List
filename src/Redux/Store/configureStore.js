import produce from "immer";

const initialState = JSON.parse(sessionStorage.getItem("redux")) || {
  task: [],
  addedTask: [],
  WIPTask: [],
  completedTask: [],
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "TASK_ADDED": {
      const redux = produce(state, (draft) => {
        draft.task = [...draft.task, action.payload.task];
        draft.addedTask = [...draft.addedTask, action.payload.task];
      });
      sessionStorage.setItem("redux", JSON.stringify(redux));
      return redux;
    }
    case "MOVE_TO_WIP": {
      const indexAt = state.addedTask.indexOf(action.payload.task);
      const redux = produce(state, (draft) => {
        draft.addedTask.splice(indexAt, 1);
        draft.WIPTask = [action.payload.task, ...state.WIPTask];
      });
      sessionStorage.setItem("redux", JSON.stringify(redux));
      return redux;
    }
    case "MOVE_BACK_TO_PENDING": {
      const redux = produce(state, (draft) => {
        draft.WIPTask.splice(action.payload.index, 1);
        draft.addedTask = [action.payload.task, ...draft.addedTask];
      });
      sessionStorage.setItem("redux", JSON.stringify(redux));
      return redux;
    }
    case "MOVE_TO_COMPLETED_TASK": {
      const redux = produce(state, (draft) => {
        draft.completedTask = [action.payload.task, ...draft.completedTask];
        draft.WIPTask.splice(action.payload.index, 1);
      });
      sessionStorage.setItem("redux", JSON.stringify(redux));
      return redux;
    }
    case "MOVE_BACK_TO_WIP": {
      const redux = produce(state, (draft) => {
        draft.completedTask.splice(action.payload.index, 1);
        draft.WIPTask = [...draft.WIPTask, action.payload.task];
      });
      sessionStorage.setItem("redux", JSON.stringify(redux));
      return redux;
    }
    case "DELETE_TASK": {
      const indexAt = state.task.indexOf(action.payload.task);
      const redux = produce(state, (draft) => {
        draft.completedTask.splice(action.payload.index, 1);
        draft.task.splice(indexAt, 1);
      });
      sessionStorage.setItem("redux", JSON.stringify(redux));
      return redux;
    }
    case "DELETE_TASK_FROM_ADDED_TASK": {
      const indexAt = state.task.indexOf(action.payload.task);
      const redux = produce(state, (draft) => {
        draft.addedTask.splice(action.payload.index, 1);
        draft.task.splice(indexAt, 1);
      });
      sessionStorage.setItem("redux", JSON.stringify(redux));
      return redux;
    }
    default:
      return state;
  }
};
