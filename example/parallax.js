/**
 * MagicManager: Handles magical orbs and ethereal storytelling whispers
 */
class MagicManager {
    constructor(container) {
        this.container = container;
        this.activeLights = [];
        this.memories = [
            "November 14th... I still remember the first time I saw you at that college quiz. You were so quiet, but the cutest person there. ❤️",
            "That New Year’s phone call... just hearing your voice made me so happy. It was the first time I felt totally comfortable talking to you. 📞",
            "The IT block Halloween party... I still have the band you tied on my arm. That evening meant the whole world to me. 🎃",
            "The evening on the stairs... when you finally said 'I love you too'. Everything in the world finally clicked. ✨",
            "Holding your hand for the first time... I don’t think I’ve ever been happier in my entire life. 🤝",
            "Our night walks at Gandhipuram... thinking about them gives me so much peace. 🌙"
        ];
        this.memoryIndex = 0;
        this.isRevealing = false;

        // Spawn lights at specific scroll depths
        this.lightSpawns = [2500, 8000, 13000, 18000, 23000, 28000];
        this.spawnedDepths = new Set();
    }

    update(scrollY) {
        // Spawn ambient whispers periodically
        if (Math.random() < 0.005) this.spawnWhisper();

        // Spawn interactive magical lights at specific depths
        this.lightSpawns.forEach(depth => {
            if (Math.abs(scrollY - depth) < 100 && !this.spawnedDepths.has(depth)) {
                this.spawnLight(depth);
                this.spawnedDepths.add(depth);
            }
        });
    }

    spawnLight(depth) {
        const light = document.createElement('div');
        light.className = 'magical-light';
        // Random drift position
        light.style.left = `${20 + Math.random() * 60}vw`;
        light.style.top = `${30 + Math.random() * 40}vh`;

        light.onclick = (e) => {
            e.stopPropagation();
            this.revealMemory(light);
        };

        this.container.appendChild(light);
        this.activeLights.push(light);
    }

    spawnWhisper() {
        const whisper = document.createElement('div');
        whisper.className = 'whisper-text';
        whisper.textContent = this.memories[Math.floor(Math.random() * this.memories.length)].substring(0, 30) + "...";
        whisper.style.top = `${20 + Math.random() * 60}vh`;
        whisper.style.animation = `whisperDrift ${15 + Math.random() * 10}s linear forwards`;
        this.container.appendChild(whisper);
        setTimeout(() => whisper.remove(), 25000);
    }

    revealMemory(light) {
        if (this.isRevealing) return;
        this.isRevealing = true;

        // 1. Sparkle Explosion
        const rect = light.getBoundingClientRect();
        this.createExplosion(rect.left + 12, rect.top + 12);

        // 2. Remove Light
        light.style.transform = 'scale(0)';
        setTimeout(() => light.remove(), 500);

        // 3. Show Ethereal Text - Append to Parallax Container for proper layering
        const textContainer = document.createElement('div');
        textContainer.className = 'ethereal-text-container';

        // Position it relative to current scroll in the virtual world
        textContainer.style.top = `${window.scrollY + (window.innerHeight * 0.2)}px`;

        const textNode = document.createElement('div');
        textNode.className = 'ethereal-text shimmer';
        textNode.textContent = this.memories[this.memoryIndex % this.memories.length];
        this.memoryIndex++;

        textContainer.appendChild(textNode);
        this.container.appendChild(textContainer);

        // Fade in
        setTimeout(() => textNode.classList.add('active'), 100);

        // Dissolve and remove
        setTimeout(() => {
            textNode.classList.remove('active');
            setTimeout(() => {
                textContainer.remove();
                this.isRevealing = false;
            }, 2000);
        }, 6000);
    }

    createExplosion(x, y) {
        for (let i = 0; i < 30; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.style.left = `${x}px`;
            sparkle.style.top = `${y}px`;

            const tx = (Math.random() - 0.5) * 400;
            const ty = (Math.random() - 0.5) * 400;
            sparkle.style.setProperty('--tx', `${tx}px`);
            sparkle.style.setProperty('--ty', `${ty}px`);

            document.body.appendChild(sparkle);
            setTimeout(() => sparkle.remove(), 1000);
        }
    }
}

class SurpriseManager {
    constructor(parallax) {
        this.parallax = parallax;
        this.taps = 0;
        this.isTriggered = false;
        this.revealDepth = 34500;
        this.message = "To the girl who has my whole heart: Happy Birthday! Thank you for being my peace, my joy, and my best friend. I’m so lucky to walk through life with you. I love you more than words (or code!) can express.";
    }

    update(scrollY) {
        if (Math.abs(scrollY - this.revealDepth) < 100 && !this.isTriggered) {
            this.showEnvelope();
        }
    }

