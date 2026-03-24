
import initEngine from './init-engine';
import Mall from './application/mall';
import initIntersectsDetector from './application/init-intersects-detector';

const { scene, view, renderer } = initEngine(document.getElementById('app') as HTMLElement,)

const mall = new Mall()
mall.placeShops(scene)
initIntersectsDetector(mall.map, view.activeCamera)
setupEvents()

function setupEvents() {
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