import type { Scene } from "three";
import ShopMesh from "./shop-mesh";

export default function placeShops(scene: Scene, shops: ShopMesh[]) {
    const GAP_ANGLE = 0.05;

    let currentRadius = 15;
    let currentAngle = 0;
    let maxDepthInCurrentRing = 0;

    shops.forEach((shop) => {
        let angularWidth = shop.properties.width / currentRadius;

        if (currentAngle + angularWidth + GAP_ANGLE > (2 * Math.PI)) {
            currentRadius += maxDepthInCurrentRing + 2;
            maxDepthInCurrentRing = 0;
            currentAngle = 0;
            angularWidth = shop.properties.width / currentRadius;
        }

        const theta = currentAngle + angularWidth / 2;
        const placementRadius = currentRadius + shop.properties.depth / 2;

        shop.mesh.position.set(
            placementRadius * Math.cos(theta),
            shop.properties.height / 2,
            placementRadius * Math.sin(theta)
        );
        shop.mesh.lookAt(0, shop.properties.height / 2, 0);

        scene.add(shop.mesh);

        currentAngle += angularWidth + GAP_ANGLE;

        if (shop.properties.depth > maxDepthInCurrentRing) {
            maxDepthInCurrentRing = shop.properties.depth;
        }
    });
}