    showEnvelope() {
        this.isTriggered = true;
        this.parallax.isLocked = true;
        
        const wrapper = document.createElement('div');
        wrapper.id = 'surprise-wrapper';
        wrapper.innerHTML = `
            <div id="envelope-container" class="wiggle">
                <img src="../assets/envelop.png" id="envelope-img">
                <div id="tap-hint" style="color: white; margin-top: 15px; font-family: 'Outfit';">Tap to open... (3)</div>
            </div>
            <div id="finale-card" class="hidden">
                <div class="card-inner">
                    <div class="card-front">
                        <div class="birthday-title">Happy Birthday, <br>Devaranjanaa! 🌸</div>
                        <img src="../assets/girl_character/cuteposegirl.png" class="card-photo">
                        <div class="birthday-subtitle">You bring light to my world!</div>
                        <button class="flip-btn">Flip Message ❤️</button>
                    </div>
                    <div class="card-back">
                        <div class="heartfelt-msg">${this.message}</div>
                        <button class="close-btn">Close & Wish ❤️</button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(wrapper);

        const envelope = wrapper.querySelector('#envelope-container');
        envelope.onclick = (e) => {
            e.stopPropagation();
            this.taps++;
            if (this.taps < 3) {
                envelope.classList.remove('wiggle');
                void envelope.offsetWidth; // Force reflow
                envelope.classList.add('wiggle');
                wrapper.querySelector('#tap-hint').textContent = `Tap to open... (${3 - this.taps})`;
                if (this.parallax.sounds.click) this.parallax.sounds.click.play();
            } else {
                this.revealCard(wrapper);
            }
        };
        
        wrapper.querySelector('.flip-btn').onclick = (e) => {
            e.stopPropagation();
            wrapper.querySelector('#finale-card').classList.add('flipped');
            if (this.parallax.sounds.pop) this.parallax.sounds.pop.play();
        };
        
        wrapper.querySelector('.close-btn').onclick = (e) => {
            e.stopPropagation();
            wrapper.remove();
            this.parallax.isLocked = false;
        };
    }

    revealCard(wrapper) {
        const envelope = wrapper.querySelector('#envelope-container');
        const card = wrapper.querySelector('#finale-card');
        envelope.classList.add('fade-out');
        if (this.parallax.sounds.success) this.parallax.sounds.success.play();
        this.parallax.createHearts();

        setTimeout(() => {
            envelope.classList.add('hidden');
            card.classList.remove('hidden');
            card.classList.add('show-card');
        }, 800);
    }
}

class ParallaxSystem {
    constructor() {
        this.packs = [
            'nature_landscapes/nature_1',
            'nature_landscapes/nature_2',
            'nature_landscapes/nature_3',
            'nature_landscapes/nature_4',
            'nature_landscapes/nature_5',
            'parallax saturated background pack',
            'New free backgrounds part4/background 4',
            'New free backgrounds part4/background 1',
            'New free backgrounds part3/background 1',
            'New free backgrounds part3/background 2',
            'New free backgrounds part2/background 4',
            'New free backgrounds part2/background 2',
            'New free backgrounds part1/background 1',
            'New free backgrounds part1/background 2',
            'New free backgrounds part1/background 3',
            'New free backgrounds part1/background 4'
        ];

        this.currentPackIndex = 0;
        this.layers = [];
        this.scrollY = 0;
        this.isLocked = true; // Start locked for intro
        this.isStarted = false;
        
        this.container = document.getElementById('parallax-container');
        this.transitionThreshold = 8000;
        this.lastScrollY = window.scrollY;

        // Intro Scene Dialogue Sequence
        // Narrative Timeline (Precise Scroll Points)
        this.dialogues = [
            // SITTING POSE
            {
                start: 10,
                end: 500,
                text: "Whoa! You're finally here!",
                sprite: 'boysittingonbench.png',
                girlSprite: 'simplegirl.png'
            },
            {
                start: 500,
                end: 1000,
                text: "I was just resting on our bench... I almost thought I dreamed you up.",
                sprite: 'boysittingonbench.png',
                girlSprite: 'simplegirl.png'
            },
            {
                start: 1000,
                end: 1500,
                text: "Walk with me? <span class=\"pixel-arrow\">→</span>",
                sprite: 'boysittingonbench.png',
                girlSprite: 'simplegirl.png'
            },
            // WALKING POSE (Triggered in handleScroll too)
            {
                start: 1500,
                end: 2000,
                text: "I'm so glad you're here!",
                sprite: 'boywalkright.png',
                girlSprite: 'simplegirl.png'
            },
            {
                start: 2000,
                end: 2500,
                text: "And I want to tell you something...",
                sprite: 'boywalkright.png',
                girlSprite: 'simplegirl.png'
            },
            // THE FIRST QUIZ (Now the Happy Boy trigger)
            {
                start: 2600,
                end: 4100,
                text: "Just keep scrolling! Ther is more to come ",
                sprite: 'boywalkright.png',
                girlSprite: 'elegentgirl.png'
            },
            {
                start: 5100,
                end: 6600,
                isQuestion: true,
                questionId: 'color',
                text: "Before we move on, I have a few questions for you... First off, do you remember what my favorite color is?",
                options: [
                    { text: "Blue 💙", reaction: "Yesss! You know me so well! 💙", emotion: 'happy', girlEmotion: 'happy' },
                    { text: "Pink? 🌸", reaction: "Pink ah?? I’m not that cute okay! 😂", emotion: 'shocked', girlEmotion: 'surprised' },
                    { text: "Whatever I like 😜", reaction: "Cheater answer!! but it's true lol", emotion: 'normal', girlEmotion: 'simple' }
                ],
                sprite: 'normalboy.png',
                girlSprite: 'cutedressgirl.png'
            },
            {
                start: 10000,
                end: 11500,
                text: "Wow, we've come quite a far way in this forest already. It reminds me of all our long walks at Gandhipuram... remember?",
                sprite: 'happyboy.png',
                girlSprite: 'simplegirl.png'
            },
            {
                start: 15000,
                end: 16500,
                isQuestion: true,
                questionId: 'whoami',
                text: "Sometimes I wonder... what am I really to you? Be honest!",
                options: [
                    { text: "Boyfriend ❤️", reaction: "Only boyfriend ah? ❤️ I'm everything!", emotion: 'happy', girlEmotion: 'happy' },
                    { text: "Just a friend ", reaction: "Friend ah?? I’m hurt… but I'll win you over! 😜", emotion: 'shocked', girlEmotion: 'surprised' },
                    { text: "My headache ", reaction: "Still you love this headache, don't you? 😂", emotion: 'normal', girlEmotion: 'simple' }
                ],
                sprite: 'normalboy.png',
                girlSprite: 'favgirl.png'
            },
            {
                start: 20000,
                end: 21500,
                isQuestion: true,
                questionId: 'moment',
                text: "Of all these days we've spent, what’s your absolute favorite moment?",
                options: [
                    { text: "The day we became lovers ❤️", reaction: "That day changed everything for me too! ❤️", emotion: 'happy', girlEmotion: 'happy' },
                    { text: "The day you rejected me ", reaction: "Why that day?? I was so sad! 😭", emotion: 'shocked', girlEmotion: 'surprised' },
                    { text: "The day we didn’t talk ", reaction: "Worst day ever... let's never do that again.", emotion: 'angry', girlEmotion: 'simple' }
                ],
                sprite: 'normalboy.png',
                girlSprite: 'elegentgirl.png'
            },
            {
                start: 25000,
                end: 26500,
                isQuestion: true,
                questionId: 'why',
                text: "Stop for a second... do you know why I brought you on this journey today?",
                options: [
                    { text: "My birthday ", reaction: "Of course! ❤️ Everything is for you today.", emotion: 'happy', girlEmotion: 'happy' },
                    { text: "To test me ", reaction: "Okay maybe a little bit... but mostly for love! 😂", emotion: 'normal', girlEmotion: 'simple' },
                    { text: "You were bored ", reaction: "Excuse me?? I'm never bored with you! 😤", emotion: 'angry', girlEmotion: 'surprised' }
                ],
                sprite: 'normalboy.png',
                girlSprite: 'cuteposegirl.png'
            },
            {
                start: 30000,
                end: 32000,
                isQuestion: true,
                questionId: 'love',
                text: "Last question... do you think I love you a lot? Really?",
                options: [
                    { text: "Yes ❤️", reaction: "More than you can imagine. Forever. ❤️", emotion: 'happy', girlEmotion: 'happy' },
                    { text: "Maybe ", reaction: "Maybe ah? I’ll have to prove it then! 😜", emotion: 'normal', girlEmotion: 'simple' },
                    { text: "No ", reaction: "Illegal answer! You know I do! 😂", emotion: 'shocked', girlEmotion: 'surprised' }
                ],
                sprite: 'normalboy.png',
                girlSprite: 'mostviewdpicgirl.png'
            }
        ];

        this.isLocked = false;
        this.answeredQuestions = new Set();
        this.userChoices = {}; // Store what they picked
        this.activeQuestion = null;
        this.snapThreshold = 50;

        // Initialize Howler Sounds (Placeholders)
        this.initAudio();

        // Initialize Magic System
        this.magic = new MagicManager(this.container);

        // Initialize Surprise System
        this.surprise = new SurpriseManager(this);

        this.runLoader();
    }

    async runLoader() {
        const screen = document.getElementById('loading-screen');
        const bar = screen.querySelector('.progress-fill');
        const status = screen.querySelector('.loading-status');
        const heart = screen.querySelector('.heart-indicator');
        const percentageText = document.getElementById('loader-percentage');
        
        let progress = 0;
        const totalDuration = 4000; // Slightly longer for the "love" feel
        const startTime = Date.now();

        const updateProgress = () => {
            const elapsed = Date.now() - startTime;
            progress = Math.min(100, Math.floor((elapsed / totalDuration) * 100));
            
            if (percentageText) percentageText.textContent = `[ ${progress}% ]`;
            if (bar) bar.style.width = `${progress}%`;
            if (heart) heart.style.left = `${progress}%`;

            if (progress < 100) {
                requestAnimationFrame(updateProgress);
            } else {
                status.innerHTML = "❤ LOVE READY ❤";
                const dreamMsg = screen.querySelector('.dream-msg');
                if (dreamMsg) dreamMsg.textContent = "Dreaming sequence starting...";
                this.isLoaderComplete = true;
                
                // Immediately transition from loader
                setTimeout(() => {
                  screen.style.opacity = '0';
                  setTimeout(() => screen.remove(), 1000);
                  this.init();
                  this.enterIntroState();
                }, 500);
            }
        };

        requestAnimationFrame(updateProgress);
    }

    initAudio() {
        console.log('🔊 Initializing Audio...');
        this.sounds = {
            bgm: new Howl({
                src: ['../assets/audio/bgm.mp3'],
                loop: true,
                volume: 0.2,
                html5: true,
                onloaderror: (id, err) => console.warn('BGM load error:', err)
            }),
            click: new Howl({
                src: ['../assets/audio/click.mp3'],
                volume: 0.5,
                html5: false // Use Web Audio for SFX
            }),
            pop: new Howl({
                src: ['../assets/audio/pop.mp3'],
                volume: 0.4,
                html5: false,
                pos: [-0.5, 0, -0.5]
            }),
            success: new Howl({
                src: ['../assets/audio/success.mp3'],
                volume: 0.6,
                html5: false,
                pos: [0.5, 0, -0.5]
            })
        };

        // Start BGM on first interaction (browser requirement)
        window.addEventListener('click', () => {
            if (!this.bgmStarted) {
                this.sounds.bgm.play();
                this.bgmStarted = true;
            }
        }, { once: true });
    }

    async init() {
        // Set content height for infinite scroll
        const contentSection = document.getElementById('content-section');
        if (contentSection) {
            contentSection.style.height = `${this.packs.length * this.transitionThreshold + 1000}px`;
        }

        // Load initial background pack
        await this.loadBackgroundPack(this.packs[this.currentPackIndex]);

        // Setup event listeners
        window.addEventListener('scroll', () => this.handleScroll(), { passive: true });
        window.addEventListener('resize', () => this.updateParallax());
    }

    enterIntroState() {
        console.log("🎬 Entering Intro State...");
        const boyContainer = document.getElementById('boy-container');
        const exclamation = document.getElementById('exclamation-icon');
        const bench = document.getElementById('intro-bench-container');

        if (boyContainer) {
            boyContainer.classList.remove('hidden');
            setTimeout(() => boyContainer.classList.add('active'), 100);
        }
        
        if (exclamation) exclamation.classList.remove('hidden');
        
        if (bench) {
            bench.classList.remove('hidden');
            bench.style.display = 'block';
            setTimeout(() => bench.style.opacity = '1', 100);
        }
    }

    wakeUp() {
        if (this.isWokenUp) return;
        this.isWokenUp = true;
        
        // Hide exclamation if still there
        const exclamation = document.getElementById('exclamation-icon');
        if (exclamation) exclamation.classList.add('hidden');
        
        if (this.sounds.pop) this.sounds.pop.play();
        this.createHearts();
    }


    startJourney() {
        if (this.isStarted) return;
        this.isStarted = true;
        this.isLocked = false;
        
        const boyContainer = document.getElementById('boy-container');
        const prompt = document.getElementById('intro-prompt');
        const bench = document.getElementById('intro-bench');

        // Sprite "Stands up"
        boyContainer.classList.remove('sleeping');
        prompt.style.opacity = '0';
        
        // Hide bench and prompt after they scroll away
        setTimeout(() => {
            bench.style.opacity = '0';
            setTimeout(() => {
                bench.classList.add('hidden');
                prompt.classList.add('hidden');
            }, 1000);
        }, 500);
    }

    /**
     * Load a background pack and detect all numbered layers
     */
    async loadBackgroundPack(packName) {
        try {
            console.log(`\n📦 Loading pack: ${packName}`);

            const layerInfo = await this.detectLayersInPack(packName);

            if (layerInfo.length === 0) {
                console.error(`❌ No layers found in pack: ${packName}`);
                return;
            }

            // Sort layers by number. With your new numbering:
            // 11 (ground) will be at the end of the array
            // 1 (background) will be at the beginning
            layerInfo.sort((a, b) => a.number - b.number);

            // Fade out current layers
            if (this.layers.length > 0) {
                await this.fadeOutLayers();
            }

            // Clear ONLY parallax layers, preserving fixed elements like the boy container
            const oldLayers = this.container.querySelectorAll('.param-layer');
            oldLayers.forEach(l => l.remove());

            this.layers = [];
            this.imagesLoaded = 0;

            console.log(`\n📥 Creating ${layerInfo.length} layers:`);

            // We want to calculate speed based on your new order:
            // Layer 1 (background) = Slower
            // Layer 11 (ground) = Faster
            const minNum = Math.min(...layerInfo.map(l => l.number));
            const maxNum = Math.max(...layerInfo.map(l => l.number));

            // Create layer elements with initial opacity
            layerInfo.forEach((layerData) => {
                const layerEl = document.createElement('div');
                layerEl.className = 'param-layer';
                layerEl.dataset.layerNumber = layerData.number;
                layerEl.style.opacity = '0';
                layerEl.style.transition = 'opacity 0.8s ease-in-out';

                // Speed calculation:
                // We want the closest layers (higher numbers) to move fastest
                // Layer 11 (ground) moves fast, Layer 1 (background) moves very slow
                let parallaxSpeed;
                if (maxNum === minNum) {
                    parallaxSpeed = 0.5;
                } else {
                    // Scale speed from 0.05 (back) to 1.0 (front)
                    parallaxSpeed = ((layerData.number - minNum) / (maxNum - minNum)) * 0.95 + 0.05;
                }

                layerEl.dataset.speed = parallaxSpeed;

                const imagePath = `../assets/${packName}/${layerData.filename}`;

                // Test image loading
                const img = new Image();
                img.onload = () => {
                    this.imagesLoaded++;
                    console.log(`  ✅ Layer ${layerData.number}: ${layerData.filename}`);
                    this.updateStatus();
                };
                img.onerror = () => {
                    console.error(`  ❌ FAILED: ${imagePath}`);
                    this.updateStatus();
                };
                img.src = imagePath;

                layerEl.style.backgroundImage = `url('${imagePath}')`;
                
                // STACKING FIX: Shift layers >= 8 to make room for character at z-index 8
                // This places character between layer 7 and layer 8
                let actualZIndex = layerData.number;
                if (actualZIndex >= 8) actualZIndex += 2; // Extra gap for safety
                
                layerEl.style.zIndex = actualZIndex;

                this.container.appendChild(layerEl);
                this.layers.push({
                    element: layerEl,
                    speed: parallaxSpeed,
                    number: layerData.number,
                    path: imagePath
                });
            });

            // Fade in new layers after a brief delay
            setTimeout(() => {
                this.layers.forEach(layer => {
                    layer.element.style.opacity = '1';
                });
            }, 100);

            // Update parallax position immediately
            this.updateParallax();
            this.updateStatus();

            console.log(`✅ Pack loaded: ${layerInfo.length} layers`);

        } catch (error) {
            console.error('Error loading background pack:', error);
        }
    }

    /**
     * Update status panel
     */
    updateStatus() {
        const statusPack = document.getElementById('status-pack');
        const statusLayers = document.getElementById('status-layers');
        const statusImages = document.getElementById('status-images');

        if (statusPack) statusPack.textContent = this.packs[this.currentPackIndex].substring(0, 20);
        if (statusLayers) statusLayers.textContent = this.layers.length;
        if (statusImages) statusImages.textContent = `${this.imagesLoaded}/${this.layers.length}`;
    }

    /**
     * Fade out current layers
     */
    fadeOutLayers() {
        return new Promise(resolve => {
            this.layers.forEach(layer => {
                layer.element.style.opacity = '0';
            });
            setTimeout(resolve, 800);
        });
    }

    /**
     * Detect all numbered layers in a pack directory
     * Supports two structures:
     * 1. Single directory with numbered files: 01_background.png, 02_trees.png
     * 2. Subdirectories with numbered layers: background 1/1.png, background 2/2.png
     */
    async detectLayersInPack(packName) {
        // Map of known packs and their layers
        // Layer number: 1 is FARTHEST (slow parallax), higher = CLOSER (faster parallax)
        const knownPacks = {
            'parallax saturated background pack': [
                // Layer 11 is CLOSEST (moves fast), Layer 1 is FARTHEST (moves slow)
                { number: 11, filename: '01_ground.png' },
                { number: 10, filename: '02_trees and bushes.png' },
                { number: 9, filename: '03_distant_trees.png' },
                { number: 8, filename: '04_bushes.png' },
                { number: 7, filename: '05_hill1.png' },
                { number: 6, filename: '06_hill2.png' },
                { number: 5, filename: '07_huge_clouds.png' },
                { number: 4, filename: '08_clouds.png' },
                { number: 3, filename: '09_distant_clouds1.png' },
                { number: 2, filename: '10_distant_clouds.png' },
                { number: 1, filename: '11_background.png' },
            ],
            // Nature Landscapes (1.png is farthest/sky, N.png is closest/ground)
            // Custom order for nature_1: 1, 2, 3, 5, 6, 7, 10, 8 (no 4.png or 9.png)
            'nature_landscapes/nature_1': [
                { number: 1, filename: '1.png' },
                { number: 2, filename: '2.png' },
                { number: 3, filename: '3.png' },
                { number: 4, filename: '10.png' },
                { number: 5, filename: '5.png' },
                { number: 6, filename: '6.png' },
                { number: 7, filename: '7.png' },
                { number: 8, filename: '8.png' }
            ],
            'nature_landscapes/nature_2': [1, 2, 3, 4].map(n => ({ number: n, filename: `${n}.png` })),
            'nature_landscapes/nature_3': [1, 2, 3, 4].map(n => ({ number: n, filename: `${n}.png` })),
            'nature_landscapes/nature_4': [1, 2, 3, 4].map(n => ({ number: n, filename: `${n}.png` })),
            'nature_landscapes/nature_5': [1, 2, 3, 4, 5].map(n => ({ number: n, filename: `${n}.png` })),

            // New Free Backgrounds (1.png is farthest/sky, 4.png is closest/ground)
            // Part 1
            'New free backgrounds part1/background 1': [1, 2, 3, 4].map(n => ({ number: n, filename: `${n}.png` })),
            'New free backgrounds part1/background 2': [1, 2, 3, 4].map(n => ({ number: n, filename: `${n}.png` })),
            'New free backgrounds part1/background 3': [1, 2, 3, 4].map(n => ({ number: n, filename: `${n}.png` })),
            'New free backgrounds part1/background 4': [1, 2, 3, 4].map(n => ({ number: n, filename: `${n}.png` })),
            // Part 2
            'New free backgrounds part2/background 2': [1, 2, 3, 4].map(n => ({ number: n, filename: `${n}.png` })),
            'New free backgrounds part2/background 4': [1, 2, 3, 4].map(n => ({ number: n, filename: `${n}.png` })),
            // Part 3
            'New free backgrounds part3/background 1': [1, 2, 3, 4].map(n => ({ number: n, filename: `${n}.png` })),
            'New free backgrounds part3/background 2': [1, 2, 3, 4].map(n => ({ number: n, filename: `${n}.png` })),
            // Part 4
            'New free backgrounds part4/background 1': [1, 2, 3, 4].map(n => ({ number: n, filename: `${n}.png` })),
            'New free backgrounds part4/background 4': [1, 2, 3, 4].map(n => ({ number: n, filename: `${n}.png` })),
        };

        return knownPacks[packName] || [];
    }

    /**
     * Create floating heart particles for happy moments
     */
    createHearts() {
        const count = 15;
        for (let i = 0; i < count; i++) {
            const heart = document.createElement('div');
            heart.innerHTML = '❤️';
            heart.style.position = 'fixed';
            heart.style.left = `${Math.random() * 100}vw`;
            heart.style.bottom = '-50px';
            heart.style.fontSize = `${Math.random() * 20 + 10}px`;
            heart.style.zIndex = '1000';
            heart.style.pointerEvents = 'none';
            heart.style.transition = `all ${Math.random() * 2 + 2}s ease-out`;

            document.body.appendChild(heart);

            // Trigger animation
            setTimeout(() => {
                heart.style.transform = `translateY(-110vh) translateX(${(Math.random() - 0.5) * 200}px) rotate(${Math.random() * 360}deg)`;
                heart.style.opacity = '0';
            }, 50);

            // Clean up
            setTimeout(() => heart.remove(), 4000);
        }
    }

    /**
     * Handle scroll event - update parallax and check for transitions
     */
    handleScroll() {
        const newScrollY = window.scrollY;

        // Ensure system knows we've started
        if (!this.isStarted) this.isStarted = true;

        // --- NARRATIVE TRANSITIONS ---
        
        // 1. Walking transition (after bench) - At 1500px switch to walking
        const boySprite = document.getElementById('boy-sprite');
        const exclamation = document.getElementById('exclamation-icon');
        
        if (newScrollY >= 1500) {
            if (!this.isWalkingFromBench || !this.isWokenUp) {
               this.isWalkingFromBench = true;
               this.isWokenUp = true; // "Woken up" now means walking/alert
               if (boySprite) boySprite.src = '../assets/boy_character/boywalkright.png';
               if (exclamation) exclamation.classList.add('hidden');
            }
        } else if (newScrollY < 1500) {
            // BACK TO SITTING (Below 1500)
            if (this.isWalkingFromBench) {
                this.isWalkingFromBench = false;
                this.isWokenUp = false;
                if (boySprite) boySprite.src = '../assets/boy_character/boysittingonbench.png';
                if (exclamation) exclamation.classList.remove('hidden');
            }
        }

        // Hide bench smoothly as we scroll
        const bench = document.getElementById('intro-bench-container');
        if (bench) {
            const benchOpacity = Math.max(0, 1 - (newScrollY / 1200));
            bench.style.opacity = benchOpacity;
            
            // Avoid abrupt display:none by using a higher threshold
            if (newScrollY > 1500) {
                bench.classList.add('hidden');
            } else {
                bench.classList.remove('hidden');
                bench.style.display = 'block';
            }
        }

        // --- MANDATORY SCROLL LOCK & SNAP LOGIC ---
        if (this.isLocked && this.activeQuestion) {
            // If they try to scroll away from a locked question, force them back
            if (Math.abs(newScrollY - this.activeQuestion.start) > 10) {
                window.scrollTo({
                    top: this.activeQuestion.start,
                    behavior: 'instant'
                });
                return;
            }
        }

        this.scrollY = newScrollY;

        // Update status display
        const statusScrollY = document.getElementById('status-scrolly');
        if (statusScrollY) statusScrollY.textContent = Math.round(this.scrollY);

        // Update parallax effect
        this.updateParallax();

        // Update Narrative Character (Ayub)
        this.updateCharacter();

        // Update Magic (Orbs & Whispers)
        this.magic.update(this.scrollY);

        // Update Surprise (Envelope & Card)
        this.surprise.update(this.scrollY);

        // Infinite Scroll Loop Logic
        const totalCycleHeight = this.packs.length * this.transitionThreshold;

        // Reset to start if we cross the limit for infinite feel
        if (this.scrollY >= totalCycleHeight) {
            window.scrollTo(0, 10); // Jump back to start
            this.lastScrollY = 10;
            return;
        }

        this.lastScrollY = newScrollY;

        // Calculate direct index based on scroll position
        // This ensures scrolling up returns to the previous background
        const targetIndex = Math.floor(this.scrollY / this.transitionThreshold) % this.packs.length;

        if (targetIndex !== this.currentPackIndex && !this.isTransitioning) {
            this.switchToPack(targetIndex);
        }
    }

    /**
     * Switch to a specific background pack index
     */
    async switchToPack(index) {
        if (this.isTransitioning || index === this.currentPackIndex) return;

        this.isTransitioning = true;
        this.currentPackIndex = index;

        console.log(`🔄 Switching to pack index: ${index}`);

        // Load the target pack
        await this.loadBackgroundPack(this.packs[this.currentPackIndex]);

        // Update selector if visible
        if (this.selector) {
            this.selector.value = this.packs[this.currentPackIndex];
        }

        setTimeout(() => {
            this.isTransitioning = false;
        }, 1000);
    }

    updateCharacter() {
        const boyContainer = document.getElementById('boy-container');
        const girlContainer = document.getElementById('girl-container');
        const speechBubble = document.getElementById('speech-bubble');
        const boySprite = document.getElementById('boy-sprite');
        const girlSprite = document.getElementById('girl-sprite');

        if (!boyContainer || !speechBubble || !boySprite || !girlContainer || !girlSprite) {
            return;
        }

        // Find active dialogue. PERSISTENCE FIX: Check ranges for ALL dialogues.
        const activeDialogue = this.dialogues.find(d =>
            this.scrollY >= d.start && this.scrollY < d.end
        );

        if (activeDialogue) {
            // --- HANDLE QUESTION SNAP & LOCK ---
            if (activeDialogue.isQuestion && !this.answeredQuestions.has(activeDialogue.questionId)) {
                if (!this.isLocked) {
                    this.isLocked = true;
                    this.activeQuestion = activeDialogue;

                    window.scrollTo({
                        top: activeDialogue.start,
                        behavior: 'smooth'
                    });

                    this.sounds.pop.play();
                }
            }

            // Update text and options
            this.renderDialogue(activeDialogue, speechBubble, boySprite, girlSprite);

            // Show characters and bubble
            this.toggleCharacter(boyContainer, true);
            this.toggleCharacter(girlContainer, true);
            this.toggleCharacter(speechBubble, true);
        } else if (this.isWokenUp || this.scrollY < 4000) {
            // Keep walking/visible state after waking up or during intro
            this.toggleCharacter(boyContainer, true);
            this.toggleCharacter(girlContainer, false);
            this.toggleCharacter(speechBubble, false);

            // Simple walking animation toggle based on movement
            const isMoving = Math.abs(this.scrollY - this.lastScrollY) > 0.5;
            if (isMoving || this.scrollY > 1500) {
                // If in transition zones or moving, stay in walking pose
                boySprite.src = '../assets/boy_character/boywalkright.png';
            } else {
                // Only sit if at the very start and stopped
                boySprite.src = '../assets/boy_character/boysittingonbench.png';
            }
        } else {
            // Hide characters and bubble
            this.toggleCharacter(boyContainer, false);
            this.toggleCharacter(girlContainer, false);
            this.toggleCharacter(speechBubble, false);
            this.isLocked = false;
            this.activeQuestion = null;
        }
    }

    renderDialogue(dialogue, bubble, boySprite, girlSprite) {
        const uniqueId = dialogue.isQuestion ? dialogue.questionId : dialogue.text;

        // Check if we already answered this and what we picked
        const pastChoice = dialogue.isQuestion ? this.userChoices[dialogue.questionId] : null;

        // If it's the same content already showing, don't re-render
        // EXCEPT if it was just answered (check userChoices transition)
        if (bubble.dataset.currentDialogueId === uniqueId) return;

        bubble.dataset.currentDialogueId = uniqueId;

        if (dialogue.isQuestion && !this.answeredQuestions.has(dialogue.questionId)) {
            // Show new question with buttons
            bubble.innerHTML = `<span>${dialogue.text}</span>`;
            const optionsContainer = document.createElement('div');
            optionsContainer.className = 'quiz-options';

            dialogue.options.forEach(opt => {
                const btn = document.createElement('button');
                btn.className = 'quiz-button';
                btn.textContent = opt.text;
                btn.onclick = (e) => { e.stopPropagation(); this.handleAnswer(dialogue, opt); };
                optionsContainer.appendChild(btn);
            });
            bubble.appendChild(optionsContainer);
            this.updateCharacterSprites('normal', 'normal');
        } else if (pastChoice) {
            // Show past result (persistence)
            bubble.innerHTML = `<span>${pastChoice.reaction}</span>
                               <div style="font-size: 0.8em; color: #ff69b4; margin-top: 10px;">(Memory Captured ❤️)</div>`;
            this.updateCharacterSprites(pastChoice.emotion, pastChoice.girlEmotion);
        } else {
            // Simple text dialogue
            bubble.innerHTML = `<span>${dialogue.text}</span>`;
            boySprite.src = `../assets/boy_character/${dialogue.sprite}`;
            girlSprite.src = `../assets/girl_character/${dialogue.girlSprite}`;
        }
    }

    handleAnswer(question, option) {
        console.log(`✅ User answered: ${option.text}`);
        const speechBubble = document.getElementById('speech-bubble');
        const boySprite = document.getElementById('boy-sprite');
        const girlSprite = document.getElementById('girl-sprite');

        // Store choice for persistence
        this.userChoices[question.questionId] = option;
        this.answeredQuestions.add(question.questionId);

        // Update reaction
        speechBubble.innerHTML = `<span style="display: block; animation: bubblePop 0.4s ease;">${option.reaction}</span>`;

        if (option.emotion === 'happy') {
            try { this.sounds.success.play(); } catch (e) { }
            this.createHearts();
        }

        // Play click sound
        try { this.sounds.click.play(); } catch (e) { }

        this.updateCharacterSprites(option.emotion, option.girlEmotion);

        // Unlock after a brief delay
        setTimeout(() => {
            console.log('🔓 Unlocking scroll...');
            this.isLocked = false;
            this.activeQuestion = null;

            const msg = document.createElement('div');
            msg.className = 'continue-msg';
            msg.style.cssText = 'font-size: 0.8em; color: #ff69b4; margin-top: 10px; animation: idleBounce 1s infinite;';
            msg.textContent = '(Scroll to continue your journey...)';
            speechBubble.appendChild(msg);
        }, 1500);
    }

    updateCharacterSprites(boyEmotion, girlEmotion) {
        const boySprite = document.getElementById('boy-sprite');
        const girlSprite = document.getElementById('girl-sprite');

        const boyMapping = {
            'happy': 'happyboy.png',
            'shocked': 'shockedorexcitedboy.png',
            'angry': 'angryboy.png',
            'normal': 'normalboy.png'
        };
        const girlMapping = {
            'happy': 'cuteposegirl.png',
            'surprised': 'cutedressgirl.png',
            'simple': 'simplegirl.png'
        };

        boySprite.src = `../assets/boy_character/${boyMapping[boyEmotion] || 'normalboy.png'}`;
        girlSprite.src = `../assets/girl_character/${girlMapping[girlEmotion] || 'favgirl.png'}`;
    }

    toggleCharacter(container, show) {
        if (show) {
            if (container.classList.contains('hidden')) {
                container.classList.remove('hidden');
                container.classList.add('active');
            }
        } else {
            if (container.classList.contains('active')) {
                container.classList.remove('active');
                container.classList.add('hidden');
            }
        }
    }

    /**
     * Update parallax positions based on scroll
     * Uses requestAnimationFrame for smooth 60fps animation
     */
    updateParallax() {
        this.layers.forEach(layer => {
            // Calculate horizontal offset based on scroll position and parallax speed
            // scrolling DOWN (positive scrollY) moves the background LEFT (negative position)
            const xOffset = -this.scrollY * layer.speed;

            // Apply background-position for infinite tiling
            layer.element.style.backgroundPositionX = `${xOffset}px`;
        });
    }
}

// Initialize parallax system when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new ParallaxSystem();
});
