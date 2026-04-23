# Layer Depth System Explanation

## Visual Representation

```
VIEWER (You, scrolling down)
│
│  ┌─────────────────────┐
│  │  Layer 1 (Closest)  │  ← FASTEST MOVEMENT
│  │ Foreground Details  │  ← Speed: ~1.3x
│  │  (Ground, Trees)    │
│  └─────────────────────┘
│
│  ┌─────────────────────┐
│  │  Layer 2 (Medium)   │  ← FASTER MOVEMENT
│  │  Midground Objects  │  ← Speed: ~0.9x
│  │  (Bushes, Plants)   │
│  └─────────────────────┘
│
│  ┌─────────────────────┐
│  │  Layer 3 (Distant)  │  ← SLOWER MOVEMENT
│  │    Background       │  ← Speed: ~0.5x
│  │  (Trees, Hills)     │
│  └─────────────────────┘
│
│  ┌─────────────────────┐
│  │ Layer 4+ (Farthest) │  ← SLOWEST MOVEMENT
│  │   Very Distant      │  ← Speed: ~0.1x
│  │ (Sky, Mountains)    │
│  └─────────────────────┘
```

## How Scrolling Creates Depth

When you **scroll down 100 pixels**:

```
Layer 1: Moves 130 px down  (130% of scroll)  ← Visible movement
Layer 2: Moves 85 px down   (85% of scroll)   
Layer 3: Moves 50 px down   (50% of scroll)   
Layer 4: Moves 10 px down   (10% of scroll)   ← Barely moves
```

### The Result
Your brain perceives:
- Closer layers moving MORE = they're in the foreground
- Distant layers moving LESS = they're far away
- This speed difference creates the **3D depth illusion**

## Animation Example

### Before Scroll (Top of page)
```
Sky (Layer 4)
Mountains (Layer 3)
Hills (Layer 2)
Ground (Layer 1)
```

### After Scrolling Down 200px
```
[Sky moved only 20px - barely visible change]
Mountains moved 60px
Hills moved 100px
Ground moved 260px [HUGE change - zooms past screen]
```

The farther away something is, the less it moves. Just like real life!

## Your Background Packs

### Saturated Forest Pack (11 Layers)

Ordered from farthest to closest:
```
11 - background.png        (Sky)           ← SLOWEST
10 - distant_clouds.png    (Clouds)
9  - distant_clouds1.png   (More clouds)
8  - clouds.png            (Closer clouds)
7  - huge_clouds.png       (Even closer)
6  - hill2.png             (Far hills)
5  - hill1.png             (Closer hills)
4  - bushes.png            (Bush detail)
3  - distant_trees.png     (Distant trees)
2  - trees_and_bushes.png  (Forest)
1  - ground.png            (Foreground)      ← FASTEST
```

### Free Background Packs (4 Layers)

Each pack has:
```
4 - background layer   ← SLOWEST (farthest)
3 - midground layer
2 - closer elements
1 - foreground layer   ← FASTEST (closest)
```

## Speed Calculation Formula

```javascript
Speed = ((LayerNumber - MinLayer) / (MaxLayer - MinLayer)) * 1.2 + 0.1

Example for Saturated Forest (1-11):
Layer 1:  ((1 - 1) / (11 - 1)) × 1.2 + 0.1 = 0.1    (1.3x slower than normal)
Layer 6:  ((6 - 1) / (11 - 1)) × 1.2 + 0.1 = 0.7    (0.7x speed)
Layer 11: ((11 - 1) / (11 - 1)) × 1.2 + 0.1 = 1.3   (1.3x faster)
```

Higher speed number = Layer moves faster = Appears closer

## Real-World Parallax Examples

### Train Window View
```
Your head (inside train) = Layer 0 (does nothing, it's you)
Window frame = Layer 1 (moves very fast - closest)
Nearby trees = Layer 2 (moves fast)
Distant hills = Layer 3 (moves slowly)
Mountains = Layer 4 (barely moves)
```

### Car Driving
```
Dashboard = Layer 1 (stationary, it's attached to you)
Nearby road lines = Layer 2 (zoom past quickly)
trees = Layer 3 (pass by)
Distant mountains = Layer 4 (move slowly)
Sun = Layer 5 (barely moves)
```

## Why This Matters For Your Project

When you want to tell an interactive story:

1. **Characters** can be placed on a specific layer
   - Put them on Layer 2 to stand among trees
   - Put them on Layer 1 for foreground action

2. **Dialogue reveals depth**
   - Character seems closer/farther based on their z-index
   - Pulling focus to character = move them up layers

3. **Scene transitions** feel natural
   - Layer order suggests depth
   - User's brain already understands the space

4. **Emotional impact**
   - Slow-moving backgrounds = peaceful, distant
   - Fast-moving foreground = action, urgency

## Configuring Your Own Speed

In `parallax.js`, find:
```javascript
const parallaxSpeed = ((layerData.number - minLayerNumber) / (maxLayerNumber - minLayerNumber)) * 1.2 + 0.1;
```

The `* 1.2 + 0.1` part controls speed:

### More Dramatic Effect (increase depth perception)
```javascript
* 1.8 + 0.2  // Much bigger speed differences
```

### Subtle Effect (smooth, gentle parallax)
```javascript
* 0.6 + 0.05 // Smaller speed differences
```

### Extreme Effect (very deep, almost 3D)
```javascript
* 3.0 + 0.3  // Huge speed variations
```

## Testing Your Layers

Use browser Developer Tools (F12):

1. Go to Console tab
2. Scroll and watch the console log
3. You'll see output like:
```
✓ Loaded 11 layers from parallax saturated background pack
Layer breakdown:
  Layer 11: speed 0.10x (z-index: 11)
  Layer 10: speed 0.22x (z-index: 10)
  Layer 9: speed 0.33x (z-index: 9)
  ...
  Layer 1: speed 1.33x (z-index: 1)
```

Higher speed = layer moves faster = appears closer

---

**TL;DR:** Lower layer numbers move faster (foreground), higher layer numbers move slower (background). This creates depth! 🎬✨
