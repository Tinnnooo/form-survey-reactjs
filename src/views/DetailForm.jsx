import React, { useEffect, useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios";
import { useNavigate, useParams } from "react-router-dom";
import { render } from "react-dom";
import QuestionItem from "../components/QuestionItem";
import ResponseItem from "../components/ResponseItem";

export default function DetailForm() {
  const { showToast } = useStateContext();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({});
  const [link, setLink] = useState(window.location.href + "/invited");
  const [activeTab, setActiveTab] = useState("questions");

  const { form_slug } = useParams();

  const navigate = useNavigate();

  const getForm = () => {
    setLoading(true);
    axiosClient
      .get(`v1/forms/${form_slug}`)
      .then(({ data }) => {
        setForm(data.form);
        setLoading(false);
      })
      .catch(({ response }) => {
        showToast(response.data.message, "red");
        if (response.status === 403) {
          navigate("/forbidden");
        } else if (response.status === 404) {
          navigate("/notfound");
        }
      });
  };

  useEffect(() => {
    getForm();
  }, []);

  const copy = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(link);
    showToast("Link copied.");
  };

  const switchToQuestions = () => {
    setActiveTab("questions");
  };

  const switchToResponses = () => {
    setActiveTab("responses");
  };

  const renderContent = () => {
    if (activeTab === "questions") {
      return (
        <div className="col-lg-5 col-md-6">
          <QuestionItem
            questions={form.questions}
            formSlug={form_slug}
            getForm={getForm}
          />
        </div>
      );
    } else if (activeTab === "responses") {
      return (
        <div className="col-lg-10">
          <ResponseItem form={form} />
        </div>
      );
    }
  };

  return (
    <main>
      {loading && <div className="text-center fw-bold fs-4">Loading...</div>}
      {!loading && (
        <>
          <div className="hero py-5 bg-light">
            <div className="container text-center">
              <h2 className="mb-2">{form.name}</h2>
              <div className="text-muted mb-4">{form.description}</div>
              <div>
                <div>
                  <small>For user domains</small>
                </div>
                <small>
                  <span className="text-primary">
                    {form.allowed_domains && (
                      <small>{form.allowed_domains.join(", ")}</small>
                    )}
                  </span>
                </small>
              </div>
            </div>
          </div>

          <div className="py-5">
            <div className="container">
              <div className="row justify-content-center ">
                <div className="col-lg-5 col-md-6">
                  <div className="input-group mb-5">
                    <input
                      type="text"
                      className="form-control form-link"
                      readOnly
                      value={link}
                    />
                    <button className="btn btn-primary" onClick={copy}>
                      Copy
                    </button>
                  </div>

                  <ul className="nav nav-tabs mb-2 justify-content-center">
                    <li className="nav-item">
                      <button
                        className={`nav-link ${
                          activeTab === "questions" ? "active" : ""
                        }`}
                        onClick={switchToQuestions}
                      >
                        Questions
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        className={`nav-link ${
                          activeTab === "responses" ? "active" : ""
                        }`}
                        onClick={switchToResponses}
                      >
                        Responses
                      </button>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="row justify-content-center">
                {renderContent()}
              </div>
            </div>
          </div>
        </>
      )}
    </main>
  );
}
