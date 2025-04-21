import { Vector2D } from "../math";

export interface CanvasEllipseProps {
    position: Vector2D;      // Center of the ellipse
    radiusX: number;         // Horizontal radius
    radiusY: number;         // Vertical radius
    rotation?: number;       // in radians, optional
    color?: string;          // fill color
    strokeColor?: string;    // optional stroke color
    strokeWidth?: number;    // optional stroke width
    opacity?: number;        // 0 to 1
}
