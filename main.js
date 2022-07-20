const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const songs = [
    {
        name: "Click Pow Get Down",
        singer: "Raftaar x Fortnite",
        path: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        image: "https://i.ytimg.com/vi/jTLhQf5KJSc/maxresdefault.jpg"
    },
    {
        name: "Tu Phir Se Aana",
        singer: "Raftaar x Salim Merchant x Karma",
        path: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        image:
            "https://1.bp.blogspot.com/-kX21dGUuTdM/X85ij1SBeEI/AAAAAAAAKK4/feboCtDKkls19cZw3glZWRdJ6J8alCm-gCNcBGAsYHQ/s16000/Tu%2BAana%2BPhir%2BSe%2BRap%2BSong%2BLyrics%2BBy%2BRaftaar.jpg"
    },
    {
        name: "Naachne Ka Shaunq",
        singer: "Raftaar x Brobha V",
        path:
            "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
        image: "https://i.ytimg.com/vi/QvswgfLDuPg/maxresdefault.jpg"
    },
    {
        name: "Mantoiyat",
        singer: "Raftaar x Nawazuddin Siddiqui",
        path: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
        image:
            "https://a10.gaanacdn.com/images/song/39/24225939/crop_480x480_1536749130.jpg"
    },
    {
        name: "Aage Chal",
        singer: "Raftaar",
        path: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
        image:
            "https://a10.gaanacdn.com/images/albums/72/3019572/crop_480x480_3019572.jpg"
    },
    {
        name: "Damn",
        singer: "Raftaar x kr$na",
        path:
            "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
        image:
            "https://filmisongs.xyz/wp-content/uploads/2020/07/Damn-Song-Raftaar-KrNa.jpg"
    },
    {
        name: "Feeling You",
        singer: "Raftaar x Harjas",
        path: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
        image:
            "https://a10.gaanacdn.com/gn_img/albums/YoEWlabzXB/oEWlj5gYKz/size_xxl_1586752323.webp"
    }
]
let currentIndex = 0
const player = $('.player')
const title = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const cd = $('.cd');
const playBtn = $('.btn-toggle-play')
const progress = $('.progress')
const prevBtn = $('.btn-prev')
const nextBtn = $('.btn-next')
const randomBtn = $('.btn-random')
const repeatBtn = $('.btn-repeat')
let isRandom = false;
let isRepeat = false;

const loadCurrentSong = () => {
    title.innerHTML = currentSong.name;
    cdThumb.style.backgroundImage = `url('${currentSong.image}')`
    audio.src = currentSong.path
    renderList()
}

const handleEvents = () => {
    const cdWidth = cd.offsetWidth;
    let isPlaying = false;
    document.onscroll = () => {
        const scroll = window.scrollY;
        const newWidth = cdWidth - scroll;
        cd.style.width = newWidth > 0 ? newWidth : 0;
        cd.style.opacity = newWidth / cdWidth;
    }

    const handlePlay = () => {
        isPlaying = !isPlaying
        if (isPlaying) {
            audio.play()
        } else {
            audio.pause()
        }
    }
    audio.onplay = () => {
        player.classList.add('playing')
        cdAnimation.play()
    }
    audio.onpause = () => {
        player.classList.remove('playing')
        cdAnimation.pause()
    }

    playBtn.onclick = () => {
        handlePlay();
    }

    prevBtn.onclick = () => {
        if (isRandom) {
            handleRandom();
        } else {
            currentIndex--;
            if (currentIndex <= 0) {
                currentIndex = songs.length - 1;
            }
        }
        loadCurrentSong()
        scrollActiveSong()
        audio.play()
    }
    const handleRandom = () => {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * songs.length)
        } while (randomIndex === currentIndex)
        currentIndex = randomIndex;
    }
    const nextSong = () => {
        if (isRandom) {
            handleRandom();
        } if (isRepeat) {
            handleRepeat()
        } else {
            currentIndex++;
            if (currentIndex >= songs.length) {
                currentIndex = 0;
            }
        }
        loadCurrentSong()
        scrollActiveSong()
        audio.play()
    }
    const handleRepeat = () => {
        currentIndex = currentIndex;
    }
    repeatBtn.onclick = () => {
        isRepeat = !isRepeat
        repeatBtn.classList.toggle('active', isRepeat)
    }
    nextBtn.onclick = () => {
        nextSong()
    };
    randomBtn.onclick = () => {
        isRandom = !isRandom
        randomBtn.classList.toggle('active', isRandom)
    }
    let cdAnimation = cdThumb.animate([
        { transform: 'rotate(360deg)' }
    ], {
        duration: 10000,
        iterations: Infinity
    })
    cdAnimation.pause()

    audio.ontimeupdate = () => {
        if (audio.duration) {
            let currentProgress = audio.currentTime / audio.duration * 100;
            progress.value = currentProgress
        }

    }

    const scrollActiveSong = () => {
        $('.song.active').scrollIntoView({
            behavior: 'smooth',
            block: 'nearest'
        })
    }

    audio.onended = () => {
        nextSong()
    }

    progress.onchange = (e) => {
        audio.currentTime = audio.duration / 100 * e.target.value;
    }

}
const handleSong = (song) => {
    currentIndex = song
    loadCurrentSong()
    audio.play()
}

const defineProperties = () => {
    Object.defineProperty(this, 'currentSong', {
        get: function () {
            return songs[currentIndex];
        }
    })
}

const start = () => {
    handleEvents()
    defineProperties()
    loadCurrentSong()
}

const renderList = () => {
    const html = songs.map((item, index) => {
        return ` 
            <div class="song ${index === currentIndex ? 'active' : ''}" onclick = "handleSong(${index})">
                <div class="thumb" style="background-image: url('${item.image}')">
                </div>
                <div class="body">
                    <h3 class="title">${item.name}</h3>
                    <p class="author">${item.singer}</p>
                </div>
                <div class="option">
                    <i class="fas fa-ellipsis-h"></i>
                </div>
            </div>
        `
    })
    $('.playlist').innerHTML = html.join("");
}

start();