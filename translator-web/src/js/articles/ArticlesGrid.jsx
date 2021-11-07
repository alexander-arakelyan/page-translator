import React from "react";
import {Button, Nav, Pagination, Table} from "react-bootstrap";

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
        <Table>
            <thead>
            <tr>
                <th>Id, Title, Link</th>
                <th>Content</th>
            </tr>
            </thead>
            <tbody>
            {rows.map(article => {
                return (<tr key={article.id}>
                    <td>
                        <div>[{article.id}] {article.title}</div>
                        <div><Nav.Link href={article.link}>{article.link}</Nav.Link></div>
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
                    </td>
                    <td dangerouslySetInnerHTML={{__html: article.content}}></td>
                </tr>);
            })}
            </tbody>
        </Table>
        <Pagination>
            {pages.map((val, index) => {
                return (<Pagination.Item
                    key={val.number}
                    active={val.active}
                    onClick={(event) => {
                        const page = val.number - 1;
                        pageClicked(page, pageSize)
                    }}
                > {val.number}</Pagination.Item>);
            })}
        </Pagination>

    </React.Fragment>)
}
