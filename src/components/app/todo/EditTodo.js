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
  }
};

class EditTodoFull extends Component {
  render() {
    const classes = this.props.classes;
    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
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
            name="assignee"
            autoComplete="off"
            label="Assignee"
            variant="outlined"
            value={this.props.state.assignee}
            onChange={this.props.handleChange}
            fullWidth
          />
          <TextField
            className={classes.textField}
            name="details"
            autoComplete="off"
            label="Details"
            variant="outlined"
            value={this.props.state.details}
            onChange={this.props.handleChange}
            fullWidth
          />
          <TextField
            className={classes.textField}
            name="status"
            autoComplete="off"
            label="Status"
            variant="outlined"
            value={this.props.state.status}
            onChange={this.props.handleChange}
            fullWidth
          />
          <TextField
            className={classes.textField}
            name="priority"
            autoComplete="off"
            label="Priority"
            variant="outlined"
            value={this.props.state.priority}
            onChange={this.props.handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
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
            to={`/todo/${this.props.id}`}
            variant="contained"
            color="secondary"
          >
            Cancel
          </Button>
          <ErrorMessages error={this.props.error} />
        </Grid>
      </Grid>
    );
  }
}

EditTodoFull.propTypes = { classes: PropTypes.object.isRequired, error: PropTypes.object.isRequired };

const mapStateToProps = state => ({});

export default connect(mapStateToProps, null)(withStyles(styles)(EditTodoFull));
