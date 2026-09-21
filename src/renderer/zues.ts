// TASK(20260215-185953-428-n6-088): add more output shapes, and the ability for extensions to use output shapes

// TASK(20260512-122420-281-n6-749): fix bugs in the renderer

import * as Blockly from 'blockly/core';
import { Shape } from 'blockly/core/renderers/common/constants';

const svgPaths = Blockly.utils.svgPaths;

import DATA from '@/DATA';

export class ConstantProvider extends Blockly.zelos.ConstantProvider {
    TAB: Shape | null = null;
    BTAB: Shape | null = null;
    OCTOGON: Shape | null = null;
    SQUIRCLE: Shape | null = null;
    LEAF: Shape | null = null;

    override init() {
        super.init();

        this.TAB = this.makeTAB();
        this.BTAB = this.makeBTAB();
        this.OCTOGON = this.makeOCTOGON();
        this.SQUIRCLE = this.makeSQUIRCLE();
        this.LEAF = this.makeLEAF();
    }

    static SHAPES = {
        HEXAGONAL: 1,
        ROUND: 2,
        SQUARE: 3,
        PUZZLE: 4,
        NOTCH: 5,
        TAB: 6,
        BTAB: 7,
        OCTOGON: 8,
        SQUIRCLE: 9,
        LEAF: 10,
    };

    override SHAPES = ConstantProvider.SHAPES;

    /*
     * Padding used when one connection shape is nested inside another.
     *
     * The important part here is that every custom shape gets a sensible
     * padding value rather than relying on Blockly's built-in shape table.
     */
    SHAPE_IN_SHAPE_PADDING: {
        [key: number]: { [key: number]: number };
    } = {
            1: {
                0: 5 * this.GRID_UNIT,
                1: 2 * this.GRID_UNIT,
                2: 5 * this.GRID_UNIT,
                3: 5 * this.GRID_UNIT,
                6: 2 * this.GRID_UNIT,
                7: 2 * this.GRID_UNIT,
                8: 2 * this.GRID_UNIT,
                9: 2 * this.GRID_UNIT,
                10: 3 * this.GRID_UNIT,
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
                10: 3 * this.GRID_UNIT,
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
                10: 3 * this.GRID_UNIT,
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
                10: 3 * this.GRID_UNIT,
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
                10: 3 * this.GRID_UNIT,
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
                10: 3 * this.GRID_UNIT,
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
                10: 3 * this.GRID_UNIT,
            },

            10: {
                0: 4 * this.GRID_UNIT,
                1: 4 * this.GRID_UNIT,
                2: 4 * this.GRID_UNIT,
                3: 4 * this.GRID_UNIT,
                6: 4 * this.GRID_UNIT,
                7: 4 * this.GRID_UNIT,
                8: 4 * this.GRID_UNIT,
                9: 4 * this.GRID_UNIT,
                10: 4 * this.GRID_UNIT,
            },
        };



    /**
     * Clamp a connection height to something usable by our geometry.
     *
     * Blockly supplies the connection height. The path must never create
     * negative lengths or negative radii from that value.
     */
    private normalizeHeight(height: number): number {
        return Math.max(1, height);
    }

    /**
     * Return the maximum width Blockly allows for dynamic connection shapes.
     */
    private maxShapeWidth(): number {
        return this.MAX_DYNAMIC_CONNECTION_SHAPE_WIDTH;
    }

    /**
     * Build a dynamic shape.
     *
     * The important rule is:
     *
     *     width(height) === actual horizontal extent of path(height)
     *
     * The old renderer calculated width independently from the path, which
     * meant Blockly could lay out a connection smaller than the SVG geometry.
     */
    private makeDynamicShape(
        type: number,
        width: (height: number) => number,
        pathDown: (height: number) => string,
        pathUp: (height: number) => string,
        pathRightDown: (height: number) => string,
        pathRightUp: (height: number) => string,
    ): Shape {
        return {
            type,
            isDynamic: true,

            width: (height: number): number => {
                return width(this.normalizeHeight(height));
            },

            height: (height: number): number => {
                return this.normalizeHeight(height);
            },

            /*
             * Value connections are centered vertically.
             *
             * This matches the dynamic-shape contract used by Blockly.
             */
            connectionOffsetY: (connectionHeight: number): number => {
                return this.normalizeHeight(connectionHeight) / 2;
            },

            /*
             * The custom shapes occupy the connection's width toward the
             * block. Blockly therefore needs to offset the connection by
             * the supplied width.
             */
            connectionOffsetX: (connectionWidth: number): number => {
                return -connectionWidth;
            },

            pathDown,
            pathUp,
            pathRightDown,
            pathRightUp,
        };
    }

