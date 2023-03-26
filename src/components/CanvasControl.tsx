import { CSSProperties, useEffect, useRef, useState } from "react";

import Confetti from "./svgFire";
import { createRoot } from "react-dom/client";

export default function SparkClickAnimation(): Function {
  // const { appState: {currCursorX, currCursorY, showConfetti} } = useContext(AppStateContext);
  // console.log(`SparkClickAnimation`)
  // console.log(showConfetti)

  const rootSelector: HTMLElement = document.getElementById("confetti") as HTMLElement
  // if(!showConfetti){
  //   return null
  // }
  const [elements, setElements] = useState([]);
  const containerRef = useRef(null);

  const containerSize = 60;
  const cssInJs = (x: number, y: number): CSSProperties => ({
    // top: appState.currCursorY - 70, //minus 15 for center of cursor
    // left: appState.currCursorX - 400 - 15, //400 for upgrade container // 15
    top: y + 10,
    left: x - 100,
    height: `${containerSize}px`,
    width: `${containerSize}px`,
    // display: `${true ? "block" : "none"}`,
    position: "absolute",
    // opacity: `${(appState.embersPerSecond + 1) * 2}%`,
  });
  useEffect(() => {
    if (elements.length > 0) {
      const lastElement: any = elements[elements.length - 1];
      const timeoutId = setTimeout(() => {
        setElements(prevElements => prevElements.filter((el: any) => el.id !== lastElement.id));
        rootSelector.removeChild(lastElement.element)
      }, 600);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [elements]);



  const getConfetti = (x: number, y: number) => <div style={cssInJs(x, y)}>
    {Confetti(x, y)}
  </div>

  const addElement = (x: number, y: number) => {

    const el = document.createElement("div");
    const id = Date.now();

    setTimeout(() => {
      console.log(`Calling timeout on el ${id}`)
      el.style.opacity = "0"
      el.style.transition = `500ms`
    }, 100);

    rootSelector?.appendChild(el)
    const reactRoot = createRoot(el)
    reactRoot.render(getConfetti(x, y))
    setElements(prevElements => [...prevElements, { id, element: el }] as any);
  };

  return (x: number, y: number) => {
    console.log(`${x}, ${y}`)
    addElement(x, y)
  }
}
