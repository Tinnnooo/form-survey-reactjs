import React from "react";

export default function FormComponent({ question, handleChange }) {
  const mainLabel = () => {
    return (
      <>
        <label htmlFor={question.id} className="mb-1 text-muted">
          {question.name}
          {question.is_required && <span className="text-danger">*</span>}
        </label>
      </>
    );
  };

  const convertChoices = (choices) => {
    return choices.split(", ");
  };

  const shortAnswer = () => {
    return (
      <>
        {mainLabel()}
        <input
          id={question.id}
          type="text"
          placeholder="Your answer"
          className="form-control"
          name={question.name}
          onChange={(e) => handleChange(e, question.id)}
        />
      </>
    );
  };

  const Paragraph = () => {
    return (
      <>
        {mainLabel()}
        <textarea
          id={question.id}
          rows="4"
          placeholder="Your answer"
          className="form-control"
          name={question.name}
          onChange={(e) => handleChange(e, question.id)}
        ></textarea>
      </>
    );
  };

  const Date = () => {
    return (
      <>
        {mainLabel()}
        <input
          type="date"
          placeholder="Your answer"
          className="form-control"
          id={question.id}
          name={question.name}
          onChange={(e) => handleChange(e, question.id)}
        />
      </>
    );
  };

  const multipleChoice = () => {
    const choices = convertChoices(question.choices);

    return (
      <>
        {mainLabel()}

        {choices &&
          choices.map((choice, ind) => (
            <div className="form-check" key={ind}>
              <input
                className="form-check-input"
                type="radio"
                value={choice}
                id={`${question.name}-${choice}`}
                name={question.name}
                onChange={(e) => handleChange(e, question.id)}
              />
              <label
                className="form-check-label"
                htmlFor={`${question.name}-${choice}`}
              >
                {choice}
              </label>
            </div>
          ))}
      </>
    );
  };

  const Dropdown = () => {
    const choices = convertChoices(question.choices);

    return (
      <>
        {mainLabel()}

        <select
          name="choice_type"
          className="form-select"
          onChange={(e) => handleChange(e, question.id)}
        >
          <option>Choice Type</option>
          {choices &&
            choices.map((choice, ind) => (
              <option value={choice} key={ind}>
                {choice}
              </option>
            ))}
        </select>
      </>
    );
  };

  const Checkboxes = () => {
    const choices = convertChoices(question.choices);

    return (
      <>
        {mainLabel()}

        {choices &&
          choices.map((choice, ind) => (
            <div className="form-check" key={ind}>
              <input
                className="form-check-input"
                type="checkbox"
                value={choice}
                id={`${question.name}-${choice}`}
                name={question.name}
                onChange={(e) => handleChange(e, question.id)}
              />
              <label
                className="form-check-label"
                htmlFor={`${question.name}-${choice}`}
              >
                {choice}
              </label>
            </div>
          ))}
      </>
    );
  };

  const checkChoiceType = () => {
    if (question.choice_type === "short answer") {
      const content = shortAnswer();
      return content;
    } else if (question.choice_type === "paragraph") {
      const content = Paragraph();
      return content;
    } else if (question.choice_type === "date") {
      const content = Date();
      return content;
    } else if (question.choice_type === "multiple choice") {
      const content = multipleChoice();
      return content;
    } else if (question.choice_type === "dropdown") {
      const content = Dropdown();
      return content;
    } else if (question.choice_type === "checkboxes") {
      const content = Checkboxes();
      return content;
    }
  };
  return (
    <div className="form-item card card-default my-4">
      <div className="card-body">
        <div className="form-group">{checkChoiceType()}</div>
      </div>
    </div>
  );
}
