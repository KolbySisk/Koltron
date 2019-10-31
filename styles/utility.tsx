import { Constant } from './constant';

export const withPx = (x: number) => `${x}px`;

export const forSides = (y: string | number, z: string | number = `0`) => `${z} ${y}`;

export const forTopAndBottom = (y: string | number, z: string | number = `0`) => `${y} ${z}`;

export const forTopAndRight = (y: string | number, z: string | number = `0`) =>
  `${y} ${y} ${z} ${z}`;

export const forBottomAndLeft = (y: string | number, z: string | number = `0`) =>
  `${z} ${z} ${y} ${y}`;

export const forTopLeftRight = (y: string | number, z: string | number = `0`) =>
  `${y} ${y} ${z} ${y}`;

export const spaced = (multiplyer: number) => Constant.baseSpacing * multiplyer;
