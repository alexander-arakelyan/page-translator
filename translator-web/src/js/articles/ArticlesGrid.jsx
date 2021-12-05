import React from "react";
import {
    Button,
    Link,
    Pagination,
    PaginationItem,
    Table,
    TableBody,
    TableCell, TableContainer,
    TableHead,
    TableRow
} from "@mui/material";

export const ArticlesGrid = ({
                                 title, pageSize, totalPages, currentPage, rows = [],
                                 pageClicked,
                                 editClicked, removeClicked
                             }) => {
    const pages = [];
    for (let number = 1; number <= totalPages; number++) {
        pages.push({number, active: number === 1 + currentPage});
    }
    return (<React.Fragment>
        {title}
        <TableContainer>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Id / Title / Link</TableCell>
                        <TableCell>Content</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map(article => {
                        return (<TableRow key={article.id}>
                            <TableCell>
                                <div>[{article.id}] {article.title}</div>
                                <div><Link href={article.link}>{article.link}</Link></div>
                                <div>Created: {article.createdAt}</div>
                                <div>Updated: {article.updatedAt}</div>
                                <div>
                                    <Button variant="danger" onClick={() => {
                                        if (confirm(`Delete [${article.id}] ${article.title}?`)) {
                                            removeClicked(article.id);
                                        }
                                    }}>Delete</Button>

                                    <Button variant="primary" onClick={() => {
                                        editClicked(article.id);
                                    }}>Edit</Button>

                                </div>
                            </TableCell>
                            <TableCell dangerouslySetInnerHTML={{__html: article.content}}></TableCell>
                        </TableRow>);
                    })}
                </TableBody>
            </Table>
            <Pagination>
                {pages.map((val, index) => {
                    return (<PaginationItem
                        key={val.number}
                        active={val.active}
                        onClick={(event) => {
                            const page = val.number - 1;
                            pageClicked(page, pageSize)
                        }}
                    > {val.number}</PaginationItem>);
                })}
            </Pagination>
        </TableContainer>
    </React.Fragment>)
}
