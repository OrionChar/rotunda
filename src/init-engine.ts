import type { Camera, Scene, WebGLRenderer } from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { CSS2DRenderer } from 'three/addons/renderers/CSS2DRenderer.js';
import View from './engine/view';
import Renderer from './engine/renderer';
import setupScene from './application/setup-scene';

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
    renderer: WebGLRenderer,
    labelRenderer: CSS2DRenderer,
    scene: Scene,
    camera: Camera,
    orbit: OrbitControls
) {
    requestAnimationFrame(() => animate(renderer, labelRenderer, scene, camera, orbit));
    orbit.update();
    renderer.render(scene, camera);
    labelRenderer.render(scene, camera);
}


