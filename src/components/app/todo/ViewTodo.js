import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

//Components
import DeleteDialog from "../../dialog/DeleteDialog";

//Material UI
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Fab from "@material-ui/core/Fab";

//Material Icons
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

const styles = {
  paper: {
    padding: "20px"
  },
  fab: {
    marginTop: "10px"
  },
  fabDelete: {
    float: "right"
  }
};

class ViewTodo extends Component {
  constructor() {
    super();
    this.state = {
      showDeleteDialog: false
    };
  }
  handleDelete() {
    this.setState({
      showDeleteDialog: true
    });
  }
  handleDeleteDialogClose() {
    this.setState({
      showDeleteDialog: false
    });
  }
  render() {
    const classes = this.props.classes;
    const todo = this.props.todo;
    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
            <Paper elevation={3} className={classes.paper}>
              <Fab
                size="small"
                color="secondary"
                className={classes.fabDelete}
                onClick={this.handleDelete.bind(this)}
              >
                <DeleteIcon />
              </Fab>
              <DeleteDialog
                deleteFunction={this.props.deleteTodo}
                open={this.state.showDeleteDialog}
                handleClose={this.handleDeleteDialogClose.bind(this)}
              />
              <Typography variant="h5">{todo.name}</Typography>
              <Typography variant="body1">
                <span
                  dangerouslySetInnerHTML={{
                    __html: todo.description
                  }}
                />
              </Typography>
              <Typography variant="body1">{todo.assignee}</Typography>
              <Typography variant="body1">{todo.details}</Typography>
              <Typography variant="body1">{todo.status}</Typography>
              <Typography variant="body1">{todo.priority}</Typography>
              <Link to={`/todo/edit/${todo.id}`}>
                <Fab size="small" color="default" className={classes.fab}>
                  <EditIcon />
                </Fab>
              </Link>
            </Paper>
        </Grid>
      </Grid>
    );
  }
}

ViewTodo.propTypes = {
  classes: PropTypes.object.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  todo: PropTypes.object.isRequired
};

const mapStateToProps = state => ({});

export default connect(mapStateToProps, null)(withStyles(styles)(ViewTodo));
