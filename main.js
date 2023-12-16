import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as CANNON from 'cannon-es'
// import * as THREE from '/node_modules/three';
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
timeDisplay.style.fontSize = '28px';
timeDisplay.style.fontFamily = "'Press Start 2P', sans-serif";
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
scoreDisplay.style.fontSize = '28px';
scoreDisplay.style.fontFamily = "'Press Start 2P', sans-serif";
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
starsDisplay.style.fontSize = '28px';
starsDisplay.style.fontFamily = "'Press Start 2P', sans-serif";
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
viewMode.style.fontSize = '28px';
viewMode.style.fontFamily = "'Press Start 2P', sans-serif";
document.body.appendChild(viewMode);

const livesDisplay = document.createElement('div');
livesDisplay.id = 'livesDisplay';
livesDisplay.textContent = `Tigers: ${lives}`;
livesDisplay.style.position = 'absolute';
livesDisplay.style.top = '205px';
livesDisplay.style.left = '10px';
livesDisplay.style.color = 'black';
livesDisplay.style.zIndex = '10';
livesDisplay.style.fontSize = '28px';
livesDisplay.style.fontFamily = "'Press Start 2P', sans-serif";
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
powerDisplay.style.fontSize = '28px';
powerDisplay.style.fontFamily = "'Press Start 2P', sans-serif";
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
let numberOfSpheres;

// Calculate spacing between spheres
let platformSize = 20;
const platformTopSurfaceY = -2;
// Access specific parameter
// Create URLSearchParams object
const urlParams = new URLSearchParams(window.location.search);
const level = urlParams.get('level'); 
console.log(level);
let sphereRadius;
let spacing; 
let additionalClearance;
let safeHeightAbovePlatform;
let position;
let sphere;
let newYposition;

