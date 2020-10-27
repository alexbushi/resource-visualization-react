import React, { Fragment } from "react";

const Test = () => {
  return (
    <Fragment>
      <div className='container-fluid'>
        <div className='row test'>
          <div className='col-md-auto'>Legend</div>
          <div className='col' style={{ background: "blue" }}>
            Resource Squares
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Test;
