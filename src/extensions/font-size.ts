import { Extension } from "@tiptap/react"
import "@tiptap/extension-text-style";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    fontSize: {
      setFontSize: (size: string) => ReturnType;
      unsetFontSize: () => ReturnType
    }
  }
}

export const FontSizeExtension = Extension.create({
  addOptions() {

  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: null,
            parseHTML: element => element.style.fontSize,
            renderHTML(attributes) {
              if (!attributes.fontSize) return {}
              return {
                style: `font-size ${attributes.fontSize}`
              }
            },
          }
        }
      }
    ]
  },
  addCommands() {
    return {
      setFontSize(fontSize) {
        return ({ chain }: any) => {
          return chain.setMark("testStyle", { fontSize }).run()
        }
      },
      unsetFontSize() {
        return ({ chain }: any) {
          return chain.setMark("testStyle", { fontSize: null }).removeEmptyTextStyle().run()
        }
      }
    }
  },
})