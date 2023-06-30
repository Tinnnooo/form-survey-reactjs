import React from "react";
import { Link } from "react-router-dom";

export default function FormListItem({ form }) {
  return (
    <Link to={`/form/${form.slug}`} className="card card-default mb-3">
      <div className="card-body">
        <h5 className="mb-1">{form.name}</h5>
        <small className="text-muted">
          @{form.slug} {form.limit_one_response ? "(limit for 1 response)" : ""}
        </small>
      </div>
    </Link>
  );
}
