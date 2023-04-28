import { attr, controller } from "@github/catalyst";

@controller
class IcbTeleportElement extends HTMLElement {
  @attr destination = "";

  connectedCallback() {
    const target = document.querySelector(this.destination);
    if (target) {
      this.parentNode?.insertBefore(
        new Comment(
          `\n<icb-teleport data-destination=${
            this.destination
          }>\n\t${this.innerHTML.trim()}\n</icb-teleport>\n`
        ),
        this
      );
      target.appendChild(
        new Comment("this data was teleported using icb-teleport")
      );
      for (let child of this.children) {
        target.appendChild(child);
      }
      this.remove();
    }
  }
}
