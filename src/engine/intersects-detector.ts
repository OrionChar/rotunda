import { Raycaster, Mesh, Vector2, Camera, Object3D, type Object3DEventMap } from "three";
import { TypedEventTarget } from './typed-event-target';

type IntersectsDetectorEvents = {
  'intersected': Object3D<Object3DEventMap>;
  'deintersected': null;
  'click': Object3D<Object3DEventMap>;
};

export default class IntersectsDetector extends TypedEventTarget<IntersectsDetectorEvents> {
    private raycaster = new Raycaster()
    private objects: Mesh[]
    private camera: Camera
    private currentObject: Object3D | null = null;

    constructor(objects: Mesh[], camera: Camera) {
        super()
        this.objects = objects
        this.camera = camera
    }

    onMousemove(event: MouseEvent) {
        const mouseCoordinates = this.transformDOMCoordinatesToNDC(event.clientX, event.clientY)
        const intersects = this.getIntersects(mouseCoordinates)

        if (intersects.length === 0) {
            if (this.currentObject !== null) {
                this.currentObject = null
                this.dispatchEvent('deintersected', null)
            }

            return
        }

        if (this.currentObject !== null) {
            this.dispatchEvent('deintersected', null)
        }

        this.currentObject = intersects[intersects.length - 1].object
        this.dispatchEvent('intersected', this.currentObject)
    }

    onClick() {
        if (this.currentObject) {
            this.dispatchEvent('click', this.currentObject)
        }
    }

    private getIntersects(coordinates: Vector2) {
        this.raycaster.setFromCamera(coordinates, this.camera);
        return this.raycaster.intersectObjects(this.objects);
    }

    private transformDOMCoordinatesToNDC(clientX: number, clientY: number) {
        return new Vector2((clientX / window.innerWidth) * 2 - 1, -(clientY / window.innerHeight) * 2 + 1)
    }
}