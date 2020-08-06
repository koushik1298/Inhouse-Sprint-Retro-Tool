import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import CardContent from '@material-ui/core/CardContent';

var createReactClass = require('create-react-class');

const styles = {
    text: {
    display:'inline',
    color:'white',
    fontFamiy:'Roboto',
    fontSize: '14px',
    fontWeight:'bold'
    }
}


var VoteButton = createReactClass({
  getInitialState() {
      return { tooltip: "Vote",
               voted: false,
               iconColor: "" };
  },
  toggleVote() {
    if (!this.state.voted) {
        this.setState({tooltip: "Unvote",
                       voted: true,
                       iconColor: "#ffb400"
      });
      this.addremoveVote(true);
    } else {
        this.setState({tooltip: "Vote",
                       voted: false,
                       iconColor: ""
      });
      this.addremoveVote(false);
    }
  },
  addremoveVote(voted) {
    var voteInfo = {cardId: this.props.cardId, voted: voted};
    this.serverRequest =
      axios
        .post("http://localhost:3001/api/card/vote", voteInfo)
        .then(function(result) {
            console.log(voteInfo)
            });
  },
  render: function () {
    if (this.props.showVotes) {
      console.log(this.props.votes)
        return(
            <IconButton
            tooltip={this.state.tooltip}
            onClick={this.toggleVote}
              >
            <SentimentVerySatisfiedIcon style={{ color: this.state.iconColor }} />
            <span style={styles.text}> + {this.props.votes}</span>
          </IconButton>
        )
    } else {
        return (
          <IconButton
            tooltip={this.state.tooltip}
            onClick={this.toggleVote}
              >
            <SentimentVerySatisfiedIcon style={{ color: this.state.iconColor }} />
          </IconButton>
        );
    }
  }
});

export default VoteButton;
