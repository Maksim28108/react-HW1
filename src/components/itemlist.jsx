import { Component } from "react";

class ArbitraryList extends Component {
  render(){
    const items = ['iphon','samsung','apple','intel','nvidia',]; 
    
    return(<ul>
      {items.map((item) => (
        <li>{item}</li>
      ))}
    </ul>)
  }
}

export default ArbitraryList
