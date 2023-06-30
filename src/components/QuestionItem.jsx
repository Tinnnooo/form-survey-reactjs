import React from "react";
import QuestionListItem from "./QuestionListItem";
import axiosClient from "../axios";
import { useStateContext } from "../contexts/ContextProvider";
import { useNavigate } from "react-router-dom";
import QuestionForm from "./QuestionForm";

export default function QuestionItem({ questions, formSlug, getForm }) {
  const { showToast } = useStateContext();

  const remove = (question_id) => {
    axiosClient
      .delete(`v1/forms/${formSlug}/questions/${question_id}`)
      .then(({ data }) => {
        showToast(data.message);
        getForm();
      })
      .catch(({ response }) => {
        showToast(response.data.message, "red");
      });
  };
  return (
    <>
      <div className="question-item card card-default my-4">
        {questions &&
          questions.map((question, index) => (
            <QuestionListItem key={index} question={question} remove={remove} />
          ))}
      </div>

      <div className="question-item card card-default my-4">
        <QuestionForm formSlug={formSlug} getForm={getForm} />
      </div>
    </>
  );
}
