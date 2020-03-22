import React from "react";

import Modal from "../../components/UI/Modal/Modal";
import Aux from "../Aux/Aux";
import useHttpErrorHandler from "../../hooks/http_error_handler";

const withErrorHandler = (WrappedComponent, axios) => {
  return props => {
    const [error, clearError] = useHttpErrorHandler(axios);
    const pageContent = () => {
      let content = <WrappedComponent {...props} />;
      if (error) {
        content = <p> {error.message}</p>;
      }
      return content;
    };

    return (
      <Aux>
        <Modal show={error} modalClosed={clearError}>
          {error ? error.message : null}
        </Modal>
        {pageContent()}
      </Aux>
    );
  };
};

export default withErrorHandler;
