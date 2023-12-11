import * as THREE from 'three';
import * as CANNON from 'cannon';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


class DraggableSphere {
    // Add a method to shoot the sphere
    shoot(force) {
        this.body.applyImpulse(force, new CANNON.Vec3(0, 0, 0)); // Apply force to shoot the sphere
    }

    constructor(scene, world, position = new THREE.Vector3(), radius = 1) {
        this.geometry = new THREE.SphereGeometry(radius, 32, 32);
        this.material = new THREE.MeshBasicMaterial({ color: Math.random() * 0xffffff });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.position.copy(position);
        scene.add(this.mesh);

        // Cannon.js physics body
        const shape = new CANNON.Sphere(radius);
        this.body = new CANNON.Body({
            mass: 1, // Set mass > 0 for dynamic bodies
            position: new CANNON.Vec3(position.x, position.y, position.z),
            shape: shape
        });
        world.addBody(this.body);
    }

    update() {
        // Update Three.js mesh to match Cannon.js body position
        this.mesh.position.copy(this.body.position);
        this.mesh.quaternion.copy(this.body.quaternion);
    }
}

let score = 0;
let star_threshold = 500;
let start_lives = 3;
let lives = start_lives;

// Time Display
const timeDisplay = document.createElement('div');
timeDisplay.id = 'timeDisplay';
timeDisplay.style.position = 'absolute';
timeDisplay.style.top = '75px';
timeDisplay.style.right = '10px';
timeDisplay.style.color = 'white';
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
scoreDisplay.style.color = 'white';
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
starsDisplay.style.color = 'white';
starsDisplay.style.zIndex = '10';
starsDisplay.style.fontSize = '48px';
starsDisplay.style.fontFamily = 'sans-serif';
document.body.appendChild(starsDisplay);


// Scene, Camera, Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// OrbitControls for camera
const controls = new OrbitControls(camera, renderer.domElement);

// Cannon.js world setup
const world = new CANNON.World();
world.gravity.set(0, -9.82, 0); // Set gravity
world.broadphase = new CANNON.NaiveBroadphase();
world.solver.iterations = 10;

// Create multiple spheres with physics
const spheres = [];
const numberOfSpheres = 3;

for (let i = 0; i < numberOfSpheres; i++) {
    const position = new THREE.Vector3((Math.random() * 4) - 2, (Math.random() * 4) + 2, (Math.random() * 4) - 2);
    const sphere = new DraggableSphere(scene, world, position);
    spheres.push(sphere);
}

// Display the number of spheres above the platform at a given time
const livesRemaining = document.createElement('div');
livesRemaining.id = 'livesRemaining';
livesRemaining.style.position = 'absolute';
livesRemaining.style.top = '10px';
livesRemaining.style.right = '10px';
livesRemaining.style.color = 'white';
livesRemaining.style.zIndex = '10';
livesRemaining.style.fontSize = '48px';
livesRemaining.style.fontFamily = 'sans-serif';
document.body.appendChild(livesRemaining);


const startTime = Date.now();
// function updateTimeDisplay() {
//     const currentTime = Date.now();
//     const elapsedTime = ((currentTime - startTime) / 1000).toFixed(2); // Convert to seconds and round to 2 decimal places
//     timeDisplay.textContent = 'Time: ' + elapsedTime + 's';
// }

// function updateLivesDisplay(newLives) {
//     newLives = spheres.filter(sphere=>sphere.body.position.y>platformBody.position.y).length;
//     lives = newLives;
//     livesRemaining.textContent = `Spheres Remaining: ${newLives}`;
// }

// function updateScoreDisplay() {
//     // const newScore = spheres.filter(sphere=>sphere.body.position.y>platformBody.position.y).length;
//     let n_score = 500 * (3-lives);
//     scoreDisplay.textContent = `Score: ${n_score}`;
// }

// function updateStarsDisplay() {
//     starsDisplay.textContent = `Stars: ${"★".repeat(start_lives - lives)}`;
// }

