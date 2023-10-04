import React from 'react';

export default function Features() {
  return (
    <div className="container bg-light py-5" id="id_features">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className="text-center">Features</h1>
            <p className="text-center">Explore the features of our app</p>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-md-6">
            <h2>Feature 1</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              tincidunt justo vel metus fringilla, sit amet ullamcorper dolor
              tristique.
            </p>
          </div>
          <div className="col-md-6">
            <img
              src="feature1-image.jpg"
              alt="Feature 1"
              className="img-fluid"
            />
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-md-6">
            <h2>Feature 2</h2>
            <p>
              Nullam quis augue sed nisi feugiat lacinia a vel massa. Integer
              fringilla, libero vel consectetur facilisis, quam nisl interdum
              sapien.
            </p>
          </div>
          <div className="col-md-6">
            <img
              src="feature2-image.jpg"
              alt="Feature 2"
              className="img-fluid"
            />
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-md-6">
            <h2>Feature 3</h2>
            <p>
              Vivamus sit amet mi in metus bibendum sollicitudin. Aliquam erat
              volutpat.
            </p>
          </div>
          <div className="col-md-6">
            <img
              src="feature3-image.jpg"
              alt="Feature 3"
              className="img-fluid"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
