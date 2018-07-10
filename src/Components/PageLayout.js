import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
// import Paper from "@material-ui/core/Paper";
// import Grid from "@material-ui/core/Grid";
// import SimpleCard from "./simplecard";
// import Search from "./search";
import { impressionism } from "../lib/impressionism";
// // import { artists } from "../lib/impressionism-artists";
// import { edgarDegasArtworks } from "../lib/edgar-degas-artworks";
import YourFavorites from './yourFavorites';

import NavBar from "./NavBar";
import PaperSheet from "./paper";
import ArtistList from "./artistlist";
import ArtworkList from "./artworklist";
import GeneList from "./genelist";

const URL = "https://api.artsy.net/api/";
const Token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6IiIsImV4cCI6MTUzMTMyNDQ4MywiaWF0IjoxNTMwNzE5NjgzLCJhdWQiOiI1YjNjZWRjMmNkNTMwZTA4NTlhMzQ0NWEiLCJpc3MiOiJHcmF2aXR5IiwianRpIjoiNWIzY2VkYzM4YjNiODEzNTQ0MmNkMDExIn0.CSvl6_A9XdChPrMIylGmCnb-iwb5-E1shyyBbC3QGJQ";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary
  }
});

class PageLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: {},
      searchResults: {},
      favorites: [],
      favoriteClicked: false,
      itemDetails: {}
    };
    this.setSearchTerm = this.setSearchTerm.bind(this);
    this.setSearchResults = this.setSearchResults.bind(this);
    this.searchFor = this.searchFor.bind(this);
    this.createGeneCards = this.createGeneCards.bind(this);
    this.modal = this.modal.bind(this);
    this.getDetails = this.getDetails.bind(this);
  }

  searchFor(type) {
    let searchString = ``;
    if (
      this.state.searchTerm[type] === undefined ||
      this.state.searchTerm[type] === ""
    ) {
      // debugger;
      searchString = `${URL}${type}s?size=4&offset=${Math.floor(
        Math.random() * 1000
      )}&page=1`;
      console.log(searchString);
      fetch(searchString, {
        headers: {
          "X-Xapp-Token": Token
        }
      })
        .then(resp => {
          return resp.json();
        })
        .then(json => {
          let temp = {};
          temp[type] = json._embedded[`${type}s`];
          console.log(temp);
          this.setSearchResults(temp);
        })
        .catch(err => console.log(err));
    } else {
      // debugger;
      searchString = `${URL}search?size=4&q=${encodeURIComponent(
        this.state.searchTerm[type]
      )}&page=1&type=${type}`;
      console.log(searchString);
      fetch(searchString, {
        headers: {
          "X-Xapp-Token": Token
        }
      })
        .then(resp => {
          return resp.json();
        })
        .then(json => {
          let temp = {};
          temp[type] = json._embedded.results;
          console.log(temp);
          this.setSearchResults(temp);
        });
    }
  }

  componentDidMount() {
    this.searchFor("gene");
    this.searchFor("artwork");
    this.searchFor("artist");
  }

  setSearchTerm(term, type) {
    let searchTerm = this.state.searchTerm;
    searchTerm[type] = term.target.value;
    this.setState({ searchTerm: searchTerm });
  }

  setSearchResults(results) {
    this.setState({
      searchResults: { ...this.state.searchResults, ...results }
    });
    // console.log(this.state.searchResults);
  }

  createGeneCards() {
    let genes = [];
    for (let i = 0; i < 4; i++) {
      genes.push(impressionism);
    }

    return genes;
  }
  handleClick = e => {
    console.log(e); //remove favorites
    //add favorites if not already in favorites
  };

  getDetails(url) {
    return fetch(url, {
      headers: {
        "X-Xapp-Token": Token
      }
    }).then(resp => {
      console.log(resp);
      return resp.json();
    });
  }

  async modal(item) {
    //find which artwork/artist/period
    // console.log(this.createGeneCards().find(card => card.id === id));
    let details = await this.getDetails(item._links.self.href);
    console.log(details);
    // console.log(this.createGeneCards().find(card => card.id === id));
    //select ui card
    //show modal
  }

  favoriteClick = (item) => {
    if (!this.state.favorites.find(itemfav => itemfav._links.self.href === item._links.self.href)){
      this.setState({favorites:[...this.state.favorites, item]});
    } else{
      this.setState({favorites: this.state.favorites.filter(itemfav => itemfav._links.self.href !== item._links.self.href)})
    }


    // add card to favorites
    // add favorite to the favorites according to id
    //make red #B00020
    // if (this.state.favoriteClicked === false){
    //   this.state.favorites.style.fill = "red";
    //   if(!this.state.favorites.includes(id)){
    //     this.setState({favorites: [...this.state.favorites, ]})
    //   }
    // } else { 
    //   // this.state.favorites.style.fill = "gray";
    // }
    //if red, add to top of screen
    //if red and clicked, then remove from favorites
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <NavBar />
        <PaperSheet />
        <YourFavorites favorites={this.state.favorites}/>
        <GeneList
          searchResults={this.state.searchResults.gene}
          searchTerm={this.state.searchTerm}
          setSearchTerm={this.setSearchTerm}
          searchFor={this.searchFor}
          favoriteClick={this.favoriteClick}
        />
        <ArtistList
          searchResults={this.state.searchResults.artist}
          searchTerm={this.state.searchTerm}
          setSearchTerm={this.setSearchTerm}
          searchFor={this.searchFor}
          favoriteClick={this.favoriteClick}
        />
        <ArtworkList
          searchResults={this.state.searchResults.artwork}
          searchTerm={this.state.searchTerm}
          setSearchTerm={this.setSearchTerm}
          searchFor={this.searchFor}
          favoriteClick={this.favoriteClick}
        />
      </div>
    );
  }
}

PageLayout.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PageLayout);
