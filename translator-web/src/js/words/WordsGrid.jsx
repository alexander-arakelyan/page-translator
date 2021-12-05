import React, {Component} from "react"
import {TagsConnected} from "./WordTags";
import {
    Pagination,
    PaginationItem,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";

class WordsGrid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: props.columns,
            rows: props.rows,
            page: props.page,
            pageSize: props.pageSize
        }
    }

    render() {
        const pageSize = this.props.pageSize;
        const pages = [];
        for (let number = 1; number <= this.props?.totalPages; number++) {
            pages.push({number, active: number === 1 + this.props?.currentPage});
        }
        const rows = this.props.rows ? this.props?.rows : [];
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
                                rows.map((rowVal, rowIndex) => {
                                    return (<TableRow key={"row-" + rowVal.id}>
                                        <TableCell>{rowVal.id}</TableCell>
                                        <TableCell>{rowVal.name}</TableCell>
                                        <TableCell>{rowVal.langName}</TableCell>
                                        <TableCell>
                                            <TagsConnected word={rowVal}/>
                                        </TableCell>
                                    </TableRow>)
                                })
                            }
                        </TableBody>
                    </Table>
                    <Pagination
                        count={pages.length}
                        defaultPage={this.props?.currentPage}
                        onChange={(event, page) => this.props.pageClicked(page - 1, pageSize)}
                    />
                </TableContainer>
            </React.Fragment>
        )
    }
}

export default WordsGrid;
