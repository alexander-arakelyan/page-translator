import React, {Component} from "react";
import {Pagination} from "react-bootstrap";
import {ArticlesList} from "./ArticlesList";
import {ArticleSearch} from "./ArticleSearch";

class Articles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: ""
        }
    }

    render() {
        const pageSize = this.props.pageSize;
        const pages = [];
        for (let number = 1; number <= this.props?.totalPages; number++) {
            pages.push({number, active: number === 1 + this.props?.currentPage});
        }
        const rows = this.props.rows ? this.props?.rows : [];
        return (
            <React.Fragment>
                <ArticleSearch
                    onSearch={(title) => {
                        this.setState({title});
                    }}
                    onAdd={() => {
                    }}
                />
                <ArticlesList title={this.state.title}/>
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

export default Articles;
