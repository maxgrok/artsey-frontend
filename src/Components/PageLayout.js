import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import SimpleCard from "./simplecard";
import Search from "./search";
import { impressionism } from "../lib/impressionism";
// // import { artists } from "../lib/impressionism-artists";
// import { edgarDegasArtworks } from "../lib/edgar-degas-artworks";

import NavBar from "./NavBar";
import PaperSheet from "./paper";
import YourFavorites from "./yourFavorites";
import ArtistList from "./ArtistList";
import ArtworkList from "./ArtworkList";
import GeneList from "./GeneList";

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
      favoriteClicked: false
    };
    this.setSearchTerm = this.setSearchTerm.bind(this);
    this.setSearchResults = this.setSearchResults.bind(this);
    this.searchFor = this.searchFor.bind(this);
    this.createGeneCards = this.createGeneCards.bind(this);
  }

  searchFor(type) {
    let searchString = ``;
    if (
      this.state.searchTerm[type] === undefined ||
      this.state.searchTerm[type] === ""
    ) {
      searchString = `${URL}${type}s?size=4&offset=${Math.floor(
        Math.random() * 1000
      )}&page=1`;
    } else {
      searchString = `${URL}${type}s?size=4&term=${encodeURIComponent(
        this.state.searchTerm.type
      )}&page=1`;
    }
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
        temp[type] = json;
        console.log(temp);
        this.setSearchResults(temp);
      });
  }

  componentDidMount() {
    this.searchFor("gene");
    this.searchFor("artwork");
    this.searchFor("artist");
  }

  setSearchTerm(term, type) {
    this.setState({ searchTerm: { type: term.target.value } });
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
    // console.log(e) //remove favorites
    //add favorites if not already in favorites
  };

  modal(id) {
    //find which artwork/artist/period
    // console.log(this.createGeneCards().find(card => card.id === id));
    //select ui card
    //show modal
  }

  favoriteClick = (event, id) => {
    // add card to favorites
    // add favorite to the favorites according to id
    //make red #B00020
    // if (this.state.favoriteClicked === false){
    //   this.state.favorites.style.fill = "red";
    //   if(!this.state.favorites.includes(id)){
    //     this.setState({favorites: [...this.state.favorites, ]})
    //   }
    // } else{
    //   // this.state.favorites.style.fill = "gray";
    // }
    //if red, add to top of screen
    //if red and clicked, then remove from favorites
  };
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <NavBar />
        <PaperSheet />

        <GeneList
          searchResults={this.state.searchResults.gene}
          searchTerm={this.state.searchTerm}
          setSearchTerm={this.setSearchTerm}
          searchFor={this.searchFor}
        />
        <ArtistList
          searchResults={this.state.searchResults.artist}
          searchTerm={this.state.searchTerm}
          setSearchTerm={this.setSearchTerm}
          searchFor={this.searchFor}
        />
        <ArtworkList
          searchResults={this.state.searchResults.artwork}
          searchTerm={this.state.searchTerm}
          setSearchTerm={this.setSearchTerm}
          searchFor={this.searchFor}
        />
      </div>
    );
  }
}

PageLayout.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PageLayout);
