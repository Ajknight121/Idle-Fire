import fire from "../images/fire.svg";

export default function Confetti(cursorX: number, cursorY: number) {

    function getRandomArbitrary(min:number, max: number) {
        return Math.random() * (max - min) + min;
    }
    const confettiOptions = {
        type: "circle",
        spin: false,
        drop: 300, //Bounding box height
        spread: 800, //Bounding box width
        flakes: 3,
        speed: 4000,
        delay: 0,
        fadeout: true,
        colors: ["#FD827F", "#CA4F4C", "#971C19"],
    };

    // properties passed in from user onto the defaults
    const c = Object.assign({}, confettiOptions);

    const randInt = (min: number, max: number) => {
        const result = Math.floor(Math.random() * (max - min + 1)) + min;
        return result;
    };

    let hh = c.drop;
    let ww = c.spread;

    let animatedConfetti = ``;
    // make sure number of flakes is a number
    if (!c.flakes || Number.isNaN(c.flakes * 1)) {
        c.flakes = 100;
    }
    for (let i = 0; i < c.flakes; i++) {
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

        // what type of confetti is it?
        confettiType = fire;
        // `<circle id="${conId}" fill="${confettiColor}" cx="0" cy="0" r="${randInt(4, 7)}" filter="url(#blur${randInt(1, 2)})">
        // ${confettiSpin}
        // </circle>`;

        // transform="rotate(-10 50 100)
        // translate(-36 45.5)
        // skewX(40)
        // scale(1 0.5)"
        // console.log(confettiType);
        // alteredFireAsImsage = `<image href="mdn_logo_only_color.png" height="200" width="200" />`;
        // const randNum = Math.random()

        const randNum = getRandomArbitrary(0.2, 0.8);
        // const scaleDecimal = Math.floor(Math.min(.4, randNum) * 1000) / 1000;
        const alteredFire = `<g filter="url(#blur${randInt(1, 2)})" id="${conId}"transform="scale(${randNum})">
            <path class="st0" d="M18.61,54.89C15.7,28.8,30.94,10.45,59.52,0C42.02,22.71,74.44,47.31,76.23,70.89 c4.19-7.15,6.57-16.69,7.04-29.45c21.43,33.62,3.66,88.57-43.5,80.67c-4.33-0.72-8.5-2.09-12.3-4.13C10.27,108.8,0,88.79,0,69.68 C0,57.5,5.21,46.63,11.95,37.99C12.85,46.45,14.77,52.76,18.61,54.89L18.61,54.89z">
            </path>
            <path class="st1" d="M33.87,92.58c-4.86-12.55-4.19-32.82,9.42-39.93c0.1,23.3,23.05,26.27,18.8,51.14 c3.92-4.44,5.9-11.54,6.25-17.15c6.22,14.24,1.34,25.63-7.53,31.43c-26.97,17.64-50.19-18.12-34.75-37.72 C26.53,84.73,31.89,91.49,33.87,92.58L33.87,92.58z">
            </path>
        </g>`;

        // add confetti to group
        // console.log("scaleDecimal");
        // console.log(scaleDecimal);
        animatedConfetti += `<g transform="translate(${randInt(ww * -0.3, ww * 0.3)} 0)">
        ${alteredFire}
        </g>
        <animateMotion xlink:href="#${conId}" dur="${confettiDur}ms" begin="0s" fill="freeze" repeatCount="none">
        <mpath xlink:href="#motionPath${randInt(1, 2)}" />
        </animateMotion>`;
        // animatedConfetti += `<g transform="translate(${randInt(-ww * -0.3,ww * 0.3)} 0) scale(1.${randInt(0, 1)})">
        //  ${confettiType}
        //     </g>
        //     <animateMotion xlink:href="#${conId}" dur="${confettiDur}ms" begin="0s" fill="freeze" repeatCount="none">
        //  <mpath xlink:href="#motionPath${randInt(1, 2)}" />
        //     </animateMotion>`;
    }
    //   console.log(animatedConfetti);

    const centerY = cursorY;
    const centerX = cursorX;

    let overlayId = `conf${randInt(0, 1000)}etti${randInt(0, 1000)}ver${randInt(0, 1000)}lay`;
    let svg = `<svg id="${overlayId}" viewBox="0 0 ${ww} ${hh}" height="1" width="1" preserveAspectRatio="none" style="
        left:${centerX}; 
        pointer-events:none; 
        position:fixed; 
        top:${centerY}; 
        transform:translate(-50%,-50%); 
        transition:${c.speed / 10}ms; 
        user-select:none; 
        z-index:99999">
        <filter id="blur1" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="0" />
        </filter>
        <filter id="blur2" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="1" />
        </filter>
        <path id="motionPath1" fill="none" stroke="none" d="M ${ww * 0.5} -${hh * 0} Q ${ww * 0.3} ${hh * 0.25} ${ww * 0.5} ${hh * 0.5} Q ${ww * 0.7} ${hh * 0.75} ${ww * 0.5} ${hh * 1.1}" />
        <path id="motionPath2" fill="none" stroke="none" d="M ${ww * 0.5} -${hh * 0} Q ${ww * 0.7} ${hh * 0.25} ${ww * 0.5} ${hh * 0.5} Q ${ww * 0.3} ${hh * 0.75} ${ww * 0.5} ${hh * 1.1}" />
        ${animatedConfetti}
    </svg>`;

    //Make it a node to avoid the dangerous "document.body.innerHTML = svg"
    // let wrapper = document.createElement("div");
    //
    // wrapper.innerHTML = svg;
    // let doc = wrapper.firstChild;
    //
    // document.body.appendChild(doc);

    let svgDiv = <div>{svg}</div>;

    // //make it the height and width

    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         let cssProp: CSSProperties = {
    //             height: `${hh}px`,
    //             width: `${ww}px`
    //         }
    //         svgDiv.props.style = cssProp;
    //     }, c.delay);
    // }, []);
    // are we fading the confetti out?
    // if (c.fadeout) {
    //     setTimeout(() => {
    //         svgDiv.type.style = {
    //             ...svgDiv.type.style,
    //             opacity: 0,
    //             transition:`${c.speed / 4}ms`
    //         }
    //     }, c.speed / 4);
    // }
    // setTimeout(() => {
    //     const element = document.getElementById(overlayId);
    //     element?.remove();
    // }, c.speed);
    return (svgDiv)
}