
const artistList = (props) =>{
        <h1 style={{ textAlign: "center" }}>Artists</h1>
         <Search
          searchTerm={this.props.searchTerm}
          setSearchTerm={this.props.setSearchTerm}
          searchFor={this.props.searchFor}
        />
        <Grid container spacing={24}>
          {this.state.searchResults.artist
            ? this.state.searchResults.artist._embedded.artists.map(artist => {
                return (
                  <Grid item xs={6} sm={3}>
                    <Paper className={classes.paper}>
                      <SimpleCard
                        name={artist.name}
                        id={artist.id}
                        bgImage={
                          artist._links.thumbnail
                            ? artist._links.thumbnail.href
                            : ""
                        }
                        description={artist.hometown}
                        type="artist"
                        detailsView={this.modal}
                        favoriteClick={this.favoriteClick(artist.id)}

                      />
                    </Paper>
                  </Grid>
                );
              })
            : ""}
        </Grid>
      }