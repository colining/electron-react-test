import React, {Component} from 'react';
import './App.global.css';
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button/Button";
import {getVideoInfo} from "./spider";
import ListItem from "@material-ui/core/ListItem/ListItem";
import Avatar from "@material-ui/core/Avatar/Avatar";
import ListItemAvatar from "@material-ui/core/ListItemAvatar/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";

class Item extends Component {
  render() {
    const item = this.props.item
    return (
      <div>
        <ListItem button>
          <ListItemAvatar>
            <Avatar alt="" src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"/>
          </ListItemAvatar>
          <ListItemText primary={item.href}>
          </ListItemText>
        </ListItem>
      </div>
    )
  }
}

class Test extends Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = {
      searchKey: "",
      searchUrlPrefix: "",
      hrefRule: "",
      imgRule: "",
      searchResult: [],
      video: ""
    }
  }

  handleInputChange(event: any) {
    console.log(this.state.searchKey);
    console.log(event);
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  async getVideoInfo() {
    // getVideoInfo(this.state.searchKey, "http://www.pianyuan.tv", this.state.searchUrlPrefix,this.state.hrefRule, this.state.imgRule)
    let a = await getVideoInfo('黑客帝国', "http://www.pianyuan.tv", 'http://www.pianyuan.tv/search?q=', 'div.litpic > a', 'div.litpic > a > img')
    console.log('a', a)
    this.setState({
      searchResult: a
    })
  }

  getVideo(){
    // let  video = await getVideo()
    // this.setState({
    //   video:video
    // })

  }


  render() {
    return (
      <div>
        <form className='my-form' noValidate autoComplete="off">
          <TextField id="standard-basic" label="Standard" variant="filled" name="searchKey"
                     onChange={event => this.handleInputChange(event)}/>
          <TextField id="filled-basic" label="Filled" variant="filled" name="searchUrlPrefix"
                     onChange={event => this.handleInputChange(event)}/>
          <TextField id="outlined-basic" label="Outlined" variant="filled" name="hrefRule"
                     onChange={event => this.handleInputChange(event)}/>
          <TextField id="outlined-basic" label="Outlined" variant="filled" name="imgRule"
                     onChange={event => this.handleInputChange(event)}/>
          <Button variant="contained" color="primary" onClick={() => this.getVideoInfo()}>
            Primary
          </Button>
          <Button variant="contained" color="primary" onClick={() => this.getVideo()}>
            Primary
          </Button>
        </form>
        <div>
          {this.state.searchResult.map((result, i) => <Item key={i} item={result}/>)}
        </div>
        <div>
          {this.state.video}
        </div>

      </div>
    )
  }
}

export default function App() {
  return (
    <Test/>
  );
}
