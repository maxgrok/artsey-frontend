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
// import Modal from '@material-ui/core/Modal';
// import Button from '@material-ui/core/Button';
import NavBar from './NavBar';
import PaperSheet from "./paper";
// import SimpleModal from './modal'
// function getModalStyle() {
//   // const top = 50 + rand();
//   // const left = 50 + rand();

//   return {
//     top: `${top}%`,
//     left: `${left}%`,
//     transform: `translate(-${top}%, -${left}%)`,
//   };
// }

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

function FullWidthGrid(props) {
  const { classes } = props;

  function createGeneCards() {
    let genes = [];
    for (let i = 0; i < 4; i++) {
      genes.push(impressionism);
    }

    return genes;
  }

  function modal(id){
  //find which artwork/artist/period
  console.log(createGeneCards().find(card => card.id === id))
  
  //select ui card
  //show modal
}


  return (
    <div className={classes.root}>
      <NavBar />
      <PaperSheet />
      <Search searchTerm={this.props.searchTerm} />
      <h1>Periods</h1>
      <Grid container spacing={24}>
        {createGeneCards().map(gene => {
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
      <h1 style={{ textAlign:"center"}}>Artists</h1>
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
      <h1 style={{ textAlign:"center"}}>Artworks</h1>
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

FullWidthGrid.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FullWidthGrid);
