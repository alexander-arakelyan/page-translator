import React, { useRef } from "react";
import { Button } from "@mui/material";
import { ExportActions } from "./ExportReducer";
import { JsonUtils } from "../utils/JsonUtils";
import { format } from "date-fns";
import { useDispatch } from "react-redux";

export const ExportPage = ({}) => {
  const dispatch = useDispatch();
  const inputFile = useRef(null);
  const onImportClick = () => {
    inputFile.current.click();
  };
  const onImport = (event) => {
    const file = event.target.files && event.target.files[0];
    if (!file) {
      return;
    }
    console.log("file is", file);
    event.target.value = null;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target.result as string;
      const json = JSON.parse(content);
      ExportActions.import1(json, dispatch).then((response) => {
        // JsonUtils.downloadFile(JSON.stringify(json, null, "\t"), "data.json");
      });
    };

    reader.readAsText(file);
  };

  const onExport = () => {
    ExportActions.export1(dispatch).then((json) => {
      const content = JSON.stringify(json, null, "\t");
      console.log("content: " + content);
      JsonUtils.downloadFile(
        content,
        "page-translator." + format(new Date(), "yyyyMMdd_HHmmss") + ".json"
      );
    });
  };

  return (
    <React.Fragment>
      <Button onClick={onExport}>Export</Button>
      <Button onClick={onImportClick}>Import</Button>
      <input
        type="file"
        id="file"
        ref={inputFile}
        style={{ display: "none" }}
        onChange={onImport}
      />
    </React.Fragment>
  );
};
