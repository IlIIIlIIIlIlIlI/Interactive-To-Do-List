import React from "react";
import { useFormik } from "formik";
import "./inputList.css";
import { useDispatch, useSelector } from "react-redux";
import { selectTask } from "../Redux/Store/selector";

function InputList() {
  const dispatch = useDispatch();
  const taskPresent = useSelector(selectTask);
  console.log("taskPresent", taskPresent);
  const formik = useFormik({
    validate: (values) => {
      let errors = {};
      if (
        values.task === "" ||
        values.task.replace(/\s\s+/g, " ").trim() === ""
      ) {
        errors = { task: "Enter Task" };
      }
      if (values.task.length >= 50)
        errors = {
          task: "Max character limit 50",
        };
      if (
        taskPresent.find(
          (task) => task.toUpperCase() === values.task.toUpperCase()
        )
      )
        errors = {
          task: "⚠️ Same task already added",
        };
      return errors;
    },
    validateOnMount: true,
    initialValues: {
      task: "",
    },
    mapPropsToValues: {
      task: "",
    },
    onSubmit: (values, formikProps) => {
      //  console.log("abc", values.task.replace(/\s\s+/g, " ").trim());
      dispatch({
        type: "TASK_ADDED",
        payload: { task: values.task.replace(/\s\s+/g, " ").trim() },
      });
      formikProps.resetForm();
    },
  });

  return (
    <div className="inputDiv">
      <form onSubmit={formik.handleSubmit}>
        <div>
          <div className="inputPosition">
            <input
              name="task"
              value={formik.values.task}
              onChange={formik.handleChange}
              onBlur={(event) => {
                formik.handleBlur(event);
                formik.setFieldValue(
                  "task",
                  formik.values.task.replace(/\s\s+/g, " ").trim()
                );
              }}
            />
          </div>

          <div className="inputPosition">
            <div className="errorDiv">
              {formik.errors.task === "Enter Task" ? null : formik.errors.task}
            </div>
          </div>

          <div className="inputPosition">
            <button
              id="submitButton"
              type="submit"
              disabled={
                !formik.isValid ||
                formik.values.task.replace(/\s\s+/g, " ").trim() === "" ||
                formik.isSubmitting ||
                formik.isValidating
              }
            >
              {formik.values.task.replace(/\s\s+/g, " ").trim()
                ? "Submit"
                : `Enter Task`}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default InputList;
