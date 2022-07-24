import React from "react";
import { Button } from "@mui/material";
import { ExportActions } from "./ExportReducer";
import { JsonUtils } from "../utils/JsonUtils";

export const ExportPage = ({}) => {
  const onImport = () => {
    ExportActions.import1().then((json) => {
      JsonUtils.downloadFile(JSON.stringify(json, null, "\t"), "data.json");
    });
  };
  const onExport = () => {
    ExportActions.export1().then((r) => {
      r.json().then((json) => {
        JsonUtils.downloadFile(JSON.stringify(json, null, "\t"), "data.json");
      });
    });
  };
  return (
    <React.Fragment>
      <Button onClick={onExport}>Export</Button>
      <Button onClick={onImport}>Import</Button>
    </React.Fragment>
  );
};
