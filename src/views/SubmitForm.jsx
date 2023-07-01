import React, { useEffect, useState } from "react";
import axiosClient from "../axios";
import { useNavigate, useParams } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import FormComponent from "../components/FormComponent";

export default function SubmitForm() {
  const { currentUser, showToast } = useStateContext();
  const { form_slug } = useParams();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({});

  const [formData, setFormData] = useState([]);

  const navigate = useNavigate();

  const getForm = () => {
    setLoading(true);
    axiosClient
      .get(`v1/forms/${form_slug}`)
      .then(({ data }) => {
        setForm(data.form);
        const emptyFormData = data.form.questions.map((question) => ({
          question_id: question.id,
          value: "",
        }));
        setFormData(emptyFormData);
        setLoading(false);
      })
      .catch(({ response }) => {
        if (response.status === 403) {
          navigate("/forbidden");
        } else if (response.status === 404) {
          navigate("/nofound");
        }
        setLoading(false);
      });
  };

  useEffect(() => {
    getForm();
  }, []);

  const handleChange = (e, questionId) => {
    const { value } = e.target;

    // Find the index of the question in formData
    const questionIndex = formData.findIndex(
      (answer) => answer.question_id === questionId
    );

    // If the question is not found in formData, add a new answer
    if (questionIndex === -1) {
      setFormData((prevFormData) => [
        ...prevFormData,
        {
          question_id: questionId,
          value: value,
        },
      ]);
    } else {
      // If the question is found, update the value of the existing answer
      setFormData((prevFormData) => [
        ...prevFormData.slice(0, questionIndex),
        {
          question_id: questionId,
          value: value,
        },
        ...prevFormData.slice(questionIndex + 1),
      ]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosClient
      .post(`v1/forms/${form_slug}/responses`, {
        answers: formData,
      })
      .then(({ data }) => {
        showToast(data.message);
        getForm();
      })
      .catch(({ response }) => {
        if (response.data.errors) {
          showToast(response.data.errors.answers, "red");
        } else {
          showToast(response.data.message, "red");
        }
      });
  };

  return (
    <main>
      {loading && <div className="text-center fw-bold fs-4">Loading...</div>}

      {!loading && (
        <>
          <div className="hero py-5 bg-light">
            <div className="container text-center">
              <h2 className="mb-3">{form.name}</h2>
              <div className="text-muted">{form.description}</div>
            </div>
          </div>

          <div className="py-5">
            <div className="container">
              <div className="row justify-content-center ">
                <div className="col-lg-5 col-md-6">
                  <div className="text-muted">
                    <span className="text-primary">{currentUser.email}</span>{" "}
                    <small>
                      <i>(shared)</i>
                    </small>
                  </div>

                  <form onSubmit={handleSubmit}>
                    {form.questions &&
                      form.questions.map((question, ind) => (
                        <FormComponent
                          key={ind}
                          question={question}
                          handleChange={handleChange}
                        />
                      ))}
                    <div className="mt-4">
                      <button type="submit" className="btn btn-primary">
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </main>
  );
}
