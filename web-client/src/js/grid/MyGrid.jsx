import React, {Component} from "react"
import {Pagination, Table} from "react-bootstrap"

class MyGrid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: props.columns,
            rows: props.rows
        }
    }

    render() {
        let active = this.props.activePage;
        let pages = [];
        for (let number = 1; number <= this.props?.totalPages; number++) {
            pages.push({number, active: number === 1 + this.props?.currentPage});
        }
        let rows = this.props.rows ? this.props?.rows : [];
        return (<React.Fragment>
                <Table>
                    <tbody>
                    <tr>{this.props.columns.map((val, index) => {
                        return (<th key={"col-" + val.field}>{val.title}</th>)
                    })}</tr>
                    {
                        rows.map((rowVal, rowIndex) => {
                            return (<tr key={"row-" + rowVal.id}>{this.state.columns.map((colVal, colIndex) => {
                                return (<td key={"data-" + colVal.field}>{rowVal[colVal.field]}</td>)
                            })}</tr>)
                        })
                    }
                    </tbody>
                </Table>
                <Pagination>{
                    pages.map((val, index) => {
                        return (<Pagination.Item key={val.number} active={val.active}> {val.number}</Pagination.Item>);
                    })
                }</Pagination>
            </React.Fragment>
        )
    }
}

export default MyGrid
