import * as THREE from './node_modules/three';
import * as CANNON from 'cannon';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import {YaleBullDogs, CornellBears, ColumbiaLions, BrownBear, DartmouthD, UPennQuaker } from './opposingSchools/opposingIvies.js';

// important variables
const shootingBalls = [];
let power = 0;
let score = 0;
let star_threshold = 500;

let lives = 5;
let isShootMode = true;
let outOfLives = false;
let viewerModeDict = {true: "Shoot Mode",false: "Drag Mode"};

// Time Display
const timeDisplay = document.createElement('div');
timeDisplay.id = 'timeDisplay';
timeDisplay.style.position = 'absolute';
timeDisplay.style.top = '75px';
timeDisplay.style.right = '10px';
timeDisplay.style.color = 'black';
timeDisplay.style.zIndex = '10';
timeDisplay.style.fontSize = '48px';
timeDisplay.style.fontFamily = 'sans-serif';
document.body.appendChild(timeDisplay);

// Time Display
const scoreDisplay = document.createElement('div');
scoreDisplay.id = 'scoreDisplay';
scoreDisplay.textContent = `Score: ${score}`;
scoreDisplay.style.position = 'absolute';
scoreDisplay.style.top = '10px';
scoreDisplay.style.left = '10px';
scoreDisplay.style.color = 'black';
scoreDisplay.style.zIndex = '10';
scoreDisplay.style.fontSize = '48px';
scoreDisplay.style.fontFamily = 'sans-serif';
document.body.appendChild(scoreDisplay);

// Stars Display
const starsDisplay = document.createElement('div');
starsDisplay.id = 'starsDisplay';
starsDisplay.textContent = `Stars: ${"★".repeat(score % star_threshold)}`;
starsDisplay.style.position = 'absolute';
starsDisplay.style.top = '75px';
starsDisplay.style.left = '10px';
starsDisplay.style.color = 'black';
starsDisplay.style.zIndex = '10';
starsDisplay.style.fontSize = '48px';
starsDisplay.style.fontFamily = 'sans-serif';
document.body.appendChild(starsDisplay);

// View Mode Display
const viewMode = document.createElement('div');
viewMode.id = 'viewMode';
viewMode.textContent = `View Mode: ${viewerModeDict[isShootMode]}`;
viewMode.style.position = 'absolute';
viewMode.style.top = '140px';
viewMode.style.left = '10px';
viewMode.style.color = 'black';
viewMode.style.zIndex = '10';
viewMode.style.fontSize = '48px';
viewMode.style.fontFamily = 'sans-serif';
document.body.appendChild(viewMode);

const livesDisplay = document.createElement('div');
livesDisplay.id = 'livesDisplay';
livesDisplay.textContent = `Tigers: ${lives}`;
livesDisplay.style.position = 'absolute';
livesDisplay.style.top = '205px';
livesDisplay.style.left = '10px';
livesDisplay.style.color = 'black';
livesDisplay.style.zIndex = '10';
livesDisplay.style.fontSize = '48px';
livesDisplay.style.fontFamily = 'sans-serif';
document.body.appendChild(livesDisplay);

// Power Display
const powerDisplay = document.createElement('div');
powerDisplay.id = 'powerDisplay';
powerDisplay.textContent = 'Power: 0';
powerDisplay.style.position = 'absolute';
powerDisplay.style.top = '140px';
powerDisplay.style.right = '10px';
powerDisplay.style.color = 'black';
powerDisplay.style.zIndex = '10';
powerDisplay.style.fontSize = '48px';
powerDisplay.style.fontFamily = 'sans-serif';
document.body.appendChild(powerDisplay);

// Scene, Camera, Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// set the background color
renderer.setClearColor(0x87ceeb);
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);

// OrbitControls for camera
const controls = new OrbitControls(camera, renderer.domElement);

// Cannon.js world setup
const world = new CANNON.World();
world.gravity.set(0, -9.82, 0); // Set gravity
world.broadphase = new CANNON.NaiveBroadphase();
world.solver.iterations = 10;

// Create multiple spheres with physics
const spheres = [];
let numberOfSpheres= 4;

// Calculate spacing between spheres
let platformSize = 20;
const platformTopSurfaceY = -2;
let sphereRadius = 1;
const spacing = platformSize / (numberOfSpheres + 1);
const additionalClearance = 1;
const safeHeightAbovePlatform = platformTopSurfaceY + sphereRadius + additionalClearance;

