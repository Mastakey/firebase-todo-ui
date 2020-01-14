import React, { Component } from "react";
import PropTypes from "prop-types";

//Redux
import { connect } from "react-redux";
import { getTodo, deleteTodo } from "../../redux/actions/todoActions";

//Components
import ViewTodo from "../../components/todo/ViewTodo";
import LoadingBasic from "../../components/loading/LoadingBasic";
import ErrorMessages from "../../components/error/ErrorMessages";
import PageHeader from "../../components/nav/PageHeader";

//Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";

const styles = {
  pageHeader: {
    marginBottom: "20px"
  }
};

class todoView extends Component {
  async componentDidMount() {
    const id = this.props.match.params.id;
    await this.props.getTodo(id);
  }
  async deleteTodo() {
    const id = this.props.match.params.id;
    await this.props.deleteTodo(id, this.props.history);
  }
  render() {
    const todo = this.props.todo.todo;
    const loading = this.props.todo.readLoading;
    const errors = this.props.todo.errors;
    let header = (
      <PageHeader
        ancestors={[
          { name: "Home", url: "/" },
          { name: "Todos", url: "/todo" }
        ]}
        currentPage={{ name: todo.name, url: "/todo" }}
        title={"Todos"}
      />
    );
    let body;
    let footer;
    if (loading) {
      body = (
        <Grid container item xs={12}>
          <LoadingBasic />
        </Grid>
      );
    } else {
      //errors
      if (errors && errors.length > 0) {
        body = <ErrorMessages errors={errors} />;
      } else {
        body = (
          <ViewTodo
            todo={todo}
            loading={loading}
            deleteTodo={this.deleteTodo.bind(this)}
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

todoView.propTypes = {
  classes: PropTypes.object.isRequired,
  deleteTodo: PropTypes.func.isRequired
};

const mapStateToProps = state => ({ todo: state.todo });

export default connect(mapStateToProps, { getTodo, deleteTodo })(
  withStyles(styles)(todoView)
);