    protected makeTAB(): Shape {
        const maxWidth = this.maxShapeWidth();

        /*
         * Original design:
         *
         *   radius = height / 4
         *   padding = radius / 1.8
         *
         * The actual horizontal extent is:
         *
         *   padding + radius
         *
         * Rather than claiming height / 2, calculate the radius so that the
         * path itself can never exceed maxWidth.
         */
        function geometry(height: number) {
            const radiusFromHeight = height / 4;
            const radiusFromWidth = maxWidth / (1 + 1 / 1.8);

            const radius = Math.min(
                radiusFromHeight,
                radiusFromWidth,
            );

            const padding = radius / 1.8;

            /*
             * Keep the vertical arcs valid.
             */
            const straight = Math.max(0, height - radius * 2);

            return {
                radius,
                padding,
                straight,
                width: padding + radius,
            };
        }

        function makeMainPath(
            height: number,
            up: boolean,
            right: boolean,
        ): string {
            const { radius, padding, straight } = geometry(height);

            const dx = right ? 1 : -1;
            const dy = up ? -1 : 1;

            return (
                svgPaths.lineOnAxis('h', dx * padding) +

                svgPaths.arc(
                    'a',
                    '0 0,' + (right ? 1 : 0),
                    radius,
                    svgPaths.point(
                        dx * radius,
                        dy * radius,
                    ),
                ) +

                svgPaths.lineOnAxis(
                    'v',
                    dy * straight,
                ) +

                svgPaths.arc(
                    'a',
                    '0 0,' + (right ? 1 : 0),
                    radius,
                    svgPaths.point(
                        dx * -radius,
                        dy * radius,
                    ),
                ) +

                svgPaths.lineOnAxis(
                    'h',
                    dx * -padding,
                )
            );
        }

        return this.makeDynamicShape(
            this.SHAPES.TAB,

            (height) => geometry(height).width,

            (height) => makeMainPath(height, false, false),
            (height) => makeMainPath(height, true, false),
            (height) => makeMainPath(height, false, true),
            (height) => makeMainPath(height, true, true),
        );
    }

    protected makeBTAB(): Shape {
        const maxWidth = this.maxShapeWidth();

        /*
         * Original design:
         *
         *   radius = height / 5
         *   lip = radius
         *   padding = radius / 2
         *
         * Total width:
         *
         *   padding + radius + lip
         *   = 2.5 * radius
         *
         * So radius is capped from the actual geometry rather than simply
         * returning height / 2.
         */
        function geometry(height: number) {
            const radiusFromHeight = height / 5;
            const radiusFromWidth = maxWidth / 2.5;

            const radius = Math.min(
                radiusFromHeight,
                radiusFromWidth,
            );

            const lip = radius;
            const padding = radius / 2;
            const straight = Math.max(0, height - 2 * radius);

            return {
                radius,
                lip,
                padding,
                straight,
                width: padding + radius + lip,
            };
        }

        function makeMainPath(
            height: number,
            up: boolean,
            right: boolean,
        ): string {
            const {
                radius,
                lip,
                padding,
                straight,
            } = geometry(height);

            const dx = right ? 1 : -1;
            const dy = up ? -1 : 1;

            return (
                svgPaths.lineOnAxis(
                    'h',
                    dx * padding,
                ) +

                svgPaths.arc(
                    'a',
                    '0 0,1',
                    radius,
                    svgPaths.point(
                        dx * radius,
                        dy * radius,
                    ),
                ) +

                svgPaths.lineOnAxis(
                    'h',
                    dx * lip,
                ) +

                svgPaths.lineOnAxis(
                    'v',
                    dy * straight,
                ) +

                svgPaths.lineOnAxis(
                    'h',
                    dx * -lip,
                ) +

                svgPaths.arc(
                    'a',
                    '0 0,1',
                    radius,
                    svgPaths.point(
                        dx * -radius,
                        dy * radius,
                    ),
                ) +

                /*
                 * Return all the way to x = 0.
                 *
                 * The old version stopped at the padding point, which made
                 * the declared connection width and actual path disagree.
                 */
                svgPaths.lineOnAxis(
                    'h',
                    dx * -padding,
                )
            );
        }

        return this.makeDynamicShape(
            this.SHAPES.BTAB,

            (height) => geometry(height).width,

            (height) => makeMainPath(height, false, false),
            (height) => makeMainPath(height, true, false),
            (height) => makeMainPath(height, false, true),
            (height) => makeMainPath(height, true, true),
        );
    }

