import { asField, BasicText } from "informed";
import React from "react";
// { fieldState, style = {}, shouldShowErrorMessage = true, ...props }
export const ErrorText = asField((props) => {
  let errorMessage = null;

  if (props.fieldState.error) {
    errorMessage = props.fieldState.error;
  }

  return (
    <div>
      <BasicText
        validateOnChange
        validateOnBlur
        fieldState={props.fieldState}
        {...props}
        style={{
          ...(props.fieldState.error ? { border: "solid 1px red", color: "red" } : {}),
        }}
      />
      {errorMessage && props.fieldApi.getError ? (
        <span className="error-validate-text" style={{ color: "red", marginTop: "5px" }}>
          {errorMessage}
        </span>
      ) : null}
    </div>
  );
});

export const notEmptyValidation = (value) =>
  !value || value.toString().length === 0 ? "This field is required" : undefined;
