import React from "react";
import {Table} from "react-bootstrap";

export const ArticlesList = ({title}) => {
    return (<React.Fragment>
        {title}
        <Table>
            <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Language</th>
                <th>Tags</th>
            </tr>
            </thead>
            <tbody>
            </tbody>
        </Table>

    </React.Fragment>)
}
