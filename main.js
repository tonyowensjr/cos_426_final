import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );


const renderer = new THREE.WebGLRenderer();

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