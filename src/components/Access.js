import React, { Component } from "react";
import AccessMockAPI from "../api/AccessMockAPI";

export default class Access extends Component {
  render() {
    return (
      <>
        <h1 className="cover-heading">Access Denied!</h1>
        {AccessMockAPI.getIsLogged() ? (
          <>
            {AccessMockAPI.getIsAdmin() ? (
              <>""</>
            ) : (
                <h2 className="cover-heading pt-5">You have to be an Admin to get access to this page!</h2>
            )}
          </>
        ) : (
          <h2 className="cover-heading pt-5">You have to be an Logged In to get access to this page!</h2>
        )}
      </>
    );
  }
}