switch (level) {
    case "1":
        sphereRadius = 1;
        spacing = platformSize / (numberOfSpheres + 1);
        additionalClearance = 1;
        safeHeightAbovePlatform = platformTopSurfaceY + sphereRadius + additionalClearance;

        position = new THREE.Vector3(platformSize/4, safeHeightAbovePlatform, -(platformSize/3));
        sphere = new BrownBear(scene, world, position);
        newYposition = platformTopSurfaceY + sphere.geometry.parameters.radius + additionalClearance;
        sphere.body.position.y = newYposition
        spheres.push(sphere);


        position = new THREE.Vector3(-(platformSize/4), safeHeightAbovePlatform, -platformSize/5);
        sphere = new DartmouthD(scene, world, position);
        newYposition = platformTopSurfaceY + sphere.geometry.parameters.radius + additionalClearance;
        sphere.body.position.y = newYposition
        spheres.push(sphere);


        position = new THREE.Vector3(-(platformSize/2.1), safeHeightAbovePlatform, platformSize/3);
        sphere = new DartmouthD(scene, world, position);
        newYposition = platformTopSurfaceY + sphere.geometry.parameters.radius + additionalClearance;
        sphere.body.position.y = newYposition
        spheres.push(sphere);

        position = new THREE.Vector3(platformSize/10, safeHeightAbovePlatform, (platformSize/3));
        sphere = new BrownBear(scene, world, position);
        newYposition = platformTopSurfaceY + sphere.geometry.parameters.radius + additionalClearance;
        sphere.body.position.y = newYposition
        spheres.push(sphere);     
        
        position = new THREE.Vector3(platformSize/4.01, safeHeightAbovePlatform, 0);
        sphere = new DartmouthD(scene, world, position);
        newYposition = platformTopSurfaceY + sphere.geometry.parameters.radius + additionalClearance;
        sphere.body.position.y = newYposition
        spheres.push(sphere);   
        
        numberOfSpheres = spheres.length;
        
        camera.lookAt(new THREE.Vector3(-10, 0, 0));
        camera.position.x = 30
        camera.position.y = 1
        camera.position.z =  0
    
        // controls.enabled = false;

        break;
    case "2":

        sphereRadius = 1;
        spacing = platformSize / (numberOfSpheres + 1);
        additionalClearance = 1;
        safeHeightAbovePlatform = platformTopSurfaceY + sphereRadius + additionalClearance;

        position = new THREE.Vector3(platformSize/4, safeHeightAbovePlatform, -(platformSize/3));
        sphere = new YaleBullDogs(scene, world, position);
        newYposition = platformTopSurfaceY + sphere.geometry.parameters.radius + additionalClearance;
        sphere.body.position.y = newYposition
        spheres.push(sphere);

        position = new THREE.Vector3(-platformSize/3, safeHeightAbovePlatform, -(platformSize/2.5));
        sphere = new YaleBullDogs(scene, world, position);
        newYposition = platformTopSurfaceY + sphere.geometry.parameters.radius + additionalClearance;
        sphere.body.position.y = newYposition
        spheres.push(sphere);

        position = new THREE.Vector3(-platformSize/4, safeHeightAbovePlatform, -(platformSize/8));
        sphere = new CornellBears(scene, world, position);
        newYposition = platformTopSurfaceY + sphere.geometry.parameters.radius + additionalClearance;
        sphere.body.position.y = newYposition
        spheres.push(sphere);


        position = new THREE.Vector3(platformSize/4.5, safeHeightAbovePlatform, (platformSize/8));
        sphere = new CornellBears(scene, world, position);
        newYposition = platformTopSurfaceY + sphere.geometry.parameters.radius + additionalClearance;
        sphere.body.position.y = newYposition
        spheres.push(sphere);

       
        let newYaleSphere3Pos = new THREE.Vector3(-platformSize / 2.8, safeHeightAbovePlatform, platformSize / 4.5);
        let newYaleSphere4Pos = new THREE.Vector3(platformSize / 2.2, safeHeightAbovePlatform, -platformSize / 6);
        let newYaleSphere5Pos = new THREE.Vector3(-platformSize / 4, safeHeightAbovePlatform, platformSize / 6);
        let newYaleSphere1Pos = new THREE.Vector3(platformSize / 2.5, safeHeightAbovePlatform, platformSize / 4);
        let newYaleSphere2Pos = new THREE.Vector3(-platformSize / 2.2, safeHeightAbovePlatform, -platformSize / 5);

        sphere = new YaleBullDogs(scene, world, newYaleSphere1Pos);
        spheres.push(sphere);

        sphere = new YaleBullDogs(scene, world, newYaleSphere2Pos);
        spheres.push(sphere);

        sphere = new YaleBullDogs(scene, world, newYaleSphere3Pos);
        spheres.push(sphere);

        sphere = new YaleBullDogs(scene, world, newYaleSphere4Pos);
        spheres.push(sphere);

        sphere = new YaleBullDogs(scene, world, newYaleSphere5Pos);
        spheres.push(sphere);

        numberOfSpheres = spheres.length;
        
        camera.lookAt(new THREE.Vector3(0,0,1));
        camera.position.x = -1;
        camera.position.y = 3;
        camera.position.z = -35;

        // controls.enabled = false;


        break;
    default:
        sphereRadius = 1;
        spacing = platformSize / (numberOfSpheres + 1);
        additionalClearance = 1;
        safeHeightAbovePlatform = platformTopSurfaceY + sphereRadius + additionalClearance;

        position = new THREE.Vector3(platformSize/4, safeHeightAbovePlatform, -(platformSize/3));
        sphere = new ColumbiaLions(scene, world, position);
        newYposition = platformTopSurfaceY + sphere.geometry.parameters.radius + additionalClearance;
        sphere.body.position.y = newYposition
        spheres.push(sphere);


        position = new THREE.Vector3(platformSize/7, safeHeightAbovePlatform, -(platformSize/7));
        sphere = new ColumbiaLions(scene, world, position);
        newYposition = platformTopSurfaceY + sphere.geometry.parameters.radius + additionalClearance;
        sphere.body.position.y = newYposition
        spheres.push(sphere);

        camera.lookAt(new THREE.Vector3(-10, 0, 0));
        camera.position.x = 30
        camera.position.y = 1
        camera.position.z =  0

        position = new THREE.Vector3(-platformSize/6, safeHeightAbovePlatform, (platformSize/3));
        sphere = new ColumbiaLions(scene, world, position);
        newYposition = platformTopSurfaceY + sphere.geometry.parameters.radius + additionalClearance;
        sphere.body.position.y = newYposition
        spheres.push(sphere);

        camera.lookAt(new THREE.Vector3(-10, 0, 0));
        camera.position.x = 30
        camera.position.y = 1
        camera.position.z =  0

        position = new THREE.Vector3(platformSize/4, safeHeightAbovePlatform, (platformSize/7));
        sphere = new ColumbiaLions(scene, world, position);
        newYposition = platformTopSurfaceY + sphere.geometry.parameters.radius + additionalClearance;
        sphere.body.position.y = newYposition
        spheres.push(sphere);

        camera.lookAt(new THREE.Vector3(-10, 0, 0));
        camera.position.x = 30
        camera.position.y = 1
        camera.position.z =  0


        position = new THREE.Vector3(-platformSize/4, safeHeightAbovePlatform, -(platformSize/2.3));
        sphere = new UPennQuaker(scene, world, position);
        newYposition = platformTopSurfaceY + sphere.geometry.parameters.radius + additionalClearance;
        sphere.body.position.y = newYposition
        spheres.push(sphere);

        camera.lookAt(new THREE.Vector3(-10, 0, 0));
        camera.position.x = 30
        camera.position.y = 1
        camera.position.z =  0


        position = new THREE.Vector3(-platformSize/9, safeHeightAbovePlatform, 0);
        sphere = new UPennQuaker(scene, world, position);
        newYposition = platformTopSurfaceY + sphere.geometry.parameters.radius + additionalClearance;
        sphere.body.position.y = newYposition
        spheres.push(sphere);

        numberOfSpheres = spheres.length;

        camera.lookAt(new THREE.Vector3(-10, 0, 0));
        camera.position.x = 30
        camera.position.y = 1
        camera.position.z =  0


        // controls.enabled = false;


        break;
}

