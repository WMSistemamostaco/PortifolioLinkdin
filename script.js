"use strict";

/* =========================================================
   WM PORTFOLIO V3
   Wilian Mostaço
   ========================================================= */


/* =========================================================
   ELEMENTOS
   ========================================================= */

const header =
    document.getElementById("header");

const menuToggle =
    document.getElementById("menu-toggle");

const mainNav =
    document.getElementById("main-nav");

const backToTop =
    document.getElementById("back-to-top");

const yearElement =
    document.getElementById("year");

const typedText =
    document.getElementById("typed-text");

const profileImage =
    document.getElementById("profile-image");

const profileRing =
    document.querySelector(".profile-ring");

const canvas =
    document.getElementById("particles-canvas");


/* =========================================================
   ANO ATUAL
   ========================================================= */

if (yearElement) {

    yearElement.textContent =
        new Date().getFullYear();

}


/* =========================================================
   HEADER AO ROLAR
   ========================================================= */

function updateHeader() {

    if (!header) {
        return;
    }

    if (window.scrollY > 24) {

        header.classList.add(
            "scrolled"
        );

    } else {

        header.classList.remove(
            "scrolled"
        );

    }


    if (backToTop) {

        if (window.scrollY > 550) {

            backToTop.classList.add(
                "visible"
            );

        } else {

            backToTop.classList.remove(
                "visible"
            );

        }

    }

}


window.addEventListener(
    "scroll",
    updateHeader,
    {
        passive: true
    }
);

updateHeader();


/* =========================================================
   MENU MOBILE
   ========================================================= */

function closeMenu() {

    if (!menuToggle || !mainNav) {
        return;
    }


    menuToggle.classList.remove(
        "active"
    );


    mainNav.classList.remove(
        "open"
    );


    menuToggle.setAttribute(
        "aria-expanded",
        "false"
    );


    document.body.classList.remove(
        "menu-open"
    );

}


function toggleMenu() {

    if (!menuToggle || !mainNav) {
        return;
    }


    const opened =
        mainNav.classList.toggle(
            "open"
        );


    menuToggle.classList.toggle(
        "active",
        opened
    );


    menuToggle.setAttribute(
        "aria-expanded",
        String(opened)
    );


    document.body.classList.toggle(
        "menu-open",
        opened
    );

}


if (menuToggle) {

    menuToggle.addEventListener(
        "click",
        toggleMenu
    );

}


document
    .querySelectorAll(
        ".main-nav a"
    )
    .forEach(
        (link) => {

            link.addEventListener(
                "click",
                closeMenu
            );

        }
    );


window.addEventListener(
    "resize",
    () => {

        if (window.innerWidth > 860) {

            closeMenu();

        }

    }
);


/* =========================================================
   VOLTAR AO TOPO
   ========================================================= */

if (backToTop) {

    backToTop.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

}


/* =========================================================
   REVEAL ON SCROLL
   ========================================================= */

const revealElements =
    document.querySelectorAll(
        ".reveal"
    );


const reducedMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


if (
    reducedMotion ||
    !("IntersectionObserver" in window)
) {

    revealElements.forEach(
        (element) => {

            element.classList.add(
                "visible"
            );

        }
    );

} else {

    const revealObserver =
        new IntersectionObserver(
            (
                entries,
                observer
            ) => {

                entries.forEach(
                    (entry) => {

                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }


                        entry.target.classList.add(
                            "visible"
                        );


                        observer.unobserve(
                            entry.target
                        );

                    }
                );

            },
            {
                threshold: 0.12,
                rootMargin:
                    "0px 0px -45px 0px"
            }
        );


    revealElements.forEach(
        (element) => {

            revealObserver.observe(
                element
            );

        }
    );

}


/* =========================================================
   EFEITO DE DIGITAÇÃO
   ========================================================= */

const typingWords = [

    "Sistemas Web",
    "APIs REST",
    "Python + FastAPI",
    "JavaScript + Node.js",
    "Automação de processos",
    "Sistema WM"

];


let currentWordIndex = 0;

let currentCharacter = 0;

let deleting = false;


