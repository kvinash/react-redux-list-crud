import React, {Component} from 'react';
import styles from '../style/style.css';
const formatName = (user) => {
  if (user) {
    //console.log(Object.keys(user.user).length);
    return user.firstName + " " + user.lastName;
  } else {
    return "Stranger";
  }
};
class Footer extends React.Component{
  constructor(props){
    super(props)
    
  }

  render(){
    return(
      <div><span>
        {console.log(this.props)}
        hello {formatName(this.props.user)} 
        </span></div>
    )
  }
}
export default Footer;
