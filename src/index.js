/* Copyright 2018 kkpoon
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
class EChartsWebComponent extends HTMLElement {

    static get echarts() {
        if (!EChartsWebComponent._echarts) {
            EChartsWebComponent._echarts = window.echarts
        }
        return EChartsWebComponent._echarts;
    }

    static set echarts(val) {
        EChartsWebComponent._echarts = val;
    }

    static get observedAttributes() {
        return ["style", "option"];
    }

    constructor() {
        super();
        const shadowRoot = this.attachShadow({
            mode: 'open'
        });
        shadowRoot.innerHTML = `
            <div id="container" style="width: 100%; height: 100%;"></div>
        `;
    }

    connectedCallback() {
        if (!this.chart) {
            let container = this.shadowRoot.querySelector("#container");
            this.chart = EChartsWebComponent.echarts.init(container);
            this.updateChart();
        }
    }

    disconnectedCallback() {
        let container = this.shadowRoot.querySelector("#container");
        if (container) {
            container.innerHTML = "";
        }
        if (this.chart) {
            this.chart.dispose();
        }
        this.chart = null;
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "option") {
            this.updateChart();
        } else if (name === "style") {
            let container = this.shadowRoot.querySelector("#container");
            if (container) {
                container.style = newValue;
            }
            this.resizeChart();
        }
    }

    updateChart() {
        if (!this.chart) return;
        let option = JSON.parse(this.option || "{}");
        this.chart.setOption(option);;
    }

    resizeChart() {
        if (!this.chart) return;
        this.chart.resize();
    }

    get option() {
        if (this.hasAttribute("option")) {
            return this.getAttribute("option");
        } else {
            return "{}";
        }
    }

    set option(val) {
        if (val) {
            this.setAttribute("option", val);
        } else {
            this.setAttribute("option", "{}");
        }
        this.updateChart();
    }
}

module.exports = EChartsWebComponent;
