export const withPx = (x: number) => `${x}px`;
export const forSides = (y: string, z: string = `0`) => `${z} ${y}`;
export const forTopAndBottom = (y: string, z: string = `0`) => `${y} ${z}`;
export const forTop = (y: string, z: string = `0`) => `${y} ${z} ${z} ${z}`;
export const forBottom = (y: string, z: string = `0`) => `${z} ${z} ${y} ${z}`;
export const forLeft = (y: string, z: string = `0`) => `${z} ${z} ${z} ${y}`;
export const forRight = (y: string, z: string = `0`) => `${z} ${y} ${z} ${z}`;
