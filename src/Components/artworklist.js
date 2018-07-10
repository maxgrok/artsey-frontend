import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import SimpleCard from "./simplecard";
import Search from "./search";

export default class ArtworkList extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <h1 style={{ textAlign: "center" }}>Artworks</h1>
        <Search
          searchTerm={this.props.searchTerm}
          setSearchTerm={this.props.setSearchTerm}
          searchFor={this.props.searchFor}
        />
        <Grid container spacing={24}>
          {this.props.searchResults
            ? this.props.searchResults._embedded.artworks.map(artwork => {
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
                        favoriteClick={this.favoriteClick(artwork.id)}
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