function positionCamera(level){
    switch(level){
        case "1":
            camera.lookAt(new THREE.Vector3(-10, 0, 0));
            camera.position.x = 30
            camera.position.y = 1
            camera.position.z =  0
            break;
        case "2":
            camera.lookAt(new THREE.Vector3(0,0,1));
            camera.position.x = -1;
            camera.position.y = 3;
            camera.position.z = -35;
            break;
        default: 
            camera.lookAt(new THREE.Vector3(-10, 0, 0));
            camera.position.x = 30
            camera.position.y = 1
            camera.position.z =  0
            break;
    }
}

// Display the number of spheres above the platform at a given time
const spheresRemaining = document.createElement('div');
spheresRemaining.id = 'spheresRemaining';
spheresRemaining.style.position = 'absolute';
spheresRemaining.style.top = '10px';
spheresRemaining.style.right = '10px';
spheresRemaining.style.color = 'black';
spheresRemaining.style.zIndex = '10';
spheresRemaining.style.fontSize = '28px';
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
    spheresRemaining.style.fontFamily = "'Press Start 2P', sans-serif";    

    const n_score = 500 * (numberOfSpheres-enemiesLeft);
    scoreDisplay.textContent = `Score: ${n_score}`;

    starsDisplay.textContent = `Stars: ${"★".repeat(numberOfSpheres - enemiesLeft)}`;

    livesDisplay.textContent = `Tigers: ${lives}`;

}

const textureLoader1 = new THREE.TextureLoader();
const platformTexture = textureLoader1.load('school_logos/princeton_surface.png');

const textureLoader2 = new THREE.TextureLoader();
const platformTexture2 = textureLoader1.load('school_logos/back.png');

// Create a platform material using the texture for the top face
const platformMaterials = [
    new THREE.MeshBasicMaterial({color: 0xFF8F00 }), 
    new THREE.MeshBasicMaterial({color: 0xFF8F00  }), 
    new THREE.MeshBasicMaterial({ map: platformTexture  }), 
    new THREE.MeshBasicMaterial({ map: platformTexture2 }), 
    new THREE.MeshBasicMaterial({color: 0xFF8F00  }), 
    new THREE.MeshBasicMaterial({color: 0xFF8F00   }) 
];



