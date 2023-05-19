import { CSSProperties, useEffect, useState } from "react";

import Confetti from "./svgFire";
import { createRoot } from "react-dom/client";

export default function SparkClickAnimation(): Function {
  const FILTER_TIME:number = 600;
  const rootSelector: HTMLElement = document.getElementById("confetti") as HTMLElement
  const [elements, setElements] = useState([]);

  const cssInJs = (x: number, y: number): CSSProperties => ({
    top: y + 10,
    left: x,
    position: "absolute",
  });
  useEffect(() => {
    if (elements.length > 0) {
      const now = Date.now();
      let expired = elements.filter((el:any) => now - el.id > FILTER_TIME).length;
      const timeoutId = setTimeout(() => {
        setElements(prevElements => prevElements.filter((el:any) => now - el.id < FILTER_TIME));
        for (let i=0; i < expired; i++) {
          const lastElement: any = elements[i];
          rootSelector.removeChild(lastElement.element);
        }
      }, 200);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [elements,rootSelector]);



  const getConfetti = (x: number, y: number) => <div style={cssInJs(x, y)}>
    {Confetti(12)}
  </div>

  const addElement = (x: number, y: number) => {

    const el = document.createElement("div");
    const id = Date.now();

    setTimeout(() => {
      el.style.opacity = "0"
      el.style.transition = `500ms`
    }, 100);

    rootSelector?.appendChild(el)
    const reactRoot = createRoot(el)
    reactRoot.render(getConfetti(x, y))
    setElements(prevElements => [...prevElements, { id, element: el }] as any);
  };

  return (x: number, y: number) => {
    addElement(x, y)
  }
}
