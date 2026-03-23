import { CSS2DObject } from "three/examples/jsm/Addons.js";
import type { ShopProperties } from "./shops";
import { BoxGeometry, MeshStandardMaterial, Mesh } from 'three';

export default class ShopMesh {
    readonly properties: ShopProperties
    readonly mesh: Mesh;

    constructor(shopProperties: ShopProperties) {
        const geometry = new BoxGeometry(shopProperties.width, shopProperties.height, shopProperties.depth);
        const material = new MeshStandardMaterial({ color: shopProperties.color, roughness: 0.5 });

        this.properties = shopProperties
        this.mesh = new Mesh(geometry, material);
        this.mesh.castShadow = true;
        this.mesh.receiveShadow = true;

        this.label = this.buildLabel(shopProperties.name)
        this.label.position.set(0, shopProperties.height / 2 + 0.5, 0);
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