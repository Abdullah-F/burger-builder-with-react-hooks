import React, { useState, useEffect } from "react";

import Modal from "../../components/UI/Modal/Modal";
import Aux from "../Aux/Aux";
import Axios from "../../axios-orders";

const withErrorHandler = (WrappedComponent, axios) => {
  return props => {
    const [error, setError] = useState(null);

    const reqInterceptor = axios.interceptors.request.use(req => {
      setError(null);
      return req;
    });
    const respInterceptor = axios.interceptors.response.use(
      res => res,
      error => {
        setError(error);
      }
    );

    useEffect(() => {
      return () => {
        Axios.interceptors.request.eject(reqInterceptor);
        Axios.interceptors.response.eject(respInterceptor);
      };
    });

    const errorConfirmedHandler = () => {
      setError(null);
    };

    const pageContent = () => {
      let content = <WrappedComponent {...props} />;
      if (error) {
        content = <p> {error.message}</p>;
      }
      return content;
    };

    return (
      <Aux>
        <Modal show={error} modalClosed={errorConfirmedHandler}>
          {error ? error.message : null}
        </Modal>
        {pageContent()}
      </Aux>
    );
  };
};

export default withErrorHandler;
