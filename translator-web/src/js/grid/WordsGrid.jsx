import React, {Component} from "react"
import {Pagination, Table} from "react-bootstrap"

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
        const pages = [];
        for (let number = 1; number <= this.props?.totalPages; number++) {
            pages.push({number, active: number === 1 + this.props?.currentPage});
        }
        const rows = this.props.rows ? this.props?.rows : [];
        return (<React.Fragment>
                <Table>
                    <tbody>
                    <tr>{this.props.columns.map((val, index) => {
                        return (<th key={"col-" + val.field}>{val.title}</th>)
                    })}</tr>
                    {
                        rows.map((rowVal, rowIndex) => {
                            return (<tr key={"row-" + rowVal.id}>{this.state.columns.map((colVal, colIndex) => {
                                const component = colVal.component;
                                const fieldVal = rowVal[colVal.field];
                                return (<td key={"col-" + colVal.field}>
                                    {component && component({...colVal, ...rowVal, ...fieldVal})}
                                    {fieldVal}
                                </td>)
                            })}</tr>)
                        })
                    }
                    </tbody>
                </Table>
                <Pagination>{
                    pages.map((val, index) => {
                        return (<Pagination.Item
                            key={val.number}
                            active={val.active}
                            onClick={(event) => {
                                const page = val.number - 1;
                                const pageSize = this.props.pageSize;
                                this.props.pageClicked(page, pageSize)
                            }}
                        > {val.number}</Pagination.Item>);
                    })
                }</Pagination>
            </React.Fragment>
        )
    }
}

export default WordsGrid
