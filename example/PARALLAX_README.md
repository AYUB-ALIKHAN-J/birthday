# Enhanced Parallax Scrolling System

A flexible, interactive parallax scrolling effect system that works with your background asset packs.

## Files

- **parallax.html** - Main HTML file
- **parallax.css** - Styling for the parallax effect and content cards
- **parallax.js** - Core parallax system with dynamic layer loading

## How It Works

### Layer Depth System
- **Lower numbers = Farther away** → Slower parallax movement (0.1x speed)
- **Higher numbers = Closer to you** → Faster parallax movement (1.3x speed)

This creates a realistic 3D depth effect as you scroll.

### Supported Background Packs

The system currently supports:

1. **Saturated Forest** (11 layers)
   - Farthest: Layer 11 (slowest)
   - Closest: Layer 1 (fastest)
   - Path: `assets/parallax saturated background pack/`

2. **Free Packs 1-5** (4 layers each)
   - Farthest: Layer 4 (slowest)
   - Closest: Layer 1 (fastest)
   - Path: `assets/New free backgrounds part[1-5]/background 1/`

## How to Use

### Basic Usage

1. Open `parallax.html` in your browser
2. You'll see the parallax effect in the background as you scroll down
3. Use the dropdown selector (top-right) to switch between different background packs
4. Scroll to see the layers move at different speeds

### Customization

#### Adding a New Background Pack

Edit `parallax.js` and add your pack to the `knownPacks` object in the `detectLayersInPack()` method:

```javascript
'My New Pack': [
    { number: 5, filename: 'layer 5.png' },
    { number: 4, filename: 'layer 4.png' },
    { number: 3, filename: 'layer 3.png' },
    { number: 2, filename: 'layer 2.png' },
    { number: 1, filename: 'layer 1.png' },
],
```

**Important:** 
- Layer 1 should be your foreground (closest)
- Highest number should be your background (farthest)
- Files should contain progressively larger scenes as numbers increase

#### Adjusting Parallax Speed

In the `loadBackgroundPack` method, find this line:

```javascript
const parallaxSpeed = ((layerData.number - minLayerNumber) / (maxLayerNumber - minLayerNumber)) * 1.2 + 0.1;
```

- **1.2** = Maximum speed multiplier (increase for more dramatic effect)
- **0.1** = Minimum speed (increase if layers move too slowly)

#### Adjusting Content Section Height

In `parallax.css`, change:

```css
#content-section {
    min-height: 300vh; /* 3x viewport height - adjust for more/less scroll distance */
}
```

## Technical Details

### CSS Classes

- `.param-layer` - Individual parallax layer
- `.content-card` - Content cards in the scrollable section
- `.loading` - Loading state indicator

### JavaScript Class: `ParallaxSystem`

**Methods:**
- `loadBackgroundPack(packName)` - Load and render a background pack
- `handleScroll()` - Update parallax on scroll
- `updateParallax()` - Calculate and apply layer transforms
- `detectLayersInPack(packName)` - Detect available layers in a pack

**Properties:**
- `scrollY` - Current scroll position
- `layers` - Array of layer objects with speed and element data

### Performance Optimization

- Uses `will-change: transform` and `backface-visibility: hidden` for better performance
- Layers only transform on Y-axis (vertical scroll)
- GPU acceleration enabled for smooth 60fps animations

## Troubleshooting

### Layers Not Showing

1. Check browser console for errors (F12)
2. Verify image paths in `parallax.js` match your actual file structure
3. Make sure images exist at the specified paths
4. Check file extensions (case-sensitive on Linux)

### Parallax Effect Too Subtle

Increase the speed multiplier in `loadBackgroundPack()`:
```javascript
* 1.5 + 0.1  // Instead of * 1.2 + 0.1
```

### Parallax Effect Too Extreme

Decrease the speed multiplier:
```javascript
* 0.8 + 0.1  // Instead of * 1.2 + 0.1
```

## Integration with Your Story

You can integrate this parallax system with your existing story/quiz system by:

1. Adding character elements inside the `#parallax-container` div
2. Adjusting z-index to position characters above/below specific layers
3. Positioning character containers with absolute positioning

Example:
```html
<div id="character-container" style="position: absolute; z-index: 50;">
    <img src="boy_character/boy.png" alt="Boy">
</div>
```

## Browser Compatibility

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support
- IE 11: Not supported (uses modern CSS/JS)

## Next Steps

1. Open `parallax.html` and test with different packs
2. Customize the content cards in the scrollable section
3. Add your characters and interactive elements
4. Adjust speeds and heights for your desired effect
