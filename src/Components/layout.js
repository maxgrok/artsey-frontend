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

class FullWidthGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      searchResults: []
    };
    this.setSearchTerm = this.setSearchTerm.bind(this);
    this.setSearchResults = this.setSearchResults.bind(this);
  }

  setSearchTerm(term) {
    this.setState({ searchTerm: term.target.value });
  }

  setSearchResults(results) {
    this.setState({ searchResults: results });
    console.log(results);
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
          setSearchResults={this.setSearchResults}
        />
        <Search
          searchTerm={this.state.searchTerm}
          setSearchTerm={this.setSearchTerm}
          setSearchResults={this.setSearchResults}
        />

        <h1 style={{display: "inline-block"}}>Periods</h1>
          <Search
          searchTerm={this.state.searchTerm}
          setSearchTerm={this.setSearchTerm}
          setSearchResults={this.setSearchResults}
        />
        <Grid container spacing={24}>
          {this.createGeneCards().map(gene => {
            return (
              <Grid item xs={6} sm={3}>
                <Paper className={classes.paper}>
                  <SimpleCard
                    name={impressionism.name}
                    bgImage={impressionism._links.thumbnail.href}
                    description={impressionism.description.slice(0, 70) + "..."}
                    // artworkModal={this.modal}
                    id={impressionism.id}
                  />
                </Paper>
              </Grid>
            );
          })}
        </Grid>
        <h1 style={{ textAlign: "center" }}>Artists</h1>
        <Grid container spacing={24}>
          {artists._embedded.artists.map(artist => {
            return (
              <Grid item xs={6} sm={3}>
                <Paper className={classes.paper}>
                  <SimpleCard
                    name={artist.name}
                    bgImage={artist._links.thumbnail.href}
                    description={artist.hometown}
                  />
                </Paper>
              </Grid>
            );
          })}
        </Grid>
        <h1 style={{ textAlign: "center" }}>Artworks</h1>
        <Grid container spacing={24}>
          {edgarDegasArtworks._embedded.artworks.map(artwork => {
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
                    // artworkModal={this.modal}
                    id={artwork.id}
                  />
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </div>
    );
  }
}

FullWidthGrid.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FullWidthGrid);
