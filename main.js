const header = document.querySelector(".header");

window.addEventListener("scroll",function(){

    if(window.scrollY > 50){
        header.classList.add("scrolled");
    }else{
        header.classList.remove("scrolled");
    }

});

document.addEventListener("DOMContentLoaded", () => {

    const slides = document.querySelectorAll('.main-visual .slide');
    const dots = document.querySelectorAll('.main-pagination span');
    const playBtn = document.querySelector('.main-play');

    if (!slides.length || !dots.length) return;

    let currentIndex = 0;
    let autoSlide;
    let isPlaying = true;

    function showSlide(index) {

        if(index < 0){
            index = slides.length - 1;
        }

        if(index >= slides.length){
            index = 0;
        }

        slides.forEach(slide => {

            slide.classList.remove('active');

        });

        dots.forEach(dot => {

            dot.classList.remove('active');

        });

        slides[index].classList.add('active');
        dots[index].classList.add('active');

        currentIndex = index;

    }

    function nextSlide(){

        showSlide(currentIndex + 1);

    }

    function prevSlide(){

        showSlide(currentIndex - 1);

    }

    function startAutoSlide(){

        clearInterval(autoSlide);

        autoSlide = setInterval(() => {

            nextSlide();

        }, 4000);

        isPlaying = true;

        if(playBtn){
            playBtn.classList.remove('paused');
        }

    }

    function stopAutoSlide(){

        clearInterval(autoSlide);

        isPlaying = false;

        if(playBtn){
            playBtn.classList.add('paused');
        }

    }

    dots.forEach((dot,index) => {

        dot.addEventListener('click', () => {

            showSlide(index);

            if(isPlaying){

                startAutoSlide();

            }

        });

    });

    if(playBtn){

        playBtn.addEventListener('click', () => {

            if(isPlaying){

                stopAutoSlide();

            }else{

                startAutoSlide();

            }

        });

    }

    const prevBtns = document.querySelectorAll('.previous-model');
    const nextBtns = document.querySelectorAll('.next-model');

    prevBtns.forEach(btn => {

        btn.addEventListener('click', () => {

            prevSlide();

            if(isPlaying){

                startAutoSlide();

            }

        });

    });

    nextBtns.forEach(btn => {

        btn.addEventListener('click', () => {

            nextSlide();

            if(isPlaying){

                startAutoSlide();

            }

        });

    });

    let startX = 0;

    const mainVisual = document.querySelector('.main-visual');

    mainVisual.addEventListener('touchstart', (e) => {

        startX = e.touches[0].clientX;

    });

    mainVisual.addEventListener('touchend', (e) => {

    const endX = e.changedTouches[0].clientX;
        const gap = startX - endX;

        if(gap > 50){

            nextSlide();

        }

        if(gap < -50){

            prevSlide();

        }

        if(isPlaying){

            startAutoSlide();

        }

    });

    showSlide(0);
    startAutoSlide();

});

document.addEventListener('DOMContentLoaded', () => {

    if (window.innerWidth <= 768) return;

    const elecWrap = document.querySelector('.elec-car-right');

    if (!elecWrap) return;

    if (elecWrap.querySelector('.elec-car-track')) return;

    const cards = [...elecWrap.querySelectorAll('.car-card')];

    if (!cards.length) return;

    let currentIndex = 0;

    const track = document.createElement("div");
    track.className = "elec-car-track";

    cards.forEach((card) => {

        track.appendChild(card);

    });

    elecWrap.prepend(track);

    const prevBtn = document.createElement('button');
    const nextBtn = document.createElement('button');

    prevBtn.className = 'elec-prev';
    nextBtn.className = 'elec-next';

    prevBtn.innerHTML = '&#10094;';
    nextBtn.innerHTML = '&#10095;';

    elecWrap.appendChild(prevBtn);
    elecWrap.appendChild(nextBtn);

    const dotsWrap = document.createElement('div');
    dotsWrap.className = 'elec-dots';

    cards.forEach((_, index) => {

        const dot = document.createElement('button');

        if (index === 0) {
            dot.classList.add('active');
        }

        dot.addEventListener('click', () => {

            currentIndex = index;
            updateSlide();

        });

        dotsWrap.appendChild(dot);

    });

    elecWrap.appendChild(dotsWrap);

    const dots = dotsWrap.querySelectorAll('button');

    function updateSlide() {

        track.style.transform =
            `translateX(-${currentIndex * 100}%)`;

        dots.forEach((dot, index) => {

            dot.classList.remove('active');

            if (index === currentIndex) {
                dot.classList.add('active');
            }

        });

    }

    prevBtn.addEventListener('click', () => {

        currentIndex--;

        if (currentIndex < 0) {
            currentIndex = cards.length - 1;
        }

        updateSlide();

    });

    nextBtn.addEventListener('click', () => {

        currentIndex++;

        if (currentIndex >= cards.length) {
            currentIndex = 0;
        }

        updateSlide();

    });

    updateSlide();

});

