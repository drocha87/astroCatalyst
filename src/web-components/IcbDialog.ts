import { attr, controller, target } from "@github/catalyst";

@controller
class IcbDialogElement extends HTMLElement {
  @target overlay: HTMLElement;
  @target dialog: HTMLElement;

  @attr activator = "";
  @attr activatorEvent = "click";
  @attr deactivator = "";
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

    // TODO: add transition effect when showing or hiding the dialog
    // TODO: trap the focus inside the content when the dialog is open
    // TODO: enable disposing the dialog with the keyboard
  }

  disconnectedCallback() {
    this.#eventAbortController?.abort();
  }

  handleEvent(ev: Event) {
    // `handleEvent` will be called when each one of the event listeners
    // defined in `connectedCallback` is dispatched.

    // we are only listening to two elements so or it's the activator or the
    // deactivator
    if (ev.target === this.#deactivatorTarget) {
      this.dispose();
    } else {
      this.show = true;
    }
  }

  attributeChangedCallback() {
    // FIXME: only dispatch update if necessary
    this.update();
  }

  update() {
    this.style.display = this.show ? "block" : "none";
  }

  dispose() {
    this.show = false;
  }

  handleContentClick(ev: Event) {
    // as the content is inside the overlay we must stop the click event from
    // propagating since it can dispatch the dispose event
    ev.stopPropagation();
  }
}
