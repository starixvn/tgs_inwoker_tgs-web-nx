import React, { useEffect, useState } from "react";
import VisibilitySensor from "react-visibility-sensor";

const AppearSensor: React.FC<any> = ({ children }) => {
  const [hasBeenVisible, setHasBeenVisible] = useState(false);
  const [containmentElement, setContainmentElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setContainmentElement(document.body);
  }, []);

  const handleVisibilityChange = (isVisible: boolean) => {
    if (isVisible) {
      setHasBeenVisible(true);
    }
  };

  return (
    <VisibilitySensor
      onChange={handleVisibilityChange}
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
