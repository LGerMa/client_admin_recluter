import React from "react";
import { CAlert } from "@coreui/react";

const Notification = (props) => {
  const { type, message } = props;

  return (
    <CAlert color={type} closeButton>
      {message}
    </CAlert>
  );
};

export default React.memo(Notification);
