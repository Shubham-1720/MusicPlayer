console.log("Hello this is spotify")

//Initialize the variables
let songIndex = 1;
let audioelement = new Audio("./songs/1.mp3");
let masterplay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let songItems = Array.from(document.getElementsByClassName("songItem"));
let masterSongName = document.getElementById("masterSongName");
// console.log(songItems);

let songs = [

    { songName: "Let me love you", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
    { songName: "Shape of You", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
    { songName: "Uptown Funk", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
    { songName: "Hold On", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
    { songName: "Mirrors", filePath: "songs/5.mp3", coverPath: "covers/5.jpg" },
    { songName: "Counting Stars", filePath: "songs/6.mp3", coverPath: "covers/6.jpg" },
    { songName: "Dancing Queen", filePath: "songs/7.mp3", coverPath: "covers/7.jpg" },
    { songName: "Radioactive", filePath: "songs/8.mp3", coverPath: "covers/8.jpg" },
    { songName: "Happy", filePath: "songs/9.mp3", coverPath: "covers/9.jpg" },
    { songName: "Blinding Lights", filePath: "songs/10.mp3", coverPath: "covers/10.jpg" }


]

songItems.forEach((element, i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;

})


//Play and Pause
masterplay.addEventListener('click', () => {
    if (audioelement.paused || audioelement.currentTime <= 0) {
        audioelement.play();
        masterplay.classList.remove("fa-play");
        masterplay.classList.add("fa-pause");
        Array.from(document.getElementsByClassName("songItemPlay"))[songIndex-1].classList.remove("fa-play");
        Array.from(document.getElementsByClassName("songItemPlay"))[songIndex-1].classList.add("fa-pause");
        gif.style.opacity = 1;

    }
    else {
        audioelement.pause();
        masterplay.classList.remove("fa-pause");
        masterplay.classList.add("fa-play");
        Array.from(document.getElementsByClassName("songItemPlay"))[songIndex-1].classList.remove("fa-pause");
        Array.from(document.getElementsByClassName("songItemPlay"))[songIndex-1].classList.add("fa-play");
        gif.style.opacity = 0;
    }
})

//Listens the event
audioelement.addEventListener("timeupdate", () => {
    //upate seekbar
    let progress = parseInt((audioelement.currentTime / audioelement.duration) * 100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', () => {
    audioelement.currentTime = (myProgressBar.value * audioelement.duration) / 100
})

const makeAllPlay = () =>{
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
        element.classList.remove("fa-pause");  
        element.classList.add("fa-play");  
    })
}

Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        if ((audioelement.paused || audioelement.currentTime <= 0)) {
        songIndex = parseInt(e.target.id);
        makeAllPlay();
        e.target.classList.remove("fa-play");
        e.target.classList.add("fa-pause");
        audioelement.src = `./songs/${songIndex}.mp3`;
        audioelement.currentTime = 0;
        audioelement.play();
        masterplay.classList.remove("fa-play");
        masterplay.classList.add("fa-pause");
        gif.style.opacity = 1;
        masterSongName.innerHTML = songs[songIndex-1].songName;
    }
        else if((parseInt(e.target.id) == songIndex)){
            audioelement.pause();
            e.target.classList.remove("fa-pause");
            e.target.classList.add("fa-play");
            masterplay.classList.remove("fa-pause");
            masterplay.classList.add("fa-play");
            gif.style.opacity = 0;
        }

        else{
            songIndex = parseInt(e.target.id);
            makeAllPlay();
            e.target.classList.remove("fa-play");
            e.target.classList.add("fa-pause");
            audioelement.src = `./songs/${songIndex}.mp3`;
            audioelement.currentTime = 0;
            audioelement.play();
            masterplay.classList.remove("fa-play");
            masterplay.classList.add("fa-pause");
            gif.style.opacity = 1;
            masterSongName.innerHTML = songs[songIndex-1].songName;
        }
    })
})

//backward function
document.getElementById('backward').addEventListener('click', ()=>{
    if(songIndex<=1){

        songIndex = 1;
    }
    else{
        songIndex = songIndex - 1;
    }

    audioelement.src = `./songs/${songIndex}.mp3`;
    audioelement.currentTime = 0;
    audioelement.play();
    masterSongName.innerHTML = songs[songIndex-1].songName;
    makeAllPlay();
    Array.from(document.getElementsByClassName("songItemPlay"))[songIndex-1].classList.remove("fa-play");
    Array.from(document.getElementsByClassName("songItemPlay"))[songIndex-1].classList.add("fa-pause");
    masterplay.classList.remove("fa-play");
    masterplay.classList.add("fa-pause");
})

//forward function
document.getElementById('forward').addEventListener('click', ()=>{
    if(songIndex>=10){

        songIndex = 10;
    }
    else{
        songIndex += 1;
    }

    audioelement.src = `./songs/${songIndex}.mp3`;
    audioelement.currentTime = 0;
    audioelement.play();
    masterSongName.innerHTML = songs[songIndex-1].songName;
    makeAllPlay();
    Array.from(document.getElementsByClassName("songItemPlay"))[songIndex-1].classList.remove("fa-play");
    Array.from(document.getElementsByClassName("songItemPlay"))[songIndex-1].classList.add("fa-pause");
    masterplay.classList.remove("fa-play");
    masterplay.classList.add("fa-pause");
})

//again playing next song
audioelement.addEventListener('timeupdate', ()=>{
    if(myProgressBar.value == 100){
        if(songIndex==10){
            songIndex = 1;
            audioelement.src = `./songs/${songIndex}.mp3`;
            audioelement.currentTime = 0;
            audioelement.play();
            masterSongName.innerHTML = songs[songIndex-1].songName;
            makeAllPlay();
            Array.from(document.getElementsByClassName("songItemPlay"))[songIndex-1].classList.remove("fa-play");
            Array.from(document.getElementsByClassName("songItemPlay"))[songIndex-1].classList.add("fa-pause");
            masterplay.classList.remove("fa-play");
            masterplay.classList.add("fa-pause");
        }
        else{
            songIndex += 1;
            audioelement.src = `./songs/${songIndex}.mp3`;
            audioelement.currentTime = 0;
            audioelement.play();
            masterSongName.innerHTML = songs[songIndex-1].songName;
            makeAllPlay();
            Array.from(document.getElementsByClassName("songItemPlay"))[songIndex-1].classList.remove("fa-play");
            Array.from(document.getElementsByClassName("songItemPlay"))[songIndex-1].classList.add("fa-pause");
            masterplay.classList.remove("fa-play");
            masterplay.classList.add("fa-pause");
        }
       
    }
})

