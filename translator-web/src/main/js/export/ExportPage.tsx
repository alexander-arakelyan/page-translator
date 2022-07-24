import React from "react";
import { Button } from "@mui/material";

export const ExportPage = ({}) => {
  const onImport = () => {

  };
  const onExport = () => {

  };
  return <React.Fragment>
    <Button onClick={ onExport }>Export</Button>
    <Button onClick={ onImport }>Import</Button>
  </React.Fragment>
}
