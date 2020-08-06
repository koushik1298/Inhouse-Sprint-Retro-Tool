import React from 'react';
import CreateCardButton from './createCardButton.js';
import Switch from '@material-ui/core/Switch';
import Cards from './card.js';
import 'typeface-roboto';
import Typography from '@material-ui/core/Typography';
import HeaderBar from './headerMenu.js';
import { blue } from '@material-ui/core/colors';

const styles = {
  bodycolor:{
    backgroundColor:'#f3f3f3'
  },
  color1:{
    background:'#009688'
  },
  divWrap: {
    display: 'flex',
    width: '100%',
    minHeight: 'calc(100vh - 100px)',
    backgroundColor: '#f3f3f3'
  },
  divLeft: {
    marginTop:'5%',
    display: 'flex',
    minWidth: '200px',
    marginLeft: '15px',
    marginRight:'20px',
    flexBasis: '0',
    flexDirection: 'column',
    flexGrow: '1'
  },
  divToggle: {
      width: '150px',
      position: 'absolute',
      height: '10px',
      marginTop:'5%',
  },
  nameinput: {
    color:'blue',
  }
}
//import React from 'react';
const useStateWithLocalStorage = localStorageKey => {
  const [value, setValue] = React.useState(
    localStorage.getItem(localStorageKey) || ''
  );
  React.useEffect(() => {
    localStorage.setItem(localStorageKey, value);
  }, [value]);
  return [value, setValue];
};
/*const App = () => {
  const [value, setValue] = useStateWithLocalStorage(
    'myValueInLocalStorage'
  );
  const onChange = event => setValue(event.target.value);
  return (
    <div style={styles.nameinput}>
      <br></br>
      <br></br>
      <br></br>
      <h3>Enter your name here!</h3>
      <input value={value} type="text" onChange={onChange} />
      <p>{value}</p>
    </div>
  );
};*/
var createReactClass = require('create-react-class');

var CardGrid = createReactClass({
  getInitialState() {
      return { 
        showVotes: true};
    },
   
  render: function() {
    return (

      <div>
      <HeaderBar />
       <Typography>
     
        <div style={styles.divWrap}>
          <div style={styles.divLeft}>
            <center><h2 style={{color:'#555'}}>Went well</h2></center>
              <br />
              <Cards
                     cardColumn={1}
                     boardId={this.props.params.id}
                     showVotes={this.state.showVotes}
              />
              <CreateCardButton
                  cardColumn={1}
                  boardId={this.props.params.id}/>
          </div>
          <div style={styles.divLeft}>
            <h2 style={{color:'#555'}}><center>To Improve</center></h2>
              <br />
              <Cards cardColumn={2}
                     boardId={this.props.params.id}
                     showVotes={this.state.showVotes}
              />
              <CreateCardButton
                  cardColumn={2}
                  boardId={this.props.params.id}/>
          </div>
          <div style={styles.divLeft}>
            <h2 style={{color:'#555'}}><center>Action Items</center></h2>
              <br />
              <Cards cardColumn={3}
                     boardId={this.props.params.id}
                     showVotes={this.state.showVotes}
              />
              <CreateCardButton
                  cardColumn={3}
                  boardId={this.props.params.id}/>
          </div>
        </div>
        </Typography>
        </div>
    );
  }
});


export default CardGrid;