document.addEventListener("DOMContentLoaded", () => {

    const eventWrap = document.querySelector(".event-list");

    if(!eventWrap) return;

    const track = eventWrap.querySelector("ul");
    const items = [...track.querySelectorAll("li")];

    if(!track || !items.length) return;

    let currentIndex = 0;

    function isMobile(){

        return window.innerWidth <= 768;

    }

    function getVisibleCount(){

        return isMobile() ? 1 : 3;

    }

    function getMaxIndex(){

        return Math.ceil(items.length / getVisibleCount()) - 1;

    }

    const prevBtn = document.createElement("button");
    const nextBtn = document.createElement("button");

    prevBtn.className = "event-prev";
    nextBtn.className = "event-next";

    prevBtn.innerHTML = "‹";
    nextBtn.innerHTML = "›";

    eventWrap.appendChild(prevBtn);
    eventWrap.appendChild(nextBtn);

    const dotsWrap = document.createElement("div");

    dotsWrap.className = "event-dots";

    eventWrap.appendChild(dotsWrap);

    function createDots(){

        dotsWrap.innerHTML = "";

        for(let i = 0; i <= getMaxIndex(); i++){

            const dot = document.createElement("button");

            if(i === currentIndex){

                dot.classList.add("active");

            }

            dot.addEventListener("click", () => {

                currentIndex = i;

                updateSlide();

            });

            dotsWrap.appendChild(dot);

        }

    }

    function updateSlide(){

        const visibleCount = getVisibleCount();

        const itemWidth =
            items[0].getBoundingClientRect().width;

        const gap = isMobile() ? 0 : 28;

        const moveX =
            (itemWidth + gap) *
            currentIndex *
            visibleCount;

        track.style.transform =
            `translateX(-${moveX}px)`;

        const dots =
            dotsWrap.querySelectorAll("button");

        dots.forEach(dot => {

            dot.classList.remove("active");

        });

        if(dots[currentIndex]){

            dots[currentIndex]
                .classList.add("active");

        }

        prevBtn.style.display = "flex";
        nextBtn.style.display = "flex";

    }

    prevBtn.addEventListener("click", () => {

        currentIndex--;

        if(currentIndex < 0){

            currentIndex = getMaxIndex();

        }

        updateSlide();

    });

    nextBtn.addEventListener("click", () => {

        currentIndex++;

        if(currentIndex > getMaxIndex()){

            currentIndex = 0;

        }

        updateSlide();

    });

    let startX = 0;

    track.addEventListener("touchstart", (e) => {

        if(!isMobile()) return;

        startX = e.touches[0].clientX;

    });

    track.addEventListener("touchend", (e) => {

        if(!isMobile()) return;

        const endX =
            e.changedTouches[0].clientX;

        const gap = startX - endX;

        if(gap > 40){

            currentIndex++;

            if(currentIndex > getMaxIndex()){

                currentIndex = 0;

            }

        }

        if(gap < -40){

            currentIndex--;

            if(currentIndex < 0){

                currentIndex = getMaxIndex();

            }

        }

        updateSlide();

    });

    window.addEventListener("resize", () => {

        currentIndex = 0;

        createDots();
        updateSlide();

    });

    createDots();
    updateSlide();

});

