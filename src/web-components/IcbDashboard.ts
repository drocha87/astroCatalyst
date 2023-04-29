import { attr, controller, target } from "@github/catalyst";

@controller
class IcbDashboardElement extends HTMLElement {
  @target sidebar: HTMLElement;
  @target topbar: HTMLElement;
  @target content: HTMLElement;
  @target toggler: HTMLElement;
  @target info: HTMLElement;

  @attr expanded = true;

  connectedCallback() {
    // this.info.innerText = `Sidebar is ${this.expanded ? "open" : "close"}`;
    // this.info.parentElement?.classList.replace("hidden", "flex");
  }

  toogleSidebar() {
    this.expanded = !this.expanded;

    // this.info.innerText = `Sidebar is ${this.expanded ? "open" : "close"}`;
  }
}
