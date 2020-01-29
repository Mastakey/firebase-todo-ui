import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

//Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";

const styles = {
  paper: {
    padding: 10
  },
  header: {
    marginBottom: 10
  },
  mdoc: {}
};

export class Home extends Component {
  render() {
    const classes = this.props.classes;
    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper className={classes.paper} elevation={3}>
            <Typography variant="h2">Todo</Typography>
            <Typography variant="body1">Hello!</Typography>
            <Typography variant="h5">
              <Link to={`/project`}>Projects</Link>
            </Typography>
            <Divider />
            <Link to={`/todo`}>Todo</Link>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

Home.propTypes = {
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps, {})(withStyles(styles)(Home));