    protected makeOCTOGON(): Shape {
        const maxWidth = this.maxShapeWidth();

        /*
         * Original design:
         *
         *   depth = height / 3
         *   padding = depth / 1.8
         *
         * Actual horizontal extent:
         *
         *   depth + padding
         *
         * which is slightly larger than height / 2.
         */
        function geometry(height: number) {
            const depthFromHeight = height / 3;
            const depthFromWidth = maxWidth / (1 + 1 / 1.8);

            const depth = Math.min(
                depthFromHeight,
                depthFromWidth,
            );

            const padding = depth / 1.8;
            const straight = Math.max(
                0,
                height - depth * 2,
            );

            return {
                depth,
                padding,
                straight,
                width: depth + padding,
            };
        }

        function makeMainPath(
            height: number,
            up: boolean,
            right: boolean,
        ): string {
            const {
                depth,
                padding,
                straight,
            } = geometry(height);

            const dx = right ? 1 : -1;
            const dy = up ? -1 : 1;

            return (
                svgPaths.lineOnAxis(
                    'h',
                    dx * padding,
                ) +

                svgPaths.lineTo(
                    dx * depth,
                    dy * depth,
                ) +

                svgPaths.lineOnAxis(
                    'v',
                    dy * straight,
                ) +

                svgPaths.lineTo(
                    dx * -depth,
                    dy * depth,
                ) +

                svgPaths.lineOnAxis(
                    'h',
                    dx * -padding,
                )
            );
        }

        return this.makeDynamicShape(
            this.SHAPES.OCTOGON,

            (height) => geometry(height).width,

            (height) => makeMainPath(height, false, false),
            (height) => makeMainPath(height, true, false),
            (height) => makeMainPath(height, false, true),
            (height) => makeMainPath(height, true, true),
        );
    }

    protected makeSQUIRCLE(): Shape {
        const maxWidth = this.maxShapeWidth();

        /*
         * The old code multiplied CORNER_RADIUS by Math.PI.
         *
         * That made the corner radius much larger than Blockly's normal
         * connection geometry expects and could make:
         *
         *     height - radius * 2
         *
         * negative.
         *
         * Use CORNER_RADIUS itself as the base radius, then clamp it against
         * both the available height and Blockly's maximum dynamic width.
         */
        function geometry(height: number) {
            const maxRadiusFromHeight = height / 2;
            const maxRadiusFromWidth =
                maxWidth / (1 + 1 / 1.8);

            const radius = Math.min(
                thisRadius(),
                maxRadiusFromHeight,
                maxRadiusFromWidth,
            );

            const padding = radius / 1.8;
            const innerHeight = Math.max(
                0,
                height - radius * 2,
            );

            return {
                radius,
                padding,
                innerHeight,
                width: radius + padding,
            };
        }

        const thisRadius = () => this.CORNER_RADIUS;

        function makeMainPath(
            this: any,
            height: number,
            up: boolean,
            right: boolean,
        ): string {
            const {
                radius,
                padding,
                innerHeight,
            } = geometry.call(this, height);

            const dx = right ? 1 : -1;
            const dy = up ? -1 : 1;

            /*
             * The sweep is kept from the original design.
             */
            const sweep = right === up ? '0' : '1';

            return (
                svgPaths.lineOnAxis(
                    'h',
                    dx * padding,
                ) +

                svgPaths.arc(
                    'a',
                    '0 0,' + sweep,
                    radius,
                    svgPaths.point(
                        dx * radius,
                        dy * radius,
                    ),
                ) +

                svgPaths.lineOnAxis(
                    'v',
                    dy * innerHeight,
                ) +

                svgPaths.arc(
                    'a',
                    '0 0,' + sweep,
                    radius,
                    svgPaths.point(
                        -dx * radius,
                        dy * radius,
                    ),
                ) +

                svgPaths.lineOnAxis(
                    'h',
                    dx * -padding,
                )
            );
        }

        return this.makeDynamicShape(
            this.SHAPES.SQUIRCLE,

            (height) => geometry.call(this, height).width,

            (height) => makeMainPath.call(this, height, false, false),
            (height) => makeMainPath.call(this, height, true, false),
            (height) => makeMainPath.call(this, height, false, true),
            (height) => makeMainPath.call(this, height, true, true),
        );
    }

