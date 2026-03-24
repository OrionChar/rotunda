import IntersectsDetector from '../engine/intersects-detector';
import type { Camera, Mesh, MeshPhongMaterial } from 'three';
import type { MallMap } from './mall';

export default function initIntersectsDetector(map: MallMap, camera: Camera) {
    const intersectsDetector = new IntersectsDetector(Array.from(map.values()).map(item => item.facility.mesh), camera)

    let currentFacility: Mesh | null = null

    intersectsDetector.addEventListener('deintersected', () => {
        if (currentFacility) {
            (currentFacility.material as MeshPhongMaterial).emissive.set(0x000000);
        }
    
        currentFacility = null;
        document.body.style.cursor = 'default';
    })
    
    intersectsDetector.addEventListener('intersected', (event) => {
        const machOfFacility: Mesh = event.detail as Mesh
    
        if (machOfFacility !== currentFacility) {
            (machOfFacility.material as MeshPhongMaterial).emissive.set(0x444444);
        }
    
        currentFacility = machOfFacility;
        document.body.style.cursor = 'pointer';
    })
    
    intersectsDetector.addEventListener('click', (event) => {
        const mashOfFacility: Mesh = event.detail as Mesh
        const selected = map.get(mashOfFacility.id)
        alert(`${selected?.property.id} ${selected?.property.name}`)
    })

    window.addEventListener('mousemove', intersectsDetector.onMousemove.bind(intersectsDetector))
	window.addEventListener('click', intersectsDetector.onClick.bind(intersectsDetector))
}