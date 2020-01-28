import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

//Redux
import { connect } from "react-redux";
import { getProject, editProject } from "../../redux/actions/projectActions";

//Components
import EditProject from "../../components/app/project/EditProject";
import LoadingBasic from "../../components/loading/LoadingBasic";
import PageHeader from "../../components/nav/PageHeader";
import ErrorHandler from "../../components/error/ErrorHandler";

//Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";

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
  }
};

class projectEdit extends Component {
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
  async componentDidMount() {
    await this.props.getProject(this.props.match.params.id);
    const project = this.props.project.project;
    const errors = this.props.project.errors;
    if (!errors || !(errors.length > 0)) {
      this.setState({
        name: project.name,
        description: project.description,
        descriptionDelta: project.descriptionDelta,
      tags: project.tags,
      end: project.end,
      type: project.type,
      start: project.start,

      });
    }
  }
  async editProject(data) {
    await this.props.editProject(
      this.props.match.params.id,
      data,
      this.props.history
    );
  }
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleQuillChange(value, delta, source, editor) {
    this.setState({
      description: editor.getHTML(),
      descriptionDelta: editor.getContents()
    });
  }
  handleSave = async event => {
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
    await this.props.editProject(
      this.props.match.params.id,
      data,
      this.props.history
    );
  };
  render() {
    const loading = this.props.project.readLoading;
    const saveLoading = this.props.project.writeLoading;
    const error = this.props.project.error;
    let header = (
      <PageHeader
        ancestors={[
          { name: "Home", url: "/" },
          { name: "Projects", url: "/project" },
          { name: this.state.name, url: `/project/${this.props.match.params.id}` }
        ]}
        currentPage={{ name: "Edit", url: "#" }}
        title={"Projects"}
      />
    );
    let body;
    let footer = <Fragment></Fragment>;

    //loading
    if (loading) {
      body = <LoadingBasic />;
    } else {
      body = (
        <EditProject
          handleSave={this.handleSave.bind(this)}
          handleChange={this.handleChange.bind(this)}
          handleQuillChange={this.handleQuillChange.bind(this)}
          id={this.props.match.params.id}
          loading={saveLoading}
          state={this.state}
          error={error}
        />
      );
    }
    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {header}
          {Object.keys(error).length === 0 && error.constructor === Object ? (
            <Fragment>{body}</Fragment>
          ) : (
            <ErrorHandler error={error} />
          )}
          {footer}
        </Grid>
      </Grid>
    );
  }
}

projectEdit.propTypes = {
  classes: PropTypes.object.isRequired,
  getProject: PropTypes.func.isRequired,
  editProject: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  project: state.project
});

export default connect(mapStateToProps, { getProject, editProject })(
  withStyles(styles)(projectEdit)
);
