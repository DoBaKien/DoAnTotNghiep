import React from "react";

import zxcvbn from "zxcvbn";

const PasswordCheck = ({ password }) => {
  const testRes = zxcvbn(password);
  const num = (testRes.score * 100) / 4;

  const createPassLabel = () => {
    switch (testRes.score) {
      case 0:
        return "Rất yếu";
      case 1:
        return "Yếu";
      case 2:
        return "Bình thường";
      case 3:
        return "Tốt";
      case 4:
        return "Mạnh";
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
      <p style={{ color: funcProgressColor(), textAlign: "end", marginTop: 0 }}>
        {createPassLabel()}
      </p>
    </div>
  );
};

export default PasswordCheck;
