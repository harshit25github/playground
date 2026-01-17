// DOM 08 - Instagram Post Skeleton (Hinglish)
//
// IMPORTANT:
// - Is file me koi events add nahi kiye gaye (as you requested).
// - Ye sirf aapke practice ke liye TODO checklist hai.
//
// Suggested steps (aap implement karo):
//
// 1) Like toggle:
//    - Like button select karo (aria-label="Like" wala)
//    - Click pe heart icon "♡" -> "♥" (ya class toggle)
//    - Likes count update (increment/decrement)
//
// 2) Save toggle:
//    - Save button select karo
//    - Icon change / state store
//
// 3) Add comment:
//    - #commentInput se value lo
//    - #comments UL me naya <li> prepend/append karo
//    - empty input pe prevent
//
// 4) Double click image to like (optional):
//    - .media pe dblclick handle
//
// 5) Persist:
//    - likes/comments/save state localStorage me store
//
// DOM selectors hints:
// - username: #username
// - caption: #captionText
// - likes count: #likesCount
// - comment input: #commentInput
// - comments list: #comments
// - post button: #postBtn

const media = document.querySelector('.media');


media.addEventListener('dblclick', () => {
    const heartIcon = document.querySelector('.media i');
    heartIcon.style.opacity = .9;
    // heartIcon.style.scale = 1.5;
    // heartIcon.style.rotate = '45deg';
    heartIcon.style.transform = 'scale(1.5) rotate(0deg)';
    setTimeout(() => {
        heartIcon.style.opacity = 0;
        heartIcon.style.transform = 'scale(0) rotate(-60deg)';
    }, 800);

})