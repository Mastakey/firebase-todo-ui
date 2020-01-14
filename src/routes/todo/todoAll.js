import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

//Redux
import { connect } from "react-redux";
import { getTodos } from "../../redux/actions/todoActions";
import { addMessage } from "../../redux/actions/uiActions";

//Components
//import SimpleTable from "../../components/table/SimpleTable";
import AllTodoCard from "../../components/todo/AllTodoCard";
import LoadingBasic from "../../components/loading/LoadingBasic";
import ErrorMessages from "../../components/error/ErrorMessages";
import PageHeader from "../../components/nav/PageHeader";

//Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Fab from "@material-ui/core/Fab";

//Material Icons
import AddIcon from "@material-ui/icons/Add";

const styles = {
  fab: {
    marginTop: "20px"
  }
};

class todoAll extends Component {
  async componentDidMount() {
    this.props.getTodos();
  }
  render() {
    const classes = this.props.classes;
    const todos = this.props.todo.todos;
    const loading = this.props.todo.readLoading;
    const errors = this.props.todo.errors;
    let header = (
      <PageHeader
        ancestors={[{ name: "Home", url: "/" }]}
        currentPage={{ name: "Todos", url: "/todo" }}
        title={"Todos"}
      />
    );
    let footer;
    let body;
    //loading
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
        //<SimpleTable data={todos} headers={headers} reference="todo" />
        body = (
          <Fragment>
            <Grid container item xs={12}>
              <AllTodoCard todos={todos} />
            </Grid>
            <Grid container item xs={12}>
              <Link to={`/todo/create`}>
                <Fab size="small" color="default" className={classes.fab}>
                  <AddIcon />
                </Fab>
              </Link>
            </Grid>
          </Fragment>
        );
      }
    }
    return (
      <Grid container alignItems="center">
        {header}
        {body}
        {footer}
      </Grid>
    );
  }
}

todoAll.propTypes = {
  classes: PropTypes.object.isRequired,
  getTodos: PropTypes.func.isRequired,
  addMessage: PropTypes.func.isRequired,
  todo: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  todo: state.todo
});

export default connect(mapStateToProps, {
  getTodos,
  addMessage
})(withStyles(styles)(todoAll));
