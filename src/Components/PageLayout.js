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
      searchResults: {},
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
        });
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
    console.log(this.state.searchResults);
  }

  createGeneCards() {
    let genes = [];
    for (let i = 0; i < 4; i++) {
      genes.push(impressionism);
    }

    return genes;
  }

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
    let details = await this.getDetails(item._links.self.href);
    console.log(details);
    // console.log(this.createGeneCards().find(card => card.id === id));

    //select ui card
    //show modal
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <NavBar />
        <PaperSheet />

        <h1>
          Periods
          <Search
            searchTerm={this.state.searchTerm}
            setSearchTerm={this.setSearchTerm}
            searchFor={() => this.searchFor("gene")}
            type="gene"
          />
        </h1>
        <Grid container spacing={24}>
          {this.state.searchResults.gene
            ? this.state.searchResults.gene.map(gene => {
                return (
                  <Grid item xs={6} sm={3}>
                    <Paper className={classes.paper}>
                      <SimpleCard
                        name={gene.title ? gene.title : gene.name}
                        bgImage={
                          gene._links.thumbnail
                            ? gene._links.thumbnail.href
                            : ""
                        }
                        description="" //{gene.description.slice(0, 70) + "..."}
                        detailsView={this.modal}
                        id={gene.id}
                        type="gene"
                        item={gene}
                      />
                    </Paper>
                  </Grid>
                );
              })
            : ""}
        </Grid>
        <h1 style={{ textAlign: "center" }}>Artists</h1>
        <Search
          searchTerm={this.state.searchTerm}
          setSearchTerm={this.setSearchTerm}
          searchFor={() => this.searchFor("artist")}
          type="artist"
        />
        <Grid container spacing={24}>
          {this.state.searchResults.artist
            ? this.state.searchResults.artist.map(artist => {
                return (
                  <Grid item xs={6} sm={3}>
                    <Paper className={classes.paper}>
                      <SimpleCard
                        name={artist.title ? artist.title : artist.name}
                        bgImage={
                          artist._links.thumbnail
                            ? artist._links.thumbnail.href
                            : ""
                        }
                        description={artist.hometown}
                        type="artist"
                        detailsView={this.modal}
                        itemDetails={this.state.itemDetails}
                      />
                    </Paper>
                  </Grid>
                );
              })
            : ""}
        </Grid>
        <h1 style={{ textAlign: "center" }}>Artworks</h1>
        <Search
          searchTerm={this.state.searchTerm}
          setSearchTerm={this.setSearchTerm}
          searchFor={() => this.searchFor("artwork")}
          type="artwork"
        />
        <Grid container spacing={24}>
          {this.state.searchResults.artwork
            ? this.state.searchResults.artwork.map(artwork => {
                return (
                  <Grid item xs={6} sm={3}>
                    <Paper className={classes.paper}>
                      <SimpleCard
                        name={artwork.title ? artwork.title : artwork.name}
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
              })
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