let position = new THREE.Vector3(5, safeHeightAbovePlatform, -(platformSize/3));
let sphere = new BrownBear(scene, world, position);
let newYposition = platformTopSurfaceY + sphere.geometry.parameters.radius + additionalClearance;
sphere.body.position.y = newYposition
spheres.push(sphere);


position = new THREE.Vector3(-(platformSize/4), safeHeightAbovePlatform, platformSize/3);
sphere = new DartmouthD(scene, world, position);
newYposition = platformTopSurfaceY + sphere.geometry.parameters.radius + additionalClearance;
sphere.body.position.y = newYposition
spheres.push(sphere);

position = new THREE.Vector3((platformSize/4), safeHeightAbovePlatform, platformSize/5);
sphere = new YaleBullDogs(scene, world, position);
newYposition = platformTopSurfaceY + sphere.geometry.parameters.radius + additionalClearance;
sphere.body.position.y = newYposition
spheres.push(sphere);

position = new THREE.Vector3((-platformSize/4), safeHeightAbovePlatform, -platformSize/5);
sphere = new UPennQuaker(scene, world, position);
newYposition = platformTopSurfaceY + sphere.geometry.parameters.radius + additionalClearance;
sphere.body.position.y = newYposition
spheres.push(sphere);


// // Create multiple spheres with physics
// for (let i = 0; i < numberOfSpheres; i++) {
//     // Position spheres in a line or grid within the platform bounds
//     const xPosition = -platformSize / 2 + spacing * (i + 1);
//     const yPosition = safeHeightAbovePlatform;
//     const zPosition = Math.random() * platformSize -  platformSize/2; // Centered along the z-axis, adjust as needed

//     const position = new THREE.Vector3(xPosition, yPosition, zPosition);
//     let rand_num = Math.random() * 100;
//     if (rand_num < 16){
//         const sphere = new YaleBullDogs(scene, world, position);
//         const newYposition = platformTopSurfaceY + sphere.geometry.parameters.radius + additionalClearance;
//         sphere.body.position.y = newYposition
//         spheres.push(sphere);
//     } else if (rand_num < 33){
//         const sphere = new CornellBears(scene, world, position);
//         const newYposition = platformTopSurfaceY + sphere.geometry.parameters.radius + additionalClearance;
//         sphere.body.position.y = newYposition
//         spheres.push(sphere);
//     } else if (rand_num < 50){
//         const sphere = new BrownBear(scene, world, position);
//         const newYposition = platformTopSurfaceY + sphere.geometry.parameters.radius + additionalClearance;
//         sphere.body.position.y = newYposition
//         spheres.push(sphere);
//     } else if (rand_num < 66){
//         const sphere = new DartmouthD(scene, world, position);
//         const newYposition = platformTopSurfaceY + sphere.geometry.parameters.radius + additionalClearance;
//         sphere.body.position.y = newYposition
//         spheres.push(sphere);
//     } else if (rand_num < 83){
//         const sphere = new UPennQuaker(scene, world, position);
//         const newYposition = platformTopSurfaceY + sphere.geometry.parameters.radius + additionalClearance;
//         sphere.body.position.y = newYposition
//         spheres.push(sphere);
//     } else {
//         const sphere = new ColumbiaLions(scene, world, position);
//         const newYposition = platformTopSurfaceY + sphere.geometry.parameters.radius + additionalClearance;
//         sphere.body.position.y = newYposition
//         spheres.push(sphere);
//     }
// }

// Display the number of spheres above the platform at a given time
const spheresRemaining = document.createElement('div');
spheresRemaining.id = 'spheresRemaining';
spheresRemaining.style.position = 'absolute';
spheresRemaining.style.top = '10px';
spheresRemaining.style.right = '10px';
spheresRemaining.style.color = 'black';
spheresRemaining.style.zIndex = '10';
spheresRemaining.style.fontSize = '48px';
spheresRemaining.style.fontFamily = 'sans-serif';
document.body.appendChild(spheresRemaining);
 
const startTime = Date.now();

