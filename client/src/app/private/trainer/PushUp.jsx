import React, { useEffect, useState } from 'react';
// import '@tensorflow/tfjs'; // Import TensorFlow.js
// import '@tensorflow/tfjs-backend-webgl'; // Import TensorFlow.js WebGL backend
// import '@tensorflow/tfjs-converter'; // Import TensorFlow.js model converter
// import '@tensorflow/tfjs-core'; // Import TensorFlow.js core
// import * as tf from '@tensorflow/tfjs';
// import * as poseDetection from '@tensorflow-models/pose-detection'; // Import Pose Detection Model
import '../../../assets/styles/private_styles/PushUp.css';

function PushUp() {
  const [fps, setFps] = useState(0);
//   const [reps, setReps] = useState(0);
//   const [upPosition, setUpPosition] = useState(false);
//   const [downPosition, setDownPosition] = useState(false);

  useEffect(() => {
    let lastFrameTime = performance.now();
    let frameCount = 0;

    const updateFPS = () => {
      const currentTime = performance.now();
      const deltaTime = currentTime - lastFrameTime;

      frameCount++;
      if (deltaTime >= 1000) {
        const currentFps = (frameCount * 1000) / deltaTime;
        setFps(currentFps);

        frameCount = 0;
        lastFrameTime = currentTime;
      }

      requestAnimationFrame(updateFPS);
    };

    requestAnimationFrame(updateFPS);

    return () => {
      // Cleanup
      cancelAnimationFrame(updateFPS);
    };
  }, []);

  useEffect(() => {
    const runPoseDetection = async () => {
      const tf = await import('@tensorflow/tfjs');
      await import('@tensorflow/tfjs-backend-webgl');
      await import('@tensorflow/tfjs-converter');
      await import('@tensorflow/tfjs-core');
      const poseDetection = await import('@tensorflow-models/pose-detection');
      await tf.ready(); 
      await tf.setBackend('webgl'); 

      let video = document.getElementById("video");
      let windowHeight = 500;  
      let windowWidth = 700; 

      var reps = 0;
      var upPosition = false;
      var downPosition = false;
      
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
          if (point.score > 0.3) {
            ctx.beginPath();
            ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI);
            ctx.fillStyle = "red";
            ctx.fill();
          }
        });

        // Connect joints with lines
        const connections = [
            [5, 7],  
            [7, 9],  
            [6, 8],  
            [8, 10],
            [5, 6], 
            [5, 11],
            [6, 12],
            [11,12],
            [11,13],
            [13,15],
            [12,14],
            [14,16]  
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
        let left_shoulder = arr.find((x) => x.name === "left_shoulder");
        let left_elbow = arr.find((x) => x.name === "left_elbow");
        let left_wrist = arr.find((x) => x.name === "left_wrist");
        // let left_hip = arr.find((x) => x.name === "left_hip");
        // let left_knee = arr.find((x) => x.name === "left_knee");
        
        if (
          left_shoulder.score > 0.3 &&
          left_elbow.score > 0.3 &&
          left_wrist.score > 0.3
        ) {
          document.getElementById("video").style.borderColor = "green";
          off();
          document.getElementById("pushUpCount").innerHTML = reps;
          inUpPosition( 
            Math.atan2(left_wrist.y - left_elbow.y, left_wrist.x - left_elbow.x) - 
            Math.atan2(
                left_shoulder.y - left_elbow.y,
                left_shoulder.x - left_elbow.x
              )
          );

          inDownPosition(
            (Math.atan2(left_wrist.y - left_elbow.y, left_wrist.x - left_elbow.x) - 
            Math.atan2(
                left_shoulder.y - left_elbow.y,
                left_shoulder.x - left_elbow.x
              )), arr
          );
        }
      }

      function inUpPosition(radians) {
        var pi = Math.PI;
        let angle = radians * (180 / pi);
        // console.log('inUpPosition angle:', angle);

        if (angle > 170 && angle < 200) {
            if (downPosition == true) {
                // setReps(reps + 1);
                // console.log('Incrementing reps');
                reps++;
            }
            // setUpPosition(true);
            // setDownPosition(false);
            upPosition = true;
            downPosition = false;
        }
      }

      function inDownPosition(radians, keypoints) {
        var pi = Math.PI;
        let angle = radians * (180 / pi);
        // console.log('inDownPosition angle:', angle);
        // console.log('keypoints: 0', keypoints[0].y);
        // console.log('keypoints: 7', keypoints[7].y);

        let elbowAboveNose = false;
        if (keypoints[0].y > keypoints[7].y) {
            elbowAboveNose = true;
        }
        // console.log('elbowAboveNose:', elbowAboveNose);
        // console.log('math angle: ', Math.abs(angle));

        if (elbowAboveNose && ((Math.abs(angle) > 20) && (Math.abs(angle) < 100))) {
            if (upPosition == true) {
                // say up position
                // console.log('Saying up position');
            }
            // setDownPosition(true);
            // setUpPosition(false);
            upPosition = false;
            downPosition = true;
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
    <>
      <div className="pushup-container py-5">
        <div className="row d-flex justify-content-center">
          <div className="col-lg-6 col-md-8 col-sm-10 col-xs-12 text-center">
            <div className="fps-counter">
              <span>FPS: {fps.toFixed(2)}</span>
            </div>
            <h6 id="loadingText">Model is loading... Please wait..</h6>
            <div id="videoContainer" className="mx-auto d-flex justify-content-center">
              <video id="video" autoPlay playsInline ></video>
              <canvas id="canvas" className="overlayCanvas "></canvas>
            </div>
          </div>
        </div>

        <div className="row justify-content-center mt-4 mb-4">
          <div className="col-lg-3 col-md-3 col-sm-6 col-xs-6 text-center">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title count" id='pushUpCount'></h5>
                <p className="card-text">Push Up Count</p>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="row justify-content-center mt-4">
          <lottie-player src="https://assets8.lottiefiles.com/private_files/lf30_i5o0xxk6.json" background="transparent" speed="1" style={{ width: '200px', height: '200px' }} loop autoPlay></lottie-player>
        </div> */}
      </div>
      <div id="overlay">
        <div id="overlaytext">Overlay Text</div>
        <div className="dot-elastic"></div>
      </div>
    </>
  );
}

export default PushUp;