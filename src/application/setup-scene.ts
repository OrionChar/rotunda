import { Scene, Color, AmbientLight, DirectionalLight, PlaneGeometry, MeshStandardMaterial, Mesh, GridHelper } from 'three';

export default function setupScene() {
    const scene = new Scene();
    scene.background = new Color(0xf0f0f0);

    scene.add(buildAmbientLight());
    scene.add(buildDirectionalLight());
    scene.add(buildFloor());
    scene.add(buildGrid());

    return scene
}


function buildAmbientLight() {
    return new AmbientLight(0xffffff, 0.6);
}

function buildDirectionalLight() {
    const light = new DirectionalLight(0xffffff, 0.8);
    light.position.set(50, 100, 50);
    light.castShadow = true;
    light.shadow.mapSize.width = 2048;
    light.shadow.mapSize.height = 2048;

    return light
}

function buildFloor() {
    const floorGeometry = new PlaneGeometry(200, 200);
    const floorMaterial = new MeshStandardMaterial({ color: 0xeeeeee });
    const floor = new Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;

    return floor
}

function buildGrid() {
    return new GridHelper(200, 20, 0xcccccc, 0xdddddd);
}