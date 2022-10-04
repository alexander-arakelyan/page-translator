import React, { useRef } from "react";
import { Box, Button } from "@mui/material";
import { ExportActions } from "./ExportReducer";
import { JsonUtils } from "../utils/JsonUtils";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { selectImportProgress } from "./ExportSelector";
import { MyCircularProgress } from "../common/MyCircularProgress";

export const ExportPage = ({}) => {
  const dispatch = useDispatch();
  const inputFile = useRef(null);
  const importProgress: any = useSelector(selectImportProgress);
  console.log(importProgress);

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

    const chunkSize = 10;

    function importChunk(allWords, from) {
      if (from >= allWords.length) {
        return;
      }
      const words = allWords.slice(from, from + chunkSize);
      const request = { words };
      ExportActions.importProgress(
        words,
        from,
        allWords.length,
        chunkSize,
        dispatch
      );
      ExportActions.import1(request, dispatch).then((response) => {
        console.log(response);
        // JsonUtils.downloadFile(JSON.stringify(json, null, "\t"), "data.json");
        importChunk(allWords, from + chunkSize);
      });
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target.result as string;
      const json = JSON.parse(content);
      const allWords = json.words;
      importChunk(allWords, 0);
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

  const progress = (importProgress.from * 100) / importProgress.till;
  const buffer = importProgress.chunkSize / importProgress.till;
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
      {importProgress && importProgress.from && (
        <div>
          <Box>
            Import progress: 0 -&gt; ({importProgress?.from ?? 0} -{" "}
            {(importProgress?.from ?? 0) + (importProgress?.chunkSize ?? 0)})
            -&gt; {importProgress?.till ?? 0}{" "}
          </Box>

          <MyCircularProgress progress={progress} />

          {/*<pre>{JSON.stringify(importProgress, null, 2)}</pre>*/}
          {importProgress.words.map((word) => {
            return (
              <div>
                {word.name} -&gt;{" "}
                {word.tags.map((tag) => {
                  return <span style={{ color: "grey" }}>{tag.name}, </span>;
                })}
              </div>
            );
          })}
        </div>
      )}
    </React.Fragment>
  );
};
