const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
});

const galleryData = {
    industrial: {
        title: "Industrial Maintenance Systems",
        images: [
            "https://sc04.alicdn.com/kf/Sd5fe1a1aeeae4577b47e0ecc671fd01fG/285646020/Sd5fe1a1aeeae4577b47e0ecc671fd01fG.png",
            "https://sc04.alicdn.com/kf/A0507ef74565a46dfb7b1e21d4778f856N/285646020/A0507ef74565a46dfb7b1e21d4778f856N.png",
            "https://sc04.alicdn.com/kf/Af44b1f10370246b8bdcba18412d92752H/285646020/Af44b1f10370246b8bdcba18412d92752H.png",
            "https://sc04.alicdn.com/kf/Ae74cfaf34a7f4167940c62d250893e12p/285646020/Ae74cfaf34a7f4167940c62d250893e12p.png",
            "https://sc04.alicdn.com/kf/A6c6292ae9a924eeeb8ef864130f3ad1fL/285646020/A6c6292ae9a924eeeb8ef864130f3ad1fL.png"
        ]
    },
    food: {
        title: "Food Preservation Technology",
        images: [
            "https://sc04.alicdn.com/kf/Hbc19656d83b044188db4030739691e40d/285646020/Hbc19656d83b044188db4030739691e40d.png",
            "https://sc04.alicdn.com/kf/A5765398e9f564130ae2eb6152c924302I/285646020/A5765398e9f564130ae2eb6152c924302I.png",
            "https://sc04.alicdn.com/kf/A3f2e14f9ade041ccbbee184bb8c0c770Q/285646020/A3f2e14f9ade041ccbbee184bb8c0c770Q.png",
            "https://sc04.alicdn.com/kf/A4256ae77c0b944628a629518cbaf38cev/285646020/A4256ae77c0b944628a629518cbaf38cev.png",
            "https://sc04.alicdn.com/kf/A4eed7bf9dcdd4edab98ec0c37f4ad0eee/285646020/A4eed7bf9dcdd4edab98ec0c37f4ad0eee.png"
        ]
    },
    logistics: {
        title: "Logistics & Support",
        images: [
            "https://sc04.alicdn.com/kf/A0812d4542b6a40e7932bc78ff8764f95U/285646020/A0812d4542b6a40e7932bc78ff8764f95U.png",
            "https://sc04.alicdn.com/kf/A24f6a7dfb3cb4f41a196ea51ed879304Z/285646020/A24f6a7dfb3cb4f41a196ea51ed879304Z.png",
            "https://sc04.alicdn.com/kf/Scc885abcfc4448f9a6f25d3fd1574d70F/285646020/Scc885abcfc4448f9a6f25d3fd1574d70F.png",
            "https://sc04.alicdn.com/kf/Aee14abb548d448f1ac8559a0ffc2e588M/285646020/Aee14abb548d448f1ac8559a0ffc2e588M.png"
        ]
    },
    compliance: {
        title: "Compliance & Supply Chain",
        images: [
            "https://sc04.alicdn.com/kf/H3aecaceeb98e4dbd9204e90c5480137av/285646020/H3aecaceeb98e4dbd9204e90c5480137av.jpg",
            "https://sc04.alicdn.com/kf/H6df51c521ce84b82816a5e785c1926d46/285646020/H6df51c521ce84b82816a5e785c1926d46.png",
            "https://sc04.alicdn.com/kf/Aa9079baa4bfe4c72988b7884d4bd2710H/285646020/Aa9079baa4bfe4c72988b7884d4bd2710H.jpg"
        ]
    }
};

const modal = document.getElementById("galleryModal");
const modalTitle = document.getElementById("galleryTitle");
const swiperWrapper = document.getElementById("swiperWrapper");
const closeBtn = document.querySelector(".close-modal");
let swiperInstance = null;

document.querySelectorAll(".service-card").forEach(card => {
    card.addEventListener("click", () => {
        const type = card.getAttribute("data-gallery");
        const data = galleryData[type];
        if (data) {
            modalTitle.innerText = data.title;
            swiperWrapper.innerHTML = "";
            data.images.forEach(src => {
                const slide = document.createElement("div");
                slide.className = "swiper-slide";
                slide.innerHTML = `<img src="${src}" class="gallery-img">`;
                swiperWrapper.appendChild(slide);
            });
            modal.style.display = "block";
            document.body.style.overflow = "hidden";
            if (swiperInstance) swiperInstance.destroy();
            swiperInstance = new Swiper(".mySwiper", {
                loop: true,
                autoplay: { delay: 3000, disableOnInteraction: false },
                pagination: { el: ".swiper-pagination", clickable: true },
                navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
            });
        }
    });
});

closeBtn.onclick = () => { modal.style.display = "none"; document.body.style.overflow = "auto"; };
window.onclick = (e) => { if (e.target == modal) { modal.style.display = "none"; document.body.style.overflow = "auto"; } };
