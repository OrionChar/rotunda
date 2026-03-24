import type { Scene } from "three";
import Facility from "./facility";

export default class Mall {
    public get map(): MallMap {
        return this._map
    }


    public get properties(): MallProperty[] {
        return this._properties
    }


    public get facilities(): Facility[] {
        return this._facilities
    }


    private _map: MallMap = new Map()
    private _properties: MallProperty[]
    private _facilities: Facility[]

    constructor() {
        this._properties = this.generateMallProperties()
        this._facilities = this._properties.map(property => {
            const facility = new Facility(property)
            this._map.set(facility.mesh.id, { property, facility })
            return facility
        })
    }

    placeShops(scene: Scene) {
        const GAP_ANGLE = 0.05;

        let currentRadius = 15;
        let currentAngle = 0;
        let maxDepthInCurrentRing = 0;

        for (let index = 0; index < this._properties.length; index++) {
            const properties = this._properties[index];
            const facility = this._facilities[index]

            let angularWidth = properties.width / currentRadius;

            if (currentAngle + angularWidth + GAP_ANGLE > (2 * Math.PI)) {
                currentRadius += maxDepthInCurrentRing + 2;
                maxDepthInCurrentRing = 0;
                currentAngle = 0;
                angularWidth = properties.width / currentRadius;
            }

            const theta = currentAngle + angularWidth / 2;
            const placementRadius = currentRadius + properties.depth / 2;

            facility.mesh.position.set(
                placementRadius * Math.cos(theta),
                properties.height / 2,
                placementRadius * Math.sin(theta)
            );
            facility.mesh.lookAt(0, properties.height / 2, 0);

            scene.add(facility.mesh);

            currentAngle += angularWidth + GAP_ANGLE;

            if (properties.depth > maxDepthInCurrentRing) {
                maxDepthInCurrentRing = properties.depth;
            }
        };
    }

    private generateMallProperties(): MallProperty[] {
        const brands = ["Apple", "Zara", "H&M", "Starbucks", "Nike", "Adidas", "KFC", "McDonalds", "LG", "Samsung", "Pizza Hut", "Subway", "Burger King", "Puma", "Reebok", "Levis", "Gucci", "Prada", "Chanel", "Dior"];
        const colors = [0xffaa00, 0x00aa55, 0xaa44aa, 0x4444aa, 0xaa4444, 0x00aaaa, 0xff5500, 0x5500ff];

        const count = 100
        const height = 3;
        const properties: MallProperty[] = new Array(count);

        for (let i = 0; i < count; i++) {
            properties[i] = {
                id: `shop_${String(i + 1).padStart(3, '0')}`,
                name: `${brands[i % brands.length]} ${i + 1}`,
                width: Math.floor(Math.random() * 5) + 2,
                height: height,
                depth: Math.floor(Math.random() * 5) + 2,
                color: colors[i % colors.length]
            };
        }

        return properties
    }
}

export type MallMap = Map<number, { property: MallProperty, facility: Facility }>

export interface MallProperty {
    id: string,
    name: string,
    width: number,
    height: number,
    depth: number,
    color: number
}