function typeWriter() {

    if (!typedText) {
        return;
    }


    const word =
        typingWords[
            currentWordIndex
        ];


    if (!deleting) {

        currentCharacter++;


        typedText.textContent =
            word.slice(
                0,
                currentCharacter
            );


        if (
            currentCharacter >=
            word.length
        ) {

            deleting =
                true;

            setTimeout(
                typeWriter,
                1500
            );

            return;

        }

    } else {

        currentCharacter--;


        typedText.textContent =
            word.slice(
                0,
                currentCharacter
            );


        if (
            currentCharacter <= 0
        ) {

            deleting =
                false;

            currentWordIndex =
                (
                    currentWordIndex + 1
                ) %
                typingWords.length;

        }

    }


    setTimeout(
        typeWriter,
        deleting
            ? 42
            : 76
    );

}


if (typedText) {

    if (reducedMotion) {

        typedText.textContent =
            typingWords[0];

    } else {

        setTimeout(
            typeWriter,
            700
        );

    }

}


/* =========================================================
   IMAGEM DE PERFIL
   ========================================================= */

if (profileImage) {

    profileImage.addEventListener(
        "load",
        () => {

            if (
                profileImage.naturalWidth >
                0
            ) {

                profileRing?.classList.add(
                    "loaded"
                );

            }

        }
    );


    profileImage.addEventListener(
        "error",
        () => {

            profileImage.style.display =
                "none";


            profileRing?.classList.remove(
                "loaded"
            );

        }
    );

}


/* =========================================================
   LINKS INTERNOS SUAVES
   ========================================================= */

document
    .querySelectorAll(
        'a[href^="#"]'
    )
    .forEach(
        (anchor) => {

            anchor.addEventListener(
                "click",
                function (event) {

                    const targetId =
                        this.getAttribute(
                            "href"
                        );


                    if (
                        !targetId ||
                        targetId === "#"
                    ) {
                        return;
                    }


                    const target =
                        document.querySelector(
                            targetId
                        );


                    if (!target) {
                        return;
                    }


                    event.preventDefault();


                    const headerHeight =
                        header
                            ? header.offsetHeight
                            : 0;


                    const targetPosition =
                        target.getBoundingClientRect()
                            .top +
                        window.scrollY -
                        headerHeight -
                        12;


                    window.scrollTo({
                        top:
                            targetPosition,
                        behavior:
                            "smooth"
                    });

                }
            );

        }
    );


/* =========================================================
   FECHA MENU AO CLICAR FORA
   ========================================================= */

document.addEventListener(
    "click",
    (event) => {

        if (
            !mainNav ||
            !menuToggle
        ) {
            return;
        }


        if (
            !mainNav.classList.contains(
                "open"
            )
        ) {
            return;
        }


        const clickedInsideMenu =
            mainNav.contains(
                event.target
            );


        const clickedToggle =
            menuToggle.contains(
                event.target
            );


        if (
            !clickedInsideMenu &&
            !clickedToggle
        ) {

            closeMenu();

        }

    }
);


/* =========================================================
   PARTÍCULAS
   SEM BIBLIOTECA EXTERNA
   ========================================================= */

