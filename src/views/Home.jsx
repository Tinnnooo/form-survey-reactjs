import React, { useEffect, useState } from "react";
import axiosClient from "../axios";
import { Link } from "react-router-dom";
import FormListItem from "../components/FormListItem";

export default function Home() {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    axiosClient
      .get("v1/forms")
      .then(({ data }) => {
        setForms(data.forms);
        setLoading(false);
      })
      .catch(({ response }) => {
        setLoading(false);
        console.log(response.data.message);
      });
  }, []);

  return (
    <main>
      <div className="hero py-5 bg-light">
        <div className="container">
          <Link to="/create/form" className="btn btn-primary">
            Create Form
          </Link>
        </div>
      </div>

      <div className="list-form py-5">
        <div className="container">
          <h6 className="mb-3">List Form</h6>
          {loading && (
            <div className="text-center fw-bold fs-4">Loading...</div>
          )}

          {!loading && (
            <>
              {forms.length === 0 && (
                <div className="text-center fw-bold fs-3  ">
                  You don't have any form.
                </div>
              )}

              {forms.length > 0 &&
                forms.map((form) => <FormListItem form={form} key={form.id} />)}
            </>
          )}
        </div>
      </div>
    </main>
  );
}
