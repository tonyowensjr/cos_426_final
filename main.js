import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );


const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// set the background color
renderer.setClearColor(0x87ceeb);

const controls = new OrbitControls( camera, renderer.domElement );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.SphereGeometry( 1, 32, 32 );
console.log(geometry)
// geometry.position.set( 0, 0, 0 );
var tiger_material = [
	new THREE.MeshBasicMaterial({
	  map: new THREE.TextureLoader().load( "images/tiger_face.png")
	}),
	new THREE.MeshBasicMaterial({
	  map: new THREE.TextureLoader().load( "images/tiger_face.png")
	})
  ];

// const material = new THREE.MeshBasicMaterial( { color: 0x0fff00 } );
const sphere = new THREE.Mesh( geometry, tiger_material[0] );
console.log(sphere.faces)
// sphere[0].material = tiger_material[0];
// sphere[1].material = tiger_material[1];
sphere.position.set(1,0,-1);
scene.add( sphere);

camera.position.z = 5;
controls.update();

function animate() {
	requestAnimationFrame( animate );

	sphere.rotation.x += 0.001;
	sphere.rotation.y += 0.01;

	renderer.render( scene, camera );
}
animate();

let dragging = false;
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function onMouseDown(event) {
    event.preventDefault();

    // Calculate mouse position in normalized device coordinates (-1 to +1) for raycasting
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Raycasting to check if the mouse click intersects with the sphere
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(sphere);

    if (intersects.length > 0) {
        dragging = true;
    }
}

function onMouseMove(event) {
    event.preventDefault();

    if (dragging) {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);

        const intersects = raycaster.intersectObject(sphere);

        if (intersects.length > 0) {
            const intersectPoint = intersects[0].point;
            sphere.position.copy(intersectPoint);
        }
    }
}

function onMouseUp(event) {
    event.preventDefault();
    dragging = false;
}

// Event listeners for mouse interaction
window.addEventListener('mousedown', onMouseDown, false);
window.addEventListener('mousemove', onMouseMove, false);
window.addEventListener('mouseup', onMouseUp, false);