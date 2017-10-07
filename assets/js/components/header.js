import React from 'react';
import '../../css/components/header.sass';

class Header extends React.Component {
  render() {
    return (
      <div className="container">
        <h1 className="alert alert-warning">Bootstrap Header</h1>
        <h2>Simple Collapsible</h2>
        <p>Click on the button to toggle between showing and hiding content.</p>
        <button type="button" className="btn btn-info" data-toggle="collapse" data-target="#demo">Simple collapsible</button>
        <div id="demo" className="collapse">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit,
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </div>
      </div>
    )
  }
}

export default Header;