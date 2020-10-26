import React from "react";
import Switch from "react-switch";
 
class NewsSwitch extends React.Component {
  constructor() {
    super();
    this.state = {}
  }
 
  render() {
    return (
        <Switch onChange={this.props.handleSwitch} checked={this.props.checked} onColor="#2693e6" uncheckedIcon={false} checkedIcon={false}/>
    );
  }
}

export default NewsSwitch