import { CSSProperties, useEffect, useState } from "react";

import Confetti from "./svgFire";
import { createRoot } from "react-dom/client";
import exp from "constants";

export default function SparkClickAnimation(): Function {
  // const { appState: {currCursorX, currCursorY, showConfetti} } = useContext(AppStateContext);
  // console.log(`SparkClickAnimation`)
  // console.log(showConfetti)
  const FILTER_TIME:number = 600;
  const rootSelector: HTMLElement = document.getElementById("confetti") as HTMLElement
  // if(!showConfetti){
  //   return null
  // }
  const [elements, setElements] = useState([]);

  const cssInJs = (x: number, y: number): CSSProperties => ({
    // top: appState.currCursorY - 70, //minus 15 for center of cursor
    // left: appState.currCursorX - 400 - 15, //400 for upgrade container // 15
    top: y + 10,
    left: x,
    // height: `${containerSize}px`,
    // width: `${containerSize}px`,
    // display: `${true ? "block" : "none"}`,
    position: "absolute",
    // opacity: `${(appState.embersPerSecond + 1) * 2}%`,
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
  }, [elements]);



  const getConfetti = (x: number, y: number) => <div style={cssInJs(x, y)}>
    {Confetti(x, y)}
  </div>

  const addElement = (x: number, y: number) => {

    const el = document.createElement("div");
    const id = Date.now();

    setTimeout(() => {
      // console.log(`Calling fadeout on el ${id}`)
      el.style.opacity = "0"
      el.style.transition = `500ms`
    }, 100);

    rootSelector?.appendChild(el)
    const reactRoot = createRoot(el)
    reactRoot.render(getConfetti(x, y))
    setElements(prevElements => [...prevElements, { id, element: el }] as any);
  };

  return (x: number, y: number) => {
    // console.log(`cursor pos: ${x}, ${y}`)
    addElement(x, y)
  }
}
