import {CSSProperties} from "react";

export default function Confetti(cursorX: number, cursorY: number) {
    const randInt = (min: number, max: number) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    const c = {
        type: "circle",
        spin: false,
        drop: 1000, //Bounding box height
        spread: 800, //Bounding box width
        flakes: 12, //Number of sparks
        speed: 4000,
        delay: 0,
        fadeout: true,
        colors: ["#FD827F", "#CA4F4C", "#971C19"],
    };

    function getRandomArbitrary(min: number, max: number) {
        return Math.random() * (max - min) + min;
    }

    // properties passed in from user onto the defaults

    let hh = c.drop;
    let ww = c.spread;


    const returnSpark = (key: number) => {
        let conId = `con${randInt(0, 1000)}fet${randInt(0, 1000)}ti${randInt(0, 1000)}`;
        let confettiDur = `${randInt(c.speed / 2, c.speed)}`;
        let confettiSpin = ``;
        let confettiType = ``;
        if (c.spin) {
            confettiSpin = `<animateTransform attributeName="transform"
                          attributeType="XML"
                          type="rotate"
                          from="0 0 0"
                          to="${(Math.random() < 0.5 ? -1 : 1) * 360} 0 0"
                          dur="${randInt(c.speed / 6, c.speed / 2)}ms"
                          begin="-${randInt(1, 10) / 10}s"
                          repeatCount="indefinite"/>`;
        }
        // are we using an array of colors or random ones?
        let confettiColor = ``;
        if (false || !Array.isArray(c.colors)) {
            confettiColor = `rgb(${randInt(0, 255)}, ${randInt(0, 255)}, ${randInt(0, 255)})`;
        } else {
            confettiColor = c.colors[randInt(0, c.colors.length - 1)];
        }

        const randNum = getRandomArbitrary(0.2, 0.8);

        return <g key={key} transform={`translate(${randInt(ww * -0.3, ww * 0.3)} 0)`}><g filter={`url(#blur${randInt(1, 2)})`} id={`${conId}`} transform={`scale(${randNum})`}>
            <path className="st0" d="M18.61,54.89C15.7,28.8,30.94,10.45,59.52,0C42.02,22.71,74.44,47.31,76.23,70.89 c4.19-7.15,6.57-16.69,7.04-29.45c21.43,33.62,3.66,88.57-43.5,80.67c-4.33-0.72-8.5-2.09-12.3-4.13C10.27,108.8,0,88.79,0,69.68 C0,57.5,5.21,46.63,11.95,37.99C12.85,46.45,14.77,52.76,18.61,54.89L18.61,54.89z">
            </path>
            <path className="st1" d="M33.87,92.58c-4.86-12.55-4.19-32.82,9.42-39.93c0.1,23.3,23.05,26.27,18.8,51.14 c3.92-4.44,5.9-11.54,6.25-17.15c6.22,14.24,1.34,25.63-7.53,31.43c-26.97,17.64-50.19-18.12-34.75-37.72 C26.53,84.73,31.89,91.49,33.87,92.58L33.87,92.58z">
            </path>
        </g>
            <animateMotion xlinkHref={`#${conId}`} dur={`${confettiDur}ms`} begin="0s" fill="freeze" repeatCount="none">
                <mpath xlinkHref={`#motionPath${randInt(1, 2)}`} />
            </animateMotion>
        </g>
    }

    // make sure number of flakes is a number
    if (!c.flakes || Number.isNaN(c.flakes * 1)) {
        c.flakes = 100;
    }

    const centerY: number = cursorY;
    const centerX: number = cursorX;
    let overlayId: string = `conf${randInt(0, 1000)}etti${randInt(0, 1000)}ver${randInt(0, 1000)}lay`;

    const sizeReduction = .2
    let style: CSSProperties = {
        height: `${window.innerHeight * sizeReduction}px`,
        width: `${window.innerWidth * (sizeReduction * .7)}px`,
        left: `${-(window.innerWidth * sizeReduction) / 3}px`,
        position: "absolute",
        overflow: "hidden",
    }
    let svgDiv = <div style={style}>
        <svg id={overlayId} viewBox={`0 0 ${ww} ${hh}`} preserveAspectRatio={"xMaxYMax"}>
            <filter id="blur1" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="0" />
            </filter>
            <filter id="blur2" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="1" />
            </filter>
            <path id="motionPath1" fill="none" stroke="none" d={`M ${ww * 0.5} -${0} Q ${ww * 0.3} ${hh * 0.25} ${ww * 0.5} ${hh * 0.5} Q ${ww * 0.7} ${hh * 0.75} ${ww * 0.5} ${hh * 1.1}`} />
            <path id="motionPath2" fill="none" stroke="none" d={`M ${ww * 0.5} -${0} Q ${ww * 0.7} ${hh * 0.25} ${ww * 0.5} ${hh * 0.5} Q ${ww * 0.3} ${hh * 0.75} ${ww * 0.5} ${hh * 1.1}`} />
            {new Array(c.flakes).fill(0).map((_, i: number) => returnSpark(i))}
        </svg></div>;
    return (svgDiv)
}