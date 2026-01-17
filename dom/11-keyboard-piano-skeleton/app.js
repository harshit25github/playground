// DOM 11 - Keyboard Piano (Skeleton) (Hinglish)
//
// IMPORTANT: Niche wala code mostly aapka hi hai.
// Sirf replay wali logic ko fix kiya hai taa ki sounds ek saath na bajen.
//
// TODO 1: Select DOM:
// - #piano container
// - all keys: `.pKey`
// - #status paragraph
//
const pianoContainer = document.getElementById("piano");

const keys = document.querySelectorAll(".pKey");
const replayButton = document.querySelector(".replay");

let audios = [];

keys.forEach((key) => {
  key.addEventListener("click", () => {
    console.log("Clicked key:", key);
    const soundToPlay = key.getAttribute("data-sound");
    console.log("Sound to play:", soundToPlay);

    // small visual feedback
    key.style.borderColor = "white";

    // play audio (ek naya Audio object banake play)
    const audio = new Audio(`sounds/${soundToPlay}`);
    audio.play();

    setTimeout(() => {
      key.style.borderColor = " rgba(255, 255, 255, 0.12)";
    }, 200);

    // Replay ke liye store kar rahe hain
    audios.push(audio);
  });
});

// NOTE: replayButton null ho sakta hai future me HTML change pe

  replayButton.addEventListener("click", () => {
    console.log("Replaying all sounds", audios);

    // Aapke code me issue:
    // - har audio pe same setTimeout(1000) laga tha,
    //   so 1 second baad sab ek hi time pe play ho jate the.
    //
    // Fix:
    // - index ke basis pe delay badhao (index * gapMs)
    const gapMs = 700; // yaha se gap control karo (increase => slower replay)

    audios.forEach((audio, index) => {
      setTimeout(() => {
        // Old Audio object ko directly replay karne me kabhi kabhi currentTime / ended issues aate hain.
        // Easy fix: same src se naya Audio banao.
        audio.currentTime = 0;
        audio.play();
      }, index * gapMs);
    });

    // aapka "replay and reset" behavior: schedule karke array clear
    audios = [];
  });

// TODO 2: Key mapping:
// - Create an object mapping:
//   Simple mapping (6 keys only):
//   { a: "C", s: "D", d: "E", f: "F", g: "G", h: "A" }
// - `keydown` me e.key.toLowerCase() use karna
//
// TODO 3: Highlight:
// - On keydown: find key element by `[data-key="a"]` and add class `pressed`
// - On keyup: remove class `pressed`
// - repeat keydown (holding) me duplicate work avoid (e.repeat)
//
// TODO 4: Sound (Web Audio API hint):
// - First user gesture pe AudioContext create karo (click)
// - On keydown: oscillator start (frequency by note)
// - On keyup: stop oscillator (or fade out)
//
// Alternative (easy): play .wav files (already included in `sounds/`):
// - C  -> sounds/C4.wav
// - D  -> sounds/D4.wav
// - E  -> sounds/E4.wav
// - F  -> sounds/F4.wav
// - G  -> sounds/G4.wav
// - A  -> sounds/A4.wav
//
// Hint: `new Audio("sounds/C4.wav").play()` (but remember: user gesture required in browsers)
//
// TODO 5: Mouse support (optional):
// - click on `.pKey` => play note + highlight
