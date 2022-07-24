import React, { useEffect, useState } from "react";

export const Route = ({path, children, enabled = undefined}) => {
  const [ currentPath, setCurrentPath ] = useState(window.location.pathname);
  const [ pattern, setPattern ] = useState(undefined);

  useEffect(() => {
    const onLocationChange = () => {
      let pathname = window.location.pathname;
      let hash = window.location.hash;
      if (typeof path === "object") {
        setPattern(path);
      }
      const currPath = pathname + hash;
      setCurrentPath(currPath);
      console.log("onLocationChange: " + currPath);
    }

    window.addEventListener('popstate', onLocationChange);
    window.addEventListener("load", onLocationChange)
    return () => {
      window.removeEventListener('popstate', onLocationChange)
      window.removeEventListener('load', onLocationChange)
    };
  }, [])

  const matches = pattern ? pattern.test(currentPath) : currentPath === path;
  console.log(matches);
  return matches
    ? (enabled === undefined || enabled === true)
      ? children
      : null
    : null;
}