// Create a platform in Three.js
// const platformGeometry = new THREE.BoxGeometry(platformSize, 1, platformSize);
// const platformMaterial = new THREE.MeshBasicMaterial({ color: 0x555555 });
const platformGeometry = new THREE.BoxGeometry(platformSize, 1, platformSize);
const platformMesh = new THREE.Mesh(platformGeometry, platformMaterials);
//const platformMesh = new THREE.Mesh(platformGeometry, platformMaterial);
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

const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('images/tiger_face.png'); 


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
        positionCamera(level)
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

const cloudTexture = new THREE.TextureLoader().load('school_logos/cloud2.png');
const cloudMaterial = new THREE.SpriteMaterial({ map: cloudTexture });

const cloudCount = 4; // Number of clouds

for (let i = 0; i < cloudCount; i++) {
    // Create a sprite with the cloud material
    const cloudSprite = new THREE.Sprite(cloudMaterial);

    // Set the scale of the sprite
    const cloudScale = 10; // Adjust the scale of the cloud
    cloudSprite.scale.set(cloudScale, cloudScale, 1);

    // Calculate positions for the clouds
    const radius = 30; 
    const angle = (i / cloudCount) * Math.PI * 2;
    const cloudX = radius * Math.cos(angle);
    const cloudY = 20; 
    const cloudZ = radius * Math.sin(angle);

    // Position the cloud sprite
    cloudSprite.position.set(cloudX, cloudY, cloudZ);

    // Add the cloud sprite to the scene
    scene.add(cloudSprite);
}

// Update function to make the clouds face the camera
function updateCloudsOrientation() {
    scene.traverse((child) => {
        if (child instanceof THREE.Sprite) {
            const cloudPosition = child.position.clone();
            const cameraPosition = camera.position.clone();

            const lookAtMatrix = new THREE.Matrix4();
            lookAtMatrix.lookAt(cameraPosition, cloudPosition, camera.up);

            const quaternion = new THREE.Quaternion();
            quaternion.setFromRotationMatrix(lookAtMatrix);

            child.quaternion.copy(quaternion);
        }
    });
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
        setTimeout(function(){document.getElementById('winnerMenu').style.display = 'block';winnerMenu.style.fontFamily = "'Press Start 2P', sans-serif";}, 1000);

    }

    // this checks if lives are over and waits for 4 seconds before displaying the game over menu
    // the wait is since to ensure that the remainingFoes has not gone to zero before the lives menu shows up
    if (lives <= 0){
        outOfLives = true;
        setTimeout(function(){
            remainingFoes = spheres.filter(sphere=>sphere.body.position.y>platformBody.position.y).length
            if (remainingFoes > 0) {
                document.getElementById('gameOverMenu').style.display = 'block';gameOverMenu.style.fontFamily = "'Press Start 2P', sans-serif";
            } 
        }, 4000);
        

    }

    function getCameraDirection(camera) {
        var vector = new THREE.Vector3(0, 0, -1);
        vector.applyQuaternion(camera.quaternion);
    
        return vector;
    }
    
    // var cameraDirection = getCameraDirection(camera);
    // console.log('Camera is looking towards:', cameraDirection,camera.position);

    updateCloudsOrientation(); 
    renderer.render(scene, camera);
}

animate();


// // Create a cloud shape (SphereGeometry used as an example)
// const cloudGeometry = new THREE.SphereGeometry(5, 32, 32); // Adjust parameters as needed
// const cloudTexture = new THREE.TextureLoader().load('school_logos/cloud.png'); // Load cloud image texture
// const cloudMaterial = new THREE.MeshBasicMaterial({ map: cloudTexture, side: THREE.DoubleSide });
// const cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial);

// // Position and add the cloud mesh to the scene
// cloudMesh.position.set(0, 10, 0); // Adjust position as needed
// scene.add(cloudMesh);





