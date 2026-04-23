# Parallax System - Quick Start Guide

## What Was Created

I've built a flexible parallax scrolling system for you with multiple background packs. Here's what you have:

### Files Created

1. **parallax.html** - Clean parallax with content cards
2. **parallax-with-character.html** - Parallax with your boy character integrated
3. **parallax.css** - Styling for both versions
4. **parallax.js** - Core parallax engine that loads layers dynamically
5. **PARALLAX_README.md** - Detailed documentation

## How Layer Depths Work

```
Layer Numbering System:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Layer 1 (Closest)    ← Fastest Movement (1.3x)  → Foreground
Layer 2             ← Medium-Fast Movement      
Layer 3             ← Medium Movement           
Layer 4+ (Farthest) ← Slowest Movement (0.1x)  → Background
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

**Example:** When you scroll 100px:
- Layer 1: Moves 130 pixels (foreground detail)
- Layer 2: Moves 85 pixels (mid-ground)
- Layer 4: Moves 10 pixels (background)

This depth variation creates the 3D parallax illusion!

## Getting Started

### Option 1: Basic Parallax (No Character)
```
1. Open parallax.html in your browser
2. Use the dropdown to switch background packs
3. Scroll down to see the parallax effect
```

### Option 2: Parallax with Character
```
1. Open parallax-with-character.html in your browser
2. Your boy character appears in the center
3. Scroll to see the background layers move
4. Click on the character to trigger animations
5. Click option buttons to change dialogue
```

## Background Packs Available

| Pack Name | Layers | Quality | Files |
|-----------|--------|---------|-------|
| Saturated Forest | 11 | High detail | 11 individual layers |
| Free Pack 1-5 | 4 each | Good | 4 layers per pack |

Each pack has different atmospheres perfect for different story moods.

## Customization Examples

### Change Parallax Speed Intensity

In **parallax.js**, find this line in `loadBackgroundPack()`:

**Current (moderate):**
```javascript
* 1.2 + 0.1
```

**More dramatic (faster layers move faster):**
```javascript
* 1.5 + 0.15
```

**Subtle (slower effect):**
```javascript
* 0.8 + 0.05
```

### Add More Content Cards

Open **parallax.html** or **parallax-with-character.html**, then add before `</div>` at the end:

```html
<div class="content-card">
    <h2>Your Heading</h2>
    <p>Your content goes here...</p>
</div>
```

### Change Scroll Distance

In **parallax.css**, find:

```css
#content-section {
    min-height: 300vh;  /* Change 300 to any value */
}
```

- `200vh` = Less scrolling needed to see all content
- `400vh` = More scrolling (slower scroll through content)
- `600vh` = Much slower (extended experience)

## Character Integration Features

In **parallax-with-character.html**, you can:

✅ Move character position (adjust `bottom: 20%`)  
✅ Resize character (change `height: 200px`)  
✅ Add dialogue options  
✅ Create interactions on click  
✅ Change speech bubble style  
✅ Add animations

Example: Move character to the left:
```css
#character-section {
    left: 30%;  /* Instead of 50% */
}
```

## Supported Image Formats

- PNG (recommended)
- JPG/JPEG
- WebP
- GIF

## Browser Compatibility

✅ Chrome/Chromium  
✅ Firefox  
✅ Safari  
✅ Edge  
❌ Internet Explorer

## Performance Tips

1. **Optimize image sizes:**
   - Full-width images should be ~1920px wide
   - Use PNG for transparency, JPG for photos

2. **Lazy loading:** Add to layer elements if needed:
   ```javascript
   loading="lazy"
   ```

3. **Mobile optimization:** CSS already includes responsive design

## Troubleshooting

**Images not showing?**
- Check file paths in parallax.js
- Verify images exist in assets folder
- Check browser console (F12) for errors

**Parallax too slow/fast?**
- Adjust the speed multiplier (see Customization section)

**Character position weird?**
- Adjust `bottom:`, `left:`, and `transform:` properties

**White/blank screen?**
- Check if parallax.css is loading
- Verify image file names match exactly

## Advanced: Adding New Background Packs

1. Add your images to `assets/your-pack-name/` folder
2. Number them: 1.png, 2.png, 3.png, 4.png (1=foreground, higher=background)
3. Edit `parallax.js` in `detectLayersInPack()` method:

```javascript
'Your Pack Name': [
    { number: 4, filename: 'background 1/4.png' },
    { number: 3, filename: 'background 1/3.png' },
    { number: 2, filename: 'background 1/2.png' },
    { number: 1, filename: 'background 1/1.png' },
],
```

4. Add the option to the dropdown in HTML:
```html
<option value="your-pack-name">Your Pack Name</option>
```

## Next Steps

1. ✅ Open either parallax.html or parallax-with-character.html
2. ✅ Test switching between background packs
3. ✅ Scroll to see the parallax effect
4. ✅ Customize colors, sizes, and content to match your story
5. ✅ Add more interactive elements (buttons, animations, etc.)

## File Structure Reference

```
new/
├── assets/
│   ├── parallax saturated background pack/
│   │   ├── 01_ground.png
│   │   ├── 02_trees and bushes.png
│   │   ├── ... (more layers)
│   │   └── 11_background.png
│   ├── New free backgrounds part1-5/
│   │   └── background 1/
│   │       ├── 1.png
│   │       ├── 2.png
│   │       ├── 3.png
│   │       └── 4.png
│   └── boy_character/
│       └── boy.png
│
└── example/
    ├── parallax.html ←─────── START HERE
    ├── parallax-with-character.html ←─ OR HERE
    ├── parallax.css
    ├── parallax.js
    ├── PARALLAX_README.md
    └── QUICK_START.md ←─ YOU ARE HERE
```

---

**Ready to go!** Open `parallax.html` or `parallax-with-character.html` and start scrolling! 🎨✨
