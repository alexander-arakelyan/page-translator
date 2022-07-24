import { IconButton } from "@mui/material";
import React from "react";

export const RouteIconButton = ({href, onClick = undefined, children}) => {
  const onClickInternal = (event) => {
    if (event.metaKey || event.ctrlKey) {
      return;
    }

    event.preventDefault();
    if (onClick) {
      onClick(event);
    }
    window.history.pushState({}, "", href);

    const navEvent = new PopStateEvent('popstate');
    window.dispatchEvent(navEvent);
  };

  return (
    <IconButton href={ href } size="small" color="inherit" onClick={ onClickInternal }>{ children }</IconButton>
  );
};
