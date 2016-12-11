import React from 'react';
import ReactDOM from 'react-dom';
import * as Constants from '../constants';
 
export default class Card extends React.Component {
  constructor(props){
    super(props);
    this.state = {imageClosed: false};
    this.toggleImage = this.toggleImage.bind(this);
  };
  toggleImage(e) {
    e.preventDefault();
    this.setState(prevState => ({imageClosed: !prevState.imageClosed}));
  }
  render() {
    let showReadMore = this.props.project.description.length > Constants.DESCRIPTION_MAX_LENGTH;
    let urlDefined = this.props.project.url.length > 0;
    let description = this.props.project.description;
    if (!this.state.imageClosed && showReadMore) {
      description = description.substring(0, Constants.DESCRIPTION_MAX_LENGTH) + "...";
    }

    return (
      <div className="col-xs-12 col-sm-6 col-md-4">
        <div className="card">
          <div className={this.state.imageClosed ? "screenshot closed" : "screenshot"} 
            style={{'backgroundImage': 'url('+this.props.project.imageurl+')'}}></div>
          <div className="details">
            <p className="year">{new Date(this.props.project.published).getFullYear()}</p>
            <h2 className="name">
              {urlDefined && 
                <a className="name-link" href={this.props.project.url}>{this.props.project.name}</a>
              }
              {!urlDefined && this.props.project.name}
            </h2>
            <div className="tags">
              {this.props.project.technologies.map((name,index) => (<span key={index} className="tag">{name}</span>))}
            </div>
            <p className="description">{description}</p>
          </div>
          {showReadMore && 
            <div className="bottom-bar">
              <a className="more" onClick={this.toggleImage} href="#">
                {this.state.imageClosed ? "Show image" : "Read more"}
              </a>
            </div>
          }
        </div>
      </div>
    );
  }
}
