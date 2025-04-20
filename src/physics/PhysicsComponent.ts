import { Vector2D } from "../math/Vector2D.js";
import {Vector2DUtils} from "../math/Vector2DUtils.js";

class LinearMotion {
  velocity: Vector2D = { x: 0, y: 0 };
  acceleration: Vector2D = { x: 0, y: 0 };
  mass: number;
  restitution: number;
  frictionCoefficient: number;

  constructor(mass: number, restitution: number, frictionCoefficient: number = 0.0) {
    this.mass = mass;
    this.restitution = restitution;
    this.frictionCoefficient = frictionCoefficient;
  }

  update(position: Vector2D, deltaTime: number): void {
    const speed = Math.sqrt(this.velocity.x ** 2 + this.velocity.y ** 2);
    if (speed > 0) {
      const frictionMag = this.frictionCoefficient * this.mass;
      const normX = -this.velocity.x / speed;
      const normY = -this.velocity.y / speed;
      const frictionForce = { x: normX * frictionMag, y: normY * frictionMag };
      this.applyForce(frictionForce);
    }

    this.velocity.x += this.acceleration.x * deltaTime;
    this.velocity.y += this.acceleration.y * deltaTime;

    position.x += this.velocity.x * deltaTime;
    position.y += this.velocity.y * deltaTime;

    this.acceleration = { x: 0, y: 0 };
  }

  applyForce(force: Vector2D): void {
    this.acceleration.x += force.x / this.mass;
    this.acceleration.y += force.y / this.mass;
  }

  reset(): void {
    this.velocity = { x: 0, y: 0 };
    this.acceleration = { x: 0, y: 0 };
  }
}

class AngularMotion {
  rotation: number = 0;
  angularVelocity: number = 0;
  angularAcceleration: number = 0;
  momentOfInertia: number;
  angularDamping: number;

  constructor(momentOfInertia: number, angularDamping: number = 0.1) {
    this.momentOfInertia = momentOfInertia;
    this.angularDamping = angularDamping;
  }

  update(deltaTime: number): void {
    if (this.angularVelocity !== 0) {
      const dampingTorque = -this.angularVelocity * this.angularDamping * this.momentOfInertia;
      this.applyTorque(dampingTorque);
    }

    this.angularVelocity += this.angularAcceleration * deltaTime;
    this.rotation += this.angularVelocity * deltaTime;
    this.angularAcceleration = 0;
  }

  applyTorque(torque: number): void {
    this.angularAcceleration += torque / this.momentOfInertia;
  }

  reset(): void {
    this.rotation = 0;
    this.angularVelocity = 0;
    this.angularAcceleration = 0;
  }
}

export class PhysicsComponent {
  linear: LinearMotion;
  angular: AngularMotion;

  constructor(
      mass: number = 1,
      restitution: number = 1,
      momentOfInertia: number = 1,
      frictionCoefficient: number = 0.0,
      angularDamping: number = 0.0
  ) {
    this.linear = new LinearMotion(mass, restitution, frictionCoefficient);
    this.angular = new AngularMotion(momentOfInertia, angularDamping);
  }

  update(position: Vector2D, deltaTime: number): void {
    this.linear.update(position, deltaTime);
    this.angular.update(deltaTime);
  }

  applyForce(force: Vector2D): void {
    this.linear.applyForce(force);
  }

  applyTorque(torque: number): void {
    this.angular.applyTorque(torque);
  }

  applyForceAtPoint(force: Vector2D, point: Vector2D, centerOfMass : Vector2D): void {
    this.applyForce(force);
    const r = {
      x: point.x - centerOfMass.x,
      y: point.y - centerOfMass.y,
    };
    const torque = Vector2DUtils.cross(r, force);
    this.applyTorque(torque);
  }


  reset(): void {
    this.linear.reset();
    this.angular.reset();
  }

  setVelocity(velocity: Vector2D): void {
    this.linear.velocity = velocity;
  }

  setAcceleration(acceleration: Vector2D): void {
    this.linear.acceleration = acceleration;
  }

  setAngularVelocity(angularVelocity: number): void {
    this.angular.angularVelocity = angularVelocity;
  }

  setAngularAcceleration(angularAcceleration: number): void {
    this.angular.angularAcceleration = angularAcceleration;
  }

  setMass(mass: number): void {
    this.linear.mass = mass;
  }

  setRestitution(restitution: number): void {
    this.linear.restitution = restitution;
  }

  setMomentOfInertia(moi: number): void {
    this.angular.momentOfInertia = moi;
  }

  setFrictionCoefficient(coefficient: number): void {
    this.linear.frictionCoefficient = coefficient;
  }

  setAngularDamping(damping: number): void {
    this.angular.angularDamping = damping;
  }
}
