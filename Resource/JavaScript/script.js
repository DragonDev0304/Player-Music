const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// DOM element
const player = $('#website');
const cd = $('#CD');
const nameSong = $("#header__songName");
const imageSong = $("#CD__image");
const audioSong = $("#audio");
const playButton = $('#control__play-pause');
const progressSong = $('#progress');
const prevButton = $('#control__previous');
const nextButton = $('#control__next');
const randomButton = $('#control__random');
const repeatButton = $('#control__repeat');
const songList = $('#songList');

const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    songs: [
        {
            name: "Lemon Tree",
            singer: "Fools Garden",
            path: "./Resource/Audio/lemon-tree.mp3",
            image: "./Resource/Image/sing-5.jpg"
        },
        {
            name: "Anh chưa đủ tư cách",
            singer: "Lý Tuấn Kiệt",
            path: "./Resource/Audio/anh-chua-du-tu-cach.mp3",
            image: "./Resource/Image/sing-0.jpg"
        },
        {
            name: "Anh đã khóc vì em",
            singer: "Đinh Tùng Huy",
            path: "./Resource/Audio/anh-da-khoc-vi-em.mp3",
            image: "./Resource/Image/sing-1.jpg"
        },
        {
            name: "Chỉ vì anh quá thương em",
            singer: "Hải Nam",
            path: "./Resource/Audio/chi-vi-anh-qua-thuong-em.mp3",
            image: "./Resource/Image/sing-2.jpg"
        },
        {
            name: "Em nào có tội",
            singer: "Thương Võ",
            path: "./Resource/Audio/em-nao-co-toi.mp3",
            image: "./Resource/Image/sing-3.jpg"
        },
        {
            name: "Fallen Kingdom",
            singer: "Gustixa ft. Shalom Margaret",
            path: "./Resource/Audio/fallen-kingdom.mp3",
            image: "./Resource/Image/sing-4.jpg"
        },
        {
            name: "Phận duyên lỡ làng",
            singer: "Phát Huy t4",
            path: "./Resource/Audio/phan-duyen-lo-lang.mp3",
            image: "./Resource/Image/sing-6.jpg"
        },
        {
            name: "Sapient Dream",
            singer: "sapientdream",
            path: "./Resource/Audio/sapient-dream.mp3",
            image: "./Resource/Image/sing-7.jpg"
        },
        {
            name: "Thê lương",
            singer: "Phúc Chinh",
            path: "./Resource/Audio/the-luong.mp3",
            image: "./Resource/Image/sing-8.jpg"
        },
        {
            name: "Cứ ngỡ",
            singer: "Hoài Bảo ft Hương Ly",
            path: "./Resource/Audio/cu-ngo.mp3",
            image: "./Resource/Image/sing-9.jpg"
        },
        {
            name: "Họ yêu ai mất rồi",
            singer: "Doãn Hiêu",
            path: "./Resource/Audio/ho-yeu-ai-mat-roi.mp3",
            image: "./Resource/Image/sing-10.jpg"
        },
        {
            name: "Hôm nay em cưới rồi",
            singer: "Khải Đăng",
            path: "./Resource/Audio/hom-nay-em-cuoi-roi.mp3",
            image: "./Resource/Image/sing-11.jpg"
        },
        {
            name: "Late Night",
            singer: "EA7",
            path: "./Resource/Audio/late-night.mp3",
            image: "./Resource/Image/sing-12.jpg"
        },
        {
            name: "Người lạ thoáng qua",
            singer: "Đinh Tùng Huy",
            path: "./Resource/Audio/nguoi-la-thoang-qua.mp3",
            image: "./Resource/Image/sing-13.jpg"
        },
        {
            name: "Phía sau một cô gái",
            singer: "Soobin Hoàng Sơn",
            path: "./Resource/Audio/phia-sau-1-co-gai.mp3",
            image: "./Resource/Image/sing-14.jpg"
        }
    ],
    render: function () {
        const html = this.songs.map((song, index) => {
            return `
                <li id="songList__item" class="songList__item" data-index="${index}">
                <div class="songList__item-image">
                    <img src="${song.image}" alt="image song item">
                </div>
                <div class="songList__item-information">
                    <h5 class="songList__item-songName">${song.name}</h5>
                    <h6 class="songList__item-authorName">${song.singer}</h6>
                </div>
                <button class="songList__item-menuButton"><i class="fas fa-ellipsis-h"></i></button>
                </li>
                `
        })
        $("#songList").innerHTML = html.join("");
    },
    defineProperties: function () {
        Object.defineProperty(this, "currentSong", {
            get: function () {
                return this.songs[this.currentIndex];
            }
        })
    },
    handleEvent: function () {
        // xử lý CD quay / dừng
        const cdAnimate = imageSong.animate([{ transform: `rotate(360deg)` }], { duration: 10000, iterations: Infinity });
        cdAnimate.pause();

        // xử lý phóng to / thu nhỏ CD
        const cdWidth = cd.offsetWidth;
        document.onscroll = function () {
            const scrollY = document.documentElement.scrollTop || window.scrollY;
            const newWidth = cdWidth - scrollY;
            if (newWidth <= 0) {
                cd.style.display = 'none';
            } else {
                cd.style.display = 'block';
                cd.style.width = newWidth + 'px';
                cd.style.opacity = newWidth / cdWidth;
            }
        }

        // xử lý click play
        playButton.onclick = () => {
            if (this.isPlaying) {
                audioSong.pause();
            } else {
                audioSong.play();
            }
        }

        // xử lý khi đang phát
        audioSong.onplay = () => {
            player.classList.add("playing");
            this.isPlaying = true;
            cdAnimate.play();
        }
        // xử lý khi dừng phát
        audioSong.onpause = () => {
            player.classList.remove("playing");
            this.isPlaying = false;
            cdAnimate.pause();
        }
        // xử lý thanh progress
        audioSong.ontimeupdate = () => {
            if (audioSong.duration) {
                progressSong.value = Math.floor(audioSong.currentTime / audioSong.duration * 100);
            }
        }
        // xử lý khi hết bài
        audioSong.onended = () => {
            if (this.isRepeat) {
                audioSong.play();
            } else nextButton.click();
        }
        // xử lý khi tua bài hát
        progressSong.onchange = function (e) {
            audioSong.currentTime = e.target.value / 100 * audioSong.duration;
        }

        // xử lý khi click previous button
        prevButton.onclick = () => {
            if (this.isRandom) {
                this.randomSong();
            } else {
                this.prevSong();
            }
            audioSong.play();
        }
        // xử lý khi click next button
        nextButton.onclick = () => {
            if (this.isRandom) {
                this.randomSong();
            } else {
                this.nextSong();
            }
            audioSong.play();
        }
        // xử lý khi click random button
        randomButton.onclick = () => {
            this.isRandom = !this.isRandom;
            randomButton.classList.toggle('active', this.isRandom);
        }
        // xử lý khi click repeat button
        repeatButton.onclick = () => {
            this.isRepeat = !this.isRepeat;
            repeatButton.classList.toggle('active', this.isRepeat);
        }
        // xử lý khi nhấn vào bài hát
        songList.onclick = (e) => {
            const songNode = e.target.closest('.songList__item:not(.activeSong)');
            if (songNode && !e.target.closest('.songList__item-menuButton')) {
                if (songNode) {
                    this.playSongByIndex(~~songNode.dataset.index);
                }
            }
        }
    },
    loadCurrentSong: function () {
        nameSong.textContent = this.currentSong.name;
        imageSong.style.backgroundImage = `url('${this.currentSong.image}')`;
        audioSong.src = this.currentSong.path;
        // active bài hát khi play
        for (let song of document.getElementsByClassName("songList__item")) {
            song.classList.remove("activeSong");
            if (+song.dataset.index === this.currentIndex) {
                song.classList.add("activeSong");
            }
        }
        this.scrollToActiveSong();
    },
    scrollToActiveSong: function () {
        setTimeout(() => {
            $('.songList__item.activeSong').scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }, 200)
    },
    prevSong: function () {
        this.currentIndex--;
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1;
        }
        this.loadCurrentSong();
    },
    nextSong: function () {
        this.currentIndex++;
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0;
        }
        this.loadCurrentSong();
    },
    randomSong: function () {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * this.songs.length)
        } while (newIndex === this.currentIndex)
        this.currentIndex = newIndex;
        this.loadCurrentSong();
    },
    playSongByIndex: function (index) {
        this.currentIndex = index;
        this.loadCurrentSong();
        audioSong.play();
    },
    start: function () {
        // định nghĩa các thuộc tính cho object app
        this.defineProperties();
        // lắng nghe và xử lý các sự kiện
        this.handleEvent();
        // render danh sách bài hát
        this.render();
        // load thông tin bài hát
        this.loadCurrentSong();
    }
}

app.start();