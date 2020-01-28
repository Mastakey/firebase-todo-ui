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
  textField: {
    marginTop: "20px"
  },
  progress: {
    position: "absolute"
  },
  submitButton: {
    marginRight: "10px"
  },
  richText: {
    marginTop: "20px"
  }
};

class CreateProject extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      description: "",
      descriptionDelta: [],
        tags: "",
        end: "",
        type: "",
        start: "",

    };
  }
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSubmit = async event => {
    event.preventDefault();
    const data = {
      name: this.state.name,
      description: this.state.description,
      descriptionDelta: this.state.descriptionDelta,
      tags: this.state.tags,
      end: this.state.end,
      type: this.state.type,
      start: this.state.start,

    };
    await this.props.createProject(data);
  };
  handleCancel = async event => {};

  handleQuillChange(value, delta, source, editor) {
    this.setState({
      description: editor.getHTML(),
      descriptionDelta: editor.getContents()
    });
  }
  render() {
    const classes = this.props.classes;
    const loading = this.props.loading;
    const error = this.props.error;
    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            className={classes.textField}
            name="name"
            autoComplete="off"
            label="Name"
            variant="outlined"
            onChange={this.handleChange}
            fullWidth
          />
          <ReactQuill
            className={classes.richText}
            value={this.state.description}
            modules={QuillSettings.modules}
            formats={QuillSettings.formats}
            name="description"
            placeholder="Description"
            onChange={this.handleQuillChange.bind(this)}
          />
          <TextField
            className={classes.textField}
            name="tags"
            autoComplete="off"
            label="Tags"
            variant="outlined"
            onChange={this.handleChange}
            fullWidth
          />
          <TextField
            className={classes.textField}
            name="end"
            autoComplete="off"
            label="End"
            variant="outlined"
            onChange={this.handleChange}
            fullWidth
          />
          <TextField
            className={classes.textField}
            name="type"
            autoComplete="off"
            label="Type"
            variant="outlined"
            onChange={this.handleChange}
            fullWidth
          />
          <TextField
            className={classes.textField}
            name="start"
            autoComplete="off"
            label="Start"
            variant="outlined"
            onChange={this.handleChange}
            fullWidth
          />

        </Grid>
        <Grid item xs={12}>
          <Button
            className={classes.submitButton}
            variant="contained"
            color="primary"
            disabled={loading}
            onClick={this.handleSubmit}
          >
            Submit
            {loading && (
              <CircularProgress size={30} className={classes.progress} />
            )}
          </Button>
          <Button
            variant="contained"
            color="secondary"
            component={Link}
            to={`/project`}>
            Cancel
          </Button>
        </Grid>
        <Grid item xs={12}>
          <ErrorMessages error={error} />
        </Grid>
      </Grid>
    );
  }
}

CreateProject.propTypes = {
  classes: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
  createProject: PropTypes.func.isRequired
};

const mapStateToProps = state => ({});

export default connect(mapStateToProps, null)(withStyles(styles)(CreateProject));
