import React from "react";
import Pagination from "@material-ui/lab/Pagination";

class PaginationComponent extends React.Component {
  componentDidMount() {
    console.log(this.props);
  }

  render() {
    return (
      <div className="rl-c-pagination-container">
        <Pagination
          count={this.props.count}
          page={this.props.page}
          onChange={this.props.handleChange}
        />
      </div>
    );
  }
}

export default PaginationComponent;
