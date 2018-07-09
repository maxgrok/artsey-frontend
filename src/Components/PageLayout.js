import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import SimpleCard from "./simplecard";
import Search from "./search";
import { impressionism } from "../lib/impressionism";
import { artists } from "../lib/impressionism-artists";
import { edgarDegasArtworks } from "../lib/edgar-degas-artworks";

import NavBar from "./NavBar";
import PaperSheet from "./paper";

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
      searchResults: {}
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
    console.log(this.state.searchResults);
  }

  createGeneCards() {
    let genes = [];
    for (let i = 0; i < 4; i++) {
      genes.push(impressionism);
    }

    return genes;
  }

  modal(id) {
    //find which artwork/artist/period
    console.log(this.createGeneCards().find(card => card.id === id));

    //select ui card
    //show modal
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <NavBar />
        <PaperSheet />
        <Search
          searchTerm={this.state.searchTerm}
          setSearchTerm={this.setSearchTerm}
          searchFor={this.searchFor}
        />
        <h1>Periods</h1>
        <Grid container spacing={24}>
          {this.state.searchResults.gene
            ? this.state.searchResults.gene._embedded.genes.map(gene => {
                return (
                  <Grid item xs={6} sm={3}>
                    <Paper className={classes.paper}>
                      <SimpleCard
                        name={gene.name}
                        bgImage={
                          gene._links.thumbnail
                            ? gene._links.thumbnail.href
                            : ""
                        }
                        description={gene.description.slice(0, 70) + "..."}
                        detailsView={this.modal}
                        id={gene.id}
                        type="gene"
                      />
                    </Paper>
                  </Grid>
                );
              })
            : ""}
        </Grid>
        <h1 style={{ textAlign: "center" }}>Artists</h1>
        <Grid container spacing={24}>
          {this.state.searchResults.artist
            ? this.state.searchResults.artist._embedded.artists.map(artist => {
                return (
                  <Grid item xs={6} sm={3}>
                    <Paper className={classes.paper}>
                      <SimpleCard
                        name={artist.name}
                        bgImage={
                          artist._links.thumbnail
                            ? artist._links.thumbnail.href
                            : ""
                        }
                        description={artist.hometown}
                        type="artist"
                        detailsView={this.modal}
                      />
                    </Paper>
                  </Grid>
                );
              })
            : ""}
        </Grid>
        <h1 style={{ textAlign: "center" }}>Artworks</h1>
        <Grid container spacing={24}>
          {this.state.searchResults.artwork
            ? this.state.searchResults.artwork._embedded.artworks.map(
                artwork => {
                  return (
                    <Grid item xs={6} sm={3}>
                      <Paper className={classes.paper}>
                        <SimpleCard
                          name={artwork.title}
                          bgImage={
                            artwork._links.thumbnail
                              ? artwork._links.thumbnail.href
                              : ""
                          }
                          description={artwork.category}
                          detailsView={this.modal}
                          id={artwork.id}
                          type="artwork"
                        />
                      </Paper>
                    </Grid>
                  );
                }
              )
            : ""}
        </Grid>
      </div>
    );
  }
}

PageLayout.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PageLayout);
