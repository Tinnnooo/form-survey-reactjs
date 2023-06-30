import React from "react";
import { useStateContext } from "../contexts/ContextProvider";

export default function QuestionListItem({ question, remove }) {
  const { choiceTypes } = useStateContext();

  return (
    <div className="card-body">
      <div className="form-group my-3">
        <input
          type="text"
          placeholder="Question"
          className="form-control"
          name="name"
          value={question.name}
          disabled
        />
      </div>

      <div className="form-group my-3">
        <select
          name="choice_type"
          className="form-select"
          value={question.choice_type}
          disabled
        >
          <option>Choice Type</option>
          {choiceTypes.map((type) => (
            <option value={type} key={type}>
              {type
                .split(" ")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
            </option>
          ))}
        </select>
      </div>

      {question.choices && (
        <div className="form-group my-3">
          <textarea
            placeholder="Choices"
            className="form-control"
            name="choices"
            rows="4"
            value={question.choices}
            disabled
          ></textarea>
          <div className="form-text">Separate choices using comma ",".</div>
        </div>
      )}

      <div className="form-check form-switch" aria-colspan="my-3">
        <input
          className="form-check-input"
          type="checkbox"
          role="switch"
          id="required"
          checked={question.is_required}
          disabled
        />
        <label className="form-check-label" htmlFor="required">
          Required
        </label>
      </div>
      <div className="mt-3">
        <button
          className="btn btn-outline-danger"
          onClick={(e) => remove(question.id)}
        >
          Remove
        </button>
      </div>
    </div>
  );
}
