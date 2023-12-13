// subdir/DerivedClass.js
import { GenericSphere } from './generalSphere.js';

export class YaleBullDogs extends GenericSphere {
    constructor(scene, world, position) {
        const radius = 1.2;
        const mass = 10; // Hardcoded mass

        super(scene, world, position, radius);

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

        // Update the mass
        this.body.mass = mass;
        this.body.updateMassProperties();
    }
}
