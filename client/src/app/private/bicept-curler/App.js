import React, { useEffect } from 'react';
import '@tensorflow/tfjs'; // Import TensorFlow.js
import '@tensorflow/tfjs-backend-webgl'; // Import TensorFlow.js WebGL backend
import '@tensorflow/tfjs-converter'; // Import TensorFlow.js model converter
import '@tensorflow/tfjs-core'; // Import TensorFlow.js core
import * as tf from '@tensorflow/tfjs';
import * as poseDetection from '@tensorflow-models/pose-detection'; // Import Pose Detection Model
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {

  useEffect(() => {
    const runPoseDetection = async () => {
      await tf.ready(); // Wait for TensorFlow to be ready
      await tf.setBackend('webgl'); // Set backend to 'webgl'

      let video = document.getElementById("video");
      let windowHeight = 300;  // Adjusted the multiplier from 5 to 3
      let windowWidth = 300; // Adjusted the subtraction from 200 to 100

      var thresholdAngle = 130;
      var rightHandCount = 0;
      var canBeProceedForRightCount = true;
      var hasRightCountIncreasedOnce = false;
      var leftHandCount = 0;
      var canBeProceedForLeftCount = true;
      var hasLeftCountIncreasedOnce = false;
      
      const detectorConfig = {
        modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING,
      };
      video.setAttribute("playsinline", true);
      video.setAttribute("controls", true);
      setTimeout(() => {
        video.removeAttribute("controls");
      });

      let detector;

      const setupCamera = () => {
        navigator.mediaDevices
          .getUserMedia({
            video: { width: windowWidth, height: windowHeight },
            audio: false,
          })
          .then((stream) => {
            video.srcObject = stream;
          });
      };

      const detectPose = async () => {
        const poses = await detector.estimatePoses(document.querySelector("video"));
        if (poses.length) {
          drawKeypoints(poses[0].keypoints);
          angleCalculation(poses[0].keypoints);
        }
      };
  
      function drawKeypoints(keypoints) {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  // Draw video frame
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  // Draw keypoints
  keypoints.forEach(point => {
    if (point.score > 0.5) {
      ctx.beginPath();
      ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI);
      ctx.fillStyle = "red";
      ctx.fill();
    }
  });

  // Connect joints with lines
  const connections = [
    [5, 7],  // Right shoulder to right wrist
    [5, 6],  // Right shoulder to right elbow
    [6, 8],  // Right elbow to right hand
    [11, 13],  // Left shoulder to left wrist
    [11, 12],  // Left shoulder to left elbow
    [12, 14],  // Left elbow to left hand
  ];

  ctx.strokeStyle = "red";
  ctx.lineWidth = 3;

  connections.forEach(pair => {
    const [idx1, idx2] = pair;
    if (keypoints[idx1].score > 0.5 && keypoints[idx2].score > 0.5) {
      ctx.beginPath();
      ctx.moveTo(keypoints[idx1].x, keypoints[idx1].y);
      ctx.lineTo(keypoints[idx2].x, keypoints[idx2].y);
      ctx.stroke();
    }
  });
}


      function angleCalculation(arr) {
        let right_shoulder = arr.find((x) => x.name === "right_shoulder");
        let right_elbow = arr.find((x) => x.name === "right_elbow");
        let right_wrist = arr.find((x) => x.name === "right_wrist");

        let left_shoulder = arr.find((x) => x.name === "left_shoulder");
        let left_elbow = arr.find((x) => x.name === "left_elbow");
        let left_wrist = arr.find((x) => x.name === "left_wrist");

        if (
          right_shoulder.score > 0.5 &&
          right_elbow.score > 0.5 &&
          right_wrist.score > 0.5 &&
          left_shoulder.score > 0.5 &&
          left_elbow.score > 0.5 &&
          left_wrist.score > 0.5
        ) {
          document.getElementById("video").style.borderColor = "green";
          off();

          radians_to_degrees_rightHand(
            Math.atan2(right_wrist.y - right_elbow.y, right_wrist.x - right_elbow.x) -
            Math.atan2(
              right_shoulder.y - right_elbow.y,
              right_shoulder.x - right_elbow.x
            )
          );

          radians_to_degrees_LeftHand(
            Math.atan2(left_wrist.y - left_elbow.y, left_wrist.x - left_elbow.x) -
            Math.atan2(
              left_shoulder.y - left_elbow.y,
              left_shoulder.x - left_elbow.x
            )
          );
        }
      }

      function radians_to_degrees_rightHand(radians) {
        var pi = Math.PI;
        let angle = radians * (180 / pi);

        if (angle < thresholdAngle && hasRightCountIncreasedOnce) {
          canBeProceedForRightCount = true;
        }

        if (angle > thresholdAngle && canBeProceedForRightCount) {
          hasRightCountIncreasedOnce = true;
          canBeProceedForRightCount = false;
          ++rightHandCount;
          document.getElementById("rightHandCount").innerHTML = rightHandCount - 1;
        }
      }

      function radians_to_degrees_LeftHand(radians) {
        var pi = Math.PI;
        let angle = radians * (180 / pi);

        if (Math.sign(angle) == 0) return false;

        if (angle < thresholdAngle && hasLeftCountIncreasedOnce) {
          canBeProceedForLeftCount = true;
        }

        if (angle > thresholdAngle && canBeProceedForLeftCount) {
          hasLeftCountIncreasedOnce = true;
          canBeProceedForLeftCount = false;
          ++leftHandCount;
          document.getElementById("leftHandCount").innerHTML = leftHandCount - 1;
        }
      }

      setupCamera();
      video.addEventListener("loadeddata", async () => {

        detector = await poseDetection.createDetector(
          poseDetection.SupportedModels.MoveNet,
          detectorConfig
        );

        document.getElementById("loadingText").innerHTML =
          "Please stand in front of camera";
        setInterval(detectPose, 30);
        on();
        document.getElementById("overlaytext").innerHTML = "Detecting";
      });


      function on() {
        document.getElementById("overlay").style.display = "block";
      }

      function off() {
        document.getElementById("overlay").style.display = "none";
      }

      setupCamera();

      video.addEventListener("loadeddata", async () => {
        detector = await poseDetection.createDetector(
          poseDetection.SupportedModels.MoveNet,
          detectorConfig
        );

        document.getElementById("loadingText").innerHTML =
          "Please stand in front of camera";
        setInterval(detectPose, 30);
        on();
        document.getElementById("overlaytext").innerHTML = "Detecting";
      });

    };

    runPoseDetection();

  }, []);

  return (
    <div className="App">
      <div className="container mt-4">
      <div className="row justify-content-center">
      <div className="col-lg-6 col-md-8 col-sm-10 col-xs-12 text-center">
        <h6 id="loadingText">Model is loading... Please wait..</h6>
        <div id="videoContainer" className="mx-auto d-block">
          <video id="video" autoPlay playsInline></video>
          <canvas id="canvas" className="overlayCanvas" style={{ position: 'absolute', top: 0, left: 0 }}></canvas>
        </div>
        </div>
      </div>

        <div className="row justify-content-center mt-4">
          <div className="col-lg-3 col-md-3 col-sm-6 col-xs-6 text-center">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title count" id='rightHandCount'></h5>
                <p className="card-text">Right Hand Count</p>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-6 col-xs-6 text-center">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title count" id='leftHandCount'></h5>
                <p className="card-text">Left Hand Count</p>
              </div>
            </div>
          </div>
        </div>

        <div className="row justify-content-center mt-4">
          <lottie-player src="https://assets8.lottiefiles.com/private_files/lf30_i5o0xxk6.json" background="transparent" speed="1" style={{ width: '200px', height: '200px' }} loop autoPlay></lottie-player>
        </div>
      </div>

      <div id="overlay">
        <div id="overlaytext">Overlay Text</div>
        <div className="dot-elastic"></div>
      </div>
    </div>
  );
}

export default App;