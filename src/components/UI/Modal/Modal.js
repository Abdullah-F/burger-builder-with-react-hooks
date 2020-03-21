import React from "react";
import Classes from "./Modal.module.css";
import Aux from "../../../hoc/Aux/Aux";
import BackDrop from "../Backdrop/Backdrop";
const modal = props => {
  console.log("[heeloojsk]", props.children);
  return (
    <Aux>
      <BackDrop show={props.show} clicked={props.modalClosed} />
      <div
        className={Classes.Modal}
        style={{
          transform: props.show ? "translateY(0)" : "translateY(-100vh)",
          opacity: props.show ? "1" : "0"
        }}
      >
        {props.children}
      </div>
    </Aux>
  );
};
export default React.memo(modal, (prevProps, nextProps) => {
  let shouldUpdate = false;
  shouldUpdate = nextProps.children === prevProps.children;
  shouldUpdate = shouldUpdate && nextProps.show === prevProps.show;
  return shouldUpdate;
});
