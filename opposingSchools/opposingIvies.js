// subdir/DerivedClass.js
// import * as THREE from '../node_modules/three';
import * as THREE from 'three';
import { GenericSphere } from './generalSphere.js';

export class YaleBullDogs extends GenericSphere {
    constructor(scene, world, position) {
        const radius = 1.2;
        const mass = 10; // Hardcoded mass

        super(scene, world, position, radius);
        const loader = new THREE.TextureLoader();
        loader.load('./yale_logo.png', (texture) => {
            this.mesh.material = new THREE.MeshBasicMaterial({ map: texture });
        });

        // Update the mass
        this.body.mass = mass;
        this.body.updateMassProperties();
    }
}

export class ColumbiaLions extends GenericSphere {
    constructor(scene, world, position) {
        const radius = 2;
        const mass = 7; // Hardcoded mass

        super(scene, world, position, radius);
        const loader = new THREE.TextureLoader();
         loader.load('./columbia_logo.png', (texture) => {
             this.mesh.material = new THREE.MeshBasicMaterial({ map: texture });
         });


        // Update the mass
        this.body.mass = mass;
        this.body.updateMassProperties();
    }
}

export class CornellBears extends GenericSphere {
    constructor(scene, world, position) {
        const radius = 3.3;
        const mass = 2;

        super(scene, world, position, radius);
        const loader = new THREE.TextureLoader();
        loader.load('./cornell_logo.png', (texture) => {
            this.mesh.material = new THREE.MeshBasicMaterial({ map: texture });
        });

        // Update the mass
        this.body.mass = mass;
        this.body.updateMassProperties();
    }
}

export class BrownBear extends GenericSphere {
    constructor(scene, world, position) {
        const radius = 3.3;
        const mass = 2;

        super(scene, world, position, radius);
        const loader = new THREE.TextureLoader();
        loader.load('./brown_logo.png', (texture) => {
            this.mesh.material = new THREE.MeshBasicMaterial({ map: texture });
        });

        // Update the mass
        this.body.mass = mass;
        this.body.updateMassProperties();
    }
}

export class DartmouthD extends GenericSphere {
    constructor(scene, world, position) {
        const radius = 3.3;
        const mass = 2;

        super(scene, world, position, radius);
        const loader = new THREE.TextureLoader();

        loader.load('./dart_logo.png', (texture) => {
            this.mesh.material = new THREE.MeshBasicMaterial({ map: texture });
        });

        // Update the mass
        this.body.mass = mass;
        this.body.updateMassProperties();
    }
}

export class UPennQuaker extends GenericSphere {
    constructor(scene, world, position) {
        const radius = 3.3;
        const mass = 2;

        super(scene, world, position, radius);
        const loader = new THREE.TextureLoader();

        loader.load('./upenn_logo.png', (texture) => {
            this.mesh.material = new THREE.MeshBasicMaterial({ map: texture });
        });

        // Update the mass
        this.body.mass = mass;
        this.body.updateMassProperties();
    }
}


