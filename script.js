const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
});

const galleryData = {
    industrial: {
        title: "Industrial Maintenance Systems Gallery",
        images: [
            "https://sc04.alicdn.com/kf/Sf99e84300dbb456b877de165a0c42020t/285646020/Sf99e84300dbb456b877de165a0c42020t.png",
            "https://sc04.alicdn.com/kf/A0507ef74565a46dfb7b1e21d4778f856N/285646020/A0507ef74565a46dfb7b1e21d4778f856N.png",
            "https://sc04.alicdn.com/kf/Hbc19656d83b044188db4030739691e40d/285646020/Hbc19656d83b044188db4030739691e40d.png",
            "https://sc04.alicdn.com/kf/Af44b1f10370246b8bdcba18412d92752H/285646020/Af44b1f10370246b8bdcba18412d92752H.png",
            "https://sc04.alicdn.com/kf/A5765398e9f564130ae2eb6152c924302I/285646020/A5765398e9f564130ae2eb6152c924302I.png",
            "https://sc04.alicdn.com/kf/Ae74cfaf34a7f4167940c62d250893e12p/285646020/Ae74cfaf34a7f4167940c62d250893e12p.png",
            "https://sc04.alicdn.com/kf/A3f2e14f9ade041ccbbee184bb8c0c770Q/285646020/A3f2e14f9ade041ccbbee184bb8c0c770Q.png",
            "https://sc04.alicdn.com/kf/A4256ae77c0b944628a629518cbaf38cev/285646020/A4256ae77c0b944628a629518cbaf38cev.png",
            "https://sc04.alicdn.com/kf/A6c6292ae9a924eeeb8ef864130f3ad1fL/285646020/A6c6292ae9a924eeeb8ef864130f3ad1fL.png",
            "https://sc04.alicdn.com/kf/Ad81219bb768a4509bdcfdafb66842160D/285646020/Ad81219bb768a4509bdcfdafb66842160D.jpg",
            "https://sc04.alicdn.com/kf/A4eed7bf9dcdd4edab98ec0c37f4ad0eee/285646020/A4eed7bf9dcdd4edab98ec0c37f4ad0eee.png",
            "https://sc04.alicdn.com/kf/A284fe9de04a548c2b989ee71a1c53b8fE/285646020/A284fe9de04a548c2b989ee71a1c53b8fE.png",
            "https://sc04.alicdn.com/kf/A47b30366a16d468c929e68187feb7396u/285646020/A47b30366a16d468c929e68187feb7396u.png",
            "https://sc04.alicdn.com/kf/A0812d4542b6a40e7932bc78ff8764f95U/285646020/A0812d4542b6a40e7932bc78ff8764f95U.png",
            "https://sc04.alicdn.com/kf/A24f6a7dfb3cb4f41a196ea51ed879304Z/285646020/A24f6a7dfb3cb4f41a196ea51ed879304Z.png",
            "https://sc04.alicdn.com/kf/Scc885abcfc4448f9a6f25d3fd1574d70F/285646020/Scc885abcfc4448f9a6f25d3fd1574d70F.png",
            "https://sc04.alicdn.com/kf/Aee14abb548d448f1ac8559a0ffc2e588M/285646020/Aee14abb548d448f1ac8559a0ffc2e588M.png",
            "https://sc04.alicdn.com/kf/Af564a8d0ad9c4b958c226ce6e4505ec83/285646020/Af564a8d0ad9c4b958c226ce6e4505ec83.png",
            "https://sc04.alicdn.com/kf/Afe3f9832ab6f44da931970ec0af6b2eex/285646020/Afe3f9832ab6f44da931970ec0af6b2eex.png",
            "https://sc04.alicdn.com/kf/S801b00b2b71a41a894774d2df4a7b2f0H/285646020/S801b00b2b71a41a894774d2df4a7b2f0H.png",
            "https://sc04.alicdn.com/kf/H3aecaceeb98e4dbd9204e90c5480137av/285646020/H3aecaceeb98e4dbd9204e90c5480137av.jpg",
            "https://sc04.alicdn.com/kf/H6df51c521ce84b82816a5e785c1926d46/285646020/H6df51c521ce84b82816a5e785c1926d46.png",
            "https://sc04.alicdn.com/kf/Aa9079baa4bfe4c72988b7884d4bd2710H/285646020/Aa9079baa4bfe4c72988b7884d4bd2710H.jpg",
            "https://sc04.alicdn.com/kf/Hbfc306f58fda4c4fb318677cd98492d7b/285646020/Hbfc306f58fda4c4fb318677cd98492d7b.png"
        ]
    },
    food: {
        title: "Food Preservation Technology Gallery",
        images: [
            "https://sc04.alicdn.com/kf/A80511d1756f14d50a80e9ab87ef11077V/285646020/A80511d1756f14d50a80e9ab87ef11077V.jpg",
            "https://sc04.alicdn.com/kf/Ad4587e3dfefc4746bc37522d9b58ab72E/285646020/Ad4587e3dfefc4746bc37522d9b58ab72E.png",
            "https://sc04.alicdn.com/kf/H74b7b4e8a7264698beaff7154cc73439L/285646020/H74b7b4e8a7264698beaff7154cc73439L.png",
            "https://sc04.alicdn.com/kf/Aed062b0864ec46e89d4688b32350cb57C/285646020/Aed062b0864ec46e89d4688b32350cb57C.png",
            "https://sc04.alicdn.com/kf/A398762d4c10c4c7b942912cc35aa3f62x/285646020/A398762d4c10c4c7b942912cc35aa3f62x.jpg",
            "https://sc04.alicdn.com/kf/A51bb70af5e3046cfab8b34b206fa4482m/285646020/A51bb70af5e3046cfab8b34b206fa4482m.jpg",
            "https://sc04.alicdn.com/kf/A1cc8f71789114c1a8fc57b0def33d8b0Z/285646020/A1cc8f71789114c1a8fc57b0def33d8b0Z.png",
            "https://sc04.alicdn.com/kf/Ac7a8a66a596c4546af0f1c6fb51d22b56/285646020/Ac7a8a66a596c4546af0f1c6fb51d22b56.jpg",
            "https://sc04.alicdn.com/kf/A100b951948d241559a247f85528cf6a89/285646020/A100b951948d241559a247f85528cf6a89.jpg",
            "https://sc04.alicdn.com/kf/Aeeedd4cf4080436bb212ba0413a0b92bE/285646020/Aeeedd4cf4080436bb212ba0413a0b92bE.png",
            "https://sc04.alicdn.com/kf/A2f03e3fe872747bda705b854749ea861L/285646020/A2f03e3fe872747bda705b854749ea861L.png"
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
                autoplay: { delay: 2500, disableOnInteraction: false },
                pagination: { el: ".swiper-pagination", clickable: true },
                navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
            });
        }
    });
});

closeBtn.onclick = () => { modal.style.display = "none"; document.body.style.overflow = "auto"; };
window.onclick = (e) => { if (e.target == modal) { modal.style.display = "none"; document.body.style.overflow = "auto"; } };