// Update UI
function updateUI(){
    const currentTime = Date.now();
    const elapsedTime = ((currentTime - startTime) / 1000).toFixed(2); // Convert to seconds and round to 2 decimal places
    timeDisplay.textContent = 'Time: ' + elapsedTime + 's';

    const enemiesLeft = spheres.filter(sphere=>sphere.body.position.y>platformBody.position.y).length;
    spheresRemaining.textContent = `Enemies Remaining: ${enemiesLeft}`;    

    const n_score = 500 * (numberOfSpheres-enemiesLeft);
    scoreDisplay.textContent = `Score: ${n_score}`;

    starsDisplay.textContent = `Stars: ${"★".repeat(numberOfSpheres - enemiesLeft)}`;

    livesDisplay.textContent = `Tigers: ${lives}`;

}

// Camera
camera.position.z = 20;

// Create a platform in Three.js
const platformGeometry = new THREE.BoxGeometry(platformSize, 1, platformSize);
const platformMaterial = new THREE.MeshBasicMaterial({ color: 0x555555 });
const platformMesh = new THREE.Mesh(platformGeometry, platformMaterial);
platformMesh.position.set(0, platformTopSurfaceY, 0);
scene.add(platformMesh);

// Create a static physics body for the platform in Cannon.js
const platformShape = new CANNON.Box(new CANNON.Vec3(10, 0.5, 10));
const platformBody = new CANNON.Body({
    mass: 0,
    position: new CANNON.Vec3(platformMesh.position.x, platformMesh.position.y, platformMesh.position.z),
    shape: platformShape
});
world.addBody(platformBody);


// Raycaster for mouse interaction
const raycaster = new THREE.Raycaster();

// Create a shooting ball
function createShootingBall(radius, position, material) {
    // Three.js Mesh for the Shooting Ball
    const geometry = new THREE.SphereGeometry(radius, 32, 32);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.copy(position);
    scene.add(mesh);

    // Cannon.js Physics Body for the Shooting Ball
    const shape = new CANNON.Sphere(radius);
    const body = new CANNON.Body({
        mass: 5, // You might want a different mass for the shooting ball
        position: new CANNON.Vec3(position.x, position.y, position.z),
        shape: shape
    });

    const loader = new THREE.TextureLoader();
    loader.load('school_logos/princeton_logo.jpeg', (texture) => {
        mesh.material = new THREE.MeshBasicMaterial({ map: texture });
    });

    world.addBody(body);

    return { mesh, body };
}

// Example: Loading a texture image
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('images/tiger_face.png'); // Replace with your image path



// Calculate the force to apply to the shooting ball
function calculatePower(holdDuration) {
    if (outOfLives) return 0;
    const maxPower = 500; // Maximum power
    const cycleDuration = 2000; // Duration of a full power cycle (up and down) in milliseconds

    // Calculate the current phase in the cycle
    const phase = (holdDuration % cycleDuration) / cycleDuration;
    const sinValue = Math.sin(phase * Math.PI); // Sine value oscillates between 0 and 1

    // Adjust power based on sine wave, oscillating between 0 and maxPower
    power = sinValue * maxPower;

    return power;
}

// Shoot a ball from the camera
function shootBallAtTarget(mouseEvent, power, texture) {
    if (!isShootMode) return;

    const mouse = new THREE.Vector2(
        (mouseEvent.clientX / window.innerWidth) * 2 - 1,
        -(mouseEvent.clientY / window.innerHeight) * 2 + 1
    );

    raycaster.setFromCamera(mouse, camera);

    // Assuming the shooting ball starts near the camera
    const shootingBall = createShootingBall(1, camera.position.clone(), new THREE.MeshBasicMaterial({ color: 0xffa500 }));
    // Usage: Pass the texture to the createShootingBall function
    //const shootingBall = createShootingBall(1, camera.position.clone(), texture);
    const direction = new THREE.Vector3();
    raycaster.ray.direction.normalize();
    direction.copy(raycaster.ray.direction);

    // Apply force based on calculated power
    shootingBall.body.applyImpulse(new CANNON.Vec3(direction.x * power, direction.y * power, direction.z * power), shootingBall.body.position);

    shootingBalls.push(shootingBall); // Add the new ball to the array
    lives -= 1;
}

