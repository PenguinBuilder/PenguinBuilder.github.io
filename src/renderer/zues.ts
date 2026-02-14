import * as Blockly from 'blockly/core';
import { Shape } from 'blockly/core/renderers/common/constants';
const svgPaths = Blockly.utils.svgPaths;

export class ConstantProvider extends Blockly.zelos.ConstantProvider {
    TAB: Shape | null = null;
    BTAB: Shape | null = null;
    OCTOGON: Shape | null = null;
    SQUIRCLE: Shape | null = null;
    override init() {
        super.init();
        this.TAB = this.makeTAB();
        this.BTAB = this.makeBTAB();
        this.OCTOGON = this.makeOCTOGON();
        this.SQUIRCLE = this.makeSQUIRCLE();
    }

    override SHAPES = {HEXAGONAL: 1, ROUND: 2, SQUARE: 3, PUZZLE: 4, NOTCH: 5, TAB: 6, BTAB: 7, OCTOGON: 8, SQUIRCLE: 9};

    SHAPE_IN_SHAPE_PADDING: {[key: number]: {[key: number]: number}} = {
        1: {
            0: 5 * this.GRID_UNIT, 
            1: 2 * this.GRID_UNIT, 
            2: 5 * this.GRID_UNIT, 
            3: 5 * this.GRID_UNIT, 
            6: 2 * this.GRID_UNIT, 
            7: 2 * this.GRID_UNIT, 
            8: 2 * this.GRID_UNIT, 
            9: 2 * this.GRID_UNIT, 
        },
        2: {
            0: 3 * this.GRID_UNIT, 
            1: 3 * this.GRID_UNIT,
            2: 1 * this.GRID_UNIT,
            3: 2 * this.GRID_UNIT,
            6: 2 * this.GRID_UNIT,
            7: 2 * this.GRID_UNIT, 
            8: 2 * this.GRID_UNIT, 
            9: 2 * this.GRID_UNIT, 
        },
        3: {
            0: 2 * this.GRID_UNIT,
            1: 2 * this.GRID_UNIT,
            2: 2 * this.GRID_UNIT,
            3: 2 * this.GRID_UNIT,
            6: 2 * this.GRID_UNIT,
            7: 2 * this.GRID_UNIT, 
            8: 2 * this.GRID_UNIT, 
            9: 2 * this.GRID_UNIT, 
        },

        6: {
            0: 2 * this.GRID_UNIT,
            1: 2 * this.GRID_UNIT,
            2: 2 * this.GRID_UNIT,
            3: 2 * this.GRID_UNIT,
            6: 2 * this.GRID_UNIT, 
            7: 2 * this.GRID_UNIT, 
            8: 2 * this.GRID_UNIT, 
            9: 2 * this.GRID_UNIT, 
        },
        7: {
            0: 2 * this.GRID_UNIT,
            1: 2 * this.GRID_UNIT,
            2: 2 * this.GRID_UNIT,
            3: 2 * this.GRID_UNIT,
            6: 2 * this.GRID_UNIT, 
            7: 2 * this.GRID_UNIT, 
            8: 2 * this.GRID_UNIT, 
            9: 2 * this.GRID_UNIT, 
        },
        8: {
            0: 2 * this.GRID_UNIT,
            1: 2 * this.GRID_UNIT,
            2: 2 * this.GRID_UNIT,
            3: 2 * this.GRID_UNIT,
            6: 2 * this.GRID_UNIT, 
            7: 2 * this.GRID_UNIT, 
            8: 2 * this.GRID_UNIT, 
            9: 2 * this.GRID_UNIT, 
        },
        9: {
            0: 2 * this.GRID_UNIT,
            1: 2 * this.GRID_UNIT,
            2: 2 * this.GRID_UNIT,
            3: 2 * this.GRID_UNIT,
            6: 2 * this.GRID_UNIT, 
            7: 2 * this.GRID_UNIT, 
            8: 2 * this.GRID_UNIT, 
            9: 2 * this.GRID_UNIT, 
        },
    };
    protected makeTAB(): Shape {
        const maxWidth = this.MAX_DYNAMIC_CONNECTION_SHAPE_WIDTH;
        function makeMainPath(blockHeight: number, up: boolean, right: boolean) {
            const dx = right ? 1 : -1;
            const dy = up ? -1 : 1;

            const radius = blockHeight / 4;
            const straight = blockHeight - radius * 2;
            const padding = radius / 1.8;

            return (
                svgPaths.lineOnAxis('h', dx * padding)+
                    svgPaths.arc(
                        'a',
                        '0 0,' + (right ? 1 : 0),
                        radius,
                        svgPaths.point(dx * radius, dy * radius)
                ) +


                    svgPaths.lineOnAxis('v', dy * straight) +

                    svgPaths.arc(
                        'a',
                        '0 0,' + (right ? 1 : 0),
                        radius,
                        svgPaths.point(dx * -radius, dy * radius)
                )+
                    svgPaths.lineOnAxis('h', dx * -padding)
            );
        }

        return {
            type: this.SHAPES.TAB,
            isDynamic: true,
            width(height: number): number {
                const halfHeight = height / 2;
                return halfHeight > maxWidth ? maxWidth : halfHeight;
            },
            height(height: number): number {
                return height;
            },
            connectionOffsetY(connectionHeight: number): number {
                return connectionHeight / 2;
            },
            connectionOffsetX(connectionWidth: number): number {
                return -connectionWidth;
            },
            pathDown(height: number): string {
                return makeMainPath(height, false, false);
            },
            pathUp(height: number): string {
                return makeMainPath(height, true, false);
            },
            pathRightDown(height: number): string {
                return makeMainPath(height, false, true);
            },
            pathRightUp(height: number): string {
                return makeMainPath(height, false, true);
            },
        };
    }
    protected makeBTAB(): Shape {
        const maxWidth = this.MAX_DYNAMIC_CONNECTION_SHAPE_WIDTH;


        function makeMainPath(blockHeight: number, up: boolean, right: boolean) {
            const dx = right ? 1 : -1;
            const dy = up ? -1 : 1;

            const radius = blockHeight / 5;
            const straight = blockHeight - 2 * radius;
            const lip = radius;
            const padding = radius/2;

            return (
                svgPaths.lineOnAxis('h', dx * padding)+
                    svgPaths.arc(
                        'a',
                        '0 0,1',
                        radius,
                        svgPaths.point(dx * radius, dy * radius)
                ) +

                    svgPaths.lineOnAxis('h', dx * lip) +

                    svgPaths.lineOnAxis('v', dy * straight) +

                    svgPaths.lineOnAxis('h', dx * -lip) +

                    svgPaths.arc(
                        'a',
                        '0 0,1',
                        radius,
                        svgPaths.point(dx * -radius, dy * radius)
                )
            );
        }

        return {
            type: this.SHAPES.BTAB,
            isDynamic: true,
            width(height: number): number {
                const halfHeight = height / 2;
                return halfHeight > maxWidth ? maxWidth : halfHeight;
            },
            height(height: number): number {
                return height;
            },
            connectionOffsetY(connectionHeight: number): number {
                return connectionHeight / 2;
            },
            connectionOffsetX(connectionWidth: number): number {
                return -connectionWidth;
            },
            pathDown(height: number): string {
                return makeMainPath(height, false, false);
            },
            pathUp(height: number): string {
                return makeMainPath(height, true, false);
            },
            pathRightDown(height: number): string {
                return makeMainPath(height, false, true);
            },
            pathRightUp(height: number): string {
                return makeMainPath(height, false, true);
            },
        };
    }
    protected makeOCTOGON(): Shape {
        const maxWidth = this.MAX_DYNAMIC_CONNECTION_SHAPE_WIDTH;

        function makeMainPath(blockHeight: number, up: boolean, right: boolean) {
            const dx = right ? 1 : -1;
            const dy = up ? -1 : 1;

            const depth = blockHeight / 3;
            const straight = blockHeight - depth * 2;
            const padding = depth/ 1.8;

            return (
                svgPaths.lineOnAxis('h', dx * padding)+
                    svgPaths.lineTo(
                        dx * depth, dy * depth
                ) +
                    svgPaths.lineOnAxis('v', dy * straight) +
                    svgPaths.lineTo(
                        dx * -depth, dy * depth
                )+
                    svgPaths.lineOnAxis('h', dx * -padding)
            );
        }

        return {
            type: this.SHAPES.OCTOGON,
            isDynamic: true,
            width(height: number): number {
                const halfHeight = height / 2;
                return halfHeight > maxWidth ? maxWidth : halfHeight;
            },
            height(height: number): number {
                return height;
            },
            connectionOffsetY(connectionHeight: number): number {
                return connectionHeight / 2;
            },
            connectionOffsetX(connectionWidth: number): number {
                return -connectionWidth;
            },
            pathDown(height: number): string {
                return makeMainPath(height, false, false);
            },
            pathUp(height: number): string {
                return makeMainPath(height, true, false);
            },
            pathRightDown(height: number): string {
                return makeMainPath(height, false, true);
            },
            pathRightUp(height: number): string {
                return makeMainPath(height, false, true);
            },
        };
    }
    protected makeSQUIRCLE(): Shape {
        const maxWidth = this.MAX_DYNAMIC_CONNECTION_SHAPE_WIDTH;
        const radius = this.CORNER_RADIUS * Math.PI;

        function makeMainPath(height: number, up: boolean, right: boolean): string {
            const innerHeight = height - radius * 2;
            const sweep = right === up ? '0' : '1';
            const padding = radius/ 1.8;
            const dx = right ? 1 : -1;
            const dy = up ? -1 : 1;
            return (
                svgPaths.lineOnAxis('h', dx * padding)+
                    svgPaths.arc(
                        'a',
                        '0 0,' + sweep,
                        radius,
                        svgPaths.point(dx * radius, dy * radius),
                ) +
                    svgPaths.lineOnAxis('v', dy * innerHeight) +
                    svgPaths.arc(
                        'a',
                        '0 0,' + sweep,
                        radius,
                        svgPaths.point(-dx * radius, dy * radius),
                ) +
                    svgPaths.lineOnAxis('h', dx * -padding)
            );
        }

        return {
            type: this.SHAPES.SQUIRCLE,
            isDynamic: true,
            width(height: number): number {
                const halfHeight = height / 2;
                return halfHeight > maxWidth ? maxWidth : halfHeight;
            },
            height(height: number): number {
                return height;
            },
            connectionOffsetY(connectionHeight: number): number {
                return connectionHeight / 2;
            },
            connectionOffsetX(connectionWidth: number): number {
                return -connectionWidth;
            },
            pathDown(height: number): string {
                return makeMainPath(height, false, false);
            },
            pathUp(height: number): string {
                return makeMainPath(height, true, false);
            },
            pathRightDown(height: number): string {
                return makeMainPath(height, false, true);
            },
            pathRightUp(height: number): string {
                return makeMainPath(height, false, true);
            },
        };
    }

