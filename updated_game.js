// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// const renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);

// const birdGeometry = new THREE.SphereGeometry(1, 32, 32);
// const birdMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
// const bird = new THREE.Mesh(birdGeometry, birdMaterial);
// bird.position.set(-8, 0, -10); // Position the bird on the left side of the screen
// scene.add(bird);

// const pigMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// const pig = new THREE.Mesh(birdGeometry, pigMaterial);
// pig.position.set(5, -2, -15);
// scene.add(pig);

import * as THREE from 'three';
import * as CANNON from 'cannon';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const level = parseInt(urlParams.get('level')) || 1; // Default level is 1 if not specified in the URL

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// const controls = new OrbitControls(camera, renderer.domElement);
let bird, pig; // Declare variables for bird and pig meshes

// Setup for different levels based on the 'level' variable
if (level === 1) {
    // Level 1 setup
    const birdGeometry = new THREE.SphereGeometry(1, 32, 32);
    const birdMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    bird = new THREE.Mesh(birdGeometry, birdMaterial);
    bird.position.set(-8, 0, -10); // Position the bird on the left side of the screen
    scene.add(bird);

    const pigMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const pigGeometry = new THREE.SphereGeometry(1, 32, 32);
    pig = new THREE.Mesh(pigGeometry, pigMaterial);
    pig.position.set(-8, 2, -10);
    scene.add(pig);
    

} else if (level === 2) {
   
} else if (level === 3) {
    
}

let isDragging = false;
let startPosition = new THREE.Vector3();
let endPosition = new THREE.Vector3();
let forceVector = new THREE.Vector3();

function onMouseDown(event) {
    event.preventDefault();
    isDragging = true;
    startPosition.set(event.clientX, event.clientY, 0).unproject(camera);
    endPosition.copy(startPosition);
}

function onMouseMove(event) {
    event.preventDefault();
    if (isDragging) {
        endPosition.set(event.clientX, event.clientY, 0).unproject(camera);
    }
}

function onMouseUp(event) {
    event.preventDefault();
    if (isDragging) {
        isDragging = false;
        forceVector = new THREE.Vector3().copy(startPosition).sub(endPosition).multiplyScalar(0.1);
        animateShoot();
    }
}

function animateShoot() {
    let shooting = true;
    requestAnimationFrame(function shoot() {
        if (shooting) {
            bird.position.sub(forceVector);
            console.log(bird.position,pig.position);
            forceVector.multiplyScalar(0.98);

            if (forceVector.lengthSq() < 0.001) {
                shooting = false;
                bird.position.set(-8, 0, -10); // Reset bird position after shooting
            }

            renderer.render(scene, camera);
            requestAnimationFrame(shoot);

        }
    });
}

// Event listeners
renderer.domElement.addEventListener('mousedown', onMouseDown, false);
renderer.domElement.addEventListener('mousemove', onMouseMove, false);
renderer.domElement.addEventListener('mouseup', onMouseUp, false);

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();