// Switch between drag and shoot mode
window.addEventListener('keydown', (event) => {
    if (event.key === 'L' || event.key === 'l') {
        isShootMode = !isShootMode;
        viewMode.textContent = `View Mode: ${viewerModeDict[isShootMode]}`;
    }
});

// Mouse events
let mouseDownTime = 0;
let powerUpdateInterval = null;

function shootBall() {
    if (isShootMode) {
        mouseDownTime = Date.now();

        // Clear any existing interval
        if (powerUpdateInterval) {
            clearInterval(powerUpdateInterval);
        }

        // Start a new interval to update the power display
        powerUpdateInterval = setInterval(() => {
            const currentDuration = Date.now() - mouseDownTime;
            const currentPower = calculatePower(currentDuration);
            powerDisplay.textContent = 'Power: ' + Math.round(currentPower.toFixed(2));
        }, 100); // Update every 100 milliseconds
    }
}

// Start updating the power display when the mouse is pressed
window.addEventListener('mousedown',shootBall);

// Start the power calculation when the mouse is pressed
window.addEventListener('mousedown', () => {
    if (isShootMode) {
        mouseDownTime = Date.now(); // Record the time when mouse is pressed
    }
});

// Shoot the ball when the mouse is released
window.addEventListener('mouseup', (event) => {
    if (isShootMode && !outOfLives) {
        clearInterval(powerUpdateInterval); // Stop updating the power display
        const mouseUpTime = Date.now();
        const holdDuration = mouseUpTime - mouseDownTime; // Calculate hold duration
        const power = calculatePower(holdDuration); // Calculate force based on duration
        shootBallAtTarget(event, power);
        powerDisplay.textContent = 'Power: ' + Math.round(power.toFixed(2)); // Show final power
    }
});

// Ensure this function is called whenever the camera moves
function updateCamera() {
    // Update camera position, rotation, etc.
    camera.updateMatrixWorld(); // Important if the camera's position or rotation has changed
}


// Animation Loop
function animate() {
    requestAnimationFrame(animate);

    // Update physics world
    world.step(1 / 60);

    // Update each sphere's position and rotation
    spheres.forEach(sphere => {
        sphere.mesh.position.copy(sphere.body.position);
        sphere.mesh.quaternion.copy(sphere.body.quaternion);
    });
    // Update shooting balls
    shootingBalls.forEach(ball => {
        ball.mesh.position.copy(ball.body.position);
        ball.mesh.quaternion.copy(ball.body.quaternion);
    });

    // Update UI function made from above functions
    updateUI();

    renderer.render(scene, camera);
    updateCamera();
    let remainingFoes = spheres.filter(sphere=>sphere.body.position.y>platformBody.position.y).length
    if (remainingFoes == 0){
        setTimeout(function(){document.getElementById('winnerMenu').style.display = 'block';}, 1000);
    }

    // this checks if lives are over and waits for 4 seconds before displaying the game over menu
    // the wait is since to ensure that the remainingFoes has not gone to zero before the lives menu shows up
    if (lives <= 0){
        outOfLives = true;
        setTimeout(function(){
            remainingFoes = spheres.filter(sphere=>sphere.body.position.y>platformBody.position.y).length
            if (remainingFoes > 0) {
                document.getElementById('gameOverMenu').style.display = 'block';
            } 
        }, 4000);

    }
}

animate();


// attempting to change sphere types by level

// document.getElementById('level1').addEventListener('click', function() {
//     clearSpheres(); // Function to clear existing spheres from the scene
//     const spheresLevel1 = [
//         new DartmouthD(scene, world, position),
//         new UPennQuaker(scene, world, position)
//     ];
//     showSpheres(spheresLevel1); // Function to add new spheres to the scene
// });

// document.getElementById('level2').addEventListener('click', function() {
//     clearSpheres();
//     const spheresLevel2 = [
//         new CornellBears(scene, world, position),
//         new BrownBear(scene, world, position)
//     ];
//     showSpheres(spheresLevel2);
// });

// document.getElementById('level3').addEventListener('click', function() {
//     clearSpheres();
//     const spheresLevel3 = [
//         new ColumbiaLions(scene, world, position),
//         new YaleBullDogs(scene, world, position)
//     ];
//     showSpheres(spheresLevel3);
// });

