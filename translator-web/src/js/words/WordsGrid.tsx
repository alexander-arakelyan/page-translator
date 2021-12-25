import React from "react"
import { WordTags } from "./WordTags";
import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";

export const WordsGrid = ({
                            rows, pageSize, totalPages, currentPage, pageClicked,
                            onTagAdd, onTagRemove
                          }) => {
  const pages = [];
  for (let number = 1; number <= totalPages; number++) {
    pages.push({number, active: number === 1 + currentPage});
  }
  return (<React.Fragment>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Language</TableCell>
              <TableCell>Tags</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              (rows || []).map((rowVal, rowIndex) => {
                return (<TableRow key={ "row-" + rowVal.id }>
                  <TableCell>{ rowVal.id }</TableCell>
                  <TableCell>{ rowVal.name }</TableCell>
                  <TableCell>{ rowVal.langName }</TableCell>
                  <TableCell>
                    <WordTags word={ rowVal } onTagAdd={ onTagAdd } onTagRemove={ onTagRemove }/>
                  </TableCell>
                </TableRow>)
              })
            }
          </TableBody>
        </Table>
        <Pagination
          count={ pages.length }
          defaultPage={ currentPage }
          onChange={ (event, page) => pageClicked(page - 1, pageSize) }
        />
      </TableContainer>
    </React.Fragment>
  )
}
