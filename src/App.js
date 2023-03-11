import "./App.css";
import { Component } from "react";
import Subject from "./components/Subject";
import TOC from "./components/TOC";
import Control from "./components/Control";
import ReadContent from "./components/ReadContent";
import CreateContent from "./components/CreateContent";
import UpdateContent from "./components/UpdateContent";

class App extends Component {
  constructor(props) {
    super(props);
    this.max_content_id = 3;
    this.state = {
      mode: "welcome",
      selected_content_id: 2,
      welcome: { title: "Welcome", desc: "Hello, React!!!" },
      subject: { title: "WEB", sub: "World Wide Web!!!" },
      contents: [
        { id: 1, title: "HTML", desc: "HTML is for information" },
        { id: 2, title: "CSS", desc: "CSS is for design" },
        { id: 3, title: "JavaScript", desc: "JavaScript is for interactive" },
      ],
    };
  }

  getReadContent() {
    let i = 0;
    while (i < this.state.contents.length) {
      let data = this.state.contents[i];
      if (data.id === this.state.selected_content_id) {
        return data;
        break;
      }
      i++;
    }
  }

  getContent() {
    let _title,
      _desc,
      _article = null;
    if (this.state.mode === "welcome") {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc} />;
    } else if (this.state.mode === "read") {
      let i = 0;
      let _content = this.getReadContent();
      _article = <ReadContent title={_content.title} desc={_content.desc} />;
    } else if (this.state.mode === "create") {
      _article = (
        <CreateContent
          onSubmit={((_title, _desc) => {
            this.max_content_id++;
            let _contents = Array.from(this.state.contents);
            _contents.push({
              id: this.max_content_id,
              title: _title,
              desc: _desc,
            });
            this.setState({
              contents: _contents,
              mode: "read",
              selected_content_id: this.max_content_id,
            });
          }).bind(this)}
        />
      );
    } else if (this.state.mode === "update") {
      let _content = this.getReadContent();
      _article = (
        <UpdateContent
          data={_content}
          onSubmit={((_id, _title, _desc) => {
            let _contents = Array.from(this.state.contents);
            let i = 0;
            while (i < _contents.length) {
              if (_contents[i].id === _id) {
                _contents[i] = { id: _id, title: _title, desc: _desc };
                break;
              }
              i++;
            }
            this.setState({
              contents: _contents,
              mode: "read",
            });
          }).bind(this)}
        />
      );
    } else if (this.state.mode === "delete") {
    }
    return _article;
  }

  render() {
    console.log("App render...");
    return (
      <div className="App">
        <Subject
          title={this.state.subject.title}
          sub={this.state.subject.sub}
          onChangePage={(() => {
            this.setState({
              mode: "welcome",
            });
          }).bind(this)}
        />
        <TOC
          onChangePage={((id) => {
            this.setState({
              mode: "read",
              selected_content_id: Number(id),
            });
          }).bind(this)}
          data={this.state.contents}
        />
        <Control
          onChangeMode={((_mode) => {
            if (_mode === "delete") {
              if (window.confirm("정말 삭제하시겠습니까?")) {
                let _contents = Array.from(this.state.contents);
                let i = 0;

                while (i < _contents.length) {
                  if (_contents[i].id === this.state.selected_content_id) {
                    _contents.splice(i, 1);
                    break;
                  }
                  i++;
                }
                this.setState({
                  contents: _contents,
                  mode: "welcome",
                });
                alert("삭제되었습니다.");
              }
            } else {
              this.setState({
                mode: _mode,
              });
            }
          }).bind(this)}
        />
        {this.getContent()}
      </div>
    );
  }
}

export default App;
