import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";

const SettingsModal = () => {
  const [isShown, setIsShown] = useState(false);

  const determineColor = () => {
    if (isShown) return "#dbd9d9";
    else return "white";
  };

  return (
    <FontAwesomeIcon
      icon={faCog}
      color={determineColor()}
      size='lg'
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}
      data-toggle='modal'
      data-target='exampleModal'
    />
  );
};

export default SettingsModal;
