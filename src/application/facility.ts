import { CSS2DObject } from "three/examples/jsm/Addons.js";
import type { MallProperty } from "./mall";
import { BoxGeometry, MeshPhongMaterial, Mesh } from 'three';

export default class Facility {
    readonly mesh: Mesh;

    constructor(mallProperty: MallProperty) {
        const geometry = new BoxGeometry(mallProperty.width, mallProperty.height, mallProperty.depth);
        const material = new MeshPhongMaterial({ color: mallProperty.color });

        this.mesh = new Mesh(geometry, material);
        this.mesh.castShadow = true;
        this.mesh.receiveShadow = true;

        this.label = this.buildLabel(mallProperty.name)
        this.label.position.set(0, mallProperty.height / 2 + 0.5, 0);
        this.mesh.add(this.label);
    }
    
    private label: CSS2DObject;

    private buildLabel(label: string) {
        const div = document.createElement('div');
        div.className = 'label';
        div.textContent = label;
        return new CSS2DObject(div);
    }
}