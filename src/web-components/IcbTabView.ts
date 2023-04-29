import { attr, controller, target, targets } from "@github/catalyst";

@controller
class IcbTabViewElement extends HTMLElement {
  @targets panels: HTMLElement[];
  @target headers: HTMLDivElement;

  @attr activePanel = 0;

  #previousPanel = -1;

  connectedCallback() {
    this.panels.forEach((x, i) => {
      const header = document.createElement("div");
      header.innerText = x.getAttribute("data-header") ?? "undefined";
      header.classList.add("icb-tab-view__header");
      header.setAttribute("data-panel-index", i.toString());

      header.addEventListener("click", (ev: Event) => {
        const panel = parseInt(
          (ev.target! as HTMLElement).getAttribute("data-panel-index") ?? "0"
        );

        if (panel !== this.activePanel) {
          this.#previousPanel = this.activePanel;
          this.activePanel = panel;
        }
      });

      this.headers.appendChild(header);
    });

    this.update();
  }

  disconnectedCallback() {}

  attributeChangedCallback() {
    this.update();
  }

  update() {
    let activeHeader = this.headers.children.item(this.activePanel);
    let previousHeader = this.headers.children.item(this.#previousPanel);

    if (activeHeader) {
      activeHeader.classList.add("icb-tab-view__header-active");
      this.panels[this.activePanel].classList.replace("hidden", "block");

      if (this.#previousPanel > -1) {
        previousHeader?.classList.remove("icb-tab-view__header-active");
        this.panels[this.#previousPanel].classList.replace("block", "hidden");
      }
    }
  }
}