function updateUI(){
    const currentTime = Date.now();
    const elapsedTime = ((currentTime - startTime) / 1000).toFixed(2); // Convert to seconds and round to 2 decimal places
    timeDisplay.textContent = 'Time: ' + elapsedTime + 's';

    const newLives = spheres.filter(sphere=>sphere.body.position.y>platformBody.position.y).length;
    lives = newLives;
    livesRemaining.textContent = `Spheres Remaining: ${newLives}`;    

    const n_score = 500 * (3-lives);
    scoreDisplay.textContent = `Score: ${n_score}`;

    starsDisplay.textContent = `Stars: ${"★".repeat(start_lives - lives)}`;

}

// Camera
camera.position.z = 20;

// Create a platform in Three.js
const platformGeometry = new THREE.BoxGeometry(20, 1, 20);
const platformMaterial = new THREE.MeshBasicMaterial({ color: 0x555555 });
const platformMesh = new THREE.Mesh(platformGeometry, platformMaterial);
platformMesh.position.set(0, -2, 0);
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
const mouse = new THREE.Vector2();

// shooting sphere movement vars
let startPoint, endPoint; // Variables to store start and end points for slingshot effect
let isMouseDown = false;

let slingshotLine;
let redSphere = null; // Variable to hold the red sphere
let shootForce = 0; // Initial force set to zero
const maxForce = 100; // Maximum force for shooting
const forceIncrement = 2; // Rate of force increase per frame while mouse is held down
let shootingDirection = new THREE.Vector3(); // Vector to store shooting direction

function onMouseClick(event) {
    // Calculate mouse position in normalized device coordinates (-1 to +1) for both components
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Update the picking ray with the camera and mouse position
    raycaster.setFromCamera(mouse, camera);

    // Calculate objects intersecting the picking ray
    const intersects = raycaster.intersectObjects(scene.children,true);

    for (let intersect of intersects) {
        let selectedObject = intersect.object;
        if (selectedObject instanceof THREE.Mesh && selectedObject !== platformMesh) {
            
            // Generate a random color
            const randomColor = new THREE.Color(Math.random() * 0xffffff);

            // Apply the random color to the selected object
            selectedObject.material.color = randomColor;

            // Log the new color to the console
            console.log("new color:", "#" + randomColor.getHexString());

            break; // Assuming you want to pick the first intersected object
        }
    }
}


// // for detection of strength/force the sphere should get shot by
// function onMouseDown(event) {
//     if (isMouseDown) return; // Ignore if already holding down the mouse

//     isMouseDown = true;
//     shootForce = 0; // Reset shoot force

//     // Create the red sphere as a projectile
//     redSphere = new DraggableSphere(scene, world, playerSphere.mesh.position.clone(), 0.5); // Change size as needed
//     redSphere.mesh.material = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // Red color

//     visualizeTrajectory(); // Visualize trajectory initially
// }
// function onMouseUp(event) {
//     if (isMouseDown) {
//         isMouseDown = false;
//         const force = shootingDirection.clone().normalize().multiplyScalar(shootForce); // Calculate force based on direction and shootForce
//         redSphere.shoot(force); // Shoot the red sphere with the accumulated force
//         shootForce = 0; // Reset shoot force

//         if (trajectoryLine) {
//             scene.remove(trajectoryLine); // Remove trajectory visualization
//             trajectoryLine = null;
//         }
//     }
// }


// Event listeners
window.addEventListener('mousedown', onMouseClick);



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
    spheres.forEach(sphere => sphere.update());

    // // Update time display
    // updateTimeDisplay();

    // // Update lives display
    // updateLivesDisplay();

    // // Update score display
    // updateScoreDisplay();

    // // Update stars display
    // updateStarsDisplay();
    
    // Update UI function made from above functions
    updateUI();

    // Calculate and visualize trajectory while mouse is down
    if (isMouseDown) {
        calculateShootingForceAndDirection();
        visualizeTrajectory();
    }
    if (redSphere) {
        redSphere.position.add(redSphere.velocity); // Update the red sphere's position based on its velocity
        renderer.render(scene, camera);
    }

    renderer.render(scene, camera);
    updateCamera();

}

animate();

