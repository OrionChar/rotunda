import { WebGLRenderer } from "three";
import { CSS2DRenderer } from "three/examples/jsm/renderers/CSS2DRenderer.js";

export default class Renderer {
    constructor () {
        this._webGL = this.buildRenderer()
        this._CSS2D = this.buildLabelRenderer()
    }

    public get WebGL() : WebGLRenderer {
        return this._webGL
    }

    
    public get CSS2D() : CSS2DRenderer {
        return this._CSS2D
    }

    private _webGL: WebGLRenderer
    private _CSS2D: CSS2DRenderer

    private buildRenderer() {
        const renderer = new WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.shadowMap.enabled = true;

        return renderer;
    }

    private buildLabelRenderer() {
        const labelRenderer = new CSS2DRenderer();
        labelRenderer.setSize(window.innerWidth, window.innerHeight);
        labelRenderer.domElement.style.position = 'absolute';
        labelRenderer.domElement.style.top = '0px';
        labelRenderer.domElement.style.pointerEvents = 'none';

        return labelRenderer
    }
}