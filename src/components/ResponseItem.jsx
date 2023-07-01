import React, { useEffect, useState } from "react";
import axiosClient from "../axios";
import ResponseListItem from "./ResponseListItem";

export default function ResponseItem({ form }) {
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    axiosClient
      .get(`v1/forms/${form.slug}/responses`)
      .then(({ data }) => {
        setResponses(data.responses);
      })
      .catch(({ response }) => {
        console.log(response.data.message);
      });
  }, []);
  return (
    <>
      {responses.length === 0 && (
        <div className="text-center">No Response has been added</div>
      )}
      <table className="table mt-3">
        <caption>Total Responses: {responses.length}</caption>
        <thead>
          <tr className="text-muted">
            <th>User</th>
            {form.questions.map((question) => (
              <th key={question.id}>{question.name}</th>
            ))}
          </tr>
        </thead>
        {responses &&
          responses.map((response, ind) => (
            <ResponseListItem response={response} key={ind} />
          ))}
      </table>
    </>
  );
}
