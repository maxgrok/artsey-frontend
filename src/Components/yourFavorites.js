import React from "react";
import SimpleCard from "./simplecard";

class YourFavorites extends React.Component {
  //your bot army code here...
  constructor(props){
    super(props)
  }


  render(){
    return (
      <div className="ui segment inverted red yourFavorites">
        <div className="ui five column grid">
          <div className="row">
          <h1>Your Favorites </h1>
            {/*...and here...*/} {/* map botarmy with botcards */}
            {this.props.favorites.map(favorite =>{
            return <SimpleCard key={favorite} onClick={this.props.onClick} />
          })}
          </div>
        </div>
      </div>
    );
  }
  
};

export default YourFavorites;
