import React from "react";
// import PropTypes from "prop-types";
// import { withStyles } from "@material-ui/core/styles";
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
          searchFor={() => this.searchFor("artwork")}
          type="artwork"
        />
        <Grid container spacing={24}>
          {this.props.searchResults
            ? this.props.searchResults.artwork.map(artwork => {
                return (
                  <Grid item xs={6} sm={3}>
                    <Paper className={this.props.paper}>
                      <SimpleCard
                        name={artwork.title ? artwork.title : artwork.name}
                        bgImage={
                          artwork._links.thumbnail
                            ? artwork._links.thumbnail.href
                            : ""
                        }
                        description={artwork.category}
                        detailsView={this.modal}
                        id={artwork._link.self.href}
                        type="artwork"
                        favoriteClick={this.props.favoriteClick}
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
