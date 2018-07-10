import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
// import Card from '@material-ui/core/Card';
// import CardMedia from '@material-ui/core/CardMedia';
import CardContent from "@material-ui/core/CardContent";
// import CardActions from '@material-ui/core/CardActions';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const styles = theme => ({
  paper: {
    position: "absolute",
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4
  }
});

class SimpleModal extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      open: false
    }
  }

  handleOpen = () => {
    console.log(this.props)
    // this.props.onButtonClick(props.id);
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Button onClick={this.handleOpen}>More Info</Button>
        <Modal
          aria-labelledby={"simple-modal-title"}
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
          /*onButtonClick={this.props.onButtonClick}*/
        >
          <div style={getModalStyle()} className={classes.paper}>
          <CardContent>
          <img alt="imagehere" src={this.props.bgImage} style={{width: "290px", height:"164px"}}/>
          
            <Typography variant="headline" component="h2">
              {this.props.name}
            </Typography>
            <Typography component="p">{this.props.description}</Typography>
          </CardContent>
          </div>
        </Modal>
      </div>
    );
  }
}

SimpleModal.propTypes = {
  classes: PropTypes.object.isRequired
};

// We need an intermediary variable for handling the recursive nesting.
const SimpleModalWrapped = withStyles(styles)(SimpleModal);

export default SimpleModalWrapped;