document.addEventListener("DOMContentLoaded", () => {

    if (window.innerWidth > 1200) return;

    const model = document.querySelector(".model");

    if(model){

        document.querySelectorAll(".model-content").forEach(section=>{

            const left = section.querySelector(".model-content-left");
            const right = section.querySelector(".model-content-right");

            if(!left || !right) return;

            const leftImg = left.querySelector("img");
            const title = right.querySelector(".model-text strong");
            const subs = right.querySelectorAll(".sub-model");

            if(!leftImg || !title || subs.length < 2) return;

            const data = [
                {
                    rank:"1위",
                    img:leftImg.src,
                    text:title.innerText
                },
                {
                    rank:"2위",
                    img:subs[0].querySelector("img").src,
                    text:subs[0].querySelector("p").innerText
                },
                {
                    rank:"3위",
                    img:subs[1].querySelector("img").src,
                    text:subs[1].querySelector("p").innerText
                }
            ];

            left.innerHTML = `
                <div class="model-slide-wrap">

                    <button class="model-prev"></button>

                    <div class="model-slide"></div>

                    <button class="model-next"></button>

                </div>

                <div class="model-dots">
                    <button class="active"></button>
                    <button></button>
                    <button></button>
                </div>
            `;

            const slide = left.querySelector(".model-slide");
            const dots = left.querySelectorAll(".model-dots button");

            function render(idx){

                slide.innerHTML = `
                    <span>${data[idx].rank}</span>
                    <img src="${data[idx].img}" alt="">
                    <strong>${data[idx].text}</strong>
                `;

                dots.forEach(dot=>dot.classList.remove("active"));
                dots[idx].classList.add("active");

            }

            let currentIndex = 0;
            render(0);
            left.style.marginTop = "0";

            dots.forEach((dot,index)=>{

                dot.addEventListener("click",()=>{

                     currentIndex = index;
                     render(currentIndex);

                });

            });

            const prevBtn = left.querySelector(".model-prev");
            const nextBtn = left.querySelector(".model-next");

            prevBtn.addEventListener("click", () => {

                currentIndex--;

                if(currentIndex < 0){
                    currentIndex = data.length - 1;
                }

                render(currentIndex);

            });

            nextBtn.addEventListener("click", () => {

                currentIndex++;

                if(currentIndex >= data.length){
                    currentIndex = 0;
                }

                render(currentIndex);

            });

        });

    }

    const elecWrap = document.querySelector(".elec-car-right");

    if(elecWrap && !elecWrap.querySelector('.elec-car-track')){

        const cards = [...elecWrap.querySelectorAll(".car-card")];

        if(cards.length){

            const track = document.createElement("div");
            track.className = "elec-car-track";

            cards.forEach((card) => {

                track.appendChild(card);

            });

            elecWrap.appendChild(track);

            const progress = document.createElement("div");
            progress.className = "elec-progress";

            cards.forEach((_,i)=>{

                const btn = document.createElement("button");

                if(i===0) btn.classList.add("active");

                btn.addEventListener("click",()=>{

                    moveElec(i);

                });

                progress.appendChild(btn);

            });

            elecWrap.appendChild(progress);

            const dots = progress.querySelectorAll("button");

            let current = 0;

            function moveElec(idx){

                current = idx;

                const gap = 16;
                const cardStyle = getComputedStyle(cards[0]);
                const width =
                    cards[0].offsetWidth +
                    parseInt(cardStyle.marginRight || 0) +
                    gap;

                track.style.transform =
                    `translateX(-${width * idx}px)`;

                dots.forEach(dot=>dot.classList.remove("active"));
                dots[idx].classList.add("active");

            }

            let startX = 0;

            track.addEventListener("touchstart", e=>{

                startX = e.touches[0].clientX;

            });

            track.addEventListener("touchend", e=>{

                const endX = e.changedTouches[0].clientX;
                const gap = startX - endX;

                if(gap > 40 && current < cards.length - 1){
                    moveElec(current + 1);
                }

                if(gap < -40 && current > 0){
                    moveElec(current - 1);
                }

            });

        }

    }

});

