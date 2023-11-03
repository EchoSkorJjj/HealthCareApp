import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const UserGuideModal = ({ onClose }) => {
    return (
        <Modal show onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Welcome to Your AI Trainer</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Our AI-powered training assistant is designed to guide you through two specific exercises: Bicep Curls and Push-Ups. To ensure the best experience, please follow the instructions below carefully.</p>

                <h5>Getting Started</h5>
                <p>Before you begin, make sure your environment is well-lit and you have enough space to perform exercises safely. You will need a device with a camera and permission for our website to access it.</p>

                <h6>Camera Access</h6>
                <ul>
                    <li>When prompted, please allow camera access by clicking 'Allow' on the permission popup.</li>
                    <li>If you accidentally deny access, you can change this by going to your browser settings and allowing camera access for our website.</li>
                </ul>

                <h5>Bicep Curl Guide</h5>
                <p>To effectively track your bicep curls, please follow these steps:</p>
                <ol>
                    <li>Stand in front of the camera so that your entire upper body is visible.</li>
                    <li>Make sure your arms are within the camera frame from any position during the curl.</li>
                    <li>Begin with your arms fully extended and curl them up towards your shoulders.</li>
                    <li>Perform the curls at a steady pace – our AI trainer will count each curl done correctly.</li>
                    <li>If the AI does not count a rep, make sure your movements are clear and stay within the frame.</li>
                </ol>

                <h5>Push-Up Guide</h5>
                <p>For the AI to properly count your push-ups, position yourself as follows:</p>
                <ol>
                    <li>Place your device so that the camera can capture you sideways.</li>
                    <li>Get into the push-up position parallel to the camera, not facing it.</li>
                    <li>Ensure your entire upper body and at least your thighs are visible in the camera's view.</li>
                    <li>Keep your back straight and go all the way down until your chest is close to the ground and then push back up.</li>
                    <li>The AI will count a rep when a proper push-up is recognized.</li>
                </ol>

                <p><strong>Additional Tips:</strong></p>
                <ul>
                    <li><strong>Warm-Up:</strong> Before starting your workout, perform some light stretching or a warm-up routine to prepare your muscles.</li>
                    <li><strong>Camera Angle:</strong> If you're not being detected, adjust the camera angle and make sure it's at a height level with your midsection.</li>
                    <li><strong>Guidance:</strong> If at any point you need to see the instructions again, click on "Show Instructions" button available on the top of the page.</li>
                    <li><strong>Safety First:</strong> Always prioritize your safety. If you feel any discomfort, please stop and consult with a professional.</li>
                </ul>

                <h5>Troubleshooting</h5>
                <p>If the AI is not recognizing your movements:</p>
                <ul>
                    <li>Confirm that your entire body is visible as per the exercise guidelines.</li>
                    <li>Ensure that there's no significant backlighting causing a silhouette effect.</li>
                    <li>Try wearing contrasting clothing if the AI has trouble distinguishing your body from the background.</li>
                </ul>

                <p>Remember, the AI is your assistant here to make your workout more efficient. Make sure to hydrate and have fun!</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={onClose}>Got it, let's start!</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default UserGuideModal;
