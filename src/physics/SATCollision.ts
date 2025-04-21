import {Vector2D, Vector2DUtils} from "../math";

export class SATCollision {
    static projectPolygon(axis: Vector2D, points: Vector2D[]): { min: number; max: number } {
        let min = Vector2DUtils.dot(axis, points[0]);
        let max = min;
        for (let i = 1; i < points.length; i++) {
            const projection = Vector2DUtils.dot(axis, points[i]);
            if (projection < min) min = projection;
            if (projection > max) max = projection;
        }
        return { min, max };
    }

    static overlap(projA: { min: number; max: number }, projB: { min: number; max: number }): boolean {
        return projA.max >= projB.min && projB.max >= projA.min;
    }

    static testPolygons(pointsA: Vector2D[], pointsB: Vector2D[]): boolean {
        const getAxes = (points: Vector2D[]): Vector2D[] => {
            const axes: Vector2D[] = [];
            for (let i = 0; i < points.length; i++) {
                const p1 = points[i];
                const p2 = points[(i + 1) % points.length];
                const edge = Vector2DUtils.subtract(p2, p1);
                const normal = { x: -edge.y, y: edge.x }; // Perpendicular
                axes.push(Vector2DUtils.normalize(normal));
            }
            return axes;
        };

        const axes = [...getAxes(pointsA), ...getAxes(pointsB)];
        for (const axis of axes) {
            const projA = SATCollision.projectPolygon(axis, pointsA);
            const projB = SATCollision.projectPolygon(axis, pointsB);
            if (!SATCollision.overlap(projA, projB)) return false;
        }

        return true;
    }
}