// function clearSpheres() {
//     // Loop through all spheres and remove them from the scene
//     spheres.forEach(sphere => {
//         scene.remove(sphere.mesh); // Remove sphere from the Three.js scene
//         world.removeBody(sphere.body); // Remove sphere's physics body from Cannon.js world
//     });

//     // Empty the spheres array
//     spheres.length = 0;
// }

// // Function to show spheres based on selected level
// function showSpheres(level) {
//     // First, clear any existing spheres on the screen
//     clearSpheres();

//     // Then, depending on the selected level, create/display spheres accordingly
//     if (level === 'level1') {
//         // Show spheres relevant to level 1
//         // For example:
//         const sphere1 = new YaleBullDogs(scene, world, new THREE.Vector3(0, 5, 0));
//         spheres.push(sphere1);

//         const sphere2 = new UPennQuaker(scene, world, new THREE.Vector3(2, 5, 0));
//         spheres.push(sphere2);
//     } else if (level === 'level2') {
//         // Show spheres relevant to level 2
//         // For example:
//         const sphere1 = new CornellBears(scene, world, new THREE.Vector3(0, 5, 0));
//         spheres.push(sphere1);

//         const sphere2 = new BrownBear(scene, world, new THREE.Vector3(2, 5, 0));
//         spheres.push(sphere2);
//     } else if (level === 'level3') {
//         // Show spheres relevant to level 3
//         // For example:
//         const sphere1 = new ColumbiaLions(scene, world, new THREE.Vector3(0, 5, 0));
//         spheres.push(sphere1);

//         const sphere2 = new YaleBullDogs(scene, world, new THREE.Vector3(2, 5, 0));
//         spheres.push(sphere2);
//     }
// }

document.addEventListener('DOMContentLoaded', function() {
    const level1Button = document.getElementById('level1');
    const level2Button = document.getElementById('level2');
    const level3Button = document.getElementById('level3');

    level1Button.addEventListener('click', function() {
        clearSpheres(); // Function to clear existing spheres from the scene
        const spheresLevel1 = [
            new DartmouthD(scene, world, position),
            new UPennQuaker(scene, world, position)
        ];
        showSpheres(spheresLevel1); // Function to add new spheres to the scene
    });

    level2Button.addEventListener('click', function() {
        clearSpheres();
        const spheresLevel2 = [
            new CornellBears(scene, world, position),
            new BrownBear(scene, world, position)
        ];
        showSpheres(spheresLevel2);
    });

    level3Button.addEventListener('click', function() {
        clearSpheres();
        const spheresLevel3 = [
            new ColumbiaLions(scene, world, position),
            new YaleBullDogs(scene, world, position)
        ];
        showSpheres(spheresLevel3);
    });

    

    // Example clearSpheres() and showSpheres() functions
    function clearSpheres() {
        // Function to clear spheres
        // ...
        spheres.forEach(sphere => {
                    scene.remove(sphere.mesh); // Remove sphere from the Three.js scene
                    world.removeBody(sphere.body); // Remove sphere's physics body from Cannon.js world
                });
            
                // Empty the spheres array
                spheres.length = 0;
    }

    function showSpheres(spheres) {
        // Function to show spheres
        // ...
        // First, clear any existing spheres on the screen
        clearSpheres();

        // Then, depending on the selected level, create/display spheres accordingly
        if (level === 'level1') {
            // Show spheres relevant to level 1
            // For example:
            const sphere1 = new YaleBullDogs(scene, world, new THREE.Vector3(0, 5, 0));
            spheres.push(sphere1);

            const sphere2 = new UPennQuaker(scene, world, new THREE.Vector3(2, 5, 0));
            spheres.push(sphere2);
        } else if (level === 'level2') {
            // Show spheres relevant to level 2
            // For example:
            const sphere1 = new CornellBears(scene, world, new THREE.Vector3(0, 5, 0));
            spheres.push(sphere1);

            const sphere2 = new BrownBear(scene, world, new THREE.Vector3(2, 5, 0));
            spheres.push(sphere2);
        } else if (level === 'level3') {
            // Show spheres relevant to level 3
            // For example:
            const sphere1 = new ColumbiaLions(scene, world, new THREE.Vector3(0, 5, 0));
            spheres.push(sphere1);

            const sphere2 = new YaleBullDogs(scene, world, new THREE.Vector3(2, 5, 0));
            spheres.push(sphere2);
        }
    }
});
