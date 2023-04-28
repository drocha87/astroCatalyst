import { attr, controller, target } from "@github/catalyst";

@controller
class IcbDialogElement extends HTMLElement {
  @target dialog: HTMLDialogElement;

  @attr activator = "";
  @attr deactivator = "";

  @attr activatorEvent = "click";
  @attr deactivatorEvent = "click";

  @attr show = false;

  #eventAbortController: AbortController | null = null;
  #deactivatorTarget: HTMLElement | null = null;

  connectedCallback() {
    const { signal } = (this.#eventAbortController = new AbortController());

    const activatorTarget = document.querySelector(this.activator);
    this.#deactivatorTarget = document.querySelector(this.deactivator);

    activatorTarget?.addEventListener(this.activatorEvent, this, { signal });
    this.#deactivatorTarget?.addEventListener(this.deactivatorEvent, this, {
      signal,
    });

    this.dialog.addEventListener("close", this, { signal });
    this.dialog.addEventListener("click", this, { signal });

    // TODO: add transition effect when showing or hiding the dialog
  }

  disconnectedCallback() {
    this.#eventAbortController?.abort();
  }

  handleEvent(ev: Event) {
    // `handleEvent` will be called when each one of the event listeners
    // defined in `connectedCallback` is dispatched.

    if (ev.target === this.dialog) {
      switch (ev.type) {
        case "close":
        case "click":
          this.dispose();
          break;
        default:
          break;
      }
      return;
    }

    if (ev.target === this.#deactivatorTarget) {
      this.dispose();
      return;
    }

    this.dialog.showModal();
    this.show = true;
    this.focus();
  }

  attributeChangedCallback() {
    // FIXME: only dispatch update if necessary
    this.update();
  }

  update() {
    this.style.display = this.show ? "block" : "none";
  }

  dispose() {
    this.dialog.close();
    this.show = false;
  }

  stopPropagation(ev: Event) {
    ev.stopPropagation();
  }
}