function calculateShootingForceAndDirection() {
    // Calculate shooting direction based on the position of the mouse relative to the player's sphere
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    
    // Update shooting direction
    shootingDirection.subVectors(raycaster.ray.direction, playerSphere.body.position).normalize();
    
    // Increment shoot force up to the maximum limit
    if (shootForce < maxForce) {
        shootForce += forceIncrement;
    }
}

// attempting to show the trajectory of the shooting movement
function visualizeTrajectory() {
    if (!trajectoryLine) {
        const lineMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 }); // Red color
        const lineGeometry = new THREE.BufferGeometry();
        const points = [];
        const step = 0.1; // Change step size to adjust the trajectory accuracy

        // Calculate points for the trajectory line of the red sphere
        for (let i = 0; i <= 10; i++) {
            const point = redSphere.mesh.position.clone().addScaledVector(shootingDirection, i * step * shootForce);
            points.push(point.x, point.y, point.z);
        }

        lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(points, 3));
        trajectoryLine = new THREE.Line(lineGeometry, lineMaterial);
        scene.add(trajectoryLine);
    } else {
        // Update points for the trajectory line of the red sphere
        const positions = trajectoryLine.geometry.attributes.position.array;

        for (let i = 0; i <= 10; i++) {
            const point = redSphere.mesh.position.clone().addScaledVector(shootingDirection, i * step * shootForce);
            positions[i * 3] = point.x;
            positions[i * 3 + 1] = point.y;
            positions[i * 3 + 2] = point.z;
        }

        trajectoryLine.geometry.attributes.position.needsUpdate = true;
    }
}

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

function createRedSphere(position, radius) {
    const geometry = new THREE.SphereGeometry(radius, 32, 32);
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 }); // Red color
    const redSphere = new THREE.Mesh(geometry, material);
    redSphere.position.copy(position);
    scene.add(redSphere);
    return redSphere;
}

window.addEventListener('mousedown', onMouseDown);
window.addEventListener('mousemove', onMouseMove);
window.addEventListener('mouseup', onMouseUp);

function onMouseDown(event) {
    if (!isMouseDown) {
        isMouseDown = true;
        startPoint = new THREE.Vector3(event.clientX, event.clientY, 0);
    }
}

function onMouseMove(event) {
    if (isMouseDown) {
        endPoint = new THREE.Vector3(event.clientX, event.clientY, 0);
        visualizeSlingshot();
    }
}

function onMouseUp(event) {
    if (isMouseDown) {
        isMouseDown = false;
        endPoint = new THREE.Vector3(event.clientX, event.clientY, 0);

        const force = calculateForce();
        shootRedSphere(force);

        startPoint = null;
        endPoint = null;
        clearSlingshot();
    }
}

function calculateForce() {
    const distance = endPoint.distanceTo(startPoint);
    const maxForce = 50; // Adjust this value according to your scene
    const minForce = 10; // Adjust this value according to your scene
    const clampedDistance = Math.min(Math.max(distance, 0), maxForce);
    return (clampedDistance / maxForce) * (maxForce - minForce) + minForce;
}

function visualizeSlingshot() {
    const slingshotMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });
    const slingshotPoints = [new THREE.Vector3(startPoint.x, startPoint.y, 0), new THREE.Vector3(endPoint.x, endPoint.y, 0)];
    const slingshotGeometry = new THREE.BufferGeometry().setFromPoints(slingshotPoints);

    if (slingshotLine) {
        scene.remove(slingshotLine);
    }

    slingshotLine = new THREE.Line(slingshotGeometry, slingshotMaterial);
    scene.add(slingshotLine);
}

function clearSlingshot() {
    if (slingshotLine) {
        scene.remove(slingshotLine);
        slingshotLine = null;
    }
}

function shootRedSphere(force) {
    if (redSphere) {
        scene.remove(redSphere);
    }

    redSphere = createRedSphere(new THREE.Vector3(0, 0, 0), /* Set your red sphere radius */);
    const direction = new THREE.Vector3(endPoint.x - startPoint.x, endPoint.y - startPoint.y, 0).normalize();
    redSphere.velocity = direction.multiplyScalar(force); // Assign velocity based on the direction and force

    animate();
}

