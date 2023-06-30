import React, { useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios";

export default function QuestionForm({ formSlug, getForm }) {
  const { choiceTypes, showToast } = useStateContext();

  const [name, setName] = useState("");
  const [choice_type, setChoiceType] = useState("");
  const [choices, setChoices] = useState("");
  const [is_required, setIsRequired] = useState(false);
  const [haveOptions] = useState(['multiple choice', 'dropdown', 'checkboxes'])
  const [error, setError] = useState({});

  const shouldHaveChoices = (type = null) => {
    type = type || choice_type;
    if (haveOptions.includes(type)) {
      return (
        <div className="form-group my-3">
          <textarea
            placeholder="Choices"
            className="form-control"
            name="choices"
            rows="4"
            value={choices}
            onChange={(e) => setChoices(e.target.value)}
          ></textarea>
          {error.choices && <small className="text-danger">{error.choices}</small>}
          <div className="form-text">Separate choices using comma ",".</div>
        </div>
      )
    }
    return;
  }

  const resetValue = () => {
    setName('');
    setChoiceType('');
    setChoices('');
    setIsRequired('');
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const choiceArray = choices.split(", ").filter(choice => choice.trim() !== "");
    axiosClient.post(`/v1/forms/${formSlug}/questions`, {
      name,
      choice_type,
      choices: choiceArray,
      is_required,
    })
      .then(({ data }) => {
        showToast(data.message);
        resetValue();
        getForm();
      }).catch(({ response }) => {
        showToast(response.data.message, "red");
        setError(response.data.errors);
      })
  }

  return (
    <div className="card-body">
      <form method="POST" onSubmit={onSubmit}>
        <div className="form-group my-3">
          <input
            type="text"
            placeholder="Question"
            className="form-control"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {error.name && <small className="text-danger">{error.name}</small>}
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
          {error.choice_type && <small className="text-danger">{error.choice_type}</small>}
        </div>

        {shouldHaveChoices()}

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