document.addEventListener("DOMContentLoaded", () => {

    if(window.innerWidth > 1200) return;

    const brand = document.querySelector(".brand");

    if(!brand) return;

    const track = brand.querySelector("ul");
    const items = [...track.querySelectorAll("li")];

    if(!track || !items.length) return;

    let currentIndex = 0;

    function getVisibleCount(){

        return window.innerWidth <= 768 ? 1 : 2;

    }

    function getMaxIndex(){

        return Math.ceil(items.length / getVisibleCount()) - 1;

    }

    const prevBtn = document.createElement("button");
    const nextBtn = document.createElement("button");

    prevBtn.className = "brand-prev";
    nextBtn.className = "brand-next";

    brand.appendChild(prevBtn);
    brand.appendChild(nextBtn);

    const dotsWrap = document.createElement("div");
    dotsWrap.className = "brand-dots";

    function createDots(){

        dotsWrap.innerHTML = "";

        for(let i = 0; i <= getMaxIndex(); i++){

            const dot = document.createElement("button");

            if(i === currentIndex){

                dot.classList.add("active");

            }

            dot.addEventListener("click", () => {

                currentIndex = i;

                updateSlide();

            });

            dotsWrap.appendChild(dot);

        }

    }

    createDots();

    brand.querySelector(".inner").appendChild(dotsWrap);

    function updateSlide(){

        let moveX = 0;

        if(window.innerWidth <= 768){

            moveX = items[0].offsetWidth * currentIndex;

        }else{

            const itemWidth = items[0].offsetWidth;
            const gap = 24;

            moveX = (itemWidth + gap) * currentIndex * getVisibleCount();

        }

        track.style.transform = `translateX(-${moveX}px)`;

        const dots = dotsWrap.querySelectorAll("button");

        dots.forEach(dot => {

            dot.classList.remove("active");

        });

        if(dots[currentIndex]){

            dots[currentIndex].classList.add("active");

        }

    }

    prevBtn.addEventListener("click", () => {

        currentIndex--;

        if(currentIndex < 0){

            currentIndex = getMaxIndex();

        }

        updateSlide();

    });

    nextBtn.addEventListener("click", () => {

        currentIndex++;

        if(currentIndex > getMaxIndex()){

            currentIndex = 0;

        }

        updateSlide();

    });

    window.addEventListener("resize", () => {

        currentIndex = 0;

        createDots();

        updateSlide();

    });

    updateSlide();

});

document.addEventListener("DOMContentLoaded", () => {

    if (window.innerWidth <= 768) return;

    const quickMenu = document.querySelector(".quick-menu");
    const prevBtn = document.querySelector(".quick-prev");
    const nextBtn = document.querySelector(".quick-next");

    if (!quickMenu || !prevBtn || !nextBtn) return;

    let current = 0;

    function moveMenu(index){

        if(index < 0){
            index = 0;
        }

        if(index > 1){
            index = 1;
        }

        current = index;

        quickMenu.style.transform =
            `translateX(-${current * 756}px)`;

    }

    nextBtn.addEventListener("click", () => {

        moveMenu(current + 1);

    });

    prevBtn.addEventListener("click", () => {

        moveMenu(current - 1);

    });

});

document.addEventListener("DOMContentLoaded", () => {

    const footerBtn = document.querySelector(".footer-toggle-btn");
    const footerContent = document.querySelector(".footer-toggle-content");

    if(!footerBtn || !footerContent) return;

    footerBtn.addEventListener("click", () => {

        footerBtn.classList.toggle("active");

        footerContent.classList.toggle("active");

    });

});

document.addEventListener("DOMContentLoaded", () => {

    const awardBtn = document.querySelector(".award-toggle-btn");
    const awardContent = document.querySelector(".bottom-bottom");

    if(!awardBtn || !awardContent) return;

    awardBtn.addEventListener("click", () => {

        awardBtn.classList.toggle("active");

        awardContent.classList.toggle("active");

    });

});

const swipeTargets = document.querySelectorAll('.shop-story-wrap, .best-products-wrap');

swipeTargets.forEach((target) => {

    let isDown = false;
    let startX;
    let scrollLeft;

    target.addEventListener('mousedown', (e) => {

        isDown = true;
        startX = e.pageX - target.offsetLeft;
        scrollLeft = target.scrollLeft;

    });

    target.addEventListener('mouseleave', () => {

        isDown = false;

    });

    target.addEventListener('mouseup', () => {

        isDown = false;

    });

    target.addEventListener('mousemove', (e) => {

        if(!isDown) return;

        e.preventDefault();

        const x = e.pageX - target.offsetLeft;
        const walk = (x - startX) * 1.5;

        target.scrollLeft = scrollLeft - walk;

    });

    let touchStartX = 0;
    let touchScroll = 0;

    target.addEventListener('touchstart', (e) => {

        touchStartX = e.touches[0].clientX;
        touchScroll = target.scrollLeft;

    }, { passive:true });

    target.addEventListener('touchmove', (e) => {

        const touchX = e.touches[0].clientX;
        const move = touchStartX - touchX;

        target.scrollLeft = touchScroll + move;

    }, { passive:true });

});