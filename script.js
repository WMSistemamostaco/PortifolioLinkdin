"use strict";

/* =========================================================
   WM PORTFOLIO V4
   Wilian Mostaço
   ========================================================= */


/* =========================================================
   ELEMENTOS
   ========================================================= */

const header =
    document.getElementById("site-header");

const menuToggle =
    document.getElementById("menu-toggle");

const mainNavigation =
    document.getElementById("main-navigation");

const backToTop =
    document.getElementById("back-to-top");

const currentYear =
    document.getElementById("current-year");

const typedText =
    document.getElementById("typed-text");

const devImage =
    document.getElementById("profile-dev-image");

const devPhoto =
    document.querySelector(".profile-dev");

const socialImage =
    document.getElementById("profile-social-image");

const mouseGlow =
    document.getElementById("mouse-glow");

const canvas =
    document.getElementById("particles-canvas");


/* =========================================================
   ANO
   ========================================================= */

if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}


/* =========================================================
   HEADER + BACK TO TOP
   ========================================================= */

function updatePageState() {

    if (header) {

        if (window.scrollY > 24) {

            header.classList.add(
                "scrolled"
            );

        } else {

            header.classList.remove(
                "scrolled"
            );

        }

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
    updatePageState,
    {
        passive: true
    }
);

updatePageState();


/* =========================================================
   MENU MOBILE
   ========================================================= */

function closeMenu() {

    if (!menuToggle || !mainNavigation) {
        return;
    }

    menuToggle.classList.remove(
        "active"
    );

    mainNavigation.classList.remove(
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

    if (!menuToggle || !mainNavigation) {
        return;
    }

    const open =
        mainNavigation.classList.toggle(
            "open"
        );

    menuToggle.classList.toggle(
        "active",
        open
    );

    menuToggle.setAttribute(
        "aria-expanded",
        String(open)
    );

    document.body.classList.toggle(
        "menu-open",
        open
    );

}


if (menuToggle) {

    menuToggle.addEventListener(
        "click",
        toggleMenu
    );

}


document
    .querySelectorAll(".main-navigation a")
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


document.addEventListener(
    "click",
    (event) => {

        if (
            !mainNavigation ||
            !mainNavigation.classList.contains(
                "open"
            )
        ) {
            return;
        }

        const clickInsideMenu =
            mainNavigation.contains(
                event.target
            );

        const clickToggle =
            menuToggle.contains(
                event.target
            );

        if (
            !clickInsideMenu &&
            !clickToggle
        ) {

            closeMenu();

        }

    }
);


/* =========================================================
   BACK TO TOP
   ========================================================= */

if (backToTop) {

    backToTop.addEventListener(
        "click",
        () => {

            window.scrollTo({

                top:
                    0,

                behavior:
                    "smooth"

            });

        }
    );

}


/* =========================================================
   REVEAL
   ========================================================= */

const revealElements =
    document.querySelectorAll(
        ".reveal"
    );


const prefersReducedMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


if (
    prefersReducedMotion ||
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
                threshold:
                    0.12,

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

    "Sistema WM",
    "Sistemas Web",
    "APIs REST",
    "Python + FastAPI",
    "JavaScript + Node.js",
    "Automação de processos"

];


let typingWordIndex =
    0;

let typingCharacterIndex =
    0;

let typingDeleting =
    false;


function typeWriter() {

    if (!typedText) {
        return;
    }


    const currentWord =
        typingWords[
            typingWordIndex
        ];


    if (!typingDeleting) {

        typingCharacterIndex++;


        typedText.textContent =
            currentWord.slice(
                0,
                typingCharacterIndex
            );


        if (
            typingCharacterIndex >=
            currentWord.length
        ) {

            typingDeleting =
                true;

            setTimeout(
                typeWriter,
                1400
            );

            return;

        }

    } else {

        typingCharacterIndex--;


        typedText.textContent =
            currentWord.slice(
                0,
                typingCharacterIndex
            );


        if (
            typingCharacterIndex <= 0
        ) {

            typingDeleting =
                false;

            typingWordIndex =
                (
                    typingWordIndex + 1
                ) %
                typingWords.length;

        }

    }


    setTimeout(
        typeWriter,
        typingDeleting
            ? 38
            : 75
    );

}


if (typedText) {

    if (prefersReducedMotion) {

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
   FOTOS
   ========================================================= */

function activateImage(
    image,
    wrapper
) {

    if (!image || !wrapper) {
        return;
    }


    const markLoaded =
        () => {

            if (
                image.naturalWidth >
                0
            ) {

                wrapper.classList.add(
                    "loaded"
                );

            }

        };


    if (
        image.complete &&
        image.naturalWidth > 0
    ) {

        markLoaded();

    }


    image.addEventListener(
        "load",
        markLoaded
    );


    image.addEventListener(
        "error",
        () => {

            wrapper.classList.remove(
                "loaded"
            );

        }
    );

}


activateImage(
    devImage,
    devPhoto
);


/* Foto social: só garantir que carregou */

if (socialImage) {

    socialImage.addEventListener(
        "error",
        () => {

            console.warn(
                "Não foi possível carregar a foto social."
            );

        }
    );

}


/* =========================================================
   LINKS INTERNOS
   ========================================================= */

document
    .querySelectorAll(
        'a[href^="#"]'
    )
    .forEach(
        (anchor) => {

            anchor.addEventListener(
                "click",
                (event) => {

                    const targetId =
                        anchor.getAttribute(
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
                        10;


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
   MOUSE GLOW
   ========================================================= */

if (
    mouseGlow &&
    !prefersReducedMotion
) {

    let glowX =
        window.innerWidth / 2;

    let glowY =
        window.innerHeight / 2;

    let targetX =
        glowX;

    let targetY =
        glowY;


    window.addEventListener(
        "mousemove",
        (event) => {

            targetX =
                event.clientX;

            targetY =
                event.clientY;

            mouseGlow.style.opacity =
                "1";

        },
        {
            passive: true
        }
    );


    window.addEventListener(
        "mouseleave",
        () => {

            mouseGlow.style.opacity =
                "0";

        }
    );


    function animateGlow() {

        glowX +=
            (
                targetX -
                glowX
            ) *
            0.13;


        glowY +=
            (
                targetY -
                glowY
            ) *
            0.13;


        mouseGlow.style.transform =
            `translate(
                ${glowX}px,
                ${glowY}px
            ) translate(-50%, -50%)`;


        requestAnimationFrame(
            animateGlow
        );

    }


    animateGlow();

}


/* =========================================================
   TILT DOS CARDS
   ========================================================= */

const tiltCards =
    document.querySelectorAll(
        "[data-tilt='true']"
    );


if (
    !prefersReducedMotion &&
    window.innerWidth > 820 &&
    tiltCards.length
) {

    tiltCards.forEach(
        (card) => {

            card.addEventListener(
                "mousemove",
                (event) => {

                    const rect =
                        card.getBoundingClientRect();


                    const x =
                        event.clientX -
                        rect.left;


                    const y =
                        event.clientY -
                        rect.top;


                    const centerX =
                        rect.width / 2;


                    const centerY =
                        rect.height / 2;


                    const rotateY =
                        (
                            x -
                            centerX
                        ) /
                        centerX *
                        3.5;


                    const rotateX =
                        (
                            centerY -
                            y
                        ) /
                        centerY *
                        3.5;


                    card.style.transform =
                        `perspective(1000px)
                         rotateX(${rotateX}deg)
                         rotateY(${rotateY}deg)
                         translateY(-4px)`;

                }
            );


            card.addEventListener(
                "mouseleave",
                () => {

                    card.style.transform =
                        "";

                }
            );

        }
    );

}


/* =========================================================
   PARTÍCULAS
   ========================================================= */

if (
    canvas &&
    !prefersReducedMotion
) {

    const ctx =
        canvas.getContext("2d");


    let particles =
        [];

    let width =
        window.innerWidth;

    let height =
        window.innerHeight;

    let animationFrame =
        null;


    /* ------------------------------------------
       MOUSE
    ------------------------------------------- */

    const mouse = {

        x:
            null,

        y:
            null,

        radius:
            175

    };


    /* ------------------------------------------
       CONFIGURAÇÃO
    ------------------------------------------- */

    const settings = {

        desktopParticles:
            95,

        mobileParticles:
            43,

        maxDistance:
            145,

        baseSpeed:
            0.42,

        maxSpeed:
            1.15,

        mouseForce:
            2.8

    };


    /* =================================================
       RESIZE
       ================================================= */

    function resizeCanvas() {

        const pixelRatio =
            Math.min(
                window.devicePixelRatio || 1,
                2
            );


        width =
            window.innerWidth;


        height =
            window.innerHeight;


        canvas.width =
            width *
            pixelRatio;


        canvas.height =
            height *
            pixelRatio;


        canvas.style.width =
            `${width}px`;


        canvas.style.height =
            `${height}px`;


        ctx.setTransform(
            pixelRatio,
            0,
            0,
            pixelRatio,
            0,
            0
        );


        createParticles();

    }


    /* =================================================
       CRIA PARTICULAS
       ================================================= */

    function createParticles() {

        const amount =
            width <= 700
                ? settings.mobileParticles
                : settings.desktopParticles;


        particles =
            [];


        for (
            let index = 0;
            index < amount;
            index++
        ) {

            particles.push({

                x:
                    Math.random() *
                    width,

                y:
                    Math.random() *
                    height,

                vx:
                    (
                        Math.random() -
                        0.5
                    ) *
                    settings.baseSpeed,

                vy:
                    (
                        Math.random() -
                        0.5
                    ) *
                    settings.baseSpeed,

                size:
                    Math.random() *
                    1.8 +
                    0.65,

                alpha:
                    Math.random() *
                    0.45 +
                    0.15

            });

        }

    }


    /* =================================================
       ATUALIZA PARTICULA
       ================================================= */

    function updateParticle(
        particle
    ) {

        /* Movimento contínuo */

        particle.x +=
            particle.vx;


        particle.y +=
            particle.vy;


        /* ------------------------------------------
           ENVOLVE A TELA
        ------------------------------------------- */

        if (
            particle.x <
            -20
        ) {

            particle.x =
                width + 20;

        }


        if (
            particle.x >
            width + 20
        ) {

            particle.x =
                -20;

        }


        if (
            particle.y <
            -20
        ) {

            particle.y =
                height + 20;

        }


        if (
            particle.y >
            height + 20
        ) {

            particle.y =
                -20;

        }


        /* ==========================================
           REPULSÃO DO MOUSE
        =========================================== */

        if (
            mouse.x !== null &&
            mouse.y !== null
        ) {

            const dx =
                particle.x -
                mouse.x;


            const dy =
                particle.y -
                mouse.y;


            const distance =
                Math.sqrt(
                    dx * dx +
                    dy * dy
                );


            if (
                distance <
                mouse.radius &&
                distance >
                0.01
            ) {

                const directionX =
                    dx /
                    distance;


                const directionY =
                    dy /
                    distance;


                /*
                 * 0 = borda do campo
                 * 1 = exatamente no mouse
                 */

                const intensity =
                    1 -
                    (
                        distance /
                        mouse.radius
                    );


                /*
                 * Força principal de
                 * afastamento.
                 */

                const force =
                    intensity *
                    settings.mouseForce;


                particle.x +=
                    directionX *
                    force;


                particle.y +=
                    directionY *
                    force;


                /*
                 * Dá impulso ao movimento.
                 */

                particle.vx +=
                    directionX *
                    intensity *
                    0.035;


                particle.vy +=
                    directionY *
                    intensity *
                    0.035;

            }

        }


        /* ------------------------------------------
           LIMITA VELOCIDADE
        ------------------------------------------- */

        particle.vx =
            Math.max(
                -settings.maxSpeed,
                Math.min(
                    settings.maxSpeed,
                    particle.vx
                )
            );


        particle.vy =
            Math.max(
                -settings.maxSpeed,
                Math.min(
                    settings.maxSpeed,
                    particle.vy
                )
            );

    }


    /* =================================================
       DESENHA PARTICULA
       ================================================= */

    function drawParticle(
        particle
    ) {

        ctx.beginPath();


        ctx.arc(
            particle.x,
            particle.y,
            particle.size,
            0,
            Math.PI * 2
        );


        ctx.fillStyle =
            `rgba(
                96,
                165,
                250,
                ${particle.alpha}
            )`;


        ctx.shadowBlur =
            9;


        ctx.shadowColor =
            "rgba(59,130,246,0.55)";


        ctx.fill();


        ctx.shadowBlur =
            0;

    }


    /* =================================================
       LINHAS ENTRE PARTICULAS
       ================================================= */

    function drawConnections() {

        for (
            let i = 0;
            i < particles.length;
            i++
        ) {

            for (
                let j = i + 1;
                j < particles.length;
                j++
            ) {

                const a =
                    particles[i];

                const b =
                    particles[j];


                const dx =
                    a.x -
                    b.x;


                const dy =
                    a.y -
                    b.y;


                const distance =
                    Math.sqrt(
                        dx * dx +
                        dy * dy
                    );


                if (
                    distance <
                    settings.maxDistance
                ) {

                    const opacity =
                        (
                            1 -
                            (
                                distance /
                                settings.maxDistance
                            )
                        ) *
                        0.16;


                    ctx.beginPath();


                    ctx.moveTo(
                        a.x,
                        a.y
                    );


                    ctx.lineTo(
                        b.x,
                        b.y
                    );


                    ctx.strokeStyle =
                        `rgba(
                            96,
                            165,
                            250,
                            ${opacity}
                        )`;


                    ctx.lineWidth =
                        0.65;


                    ctx.stroke();

                }

            }

        }

    }


    /* =================================================
       CAMPO VISUAL DO MOUSE
       ================================================= */

    function drawMouseField() {

        if (
            mouse.x === null ||
            mouse.y === null
        ) {

            return;

        }


        const gradient =
            ctx.createRadialGradient(

                mouse.x,
                mouse.y,
                0,

                mouse.x,
                mouse.y,
                mouse.radius

            );


        gradient.addColorStop(
            0,
            "rgba(59,130,246,0.07)"
        );


        gradient.addColorStop(
            0.35,
            "rgba(59,130,246,0.035)"
        );


        gradient.addColorStop(
            1,
            "rgba(59,130,246,0)"
        );


        ctx.beginPath();


        ctx.arc(
            mouse.x,
            mouse.y,
            mouse.radius,
            0,
            Math.PI * 2
        );


        ctx.fillStyle =
            gradient;


        ctx.fill();

    }


    /* =================================================
       ANIMAÇÃO
       ================================================= */

    function animateParticles() {

        ctx.clearRect(
            0,
            0,
            width,
            height
        );


        particles.forEach(
            (particle) => {

                updateParticle(
                    particle
                );


                drawParticle(
                    particle
                );

            }
        );


        drawConnections();

        drawMouseField();


        animationFrame =
            requestAnimationFrame(
                animateParticles
            );

    }


    /* =================================================
       MOUSE
       ================================================= */

    window.addEventListener(
        "mousemove",
        (event) => {

            mouse.x =
                event.clientX;

            mouse.y =
                event.clientY;

        },
        {
            passive:
                true
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


    /* =================================================
       TOUCH
       ================================================= */

    window.addEventListener(
        "touchmove",
        (event) => {

            if (
                !event.touches ||
                !event.touches.length
            ) {

                return;

            }


            mouse.x =
                event.touches[0].clientX;


            mouse.y =
                event.touches[0].clientY;

        },
        {
            passive:
                true
        }
    );


    window.addEventListener(
        "touchend",
        () => {

            mouse.x =
                null;

            mouse.y =
                null;

        }
    );


    /* =================================================
       RESIZE
       ================================================= */

    window.addEventListener(
        "resize",
        resizeCanvas
    );


    /* =================================================
       ECONOMIA DE RECURSOS
       ================================================= */

    document.addEventListener(
        "visibilitychange",
        () => {

            if (
                document.hidden
            ) {

                if (
                    animationFrame
                ) {

                    cancelAnimationFrame(
                        animationFrame
                    );

                    animationFrame =
                        null;

                }

            } else {

                if (
                    !animationFrame
                ) {

                    animateParticles();

                }

            }

        }
    );


    /* =================================================
       START
       ================================================= */

    resizeCanvas();

    animateParticles();

}


/* =========================================================
   LOG
   ========================================================= */

console.log(
    "WM Portfolio V4 carregado."
);
