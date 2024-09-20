import React, { useEffect, useState } from "react";
import VisibilitySensor from "react-visibility-sensor";

const AppearSensor: React.FC<any> = ({ children }) => {
  const [hasBeenVisible, setHasBeenVisible] = useState(false);
  const [containmentElement, setContainmentElement] = useState(null);

  useEffect(() => {
    // @ts-ignore
    setContainmentElement(document.body);
  }, []);

  return (
    <VisibilitySensor
      onChange={(isVisible: boolean) => {
        if (isVisible) setHasBeenVisible(true);
      }}
      partialVisibility={true}
      scrollCheck={true}
      containment={containmentElement}
    >
      {
        // @ts-ignore
        ({ isVisible }) => {
          return children({ isVisible, hasBeenVisible });
        }
      }
    </VisibilitySensor>
  );
};
export default AppearSensor;
