import { SATCollision } from "./SATCollision";
import {CollisionBox} from "./CollisionBox";
import {RectangleCollisionBox} from "./RectangleCollisionBox";
import {EllipseCollisionBox} from "./EllipseCollisionBox";
import {Vector2D, Vector2DUtils} from "../math";

export class CollisionManager {
    static checkCollision(a: CollisionBox, b: CollisionBox): boolean {
        if (a instanceof RectangleCollisionBox && b instanceof RectangleCollisionBox) {
            return CollisionManager.checkSATBetweenRects(a, b);
        }

        if (a instanceof EllipseCollisionBox && b instanceof RectangleCollisionBox) {
            return CollisionManager.checkEllipseRectCollision(a, b);
        }

        if (a instanceof RectangleCollisionBox && b instanceof EllipseCollisionBox) {
            return CollisionManager.checkEllipseRectCollision(b, a);
        }

        if (a instanceof EllipseCollisionBox && b instanceof EllipseCollisionBox) {
            return CollisionManager.checkEllipseEllipseCollision(a, b);
        }

        return a.collidesWith(b);
    }

    static checkSATBetweenRects(a: RectangleCollisionBox, b: RectangleCollisionBox): boolean {
        const aCorners = a.getCorners();
        const bCorners = b.getCorners();
        return SATCollision.testPolygons(aCorners, bCorners);
    }

    static checkEllipseRectCollision(ellipse: EllipseCollisionBox, rect: RectangleCollisionBox): boolean {
        const rectCorners = rect.getCorners();
        const ellipseApprox = CollisionManager.approximateEllipseAsPolygon(ellipse, 16);
        return SATCollision.testPolygons(ellipseApprox, rectCorners);
    }

    static checkEllipseEllipseCollision(a: EllipseCollisionBox, b: EllipseCollisionBox): boolean {
        const aApprox = CollisionManager.approximateEllipseAsPolygon(a, 16);
        const bApprox = CollisionManager.approximateEllipseAsPolygon(b, 16);
        return SATCollision.testPolygons(aApprox, bApprox);
    }

    static approximateEllipseAsPolygon(ellipse: EllipseCollisionBox, segments: number): Vector2D[] {
        const points: Vector2D[] = [];
        for (let i = 0; i < segments; i++) {
            const theta = (i / segments) * 2 * Math.PI;
            const x = ellipse.radiusX * Math.cos(theta);
            const y = ellipse.radiusY * Math.sin(theta);
            const rotated = Vector2DUtils.rotate({ x, y }, ellipse.transform.rotation);
            points.push(Vector2DUtils.add(rotated, ellipse.transform.position));
        }
        return points;
    }
}
