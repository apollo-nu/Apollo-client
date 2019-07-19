import React, { Component } from "react";
import "../../css/Creds.css";

class Creds extends Component {
  render() {
    return (
        <div>
            <form>
                <label>
                    Email:
                    <input type="text" name="email"/>
                </label>
                <br/>
                <label>
                    Password:
                    <input type="password" name="password"/>
                </label>
                <br/>
                <input type="submit" value="Submit"/>
            </form>
        </div>
    );
  }
}

export default Creds;
