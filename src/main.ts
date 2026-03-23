import * as THREE from 'three';

import SHOPS, { type ShopProperties } from './shops';

import initEngine from './init-engine';
import ShopMesh from './shop-mesh';
import placeShops from './generate-shops';
import IntersectsDetector from './intersects-detector';
import type { MeshPhongMaterial } from 'three';

const { scene, view, renderer } = initEngine(document.getElementById('app') as HTMLElement,)

const shopMeshes = generateMesh(SHOPS)
placeShops(scene, Array.from(shopMeshes.values()))
const intersectsDetector = new IntersectsDetector(Array.from(shopMeshes.values()).map(shop => shop.mesh), view.activeCamera)

setupEvents()

let currentShop: THREE.Mesh | null = null

intersectsDetector.addEventListener('deintersected', () => {
	if (currentShop) {
		(currentShop.material as MeshPhongMaterial).emissive.set(0x000000);
	}

	currentShop = null;
	document.body.style.cursor = 'default';
})

intersectsDetector.addEventListener('intersected', (event) => {
	const shop: THREE.Mesh = event.detail as THREE.Mesh

	if (shop !== currentShop) {
		(shop.material as MeshPhongMaterial).emissive.set(0x444444);
	}

	currentShop = shop;
	document.body.style.cursor = 'pointer';
})

intersectsDetector.addEventListener('click', (event) => {
	const shop: THREE.Mesh = event.detail as THREE.Mesh
	alert(shopMeshes.get(shop.id)?.properties.name)
})


function generateMesh(shops: ShopProperties[]): Map<number, ShopMesh> {
	const result = new Map()

	shops.forEach((shop) => {
		const mesh = new ShopMesh(shop)
		result.set(mesh.mesh.id, mesh)
	})

	return result
}

function setupEvents() {
	window.addEventListener('mousemove', intersectsDetector.onMousemove.bind(intersectsDetector))
	window.addEventListener('click', intersectsDetector.onClick.bind(intersectsDetector))
	window.addEventListener('resize', onWindowResize);

	const toggle = document.getElementById('3d-toggle') as HTMLInputElement;
	toggle.addEventListener('change', () => {
		view.toggleView()
	});

	window.addEventListener('keydown', (e) => {
		if (e.code === 'Space') {
			toggle.checked = !view.is3DMode
			view.toggleView();
		}
	});
}

function onWindowResize() {
	const width = window.innerWidth;
	const height = window.innerHeight;

	view.recalculateCameraProjection(width, height)
	renderer.WebGL.setSize(width, height);
	renderer.CSS2D.setSize(width, height);
}