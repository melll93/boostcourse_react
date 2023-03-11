import { Component } from "react";

class CreateContent extends Component {
  render() {
    console.log("CreateContent render");
    return (
      <article>
        <h2>Create</h2>
        <form
          action="/create_process"
          method="post"
          onSubmit={((e) => {
            e.preventDefault();
            // console.log(e);
            this.props.onSubmit(e.target.title.value, e.target.desc.value);
            alert("submit~!");
          }).bind(this)}
        >
          <p>
            <input type="text" name="title" placeholder="title" />
          </p>
          <p>
            <textarea name="desc" placeholder="description" />
          </p>
          <p>
            <input type="submit" />
          </p>
        </form>
      </article>
    );
  }
}

export default CreateContent;
