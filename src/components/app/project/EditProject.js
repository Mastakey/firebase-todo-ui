import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

//Components
import ErrorMessages from "../../error/ErrorMessages";

//Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Paper from "@material-ui/core/Paper";

//Quill
import ReactQuill from "react-quill";
import QuillSettings from "../../quill/QuillSettings";
import "react-quill/dist/quill.snow.css";

const styles = {
  pageHeader: {
    marginBottom: "20px"
  },
  textField: {
    marginTop: "20px"
  },
  progress: {
    position: "absolute"
  },
  saveButton: {
    marginRight: "20px",
    width: "100px"
  },
  richText: {
    marginTop: "20px"
  },
  paper: {
    padding: "20px"
  },
  buttonGrid: {
    marginTop: "20px",
    marginBottom:"20px"
  }
};

class EditProjectFull extends Component {
  render() {
    const classes = this.props.classes;
    return (
      <Grid container spacing={2} className={classes.grid}>
        <Grid item xs={12}>
          <Paper elevation={3} className={classes.paper}>
            <TextField
              className={classes.textField}
              name="name"
              autoComplete="off"
              label="Name"
              variant="outlined"
              onChange={this.props.handleChange}
              value={this.props.state.name}
              fullWidth
            />
            <ReactQuill
              className={classes.richText}
              value={this.props.state.description}
              modules={QuillSettings.modules}
              formats={QuillSettings.formats}
              name="description"
              onChange={this.props.handleQuillChange}
            />
            <TextField
              className={classes.textField}
              name="tags"
              autoComplete="off"
              label="Tags"
              variant="outlined"
              value={this.props.state.tags}
              onChange={this.props.handleChange}
              fullWidth
            />
            <TextField
              className={classes.textField}
              name="end"
              autoComplete="off"
              label="End"
              variant="outlined"
              value={this.props.state.end}
              onChange={this.props.handleChange}
              fullWidth
            />
            <TextField
              className={classes.textField}
              name="type"
              autoComplete="off"
              label="Type"
              variant="outlined"
              value={this.props.state.type}
              onChange={this.props.handleChange}
              fullWidth
            />
            <TextField
              className={classes.textField}
              name="start"
              autoComplete="off"
              label="Start"
              variant="outlined"
              value={this.props.state.start}
              onChange={this.props.handleChange}
              fullWidth
            />
            <Grid item xs={12} className={classes.buttonGrid}>
              <Button
                className={classes.saveButton}
                variant="contained"
                color="primary"
                disabled={this.props.loading}
                onClick={this.props.handleSave}
              >
                Save
                {this.props.loading && (
                  <CircularProgress size={30} className={classes.progress} />
                )}
              </Button>
              <Button
                component={Link}
                to={`/project/${this.props.id}`}
                variant="contained"
                color="secondary"
              >
                Cancel
              </Button>
              <ErrorMessages error={this.props.error} />
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

EditProjectFull.propTypes = {
  classes: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired
};

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  null
)(withStyles(styles)(EditProjectFull));
