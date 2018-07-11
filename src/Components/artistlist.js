import React from "react";
// import PropTypes from "prop-types";
// import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import SimpleCard from "./simplecard";
import Search from "./search";

export default class ArtistList extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <h1 style={{ textAlign: "center" }}>Artists</h1>
        <Search
          searchTerm={this.props.searchTerm}
          setSearchTerm={this.props.setSearchTerm}
          searchFor={() => this.props.searchFor("artist")}
          type="artist"
        />
        <Grid container spacing={24}>
          {this.props.searchResults
            ? this.props.searchResults.map(artist => {
                return (
                  <Grid item xs={6} sm={3}>
                    <Paper className={this.props.paper}>
                      <SimpleCard
                        name={artist.title ? artist.title : artist.name}
                        id={artist._links.self.href}
                        bgImage={
                          artist._links.thumbnail
                            ? artist._links.thumbnail.href
                            : ""
                        }
                        description={artist.hometown}
                        type="artist"
                        detailsView={this.modal}
                        favoriteClick={() => this.props.favoriteClick(artist)}
                        item={artist}
                        comments={this.props.comments}
                        sendComment={this.props.sendComment}
                        deleteComment={this.props.deleteComment}
                        modal={this.props.modal}
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