    override shapeFor(connection: Blockly.RenderedConnection): Shape {
        let checks = connection.getCheck();
        if (!checks && connection.targetConnection) {
            checks = connection.targetConnection.getCheck();
        }
        let outputShape;
        switch (connection.type) {
            case Blockly.ConnectionType.INPUT_VALUE:
                case Blockly.ConnectionType.OUTPUT_VALUE:
                outputShape = connection.getSourceBlock().getOutputShape();
            if (outputShape !== null) {
                switch (outputShape) {
                    case this.SHAPES.HEXAGONAL:
                        return this.HEXAGONAL!;
                    case this.SHAPES.ROUND:
                        return this.ROUNDED!;
                    case this.SHAPES.SQUARE:
                        return this.SQUARED!;
                    case this.SHAPES.TAB:
                        return this.TAB!;
                    case this.SHAPES.BTAB:
                        return this.BTAB!;
                    case this.SHAPES.OCTOGON:
                        return this.OCTOGON!;
                    case this.SHAPES.SQUIRCLE:
                        return this.SQUIRCLE!;
                }
            }
            if (checks && checks.includes('Boolean')) {
                return this.HEXAGONAL!;
            }
            if (checks && checks.includes('Number')) {
                return this.SQUIRCLE!;
            }
            if (checks && checks.includes('String')) {
                return this.SQUARED!;
            }
            if(checks && checks.includes('Object')) {
                return this.TAB!;
            }
            if(checks && checks.includes('Array')) {
                return this.BTAB!;
            }
            if(checks && checks.includes('Colour')) {
                return this.OCTOGON!;
            }
            return this.ROUNDED!;
            case Blockly.ConnectionType.PREVIOUS_STATEMENT:
                case Blockly.ConnectionType.NEXT_STATEMENT:
                return this.NOTCH!;
            default:
                throw Error('Unknown type');
        }
    }
}

export class Renderer extends Blockly.zelos.Renderer{
    constructor(name: string) {
        super(name);
    }
    protected override makeConstants_(): ConstantProvider {
        return new ConstantProvider();
    }
}


Blockly.blockRendering.register('zues', Renderer);