if (
    canvas &&
    !reducedMotion
) {

    const context =
        canvas.getContext("2d");


    let particles = [];

    let canvasWidth = 0;

    let canvasHeight = 0;

    let animationId = null;


    const mouse = {

        x: null,

        y: null,

        radius: 130

    };


    function resizeCanvas() {

        const ratio =
            Math.min(
                window.devicePixelRatio || 1,
                2
            );


        canvasWidth =
            window.innerWidth;


        canvasHeight =
            window.innerHeight;


        canvas.width =
            canvasWidth * ratio;


        canvas.height =
            canvasHeight * ratio;


        canvas.style.width =
            `${canvasWidth}px`;


        canvas.style.height =
            `${canvasHeight}px`;


        context.setTransform(
            ratio,
            0,
            0,
            ratio,
            0,
            0
        );


        createParticles();

    }


    function createParticles() {

        const amount =
            canvasWidth < 700
                ? 24
                : 55;


        particles = [];


        for (
            let index = 0;
            index < amount;
            index++
        ) {

            particles.push({

                x:
                    Math.random() *
                    canvasWidth,

                y:
                    Math.random() *
                    canvasHeight,

                size:
                    Math.random() *
                    1.7 +
                    0.4,

                vx:
                    (
                        Math.random() -
                        0.5
                    ) *
                    0.22,

                vy:
                    (
                        Math.random() -
                        0.5
                    ) *
                    0.22,

                alpha:
                    Math.random() *
                    0.35 +
                    0.08

            });

        }

    }


    function drawParticles() {

        context.clearRect(
            0,
            0,
            canvasWidth,
            canvasHeight
        );


        particles.forEach(
            (particle) => {

                particle.x +=
                    particle.vx;


                particle.y +=
                    particle.vy;


                if (
                    particle.x <
                    -10
                ) {

                    particle.x =
                        canvasWidth +
                        10;

                }


                if (
                    particle.x >
                    canvasWidth +
                    10
                ) {

                    particle.x =
                        -10;

                }


                if (
                    particle.y <
                    -10
                ) {

                    particle.y =
                        canvasHeight +
                        10;

                }


                if (
                    particle.y >
                    canvasHeight +
                    10
                ) {

                    particle.y =
                        -10;

                }


                /* INTERAÇÃO COM MOUSE */

                if (
                    mouse.x !== null &&
                    mouse.y !== null
                ) {

                    const dx =
                        mouse.x -
                        particle.x;


                    const dy =
                        mouse.y -
                        particle.y;


                    const distance =
                        Math.sqrt(
                            dx * dx +
                            dy * dy
                        );


                    if (
                        distance <
                        mouse.radius
                    ) {

                        const force =
                            (
                                mouse.radius -
                                distance
                            ) /
                            mouse.radius;


                        particle.x -=
                            dx *
                            force *
                            0.0025;


                        particle.y -=
                            dy *
                            force *
                            0.0025;

                    }

                }


                context.beginPath();


                context.arc(
                    particle.x,
                    particle.y,
                    particle.size,
                    0,
                    Math.PI * 2
                );


                context.fillStyle =
                    `rgba(96,165,250,${particle.alpha})`;


                context.fill();

            }
        );


        /* LINHAS */

        for (
            let index = 0;
            index < particles.length;
            index++
        ) {

            for (
                let second = index + 1;
                second < particles.length;
                second++
            ) {

                const firstParticle =
                    particles[index];


                const secondParticle =
                    particles[second];


                const dx =
                    firstParticle.x -
                    secondParticle.x;


                const dy =
                    firstParticle.y -
                    secondParticle.y;


                const distance =
                    Math.sqrt(
                        dx * dx +
                        dy * dy
                    );


                if (
                    distance < 125
                ) {

                    const opacity =
                        (
                            1 -
                            distance / 125
                        ) *
                        0.1;


                    context.beginPath();


                    context.moveTo(
                        firstParticle.x,
                        firstParticle.y
                    );


                    context.lineTo(
                        secondParticle.x,
                        secondParticle.y
                    );


                    context.strokeStyle =
                        `rgba(96,165,250,${opacity})`;


                    context.lineWidth =
                        1;


                    context.stroke();

                }

            }

        }


        animationId =
            requestAnimationFrame(
                drawParticles
            );

    }


    window.addEventListener(
        "resize",
        resizeCanvas
    );


    window.addEventListener(
        "mousemove",
        (event) => {

            mouse.x =
                event.clientX;

            mouse.y =
                event.clientY;

        },
        {
            passive: true
        }
    );


    window.addEventListener(
        "mouseleave",
        () => {

            mouse.x =
                null;

            mouse.y =
                null;

        }
    );


    resizeCanvas();

    drawParticles();


    /* =====================================================
       ECONOMIA DE RECURSOS QUANDO A ABA FICA INVISÍVEL
       ===================================================== */

    document.addEventListener(
        "visibilitychange",
        () => {

            if (
                document.hidden
            ) {

                if (
                    animationId
                ) {

                    cancelAnimationFrame(
                        animationId
                    );

                    animationId =
                        null;

                }

            } else {

                if (
                    !animationId
                ) {

                    drawParticles();

                }

            }

        }
    );

}


/* =========================================================
   PROTEÇÃO CONTRA ERROS
   ========================================================= */

window.addEventListener(
    "error",
    (event) => {

        /*
         * Evita que um erro visual isolado
         * derrube a experiência inteira.
         */

        console.warn(
            "Portfolio:",
            event.message
        );

    }
);
