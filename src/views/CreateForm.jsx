import React, { useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios";
import { useNavigate } from "react-router-dom";

export default function CreateForm() {
  const { showToast } = useStateContext();
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [allowed_domains, setAllowedDomains] = useState("");
  const [description, setDescription] = useState("");
  const [limit_one_response, setLimitOneResponse] = useState(false);
  const [error, setError] = useState({});

  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();

    // convert allowed_domains to an array
    let domainsArray = [];
    if (allowed_domains) {
      domainsArray = allowed_domains.split(",").map((domain) => domain.trim());
    }

    axiosClient
      .post("v1/forms", {
        name,
        slug,
        allowed_domains: domainsArray,
        description,
        limit_one_response,
      })
      .then(({ data }) => {
        showToast(data.message);
        navigate("/");
      })
      .catch(({ response }) => {
        if (response.data.errors) {
          setError(response.data.errors);
        }
        showToast(response.data.message, "red");
      });
  };

  return (
    <main>
      <div className="hero py-5 bg-light">
        <div className="container">
          <h2>Create Form</h2>
        </div>
      </div>

      <div className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-lg-4">
              <form method="POST" onSubmit={onSubmit}>
                <div className="form-group mb-3">
                  <label htmlFor="name" className="mb-1 text-muted">
                    Form Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoFocus
                    required
                  />
                  {error.name && (
                    <small className="text-danger">{error.name}</small>
                  )}
                </div>

                <div className="form-group my-3">
                  <label htmlFor="slug" className="mb-1 text-muted">
                    Form Slug
                  </label>
                  <input
                    type="text"
                    id="slug"
                    name="slug"
                    className="form-control"
                    required
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                  />
                  {error.slug && (
                    <small className="text-danger">{error.slug}</small>
                  )}
                </div>

                <div className="form-group my-3">
                  <label htmlFor="description" className="mb-1 text-muted">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows="4"
                    className="form-control"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                  {error.description && (
                    <small className="text-danger">{error.description}</small>
                  )}
                </div>

                <div className="form-group my-3">
                  <label htmlFor="allowed-domains" className="mb-1 text-muted">
                    Allowed Domains
                  </label>
                  <input
                    type="text"
                    id="allowed-domains"
                    name="allowed_domains"
                    className="form-control"
                    value={allowed_domains}
                    onChange={(e) => setAllowedDomains(e.target.value)}
                  />
                  <div className="form-text">
                    Separate domains using comma ",". Ignore for public access.
                  </div>
                  {error.allowed_domains && (
                    <small className="text-danger">
                      {error.allowed_domains}
                    </small>
                  )}
                </div>

                <div className="form-check form-switch" aria-colspan="my-3">
                  <input
                    type="checkbox"
                    id="limit_one_response"
                    name="limit_one_response"
                    className="form-check-input"
                    role="switch"
                    value={limit_one_response}
                    onChange={(e) => setLimitOneResponse(e.target.checked)}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="limit_one_response"
                  >
                    Limit to 1 response
                  </label>
                  {error.limit_one_response && (
                    <small className="text-danger">
                      {error.limit_one_response}
                    </small>
                  )}
                </div>

                <div className="mt-4">
                  <button type="submit" className="btn btn-primary">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
