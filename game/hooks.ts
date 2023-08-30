import { useCallback, useState } from "react";

export const useForceUpdate = () => {
  const fn = useState({})[1];

  return useCallback(() => fn({}), []);
};
