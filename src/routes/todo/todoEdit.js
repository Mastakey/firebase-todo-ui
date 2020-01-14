import React, { Component } from "react";
import PropTypes from "prop-types";

//Redux
import { connect } from "react-redux";
import { getTodo, editTodo } from "../../redux/actions/todoActions";

//Components
import EditTodo from "../../components/todo/EditTodo";
import LoadingBasic from "../../components/loading/LoadingBasic";
import ErrorMessages from "../../components/error/ErrorMessages";
import PageHeader from "../../components/nav/PageHeader";

//Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

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

class todoEdit extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      description: "",
      descriptionDelta: [],
      projectId: "",
      assignee: "",
      details: "",
      priority: "",
      status: "",
      
    };
  }
  async componentDidMount() {
    await this.props.getTodo(this.props.match.params.id);
    const todo = this.props.todo.todo;
    const errors = this.props.todo.errors;
    if (!errors || !(errors.length > 0)) {
      this.setState({
        name: todo.name,
        description: todo.description,
        descriptionDelta: todo.descriptionDelta,
        projectId: todo.projectId,
        assignee: todo.assignee,
        details: todo.details,
        priority: todo.priority,
        status: todo.status,
      });
    }
  }
  async editTodo(data) {
    await this.props.editTodo(
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
      projectId: this.state.projectId,
      assignee: this.state.assignee,
      details: this.state.details,
      priority: this.state.priority,
      status: this.state.status
    };
    await this.props.editTodo(
      this.props.match.params.id,
      data,
      this.props.history
    );
  };
  render() {
    const loading = this.props.todo.readLoading;
    const saveLoading = this.props.todo.writeLoading;
    const errors = this.props.todo.errors;
    let header = (
      <PageHeader
        ancestors={[
          { name: "Home", url: "/" },
          { name: "Todos", url: "/todo" },
          { name: this.state.name, url: `/todo/${this.props.match.params.id}` }
        ]}
        currentPage={{ name: "Edit", url: "#" }}
        title={"Todos"}
      />
    );
    let body;
    let footer = (
      <Grid item xs={12}>
        <Typography variant="body1" color="secondary">
          {this.props.errors}
        </Typography>
      </Grid>
    );

    //loading
    if (loading) {
      body = <LoadingBasic />;
    } else {
      //errors
      if (errors && errors.length > 0) {
        body = <ErrorMessages errors={errors} />;
      } else {
        body = (
          <EditTodo
            handleSave={this.handleSave.bind(this)}
            handleChange={this.handleChange.bind(this)}
            handleQuillChange={this.handleQuillChange.bind(this)}
            id={this.props.match.params.id}
            loading={saveLoading}
            state={this.state}
          />
        );
      }
    }
    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {header}
          {body}
          {footer}
        </Grid>
      </Grid>
    );
  }
}

todoEdit.propTypes = {
  classes: PropTypes.object.isRequired,
  getTodo: PropTypes.func.isRequired,
  editTodo: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  todo: state.todo
});

export default connect(mapStateToProps, { getTodo, editTodo })(
  withStyles(styles)(todoEdit)
);
