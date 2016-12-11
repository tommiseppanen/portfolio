import React from 'react';
import ReactDOM from 'react-dom';
import Card from './card.jsx';
import * as Constants from '../constants';
 
class App extends React.Component {
  constructor(){
    super();
    this.state = {
        data: []
    };
  };

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    fetch(Constants.SOURCE_URL).then(response => response.json()).then(json => {
        this.setState({
            data: json.sort( (x, y) => new Date(y.published) - new Date(x.published))
        });
      })
  }

  render() {
    var projects = this.state.data.map((project, index) => {
      return (<Card key={index} project={project} />);
    });
    return (<div className="projects row">{projects}</div>);
  }
}
 
ReactDOM.render(<App/>, document.getElementById('app'));
