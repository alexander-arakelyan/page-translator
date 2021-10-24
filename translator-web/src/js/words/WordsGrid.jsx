import React, {Component} from "react"
import {Pagination, Table} from "react-bootstrap"
import {TagsConnected} from "./WordTags";

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
                    {
                        rows.map((rowVal, rowIndex) => {
                            return (<tr key={"row-" + rowVal.id}>
                                <td>{rowVal.id}</td>
                                <td>{rowVal.name}</td>
                                <td>{rowVal.langName}</td>
                                <td>
                                    <TagsConnected word={rowVal}/>
                                </td>
                            </tr>)
                        })
                    }
                    </tbody>
                </Table>
                <Pagination>
                    {pages.map((val, index) => {
                        return (<Pagination.Item
                            key={val.number}
                            active={val.active}
                            onClick={(event) => {
                                const page = val.number - 1;
                                this.props.pageClicked(page, pageSize)
                            }}
                        > {val.number}</Pagination.Item>);
                    })}
                </Pagination>
            </React.Fragment>
        )
    }
}

export default WordsGrid;