    //TASK(20260921-162353-227-n6-126): make leaf less buggy
    protected makeLEAF(): Shape {
        const maxWidth = this.MAX_DYNAMIC_CONNECTION_SHAPE_WIDTH;
        const cornerRadius = this.CORNER_RADIUS;

        // Leave enough room for the leaf to be nested inside
        // other value shapes.
        const leafWidth = maxWidth * 0.72;

        function geometry(height: number) {
            const radius = Math.min(
                height / 2,
                leafWidth,
            );

            const remainingHeight = Math.max(
                0,
                height - radius * 2,
            );

            const actualCornerRadius = Math.min(
                cornerRadius,
                radius,
                remainingHeight,
            );

            return {
                radius,
                remainingHeight,
                cornerRadius: actualCornerRadius,
                width: radius,
            };
        }

        function makeMainPath(
            height: number,
            up: boolean,
            right: boolean,
        ): string {
            const {
                radius,
                remainingHeight,
                cornerRadius,
            } = geometry(height);

            const dy = up ? -1 : 1;
            const dx = right ? 1 : -1;

            return (
                svgPaths.arc(
                    'a',
                    '0 0,1',
                    radius,
                    svgPaths.point(
                        dy * radius,
                        dy * radius,
                    ),
                ) +

                svgPaths.lineOnAxis(
                    'v',
                    dy * (
                        remainingHeight +
                        radius -
                        cornerRadius
                    ),
                ) +

                svgPaths.arc(
                    'a',
                    '0 0,1',
                    cornerRadius,
                    svgPaths.point(
                        -dy * cornerRadius,
                        dy * cornerRadius,
                    ),
                ) +

                svgPaths.lineOnAxis(
                    'h',
                    -dx * (
                        radius -
                        cornerRadius
                    ),
                )
            );
        }

        return this.makeDynamicShape(
            this.SHAPES.LEAF,

            (height) => geometry(height).width,

            (height) => makeMainPath(height, false, false),
            (height) => makeMainPath(height, true, false),
            (height) => makeMainPath(height, false, true),
            (height) => makeMainPath(height, true, true),
        );
    }
    getShape(shape: number): Shape | null {
        switch (shape) {
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

            case this.SHAPES.LEAF:
                return this.LEAF!;

            default:
                return null;
        }
    }

    override shapeFor(
        connection: Blockly.RenderedConnection,
    ): Shape {
        let checks = connection.getCheck();

        if (!checks && connection.targetConnection) {
            checks = connection.targetConnection.getCheck();
        }

        let outputShape;

        switch (connection.type) {
            case Blockly.ConnectionType.INPUT_VALUE:
            case Blockly.ConnectionType.OUTPUT_VALUE:
                outputShape =
                    connection.getSourceBlock().getOutputShape();

                if (outputShape !== null) {
                    const shape = this.getShape(outputShape);

                    if (shape) {
                        return shape;
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

                if (checks && checks.includes('Object')) {
                    return this.TAB!;
                }

                if (checks && checks.includes('Array')) {
                    return this.BTAB!;
                }

                if (checks && checks.includes('Colour')) {
                    return this.OCTOGON!;
                }

                for (const v of Object.values(DATA.outputs)) {
                    for (const [k, a] of Object.entries(v)) {
                        if (checks && checks.includes(k)) {
                            const shape = this.getShape(a);

                            if (shape) {
                                return shape;
                            }
                        }
                    }
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

export class Renderer extends Blockly.zelos.Renderer {
    constructor(name: string) {
        super(name);
    }

    protected override makeConstants_(): ConstantProvider {
        return new ConstantProvider();
    }
}

Blockly.blockRendering.register('zues', Renderer);
