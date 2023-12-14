import * as THREE from '/three';
import * as CANNON from '/cannon';

export class GenericSphere {
    constructor(scene, world, position = new THREE.Vector3(), radius = 1) {
        // Three.js mesh
        this.geometry = new THREE.SphereGeometry(radius, 32, 32);
        this.material = new THREE.MeshBasicMaterial({ color: 0x000000 });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.position.copy(position);
        scene.add(this.mesh);

        // Cannon.js physics body
        const shape = new CANNON.Sphere(radius);
        this.body = new CANNON.Body({
            mass: 5, // Set mass > 0 for dynamic bodies
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