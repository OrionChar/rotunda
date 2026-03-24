import { Camera, OrthographicCamera, WebGLRenderer } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default class View {
    public get activeCamera(): Camera {
        return this._camera
    }

    public get orbit(): OrbitControls {
        return this._orbit
    }


    public get is3DMode(): boolean {
        return this._is3DMode
    }


    constructor(renderer: WebGLRenderer) {
        this._camera = this.buildOrthographicCamera()
        this._camera.position.set(50, 80, 100);
        this._camera.lookAt(0, 0, 0);

        this._isTransiting = false
        this._orbit = this.build3DController(this._camera, renderer)

        this._is3DMode = true
    }

    private _isTransiting: boolean;
    private _camera: OrthographicCamera
    private _orbit: OrbitControls
    private _frustumSize = 100;
    private _is3DMode: boolean

    toggleView() {
        if (this._isTransiting) return;

        this._isTransiting = true;

        const initialPosition = {
            x: this._camera.position.x,
            y: this._camera.position.y,
            z: this._camera.position.z
        };

        const destinationPosition = this._is3DMode
            ? { x: 0, y: 100, z: 0.3 }
            : { x: 50, y: 80, z: 100 };

        const duration = 1000;
        const startTime = performance.now();

        const animateCamera = (time: number) => {
            const elapsed = time - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easing = 1 - Math.pow(1 - progress, 3); // ease out cubic

            this._camera.position.x = initialPosition.x + (destinationPosition.x - initialPosition.x) * easing;
            this._camera.position.y = initialPosition.y + (destinationPosition.y - initialPosition.y) * easing;
            this._camera.position.z = initialPosition.z + (destinationPosition.z - initialPosition.z) * easing;

            this._orbit.update();

            if (progress < 1) {
                requestAnimationFrame(animateCamera);
                return
            }

            if (this._is3DMode) {
                this.orbit.enableRotate = false
            } else {
                this.orbit.enableRotate = true
            }

            this._isTransiting = false;
            this._is3DMode = !this._is3DMode
        };

        requestAnimationFrame(animateCamera);
    }

    recalculateCameraProjection(width: number, height: number) {
        const aspect = width / height;

        this._camera.left = -this._frustumSize * aspect;
        this._camera.right = this._frustumSize * aspect;
        this._camera.top = this._frustumSize;
        this._camera.bottom = -this._frustumSize;
        this._camera.updateProjectionMatrix();
    }

    private buildOrthographicCamera() {
        const aspect = window.innerWidth / window.innerHeight;

        return new OrthographicCamera(
            this._frustumSize * aspect / -2,
            this._frustumSize * aspect / 2,
            this._frustumSize / 2,
            this._frustumSize / -2,
            0.1, 1000
        );
    }

    private build3DController(camera: Camera, renderer: WebGLRenderer) {
        const controls3D = new OrbitControls(camera, renderer.domElement);
        controls3D.enableDamping = true;
        controls3D.dampingFactor = 0.05;
        controls3D.maxPolarAngle = Math.PI / 2.8;
        controls3D.maxZoom = 2
        controls3D.minZoom = 1

        return controls3D
    }
}