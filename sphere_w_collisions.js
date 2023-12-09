import * as THREE from 'three';
import * as CANNON from 'cannon';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


class DraggableSphere {
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

    renderer.render(scene, camera);
    updateCamera();
}

animate();
