import { Component } from "react";

class TOC extends Component {
  // Table of contents
  render() {
    let lists = [];
    const data = this.props.data;
    let i = 0;

    while (i < data.length) {
      lists.push(
        <li key={data[i].id}>
          <a href={"/contents/" + data[i].id}>{data[i].title}</a>
        </li>
      );
      i++;
    }
    return (
      <nav>
        <ul>{lists}</ul>
      </nav>
    );
  }
}

export default TOC;
