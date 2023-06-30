import React, { useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";

export default function QuestionForm({ formSlug }) {
  const { choiceTypes } = useStateContext();

  const [name, setName] = useState("");
  const [choice_type, setChoiceType] = useState("");
  const [choices, setChoices] = useState("");
  const [is_required, setIsRequired] = useState(false);

  return (
    <div className="card-body">
      <form>
        <div className="form-group my-3">
          <input
            type="text"
            placeholder="Question"
            className="form-control"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="form-group my-3">
          <select
            name="choice_type"
            className="form-select"
            value={choice_type}
            onChange={(e) => setChoiceType(e.target.value)}
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

        <div className="form-group my-3">
          <textarea
            placeholder="Choices"
            className="form-control"
            name="choices"
            rows="4"
            value={choices}
            onChange={(e) => setChoices(e.target.value)}
          ></textarea>
          <div className="form-text">Separate choices using comma ",".</div>
        </div>

        <div className="form-check form-switch" aria-colspan="my-3">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            id="required"
            checked={is_required}
            onChange={(e) => setIsRequired(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="required">
            Required
          </label>
        </div>
        <div className="mt-3">
          <button type="submit" className="btn btn-outline-primary">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
