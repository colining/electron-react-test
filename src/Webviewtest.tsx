import {Component} from "react";
import * as React from "react";
import WebView from "react-electron-web-view";


class Webviewtest extends Component{
  private myRef;
  constructor(props: any){
    super(props);
    this.myRef = React.createRef();
    this.state = {}
  }

  componentDidMount () {

  }
  test() {
    console.log(this.myRef.current)
  }

  render(){
    return(
      <div>
        aaaaaaa
        <WebView id="webview" className="webview" src="https://e.duboku.fun/vodplay/1953-1-15.html" ref={this.myRef} dom-ready={this.test()}/>
      </div>
  )
  }
}


class CustomTextInput extends React.Component {
  private textInput: any;
  constructor(props) {
    super(props);
    // 创建一个 ref 来存储 textInput 的 DOM 元素
    this.textInput = React.createRef();
    this.focusTextInput = this.focusTextInput.bind(this);
  }

  focusTextInput() {
    // 直接使用原生 API 使 text 输入框获得焦点
    // 注意：我们通过 "current" 来访问 DOM 节点
    console.log(this.textInput.current);
    this.textInput.current.focus();
  }

  render() {
    // 告诉 React 我们想把 <input> ref 关联到
    // 构造器里创建的 `textInput` 上
    return (
      <div>
        <input
          type="text"
          ref={this.textInput} />
        <input
          type="button"
          value="Focus the text input"
          onClick={this.focusTextInput}
        />
      </div>
    );
  }
}

export default function Webview() {
  return(
    <Webviewtest/>
  )
}
