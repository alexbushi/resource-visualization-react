import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';

const SettingsButton = () => {
  const [isShown, setIsShown] = useState(false);

  const determineColor = () => {
    if (isShown) return '#dbd9d9';
    else return 'white';
  };

  const history = useHistory();

  return (
    <FontAwesomeIcon
      icon={faCog}
      color={determineColor()}
      size='lg'
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}
      onClick={() => history.push('/settings')}
    />
  );
};

export default SettingsButton;
