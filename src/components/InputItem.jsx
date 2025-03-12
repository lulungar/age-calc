import React from "react";

const InputItem = ({
  title,
  placeholder,
  refVal,
  isActive,
  isFull,
  isValid,
  type,
  isDateValid,
}) => {
  return (
    <div className="input-box">
      <p className={isActive || !isValid ? "active" : ""}>{title}</p>
      <input
        className={isActive || !isValid ? "active" : ""}
        ref={refVal}
        type="text"
        placeholder={placeholder}
      />
      <p className={isFull ? "error-full" : "error-full active"}>
        This field is required
      </p>

      <p className={isValid || !isFull ? "error-valid" : "error-valid active"}>
        {type == "year" ? `Must be in the past` : `Must be a valid ${type}`}
      </p>

      <p
        className={isDateValid || !isFull ? "error-date" : "error-date active"}
      >
        Must be a valid date
      </p>
    </div>
  );
};

export default InputItem;
