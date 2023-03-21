import React from "react";

import zxcvbn from "zxcvbn";

const PasswordCheck = ({ password }) => {
  const testRes = zxcvbn(password);
  const num = (testRes.score * 100) / 4;

  const createPassLabel = () => {
    switch (testRes.score) {
      case 0:
        return "Very weak";
      case 1:
        return "Weak";
      case 2:
        return "Fear";
      case 3:
        return "Good";
      case 4:
        return "Strong";
      default:
        return "";
    }
  };
  const funcProgressColor = () => {
    switch (testRes.score) {
      case 0:
        return "primary";
      case 1:
        return "#EA1111";
      case 2:
        return "#FFAD00";
      case 3:
        return "#9bc158";
      case 4:
        return "#00b500";
      default:
        return "none";
    }
  };

  const changePasswordColor = () => ({
    width: `${num}%`,
    backgroundColor: funcProgressColor(),
    height: "7px",
  });
  return (
    <div
      className="progress"
      style={{ height: "7px", width: "100%", backgroundColor: "lightgray" }}
    >
      <div className="progress-bar" style={changePasswordColor()}></div>
      <p style={{ color: funcProgressColor(), textAlign: "end" }}>
        {createPassLabel()}
      </p>
    </div>
  );
};

export default PasswordCheck;
