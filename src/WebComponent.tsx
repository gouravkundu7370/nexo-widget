import ReactDom from "react-dom/client";
import { Widget } from "./components/Widget";

// Utility function to normalize attribute names from kebab-case to camelCase
export const normalizeAttribute = (attribute: string): string => {
  return attribute.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
};

// Define the Web Component class
class WidgetWebComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  // Lifecycle method triggered when the element is added to the DOM
  connectedCallback(): void {
    const props = this.getPropsFromAttributes();
    const root = ReactDom.createRoot(this.shadowRoot as ShadowRoot);
    root.render(<Widget {...props} />);
  }

  // Helper method to extract and normalize attributes as props
  private getPropsFromAttributes(): Record<string, string> {
    const props: Record<string, string> = {};
    for (const { name, value } of Array.from(this.attributes)) {
      props[normalizeAttribute(name)] = value;
    }
    return props;
  }
}

export default WidgetWebComponent;
