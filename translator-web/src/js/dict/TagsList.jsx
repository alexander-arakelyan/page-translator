import React, {Component} from "react"

export default class TagsList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<React.Fragment>
            tags
            {this.props.id}
            {this.props.field}
            {JSON.stringify(this.props)}
        </React.Fragment>)
    }
}
