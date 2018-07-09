import React from "react";
import simplecard from "./simplecard";

class yourFavorites extends React.Component {
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
            return <SimpleCard favorite={favorite} key={favorite.id} onClick={this.props.onClick} />
          })}
          </div>
        </div>
      </div>
    );
  }
  
};

export default yourFavorites;
