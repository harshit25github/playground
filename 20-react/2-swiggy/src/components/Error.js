import React from "react";
import { useRouteError } from "react-router";

const Error = () => {
  const error = useRouteError();
  const status = error?.status || "Error";
  const message =
    error?.statusText || error?.message || "Something went wrong.";

  return (
    <div className="page error-page">
      <div className="error-card">
        <p className="eyebrow">Error {status}</p>
        <h1>We could not load this page.</h1>
        <p className="subtext">{message}</p>
        <div className="error-actions">
          <a className="primary-button" href="/">
            Back to home
          </a>
          <a className="ghost-button" href="/about">
            About us
          </a>
        </div>
        <div className="error-meta">
          <div>
            <h4>Need help?</h4>
            <p>support@swiggy.in</p>
          </div>
          <div>
            <h4>Status</h4>
            <p>{status}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error;
