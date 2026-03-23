import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { CSS2DRenderer } from 'three/addons/renderers/CSS2DRenderer.js';
import View from './view';
import setupScene from './setup-scene';
import Renderer from './renderer';

export default function initEngine(root: HTMLElement) {
    const renderer = new Renderer()

    root.appendChild(renderer.WebGL.domElement);
    root.appendChild(renderer.CSS2D.domElement);

    const view = new View(renderer.WebGL)
    const scene = setupScene()

    animate(renderer.WebGL, renderer.CSS2D, scene, view.activeCamera, view.orbit)

    return { scene, view, renderer }
}


function animate(
    renderer: THREE.WebGLRenderer,
    labelRenderer: CSS2DRenderer,
    scene: THREE.Scene,
    camera: THREE.Camera,
    orbit: OrbitControls
) {
    requestAnimationFrame(() => animate(renderer, labelRenderer, scene, camera, orbit));
    orbit.update();
    renderer.render(scene, camera);
    labelRenderer.render(scene, camera);
}


