# CSS track

Goal: CSS ko projects + playgrounds se learn karna.

## Lessons / Projects

- `01-positioning-playground/` → `position` (static/relative/absolute/fixed/sticky) + z-index
- `02-positioning-mini-project/` → mini UI (tooltip + dropdown + modal) skeleton

## Quick mental model (Hinglish)

- CSS me 2 cheezein hoti hain:
  1) **Layout / Flow**: elements page pe kaise place honge (normal flow)
  2) **Paint / Layering**: overlap kaise hoga (z-index/stacking)

### Normal flow (default)

- Default me sab elements top-to-bottom flow me hote hain.
- `position: static` = default.
- `top/left/right/bottom` static pe kaam nahi karte.

### Positioning family

- `relative`: element flow me rehta hai, lekin visually shift hota hai. (space reserve hota hai)
- `absolute`: element flow se bahar. Nearest **positioned ancestor** ke relative.
- `fixed`: viewport (screen) ke relative. Scroll pe bhi same jagah.
- `sticky`: normal flow + threshold pe stick. Needs `top` (ya `left`) + scroll container.

### “Positioned ancestor” kya hota hai?

- Jis parent/ancestor ka `position` `relative/absolute/fixed/sticky` ho.
- `absolute` child aise parent ke andar anchor hota hai.
- Agar aisa parent nahi mila → page/document ke relative.

### z-index (quick)

- `z-index` tabhi kaam karega jab element **positioned** ho (static nahi).
- Higher z-index means “upar” paint hoga, but stacking context rules matter.

