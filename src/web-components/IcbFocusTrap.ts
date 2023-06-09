import { controller } from "@github/catalyst";

@controller
class IcbFocusTrapElement extends HTMLElement {
  // NOTE: I'm not sure if I'm using the right selector to grab all focusable children
  // FIXME: it should be static
  #selector =
    'a, button, input:not([type="hidden"]):not([disabled]), select, textarea, details, iframe, object, area[href], audio[controls], video[controls], [contenteditable], summary, [tabindex]:not([tabindex="-1"]';

  focusables: HTMLElement[] = [];

  connectedCallback() {
    this.focusables = Array.from(
      this.querySelectorAll<HTMLElement>(this.#selector)
    );
    this.addEventListener("keydown", this.handleFocus);
  }

  handleFocus(ev: KeyboardEvent) {
    if (ev.key === "Tab" && document.activeElement) {
      const len = this.focusables.length;

      let index = this.focusables.indexOf(
        document.activeElement as HTMLElement
      );

      if (index > -1) {
        // the element is present in our focusableElements so if this is the last one we wrap it around to the first focusableElements
        index = (index + len + (ev.shiftKey ? -1 : 1)) % len;
        this.focusables[index].focus();
      }
    }
    ev.preventDefault();
  }

  disconnectedCallback() {
    this.removeEventListener("keydown", this.handleFocus);
  }
}
