// subdir/DerivedClass.js
import * as THREE from 'three';
import { GenericSphere } from './generalSphere.js';

export class YaleBullDogs extends GenericSphere {
    constructor(scene, world, position) {
        const radius = 1.2;
        const mass = 10; // Hardcoded mass

        super(scene, world, position, radius);
        const loader = new THREE.TextureLoader();
        loader.load('school_logos/yale_logo.png', (texture) => {
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
         loader.load('school_logos/columbia_logo.png', (texture) => {
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
        loader.load('school_logos/cornell_logo.png', (texture) => {
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
        loader.load('school_logos/brown_logo.png', (texture) => {
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

        loader.load('school_logos/dart_logo.png', (texture) => {
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

        loader.load('school_logos/upenn_logo.png', (texture) => {
            this.mesh.material = new THREE.MeshBasicMaterial({ map: texture });
        });

        // Update the mass
        this.body.mass = mass;
        this.body.updateMassProperties();
    }
}


