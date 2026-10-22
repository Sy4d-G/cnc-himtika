tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            brand: {
              emerald: '#00674F',
              neon: '#2CFF05',
              gold: '#EFBF04',
              olive: '#636B2F',
              void: '#03110A',
              surface: '#071A11',
              card: '#0A2217',
              border: 'rgba(99, 107, 47, 0.35)',
            }
          },
          fontFamily: {
            sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
            mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
          },
          boxShadow: {
            'neon-glow': '0 0 25px rgba(44, 255, 5, 0.25)',
            'gold-glow': '0 0 25px rgba(239, 191, 4, 0.25)',
            'card-glow': '0 10px 30px -10px rgba(0, 103, 79, 0.3)',
          }
        }
      }
    }
  

    
    
    
    function init3DCyberCrown() {
      const container = document.getElementById('crown-3d-wrapper');
      const canvas = document.getElementById('crown-canvas');
      if (!container || !canvas) return;
      if (typeof THREE === 'undefined') {
        window.addEventListener('load', init3DCyberCrown, { once: true });
        return;
      }

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(38, container.clientWidth / container.clientHeight, 0.1, 100);
      camera.position.set(0, 0.55, 6.2);

      const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true, powerPreference: 'high-performance' });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(window.innerWidth < 768 ? Math.min(window.devicePixelRatio, 1.5) : Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0); 
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.35;

      
      const envCanvas = document.createElement('canvas');
      envCanvas.width = 1024;
      envCanvas.height = 512;
      const eCtx = envCanvas.getContext('2d');
      eCtx.fillStyle = '#03110A';
      eCtx.fillRect(0, 0, 1024, 512);

      
      const grad1 = eCtx.createRadialGradient(512, 120, 10, 512, 120, 240);
      grad1.addColorStop(0, '#ffffff');
      grad1.addColorStop(0.3, '#fff4b8');
      grad1.addColorStop(0.7, '#665200');
      grad1.addColorStop(1, 'transparent');
      eCtx.fillStyle = grad1;
      eCtx.fillRect(0, 0, 1024, 300);

      
      const grad2 = eCtx.createLinearGradient(0, 0, 300, 0);
      grad2.addColorStop(0, 'rgba(44, 255, 5, 0.9)');
      grad2.addColorStop(0.5, 'rgba(0, 103, 79, 0.5)');
      grad2.addColorStop(1, 'transparent');
      eCtx.fillStyle = grad2;
      eCtx.fillRect(0, 80, 300, 340);

      
      const grad3 = eCtx.createLinearGradient(1024, 0, 724, 0);
      grad3.addColorStop(0, 'rgba(239, 191, 4, 0.9)');
      grad3.addColorStop(0.5, 'rgba(99, 107, 47, 0.5)');
      grad3.addColorStop(1, 'transparent');
      eCtx.fillStyle = grad3;
      eCtx.fillRect(724, 80, 300, 340);

      
      eCtx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
      eCtx.lineWidth = 3;
      eCtx.beginPath();
      eCtx.moveTo(0, 256);
      eCtx.lineTo(1024, 256);
      eCtx.stroke();

      const envTex = new THREE.CanvasTexture(envCanvas);
      envTex.mapping = THREE.EquirectangularReflectionMapping;
      scene.environment = envTex;

      
      const ambLight = new THREE.AmbientLight(0xfff5d0, 0.85);
      scene.add(ambLight);

      const keyLight = new THREE.DirectionalLight(0xfffae0, 2.9);
      keyLight.position.set(5, 7, 6);
      scene.add(keyLight);

      const neonFill = new THREE.DirectionalLight(0x2CFF05, 2.4);
      neonFill.position.set(-6, -2, -2);
      scene.add(neonFill);

      const cyanRim = new THREE.DirectionalLight(0x10f2c5, 1.8);
      cyanRim.position.set(0, -6, 4);
      scene.add(cyanRim);

      const corePointLight = new THREE.PointLight(0x2CFF05, 4.0, 9);
      corePointLight.position.set(0, 0.45, 0);
      scene.add(corePointLight);

      

      
      const crownGroup = new THREE.Group();
      scene.add(crownGroup);

      const pCount = 120;
      const pGeo = new THREE.BufferGeometry();
      const pPos = new Float32Array(pCount * 3);
      const pColors = new Float32Array(pCount * 3);
      const colGreen = new THREE.Color(0x2CFF05);
      const colGold = new THREE.Color(0xEFBF04);
      const colEmerald = new THREE.Color(0x00674F);

      for (let p = 0; p < pCount; p++) {
        const p3 = p * 3;
        const rad = 2.2 + Math.random() * 4.2;
        const th = Math.random() * Math.PI * 2;
        const ph = (Math.random() - 0.5) * Math.PI * 0.9;
        pPos[p3] = rad * Math.cos(ph) * Math.cos(th);
        pPos[p3 + 1] = rad * Math.sin(ph) + (Math.random() - 0.5) * 1.8;
        pPos[p3 + 2] = rad * Math.cos(ph) * Math.sin(th);

        const selCol = Math.random() > 0.65 ? colGold : (Math.random() > 0.35 ? colGreen : colEmerald);
        pColors[p3] = selCol.r;
        pColors[p3 + 1] = selCol.g;
        pColors[p3 + 2] = selCol.b;
      }
      pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute('color', new THREE.BufferAttribute(pColors, 3));
      const pMat = new THREE.PointsMaterial({
        size: 0.048,
        vertexColors: true,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending
      });
      const cyberDust = new THREE.Points(pGeo, pMat);
      scene.add(cyberDust);

      
      const titaniumMat = new THREE.MeshPhysicalMaterial({
        color: 0x181c1a,
        metalness: 0.95,
        roughness: 0.18,
        clearcoat: 0.9,
        clearcoatRoughness: 0.12,
        reflectivity: 0.95
      });

      const cyberGoldMat = new THREE.MeshPhysicalMaterial({
        color: 0xF5C400,
        metalness: 0.98,
        roughness: 0.12,
        clearcoat: 1.0,
        clearcoatRoughness: 0.08,
        emissive: 0x3d2f00,
        emissiveIntensity: 0.3
      });

      const neonConduitMat = new THREE.MeshBasicMaterial({
        color: 0x2CFF05
      });

      const plasmaCoreMat = new THREE.MeshPhongMaterial({
        color: 0x2CFF05,
        emissive: 0x2CFF05,
        emissiveIntensity: 0.9,
        shininess: 120,
        transparent: true,
        opacity: 0.92
      });

      const crystalMat = new THREE.MeshPhysicalMaterial({
        color: 0xEFBF04,
        metalness: 0.9,
        roughness: 0.1,
        clearcoat: 1.0,
        transmission: 0.4,
        ior: 1.6
      });

      
      const SEGMENTS = 8;
      const BASE_RADIUS = 1.48;

      for (let i = 0; i < SEGMENTS; i++) {
        const angle = (i / SEGMENTS) * Math.PI * 2;
        const nextAngle = ((i + 1) / SEGMENTS) * Math.PI * 2;
        const midAngle = (angle + nextAngle) / 2;

        const segGroup = new THREE.Group();
        
        
        const plateGeo = new THREE.BoxGeometry(0.96, 0.42, 0.22);
        const plate = new THREE.Mesh(plateGeo, titaniumMat);
        segGroup.add(plate);

        
        const topTrim = new THREE.Mesh(new THREE.BoxGeometry(0.98, 0.05, 0.24), cyberGoldMat);
        topTrim.position.y = 0.21;
        segGroup.add(topTrim);

        const botTrim = new THREE.Mesh(new THREE.BoxGeometry(0.98, 0.05, 0.24), cyberGoldMat);
        botTrim.position.y = -0.21;
        segGroup.add(botTrim);

        
        const neonTrack = new THREE.Mesh(new THREE.BoxGeometry(0.74, 0.08, 0.25), neonConduitMat);
        segGroup.add(neonTrack);

        segGroup.position.set(Math.cos(midAngle) * BASE_RADIUS, 0, Math.sin(midAngle) * BASE_RADIUS);
        segGroup.rotation.y = -midAngle + Math.PI / 2;
        crownGroup.add(segGroup);

        
        const boltGeo = new THREE.CylinderGeometry(0.09, 0.09, 0.48, 16);
        const bolt = new THREE.Mesh(boltGeo, cyberGoldMat);
        bolt.position.set(Math.cos(angle) * (BASE_RADIUS + 0.02), 0, Math.sin(angle) * (BASE_RADIUS + 0.02));
        crownGroup.add(bolt);

        const boltCore = new THREE.Mesh(new THREE.SphereGeometry(0.055, 12, 12), neonConduitMat);
        boltCore.position.set(Math.cos(angle) * (BASE_RADIUS + 0.12), 0, Math.sin(angle) * (BASE_RADIUS + 0.12));
        crownGroup.add(boltCore);
      }

      
      const floatingCrystals = [];

      for (let i = 0; i < SEGMENTS; i++) {
        const angle = (i / SEGMENTS) * Math.PI * 2;
        const isMajor = (i % 2 === 0);
        const finHeight = isMajor ? 1.45 : 1.1;
        const finGroup = new THREE.Group();

        
        const shape = new THREE.Shape();
        const halfBase = isMajor ? 0.34 : 0.25;
        shape.moveTo(-halfBase, 0);
        shape.lineTo(halfBase, 0);
        shape.lineTo(halfBase * 0.48, finHeight * 0.65);
        shape.lineTo(0.02, finHeight);
        shape.lineTo(-0.02, finHeight);
        shape.lineTo(-halfBase * 0.48, finHeight * 0.65);
        shape.closePath();

        const extrudeSettings = { depth: 0.12, bevelEnabled: true, bevelSegments: 3, steps: 1, bevelSize: 0.035, bevelThickness: 0.035 };
        const bladeGeo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
        bladeGeo.center();
        const blade = new THREE.Mesh(bladeGeo, titaniumMat);
        blade.position.y = finHeight / 2;
        finGroup.add(blade);

        
        const goldShape = new THREE.Shape();
        goldShape.moveTo(-halfBase * 0.62, 0);
        goldShape.lineTo(halfBase * 0.62, 0);
        goldShape.lineTo(halfBase * 0.32, finHeight * 0.48);
        goldShape.lineTo(0, finHeight * 0.75);
        goldShape.lineTo(-halfBase * 0.32, finHeight * 0.48);
        goldShape.closePath();

        const goldExtrude = { depth: 0.15, bevelEnabled: true, bevelSegments: 3, bevelSize: 0.025, bevelThickness: 0.025 };
        const goldBladeGeo = new THREE.ExtrudeGeometry(goldShape, goldExtrude);
        goldBladeGeo.center();
        const goldBlade = new THREE.Mesh(goldBladeGeo, cyberGoldMat);
        goldBlade.position.y = finHeight * 0.34;
        finGroup.add(goldBlade);

        
        const spineGeo = new THREE.BoxGeometry(0.045, finHeight * 0.88, 0.18);
        const spine = new THREE.Mesh(spineGeo, neonConduitMat);
        spine.position.y = finHeight * 0.46;
        finGroup.add(spine);

        finGroup.position.set(Math.cos(angle) * (BASE_RADIUS - 0.02), 0.2, Math.sin(angle) * (BASE_RADIUS - 0.02));
        finGroup.rotation.y = -angle + Math.PI / 2;
        finGroup.rotation.x = -0.15; 

        crownGroup.add(finGroup);

        
        const crystalGeo = new THREE.OctahedronGeometry(isMajor ? 0.15 : 0.10, 0);
        const crystal = new THREE.Mesh(crystalGeo, isMajor ? neonConduitMat : crystalMat);
        crystal.scale.set(1, 2.3, 1);
        
        const topRadius = BASE_RADIUS + finHeight * 0.15;
        const crystalY = 0.2 + finHeight + (isMajor ? 0.24 : 0.18);
        crystal.position.set(Math.cos(angle) * topRadius, crystalY, Math.sin(angle) * topRadius);
        crownGroup.add(crystal);

        floatingCrystals.push({
          mesh: crystal,
          baseY: crystalY,
          phase: i * 0.8,
          speed: 2.2 + (i * 0.2)
        });
      }

      
      const coreGroup = new THREE.Group();
      crownGroup.add(coreGroup);

      const icosaCore = new THREE.Mesh(new THREE.IcosahedronGeometry(0.5, 0), plasmaCoreMat);
      coreGroup.add(icosaCore);

      const cage = new THREE.Mesh(new THREE.IcosahedronGeometry(0.66, 0), new THREE.MeshStandardMaterial({ color: 0xF5C400, wireframe: true, metalness: 0.95, roughness: 0.15 }));
      coreGroup.add(cage);

      coreGroup.position.y = 0.7;

      
      const haloRing = new THREE.Mesh(new THREE.TorusGeometry(1.72, 0.025, 16, 64), neonConduitMat);
      haloRing.rotation.x = Math.PI / 2;
      haloRing.position.y = 1.35;
      crownGroup.add(haloRing);

      const tickRing = new THREE.Mesh(new THREE.TorusGeometry(1.92, 0.018, 16, 64), new THREE.MeshBasicMaterial({ color: 0xEFBF04, transparent: true, opacity: 0.65 }));
      tickRing.rotation.x = Math.PI / 2;
      tickRing.position.y = 0.92;
      crownGroup.add(tickRing);

      crownGroup.rotation.x = 0.26; 
      crownGroup.scale.set(0.68, 0.68, 0.68); 

      
      let isDragging = false;
      let prevMouseX = 0;
      let prevMouseY = 0;
      let targetRotY = 0;
      let targetRotX = 0.26;
      let currentRotY = 0;
      let currentRotX = 0.26;

      function onDown(e) {
        isDragging = true;
        prevMouseX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
        prevMouseY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
      }
      function onMove(e) {
        if (!isDragging) return;
        const cx = e.clientX || (e.touches && e.touches[0].clientX) || 0;
        const cy = e.clientY || (e.touches && e.touches[0].clientY) || 0;
        targetRotY += (cx - prevMouseX) * 0.008;
        targetRotX += (cy - prevMouseY) * 0.008;
        targetRotX = Math.max(-0.35, Math.min(0.5, targetRotX));
        prevMouseX = cx;
        prevMouseY = cy;
      }
      function onUp() {
        isDragging = false;
      }

      canvas.addEventListener('mousedown', onDown);
      window.addEventListener('mousemove', onMove);
      window.addEventListener('mouseup', onUp);
      canvas.addEventListener('touchstart', onDown, { passive: true });
      window.addEventListener('touchmove', onMove, { passive: true });
      window.addEventListener('touchend', onUp);

      function onResize() {
        if (!container) return;
        const w = container.clientWidth;
        const h = container.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      }
      window.addEventListener('resize', onResize);

      
      const clock = new THREE.Clock();
      let crownAnimId = null;

      function animate() {
        if (!window._isHeroInView && window._isHeroInView !== undefined) {
          crownAnimId = null;
          return;
        }
        if (document.hidden) {
          crownAnimId = null;
          return;
        }
        crownAnimId = requestAnimationFrame(animate);
        const elapsed = clock.getElapsedTime();

        
        crownGroup.position.y = Math.sin(elapsed * 1.4) * 0.16;

        
        if (!isDragging) {
          targetRotY += 0.009;
        }
        currentRotY += (targetRotY - currentRotY) * 0.08;
        currentRotX += (targetRotX - currentRotX) * 0.08;
        crownGroup.rotation.y = currentRotY;
        crownGroup.rotation.x = currentRotX;

        
        floatingCrystals.forEach(fc => {
          fc.mesh.position.y = fc.baseY + Math.sin(elapsed * fc.speed + fc.phase) * 0.06;
          fc.mesh.rotation.y += 0.02;
        });

        
        coreGroup.rotation.y += 0.02;
        coreGroup.rotation.x += 0.015;

        
        haloRing.rotation.z += 0.012;
        tickRing.rotation.z -= 0.008;

        if (cyberDust) {
          cyberDust.rotation.y = elapsed * 0.04;
          cyberDust.rotation.x = Math.sin(elapsed * 0.02) * 0.05;
        }

        
        const leftHandEl = document.getElementById('adam-hand-img');
        const rightHandEl = document.getElementById('god-hand-img');
        if (leftHandEl && rightHandEl) {
          const leftY = -Math.cos(elapsed * 0.96) * 22;
          leftHandEl.style.transform = `translateY(${leftY.toFixed(2)}px)`;

          const rightY = Math.cos(elapsed * 0.96) * 22;
          rightHandEl.style.transform = `translateY(${rightY.toFixed(2)}px)`;
        }

        
        const auraEl = document.getElementById('crown-backlight-aura');
        if (auraEl) {
          const crownHoverY = Math.sin(elapsed * 1.4) * 16;
          auraEl.style.transform = `translate(-50%, -50%) translateY(${crownHoverY.toFixed(2)}px)`;
        }

        renderer.render(scene, camera);
      }

      window._resumeCrownAnim = function() {
        if (!crownAnimId && (window._isHeroInView || window._isHeroInView === undefined) && !document.hidden) {
          clock.getDelta();
          animate();
        }
      };

      animate();
    }
    init3DCyberCrown();

    
    
    
    (function initHyperRealisticLightning() {
      const lCanvas = document.getElementById('lightning-canvas');
      const stage = document.getElementById('creation-stage');
      const crownWrapper = document.getElementById('crown-3d-wrapper');
      const leftHand = document.getElementById('adam-hand-img');
      const rightHand = document.getElementById('god-hand-img');
      const auraEl = document.getElementById('crown-backlight-aura');
      if (!lCanvas || !stage || !crownWrapper || !leftHand || !rightHand) return;

      const ctx = lCanvas.getContext('2d');
      let width, height;

      function resize() {
        width = lCanvas.width = stage.clientWidth;
        height = lCanvas.height = stage.clientHeight;
      }
      window.addEventListener('resize', resize);
      resize();

      let strikeState = 'idle'; 
      let currentHand = 'left'; 
      let strikeStartTime = 0;
      
      
      
      
      const STRIKE_DURATION = 720;
      const IDLE_INTERVAL = 4800;
      let lastEventTime = performance.now();

      
      let cachedTrunk = null;
      let cachedForks = [];
      let lastPathUpdateTime = 0;
      const PATH_UPDATE_INTERVAL = 85;

      
      function getFractalPoints(x1, y1, x2, y2, depth, maxDisplace) {
        if (depth <= 0) return [{ x: x1, y: y1 }, { x: x2, y: y2 }];
        const dx = x2 - x1;
        const dy = y2 - y1;
        const len = Math.hypot(dx, dy);
        if (len === 0) return [{ x: x1, y: y1 }, { x: x2, y: y2 }];
        
        const nx = -dy / len;
        const ny = dx / len;
        const offset = (Math.random() - 0.5) * maxDisplace;
        const midX = (x1 + x2) / 2 + nx * offset;
        const midY = (y1 + y2) / 2 + ny * offset;

        const leftBranch = getFractalPoints(x1, y1, midX, midY, depth - 1, maxDisplace * 0.56);
        const rightBranch = getFractalPoints(midX, midY, x2, y2, depth - 1, maxDisplace * 0.56);
        return leftBranch.slice(0, -1).concat(rightBranch);
      }

      function drawShockArc(points, colorMain, colorBloom, alphaMult = 1.0, isTrunk = true) {
        if (!points || points.length < 2) return;

        ctx.save();
        ctx.globalAlpha = Math.min(1.0, Math.max(0.1, alphaMult));

        
        ctx.shadowBlur = isTrunk ? 32 : 16;
        ctx.shadowColor = colorBloom;
        ctx.strokeStyle = colorBloom;
        ctx.lineWidth = isTrunk ? 9 : 4;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) ctx.lineTo(points[i].x, points[i].y);
        ctx.stroke();

        
        ctx.shadowBlur = 12;
        ctx.strokeStyle = colorMain;
        ctx.lineWidth = isTrunk ? 4 : 2;
        ctx.stroke();

        
        if (isTrunk) {
          ctx.shadowBlur = 6;
          ctx.shadowColor = '#ffffff';
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 1.8;
          ctx.stroke();
        }
        ctx.restore();
      }

      function drawImpactBurst(x, y, color, radius, sparkCount, alphaMult = 1.0) {
        ctx.save();
        ctx.globalAlpha = Math.min(1.0, Math.max(0.1, alphaMult));

        
        const radGrad = ctx.createRadialGradient(x, y, 2, x, y, radius);
        radGrad.addColorStop(0, '#ffffff');
        radGrad.addColorStop(0.35, color);
        radGrad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = radGrad;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();

        
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.4;
        ctx.shadowColor = color;
        ctx.shadowBlur = 10;
        for (let s = 0; s < sparkCount; s++) {
          const sparkAngle = Math.random() * Math.PI * 2;
          const sparkDist = (Math.random() * 0.75 + 0.25) * radius * 1.6;
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x + Math.cos(sparkAngle) * sparkDist, y + Math.sin(sparkAngle) * sparkDist);
          ctx.stroke();
        }
        ctx.restore();
      }

      let lightningAnimId = null;

      function updateAndRenderLightning() {
        if (!window._isHeroInView && window._isHeroInView !== undefined) {
          lightningAnimId = null;
          return;
        }
        if (document.hidden || window.innerWidth < 768) {
          lightningAnimId = null;
          return;
        }
        lightningAnimId = requestAnimationFrame(updateAndRenderLightning);
        const now = performance.now();
        ctx.clearRect(0, 0, width, height);

        
        if (strikeState === 'idle') {
          if (now - lastEventTime > IDLE_INTERVAL) {
            strikeState = 'striking';
            strikeStartTime = now;
            lastPathUpdateTime = 0; 
            currentHand = (currentHand === 'left') ? 'right' : 'left';
          }
        }

        if (strikeState === 'striking') {
          const elapsedStrike = now - strikeStartTime;

          if (elapsedStrike < STRIKE_DURATION) {
            const stageRect = stage.getBoundingClientRect();
            const crownRect = crownWrapper.getBoundingClientRect();
            
            let startX, startY, targetX, targetY;
            let mainColor, bloomColor;

            if (currentHand === 'left') {
              const lRect = leftHand.getBoundingClientRect();
              startX = lRect.right - stageRect.left - 10;
              startY = lRect.top - stageRect.top + lRect.height * 0.49;

              targetX = crownRect.left - stageRect.left + crownRect.width * 0.28;
              targetY = crownRect.top - stageRect.top + crownRect.height * 0.45;

              mainColor = '#2CFF05'; 
              bloomColor = 'rgba(44, 255, 5, 0.85)';
            } else {
              const rRect = rightHand.getBoundingClientRect();
              startX = rRect.left - stageRect.left + 10;
              startY = rRect.top - stageRect.top + rRect.height * 0.49;

              targetX = crownRect.left - stageRect.left + crownRect.width * 0.72;
              targetY = crownRect.top - stageRect.top + crownRect.height * 0.45;

              mainColor = '#EFBF04'; 
              bloomColor = 'rgba(239, 191, 4, 0.85)';
            }

            
            
            
            
            let intensity = 1.0;
            if (elapsedStrike < 100) {
              intensity = elapsedStrike / 100;
            } else if (elapsedStrike > 520) {
              intensity = (STRIKE_DURATION - elapsedStrike) / 200;
            }

            
            if (now - lastPathUpdateTime > PATH_UPDATE_INTERVAL || !cachedTrunk) {
              lastPathUpdateTime = now;
              cachedTrunk = getFractalPoints(startX, startY, targetX, targetY, 6, 68);
              
              cachedForks = [];
              const numForks = Math.floor(Math.random() * 3) + 3;
              for (let f = 0; f < numForks; f++) {
                const nodeIdx = Math.floor(Math.random() * (cachedTrunk.length - 4)) + 2;
                const forkStart = cachedTrunk[nodeIdx];
                const dx = targetX - startX;
                const dy = targetY - startY;
                const baseAngle = Math.atan2(dy, dx);
                const forkAngle = baseAngle + (Math.random() - 0.5) * 1.6;
                const forkLen = Math.random() * 60 + 25;
                const forkEndX = forkStart.x + Math.cos(forkAngle) * forkLen;
                const forkEndY = forkStart.y + Math.sin(forkAngle) * forkLen;
                cachedForks.push(getFractalPoints(forkStart.x, forkStart.y, forkEndX, forkEndY, 3, 20));
              }
            }

            
            drawShockArc(cachedTrunk, mainColor, bloomColor, intensity, true);

            
            for (let f = 0; f < cachedForks.length; f++) {
              drawShockArc(cachedForks[f], mainColor, bloomColor, intensity * 0.8, false);
            }

            
            drawImpactBurst(startX, startY, mainColor, 24 * intensity, 6, intensity);
            drawImpactBurst(targetX, targetY, mainColor, 38 * intensity, 10, intensity);

            
            if (auraEl) {
              auraEl.style.filter = `blur(${Math.round(40 - 15 * intensity)}px)`;
              auraEl.style.opacity = `${(0.85 + 0.15 * intensity).toFixed(2)}`;
            }
          } else {
            
            strikeState = 'idle';
            lastEventTime = now;
            cachedTrunk = null;
            cachedForks = [];
            ctx.clearRect(0, 0, width, height);
            if (auraEl) {
              auraEl.style.filter = 'blur(40px)';
              auraEl.style.opacity = '0.85';
            }
          }
        }
      }

      window._resumeLightningAnim = function() {
        if (!lightningAnimId && (window._isHeroInView || window._isHeroInView === undefined) && !document.hidden && window.innerWidth >= 768) {
          lastEventTime = performance.now();
          updateAndRenderLightning();
        }
      };

      updateAndRenderLightning();

      
      window._isHeroInView = true;
      if ('IntersectionObserver' in window) {
        const heroStage = document.getElementById('creation-stage');
        if (heroStage) {
          const heroObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              window._isHeroInView = entry.isIntersecting;
              if (window._isHeroInView) {
                if (window._resumeCrownAnim) window._resumeCrownAnim();
                if (window._resumeLightningAnim) window._resumeLightningAnim();
              }
            });
          }, { threshold: 0.05 });
          heroObserver.observe(heroStage);
        }
      }

      document.addEventListener('visibilitychange', () => {
        if (!document.hidden && window._isHeroInView) {
          if (window._resumeCrownAnim) window._resumeCrownAnim();
          if (window._resumeLightningAnim) window._resumeLightningAnim();
        }
      });
    })();

    
    
    
    
    if (!window.matchMedia || !window.matchMedia('(hover: none)').matches) {
      document.querySelectorAll('.spotlight-card').forEach(card => {
        let spotRaf = null;
        card.addEventListener('mousemove', (e) => {
          if (spotRaf) return;
          const clientX = e.clientX;
          const clientY = e.clientY;
          spotRaf = requestAnimationFrame(() => {
            spotRaf = null;
            const rect = card.getBoundingClientRect();
            card.style.setProperty('--mouse-x', `${(clientX - rect.left).toFixed(1)}px`);
            card.style.setProperty('--mouse-y', `${(clientY - rect.top).toFixed(1)}px`);
          });
        }, { passive: true });
        card.addEventListener('mouseleave', () => {
          if (spotRaf) {
            cancelAnimationFrame(spotRaf);
            spotRaf = null;
          }
        }, { passive: true });
      });
    }

    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const hamburgerIcon = document.getElementById('hamburger-icon');
    const closeIcon = document.getElementById('close-icon');

    mobileBtn.addEventListener('click', () => {
      const isHidden = mobileMenu.classList.contains('hidden');
      if (isHidden) {
        mobileMenu.classList.remove('hidden');
        mobileMenu.classList.add('flex');
        hamburgerIcon.classList.add('hidden');
        closeIcon.classList.remove('hidden');
        document.body.classList.add('overflow-hidden');
      } else {
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('flex');
        hamburgerIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
      }
    });

    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileMenu.classList.remove('flex');
        hamburgerIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
      });
    });

    function handleFormSubmit(e) {
      e.preventDefault();
      const name = document.getElementById('fullName').value.trim();
      const npm = document.getElementById('npm').value.trim();
      const semester = document.getElementById('semester').value;
      const portfolio = document.getElementById('portfolio').value.trim();

      const checkedInterests = Array.from(document.querySelectorAll('input[name="interest"]:checked'))
        .map(cb => cb.value);

      if (checkedInterests.length === 0) {
        showToast('Pilih minimal satu bidang minat Anda.');
        return;
      }

      const randomId = '#CNC-2026-' + Math.floor(1000 + Math.random() * 9000);
      
      const registrationData = {
        id: randomId,
        name,
        npm,
        semester,
        portfolio,
        interests: checkedInterests,
        timestamp: new Date().toISOString()
      };
      localStorage.setItem('cnc_user_registration', JSON.stringify(registrationData));

      document.getElementById('ticket-id').innerText = randomId;
      document.getElementById('ticket-name').innerText = name;
      document.getElementById('ticket-npm').innerText = npm;
      document.getElementById('ticket-interest').innerText = checkedInterests.join(', ');

      const passModal = document.getElementById('pass-modal');
      passModal.classList.remove('hidden');
      passModal.classList.add('flex');

      document.getElementById('talent-form').reset();
    }

    function closePassModal() {
      const passModal = document.getElementById('pass-modal');
      passModal.classList.add('hidden');
      passModal.classList.remove('flex');
      showToast('Pendaftaran Anda tersimpan di sistem lokal.');
    }

    function showToast(message) {
      const toast = document.getElementById('toast');
      const msg = document.getElementById('toast-msg');
      msg.innerText = message;
      toast.classList.remove('hidden');
      setTimeout(() => {
        toast.classList.add('hidden');
      }, 3500);
    }

    function simulateDownload(filename) {
      showToast(`Mengunduh berkas: ${filename}`);
      setTimeout(() => {
        const dummyContent = `Dokumen Resmi Create and Compete (CnC) HIMTIKA UNSIKA\nBerkas: ${filename}\nTahun: 2026`;
        const blob = new Blob([dummyContent], { type: 'application/pdf' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }, 800);
    }
  
    
    
    
    const COMP_DETAILS = {
      itase: {
        title: "ITASE FEST 7.0",
        tag: "NASIONAL \u00b7 CLOSED",
        slogan: "Rise, Grow, and Reach Greater Heights",
        organizer: "Dies Natalis ITASE Fest",
        timeline: "20 Agt - 4 Okt 2026",
        prize: "Rp 25.000.000",
        tracks: ["Bisnis TIK", "Karya Tulis Ilmiah", "AI Idea & Mobile"],
        desc: "Ajang kompetisi teknologi bergengsi tingkat nasional yang menghadirkan 8 cabang perlombaan untuk mahasiswa dan penggiat IT di seluruh Indonesia.",
        link: "https://www.instagram.com/p/DdibMRFjz3D/",
        contact: "Haikal CnC (+62 851-5533-4324)"
      },
      insys: {
        title: "INSYS FEST 6.0",
        tag: "NASIONAL \u00b7 BATCH 2 OPEN",
        slogan: "Empowering Society through Digital Experience",
        organizer: "Information System Fest",
        timeline: "17 Sep - 25 Okt 2026",
        prize: "Rp 15.000.000",
        tracks: ["Digital Innovation UMKM", "Smart City Living", "Future Tech UI"],
        desc: "Kompetisi desain UI/UX tingkat nasional dengan fokus pada solusi digital bagi pelaku UMKM dan peningkatan kualitas hidup perkotaan cerdas.",
        link: "https://www.instagram.com/p/DdaNWC4E9d2/",
        contact: "Haikal CnC (+62 851-5533-4324)"
      },
      switchfest: {
        title: "SWITCHFEST 2026",
        tag: "NASIONAL \u00b7 CLOSED",
        slogan: "Switch Your Skill, Define The Future",
        organizer: "Harlah Prodi Teknologi Informasi",
        timeline: "31 Agt - 30 Sep 2026",
        prize: "Rp 12.500.000",
        tracks: ["UI/UX Design", "Web Development", "Poster Ilmiah"],
        desc: "Ajang perayaan hari lahir Prodi TI yang mewadahi inovator muda dalam menciptakan produk digital yang berdampak luas.",
        link: "https://www.instagram.com/p/DcufrMQk9KY/",
        contact: "Haikal CnC (+62 851-5533-4324)"
      },
      itechno: {
        title: "ITECHNO CUP 2026",
        tag: "INTERNASIONAL \u00b7 SELESAI",
        slogan: "Shape The Future-Ready Society",
        organizer: "Politeknik Negeri Jakarta",
        timeline: "18 Juli - 15 Agt 2026",
        prize: "Rp 35.000.000",
        tracks: ["UI/UX International", "Web Development", "Cyber Security & IoT"],
        desc: "Ajang teknologi internasional tahunan bergengsi yang diikuti oleh universitas ternama se-Asia Tenggara dan nasional.",
        link: "https://www.instagram.com/p/Db7eOc-E_8i/",
        contact: "Haikal CnC (+62 851-5533-4324)"
      },
      fti: {
        title: "FTI FESTIVAL 2026",
        tag: "NASIONAL \u00b7 CLOSED",
        slogan: "Innovate, Integrate, Inspire",
        organizer: "Univ. Atma Luhur",
        timeline: "4 Agt - 13 Agt 2026",
        prize: "Rp 10.000.000",
        tracks: ["Desain UI/UX", "Software Development", "Karya Tulis"],
        desc: "Kompetisi nasional teknologi informasi untuk menjaring talenta muda berbakat di bidang perancangan sistem dan antarmuka pengguna.",
        link: "https://www.instagram.com/p/Dbm_jiDk3Aq/",
        contact: "Haikal CnC (+62 851-5533-4324)"
      },
      compfest: {
        title: "COMPFEST 18 UI",
        tag: "NASIONAL \u00b7 CLOSED",
        slogan: "Driving Infinite Growth to Enclose Digital Skill Gaps",
        organizer: "FASILKOM Universitas Indonesia",
        timeline: "5 Juli - 18 Juli 2026",
        prize: "Rp 105.000.000",
        tracks: ["Competitive Programming", "Capture The Flag (CTF)", "AI Hackathon"],
        desc: "Event IT mahasiswa terbesar di Indonesia yang diadakan oleh Fakultas Ilmu Komputer Universitas Indonesia dengan reputasi tertinggi.",
        link: "https://www.instagram.com/p/DacBWYNk8zY/",
        contact: "Haikal CnC (+62 851-5533-4324)"
      },
      wreckit: {
        title: "WRECK-IT 7.0 PSSN",
        tag: "NASIONAL \u00b7 CLOSED",
        slogan: "Cyber Warfare: Silent War on The Fifth Domain",
        organizer: "Politeknik Siber dan Sandi Negara",
        timeline: "25 Mei - 14 Juni 2026",
        prize: "Rp 45.000.000",
        tracks: ["Capture The Flag (CTF)", "Cyber Warfare", "Digital Forensics"],
        desc: "Kompetisi keamanan siber paling bergengsi di bawah naungan BSSN yang menguji ketangguhan analisis forensik dan eksploitasi sistem pertahanan.",
        link: "https://www.instagram.com/p/DYyUdThk82X/",
        contact: "Haikal CnC (+62 851-5533-4324)"
      },
      kideco: {
        title: "KIC 2026 ITK",
        tag: "NASIONAL \u00b7 BATCH 2 OPEN",
        slogan: "Sustainable Innovation for Future Mining Ecosystem",
        organizer: "FSTI ITK x PT Kideco Jaya Agung",
        timeline: "26 Mei - 20 Okt 2026",
        prize: "Rp 74.000.000",
        tracks: ["Inovasi Rekayasa Digital", "Sustainability & ESG", "AI Smart Mining"],
        desc: "Kolaborasi strategis antara Institut Teknologi Kalimantan dan industri pertambangan nasional dalam mencari solusi otomatisasi cerdas.",
        link: "https://www.instagram.com/p/DY1Psfpk2C0/",
        contact: "Haikal CnC (+62 851-5533-4324)"
      },
      nic: {
        title: "NIC 2026 UNSIKA",
        tag: "NASIONAL \u00b7 OPEN REG",
        slogan: "National IT Competition: Synergy in Code and Design",
        organizer: "Pekan IT HIMTIKA UNSIKA",
        timeline: "18 Juni - 30 Okt 2026",
        prize: "Rp 8.000.000",
        tracks: ["Software Development", "UI/UX Design", "Showcase Karya"],
        desc: "Ajang kompetisi tingkat nasional tuan rumah Informatika UNSIKA dalam rangkaian perhelatan akbar Pekan IT.",
        link: "https://www.instagram.com/p/DZwbyRSEzXF/",
        contact: "Haikal CnC (+62 851-5533-4324)"
      },
      tic: {
        title: "TIC 9.0 HIMATIF",
        tag: "NASIONAL \u00b7 BATCH 2 OPEN",
        slogan: "Code The Future, Expand The Horizon",
        organizer: "HIMATIF",
        timeline: "10 Juli - 25 Okt 2026",
        prize: "Rp 12.000.000",
        tracks: ["Web Development", "Interactive Frontend", "API Integration"],
        desc: "Kompetisi pembuatan web interaktif berstandar industri dengan fokus arsitektur performa tinggi dan pengalaman pengguna modern.",
        link: "https://www.instagram.com/p/DaoqOt5kyub/",
        contact: "Haikal CnC (+62 851-5533-4324)"
      },
      permikomnas: {
        title: "PERMIKOMNAS 2026",
        tag: "NASIONAL \u00b7 CLOSED",
        slogan: "FinTech and Ease of Digital Finance",
        organizer: "PERMIKOMNAS Wilayah Indonesia",
        timeline: "29 Juni - 10 Juli 2026",
        prize: "Rp 10.000.000",
        tracks: ["FinTech UI/UX Design", "Digital Financial Access", "Mobile Prototype"],
        desc: "Kompetisi desain produk digital yang digagas oleh perhimpunan mahasiswa informatika dan komputer nasional se-Indonesia.",
        link: "https://www.instagram.com/p/DaMjHZRk8xW/",
        contact: "Haikal CnC (+62 851-5533-4324)"
      },
      mage: {
        title: "MAGE 12 ITS",
        tag: "NASIONAL \u00b7 OPEN REG",
        slogan: "Multimedia and Game Event: Elevating Creativity",
        organizer: "Teknik Komputer FTEIC ITS Surabaya",
        timeline: "5 Juni - 31 Okt 2026",
        prize: "Rp 30.000.000",
        tracks: ["UI/UX Side Competition", "App Development", "Game Development"],
        desc: "Ajang tahunan prestisius dari ITS Surabaya yang menggabungkan kompetisi rekayasa perangkat lunak, game, dan perancangan antarmuka visual.",
        link: "https://www.instagram.com/p/DZO5OH6k2np/",
        contact: "Haikal CnC (+62 851-5533-4324)"
      },
      gemastik: {
        title: "GEMASTIK XIX 2026",
        tag: "NASIONAL \u00b7 INKUBASI CNC",
        slogan: "Teknologi Informasi untuk Kedaulatan Bangsa",
        organizer: "Puspresnas Kemdikbudristek RI",
        timeline: "Jadwal Resmi Puspresnas 2026",
        prize: "Medali Puspresnas",
        tracks: ["Pengembangan Perangkat Lunak", "UI/UX Design", "Keamanan Siber & Data"],
        desc: "Puncak kompetisi teknologi informasi dan komunikasi mahasiswa paling bergengsi di Indonesia yang diselenggarakan resmi oleh Kemdikbudristek.",
        link: "https://pusatprestasinasional.kemdikbud.go.id/",
        contact: "Haikal CnC (+62 851-5533-4324)"
      },
      findit: {
        title: "FIND IT! 2026 UGM",
        tag: "NASIONAL \u00b7 OPEN REG",
        slogan: "Future Innovations and Discovery in IT",
        organizer: "DTETI FT Universitas Gadjah Mada",
        timeline: "Periode Aktif 2026",
        prize: "Rp 50.000.000",
        tracks: ["Software Development", "UI/UX Design", "Hackathon & Data"],
        desc: "Kompetisi teknologi nasional yang diselenggarakan oleh Departemen Teknik Elektro dan Teknologi Informasi UGM Yogyakarta.",
        link: "https://find-it.id/",
        contact: "Haikal CnC (+62 851-5533-4324)"
      },
      arkavitia: {
        title: "ARKAVITIA 2026 ITB",
        tag: "NASIONAL \u00b7 OPEN REG",
        slogan: "Embrace The Tech Revolution",
        organizer: "HMIF ITB Bandung",
        timeline: "Periode Aktif 2026",
        prize: "Rp 60.000.000",
        tracks: ["Competitive Programming", "Capture The Flag (CTF)", "Datavidia (Data Science)"],
        desc: "Ajang perayaan keilmuan informatika tahunan yang diadakan oleh Himpunan Mahasiswa Informatika Institut Teknologi Bandung.",
        link: "https://arkavitia.id/",
        contact: "Haikal CnC (+62 851-5533-4324)"
      },
      lidm: {
        title: "LIDM 2026 BPTI",
        tag: "NASIONAL \u00b7 KURASI CNC",
        slogan: "Literasi Digital Mahasiswa Menuju Indonesia Emas",
        organizer: "BPTI Puspresnas Kemdikbud",
        timeline: "Jadwal Resmi BPTI 2026",
        prize: "Medali Puspresnas",
        tracks: ["Inovasi Teknologi Pendidikan", "Karya Digital Pembelajaran", "Microlearning Media"],
        desc: "Lomba Inovasi Digital Mahasiswa tingkat nasional oleh Balai Pengembangan Talenta Indonesia untuk memajukan transformasi edukasi modern.",
        link: "https://pusatprestasinasional.kemdikbud.go.id/",
        contact: "Haikal CnC (+62 851-5533-4324)"
      },
      hitech: {
        title: "HI-TECH 8 (UNIBRAW)",
        tag: "NASIONAL \u00b7 BATCH 2 OPEN",
        slogan: "Innovate Beyond Limit",
        organizer: "HIMATIF Univ. Brawijaya",
        timeline: "29 April - 20 Mei 2026",
        prize: "Rp 15.000.000",
        tracks: ["UI/UX Design", "Business Plan Technology", "Poster Digital"],
        desc: "Ajang kompetisi inovasi digital tahunan dari HIMATIF Universitas Brawijaya Malang untuk merancang solusi teknologi tanpa batas.",
        link: "https://www.instagram.com/p/DXvkhDRk-Ch/",
        contact: "Haikal CnC (+62 851-5533-4324)"
      },
      teknocom: {
        title: "TEKNOCOM 2026 (INTL)",
        tag: "INTERNASIONAL \u00b7 OPEN REG",
        slogan: "Next-Generation Technologies for Global Challenges",
        organizer: "International Tech Board",
        timeline: "13 Maret - 13 Mei 2026",
        prize: "$1,500 USD / Rp 25M",
        tracks: ["Cyber Security", "Web Design & Embedded System", "Internet of Things (IoT)"],
        desc: "Kompetisi internasional yang menantang mahasiswa merancang sistem cerdas generasi berikutnya dalam memecahkan tantangan dunia.",
        link: "https://www.instagram.com/p/DXlEE09k1Xp/",
        contact: "Haikal CnC (+62 851-5533-4324)"
      },
      innovate: {
        title: "IN:NOVATE CODEUP! 2026",
        tag: "NASIONAL \u00b7 OPEN REG",
        slogan: "One Earth, One Day, Infinite Solutions",
        organizer: "SENA IN:NOVATE",
        timeline: "5 April - 10 Mei 2026",
        prize: "Rp 6.000.000",
        tracks: ["One Earth Solutions", "Hackathon Web Dev", "Environmental Tech"],
        desc: "Hackathon intensif yang menantang tim mahasiswa menciptakan aplikasi web inovatif pelindung kelestarian bumi dan efisiensi lingkungan.",
        link: "https://www.instagram.com/p/DXieoxZk_Jd/",
        contact: "Haikal CnC (+62 851-5533-4324)"
      },
      apindo: {
        title: "APINDO AI INNOVATION",
        tag: "NASIONAL \u00b7 OPEN REG",
        slogan: "Teman Cerdas, Solusi Tuntas",
        organizer: "Microsoft x APINDO x IOE",
        timeline: "4 Feb - 17 Mei 2026",
        prize: "Gadget + Copilot Pro",
        tracks: ["AI Innovation Challenge", "Teman Cerdas UMKM", "Microsoft Copilot Studio"],
        desc: "Kolaborasi strategis APINDO dan Microsoft Indonesia untuk melahirkan inovasi kecerdasan artifisial terapan yang mentransformasi produktivitas UMKM.",
        link: "https://www.instagram.com/p/DWfWMdfk65l/",
        contact: "Haikal CnC (+62 851-5533-4324)"
      },
      samsung: {
        title: "SAMSUNG SOLVE FOR TOMORROW",
        tag: "NASIONAL \u00b7 OPEN REG",
        slogan: "Innovate for Real Impact, Empower Tomorrow",
        organizer: "Samsung Electronics Indonesia",
        timeline: "8 Mei - 25 Juni 2026",
        prize: "Dana Hibah & Mentoring",
        tracks: ["AI Amplification", "Design Thinking Workshop", "Prototipe Nyata Solusi"],
        desc: "Program inkubasi teknologi global oleh Samsung yang memberikan pendampingan intensif dari engineer ahli untuk merealisasikan solusi sosial berdampak nyata.",
        link: "https://www.instagram.com/p/DYGYEbMExsp/",
        contact: "Haikal CnC (+62 851-5533-4324)"
      },
      gunadarma: {
        title: "GUNADARMA CODE WEEK 2.0",
        tag: "NASIONAL \u00b7 OPEN REG",
        slogan: "Empowering Future Developers Through Fast Prototyping",
        organizer: "Universitas Gunadarma",
        timeline: "29 April - 20 Mei 2026",
        prize: "Rp 15.000.000+",
        tracks: ["Hackathon Software", "Web & Mobile System", "Algoritma Pemrograman"],
        desc: "Ajang kompetisi pemrograman dan hackathon bereputasi tinggi yang mempertemukan developer berbakat se-Indonesia di Universitas Gunadarma.",
        link: "https://www.instagram.com/p/DXvkr_UE53B/",
        contact: "Haikal CnC (+62 851-5533-4324)"
      },
      unity: {
        title: "UNITY #14 2026 (UNY)",
        tag: "NASIONAL \u00b7 OPEN REG",
        slogan: "Unite Technology for Future Community Transformation",
        organizer: "UKM Rekayasa Teknologi UNY",
        timeline: "27 April - 30 Mei 2026",
        prize: "Rp 12.000.000",
        tracks: ["UX Design Prototype", "Smart Device & Embedded IoT", "Inovasi Teknologi"],
        desc: "Kompetisi teknologi rancang bangun perangkat pintar (IoT) dan pengalaman pengguna (UX) yang diselenggarakan oleh Universitas Negeri Yogyakarta.",
        link: "https://www.instagram.com/p/DXqGP0XE2UI/",
        contact: "Haikal CnC (+62 851-5533-4324)"
      },
      nightfall: {
        title: "PROJECT NIGHTFALL (HTB)",
        tag: "INTERNASIONAL \u00b7 OPEN REG",
        slogan: "Pressure-Test Your Skills in High-Stakes Cyber Scenarios",
        organizer: "Hack The Box Global",
        timeline: "27 April - 15 Mei 2026",
        prize: "Global CTF Vouchers",
        tracks: ["State Infrastructure Defense", "Supply Chain Glitch Handling", "Enterprise Cyber Skills"],
        desc: "Ajang benchmark kemampuan siber global resmi oleh platform Hack The Box yang menyimulasikan skenario serangan siber infrastruktur kritis berskala negara.",
        link: "https://www.instagram.com/p/DXqGZpCk1Ea/",
        contact: "Haikal CnC (+62 851-5533-4324)"
      },
      codefest: {
        title: "CODEFEST 002",
        tag: "NASIONAL \u00b7 CLOSED",
        slogan: "Digital Innovation for Local Impact & Global Resilience",
        organizer: "National Tech Hub",
        timeline: "5 Mei - 25 Mei 2026",
        prize: "Rp 25.000.000",
        tracks: ["Competitive Programming", "Digital Innovation Impact", "Global Resilience"],
        desc: "Panggung kompetisi koding nasional untuk menguji ketangkasan algoritma dan daya cipta perangkat lunak tahan banting.",
        link: "https://www.instagram.com/p/DX-thiXE1V-/",
        contact: "Haikal CnC (+62 851-5533-4324)"
      },
      protoathon: {
        title: "PROTO-A-THON 2026 (INTL)",
        tag: "INTERNASIONAL \u00b7 CLOSED",
        slogan: "Redefine The Future of Technology Through Design",
        organizer: "International UI/UX Council",
        timeline: "19 April - 10 Mei 2026",
        prize: "$1,500+ USD / Rp 24M",
        tracks: ["Interactive Prototyping", "Design System Architecture", "Real-World UX Solutions"],
        desc: "Kompetisi internasional yang menantang mahasiswa merancang prototipe produk digital inovatif dengan standar usability global.",
        link: "https://www.instagram.com/p/DXV2LQ7k8bb/",
        contact: "Haikal CnC (+62 851-5533-4324)"
      },
      iyref: {
        title: "IYREF HACKATHON 2026",
        tag: "NASIONAL \u00b7 CLOSED",
        slogan: "Accelerating Energy Transition Through Youth Digital Tech",
        organizer: "SRE ITB Bandung",
        timeline: "16 April - 8 Mei 2026",
        prize: "Rp 20.000.000",
        tracks: ["Energy Transition Tech", "Software Carbon Tracking", "Smart Renewable Solution"],
        desc: "Hackathon bergengsi Society of Renewable Energy ITB dalam merancang piranti lunak monitoring emisi dan percepatan energi bersih.",
        link: "https://www.instagram.com/p/DXNx0cMk5el/",
        contact: "Haikal CnC (+62 851-5533-4324)"
      },
      myai: {
        title: "MYAI FUTURE HACKATHON",
        tag: "INTERNASIONAL \u00b7 CLOSED",
        slogan: "Project 2030: Building AI Solutions for Tomorrow",
        organizer: "Google Developer x APU",
        timeline: "15 April - 12 Mei 2026",
        prize: "RM 15.000 / Rp 50M",
        tracks: ["Project 2030 AI", "Student AI Hackathon", "GenAI & LLM Integration"],
        desc: "Inisiatif hackathon kecerdasan artifisial internasional yang didukung langsung oleh Google Developer untuk mahasiswa di kawasan Asia Tenggara.",
        link: "https://www.instagram.com/p/DXLaxJpk4-V/",
        contact: "Haikal CnC (+62 851-5533-4324)"
      },
      playit: {
        title: "PLAY IT! 2026 (POLINEMA)",
        tag: "NASIONAL \u00b7 CLOSED",
        slogan: "24 Hours of Pure Innovation and Engineering",
        organizer: "Politeknik Negeri Malang",
        timeline: "11 April - 2 Mei 2026",
        prize: "Rp 50.000.000",
        tracks: ["24 Hours Hackathon", "Software Architecture", "Game & Interactive App"],
        desc: "Tantangan rekayasa teknologi 24 jam nonstop dari POLINEMA yang memacu adrenalin developer dalam membangun aplikasi fungsional dari nol.",
        link: "https://www.instagram.com/p/DXBYCrBE0eP/",
        contact: "Haikal CnC (+62 851-5533-4324)"
      },
      replyai: {
        title: "REPLY AI AGENT CHALLENGE",
        tag: "INTERNASIONAL \u00b7 SELESAI",
        slogan: "Build Intelligent Agents to Solve Complex Reality",
        organizer: "Reply Europe",
        timeline: "29 Maret - 16 April 2026",
        prize: "\u20ac20.000 / Rp 340M",
        tracks: ["Autonomous LLM Agents", "Intelligent Automation", "Real-World Problem Solving"],
        desc: "Tantangan AI tingkat global di Eropa dengan fokus arsitektur multi-agent autonomous berbasis LLM untuk otomatisasi proses industri canggih.",
        link: "https://www.instagram.com/p/DWfVhtykxEB/",
        contact: "Haikal CnC (+62 851-5533-4324)"
      },
      bugbounty: {
        title: "BUG BOUNTY PUSDATIN",
        tag: "NASIONAL \u00b7 SELESAI",
        slogan: "Ethical Hacking for National Educational Security",
        organizer: "Pusdatin Kemendikdasmen RI",
        timeline: "14 April - 30 April 2026",
        prize: "Bounty Resmi Kemdikbud",
        tracks: ["Web Vulnerability Assessment", "Ethical Security Finding", "Pusdatin Security Hardening"],
        desc: "Program sayembara peretasan etis resmi dari Kemendikdasmen RI bagi para peneliti keamanan informasi untuk menemukan celah sistem pendidikan nasional.",
        link: "https://www.instagram.com/p/DXGyFSGkyPc/",
        contact: "Haikal CnC (+62 851-5533-4324)"
      },
      gameseed: {
        title: "GAMESEED 2026",
        tag: "NASIONAL \u00b7 SELESAI",
        slogan: "Seed Your Creative Game, Grow Into Industry",
        organizer: "Kemenparekraf RI",
        timeline: "29 Maret - 25 April 2026",
        prize: "Hibah Industri Game",
        tracks: ["PC Game Development", "Mobile Game Innovation", "Industry Pitching"],
        desc: "Program inkubasi dan kompetisi pengembang game terbesar di tanah air dengan bimbingan langsung dari studio game terkemuka Indonesia.",
        link: "https://www.instagram.com/p/DWfVpCCk1In/",
        contact: "Haikal CnC (+62 851-5533-4324)"
      },
      refactory: {
        title: "REFACTORY HACKATHON",
        tag: "NASIONAL \u00b7 SELESAI",
        slogan: "Push Your Limits. Code Your Future.",
        organizer: "Refactory x UNAIR Surabaya",
        timeline: "29 Maret - 10 April 2026",
        prize: "Rp 20.000.000",
        tracks: ["Push Your Limits Coding", "Production-Ready Fullstack", "Fast Prototyping"],
        desc: "Ajang hackathon koding intensif di Fakultas Vokasi Universitas Airlangga untuk melatih arsitektur software production-ready berstandar industri.",
        link: "https://www.instagram.com/p/DWfVUoXk8v6/",
        contact: "Haikal CnC (+62 851-5533-4324)"
      },
      cyberwave: {
        title: "CTF CYBERWAVE 2.0",
        tag: "NASIONAL \u00b7 SELESAI",
        slogan: "Unleash The Cyber Wave, Secure The Grid",
        organizer: "CyberWave Community",
        timeline: "27 Maret - Mei 2026",
        prize: "Cash Prize & Sertifikat",
        tracks: ["Digital Forensics (DFIR)", "Binary Exploitation (PWN)", "Web Exploitation & Reverse"],
        desc: "Kompetisi CTF online bergengsi yang menantang peserta membedah skenario eksploitasi kernel, reverse engineering, dan penyelidikan insiden siber.",
        link: "https://www.instagram.com/p/DWautmIE99W/",
        contact: "Haikal CnC (+62 851-5533-4324)"
      },
      cat: {
        title: "CAT 2026 (ECOMMURZ)",
        tag: "NASIONAL \u00b7 SELESAI",
        slogan: "Nationwide Tournament Built by Olympiad Veterans",
        organizer: "ecommurz x csrelatedcompetitions",
        timeline: "27 Maret - 20 April 2026",
        prize: "Rp 25.000.000",
        tracks: ["Coding & Algorithms Tournament", "Competitive Programming", "High Complexity Problem"],
        desc: "Turnamen algoritma berskala nasional yang dirancang oleh alumni kontributor IOI, ICPC, dan Google Code Jam untuk talenta pemrogram terbaik Indonesia.",
        link: "https://www.instagram.com/p/DWaucqMk1ny/",
        contact: "Haikal CnC (+62 851-5533-4324)"
      },
      aseanai: {
        title: "ASEAN AI HACKATHON 2026",
        tag: "INTERNASIONAL \u00b7 SELESAI",
        slogan: "Powering Southeast Asia Digital Economy with AI",
        organizer: "ASEAN Secretariat Digital Hub",
        timeline: "25 Maret - 12 April 2026",
        prize: "$5,000 USD / Rp 80M",
        tracks: ["Southeast Asia Digital Economy", "AI for Public Sector", "Regional Problem Solving"],
        desc: "Ajang kolaboratif regional Asia Tenggara yang mempertemukan talenta muda pengembang AI untuk mengakselerasi ekonomi digital masa depan.",
        link: "https://www.instagram.com/p/DWVotLRk7mP/",
        contact: "Haikal CnC (+62 851-5533-4324)"
      },
      fit: {
        title: "FIT COMPETITION 2026",
        tag: "NASIONAL \u00b7 CLOSED",
        slogan: "Digital Impact for Humanitarian Response and Global Well-Being",
        organizer: "Fakultas TI UKDW Yogyakarta",
        timeline: "18 Mei - 10 Juni 2026",
        prize: "Rp 15.000.000",
        tracks: ["Digital Impact Humanitarian", "Global Well-Being Solutions", "AI Integration"],
        desc: "Kompetisi akademik bergengsi yang menantang mahasiswa mengintegrasikan teknologi data dan AI guna merespons krisis kemanusiaan global.",
        link: "https://www.instagram.com/p/DYgSgvME-LX/",
        contact: "Haikal CnC (+62 851-5533-4324)"
      },
      istco: {
        title: "IST.CO 2026 (DIGARA)",
        tag: "NASIONAL \u00b7 CLOSED",
        slogan: "Igniting Digital Creativity and Interface Mastery",
        organizer: "DIGARA Indonesia",
        timeline: "24 Mei - 15 Juni 2026",
        prize: "Rp 10.000.000",
        tracks: ["Creative UI/UX Prototype", "Mobile Design Architecture", "User-Centric Innovation"],
        desc: "Kompetisi desain produk digital yang menantang kreativitas desainer muda dalam menciptakan antarmuka yang memikat dan mudah digunakan.",
        link: "https://www.instagram.com/p/DYv0t9_j_CI/",
        contact: "Haikal CnC (+62 851-5533-4324)"
      },
      hmpitech: {
        title: "HMPI TECHFEST 2026",
        tag: "NASIONAL \u00b7 CLOSED",
        slogan: "Inovasi Digital dan Pengembangan Diri di Era Teknologi",
        organizer: "HMP Informatika UPY",
        timeline: "22 April - 15 Mei 2026",
        prize: "Rp 8.000.000",
        tracks: ["Desain Logo & UI/UX", "Web Development Innovation", "Pengembangan Diri Digital"],
        desc: "Festival teknologi mahasiswa yang menggabungkan adu kecakapan desain grafis antarmuka dan pembangunan aplikasi web adaptif.",
        link: "https://www.instagram.com/p/DXdVZ3sEzes/",
        contact: "Haikal CnC (+62 851-5533-4324)"
      },
      jkbfest: {
        title: "JKB FESTIVAL 2026",
        tag: "NASIONAL \u00b7 CLOSED",
        slogan: "D-CORE: Digital Competency and Innovation Arena",
        organizer: "Politeknik Negeri",
        timeline: "3 April - 26 April 2026",
        prize: "Rp 7.500.000",
        tracks: ["D-CORE Web Development", "Digital Competency Arena", "Interactive Web Innovation"],
        desc: "Arena uji kompetensi rekayasa website yang menantang mahasiswa menyajikan kode yang bersih, responsif, dan fungsional.",
        link: "https://www.instagram.com/p/DXdVQpLk-sr/",
        contact: "Haikal CnC (+62 851-5533-4324)"
      }
    };

    function openCompModal(compKey) {
      const data = COMP_DETAILS[compKey];
      if (!data) return;
      document.getElementById('comp-modal-title').innerText = data.title;
      document.getElementById('comp-modal-tag').innerText = data.tag;
      
      const body = document.getElementById('comp-modal-body');
      body.innerHTML = `
        <div class="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1">
          <div class="text-[11px] text-slate-400 font-mono">Penyelenggara & Tema:</div>
          <div class="text-white font-semibold text-xs">${data.organizer}</div>
          <div class="text-[#2CFF05] text-[11px] italic font-mono">&ldquo;${data.slogan}&rdquo;</div>
        </div>

        <div class="grid grid-cols-2 gap-2 text-left">
          <div class="p-2.5 rounded-lg bg-white/5 border border-white/5">
            <span class="text-[10px] text-slate-400 block font-mono">TOTAL HADIAH</span>
            <span class="text-xs font-bold text-[#EFBF04]">${data.prize}</span>
          </div>
          <div class="p-2.5 rounded-lg bg-white/5 border border-white/5">
            <span class="text-[10px] text-slate-400 block font-mono">TIMELINE</span>
            <span class="text-xs font-medium text-slate-200">${data.timeline}</span>
          </div>
        </div>

        <div>
          <div class="text-[11px] text-slate-400 font-mono mb-1.5">Cabang / Jalur Perlombaan:</div>
          <div class="space-y-1">
            ${data.tracks.map((t, i) => `
              <div class="flex items-center gap-2 p-1.5 rounded bg-black/30 border border-white/5 text-slate-300 text-[11px]">
                <span class="font-mono text-[#2CFF05] font-bold">[0${i+1}]</span>
                <span>${t}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <p class="text-slate-300 leading-relaxed text-[11px]">${data.desc}</p>

        <div class="p-2.5 rounded-lg bg-[#00674F]/20 border border-[#2CFF05]/30 flex flex-col gap-1 text-[11px]">
          <div class="flex items-center justify-between text-slate-300">
            <span>Bimbingan & Delegasi CnC:</span>
            <a href="https://bit.ly/MinatBakatCnC" target="_blank" class="text-[#2CFF05] font-mono hover:underline font-semibold">bit.ly/MinatBakatCnC ↗</a>
          </div>
          <div class="text-[10px] text-slate-400 font-mono">Narahubung: ${data.contact}</div>
        </div>
      `;

      const igLink = document.getElementById('comp-modal-ig-link');
      if (igLink) {
        igLink.href = data.link || 'https://www.instagram.com/cnc_himtika/';
      }

      const modal = document.getElementById('comp-modal');
      modal.classList.remove('hidden');
      modal.classList.add('flex');
    }

    function closeCompModal() {
      const modal = document.getElementById('comp-modal');
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }

    
    
    
    let currentCompCategory = 'all';
    let currentCompSlide = 0;
    let currentSlideCount = 4;
    let totalFilteredCards = 40;
    let allCardsElements = [];
    let isPokerSectionInView = false;

    function initCompetitionsSlider() {
      const track = document.getElementById('competitions-slider-track');
      if (!track) return;

      
      allCardsElements = Array.from(track.querySelectorAll('.poker-card-wrap'));

      
      let initialSlide = 0;
      const hashMatch = window.location.hash.match(/#deck(\d+)/i);
      if (hashMatch) {
        initialSlide = Math.max(0, parseInt(hashMatch[1], 10) - 1);
      }

      
      setupCompetitionSlides('all', initialSlide);

      
      const stage = document.getElementById('poker-stage');
      if (stage) {
        let touchStartX = 0;
        let touchStartY = 0;
        let touchEndX = 0;
        let touchEndY = 0;
        stage.addEventListener('touchstart', (e) => {
          touchStartX = e.changedTouches[0].clientX;
          touchStartY = e.changedTouches[0].clientY;
        }, { passive: true });
        stage.addEventListener('touchend', (e) => {
          touchEndX = e.changedTouches[0].clientX;
          touchEndY = e.changedTouches[0].clientY;
          const diffX = touchStartX - touchEndX;
          const diffY = touchStartY - touchEndY;
          if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY) * 1.4) {
            if (diffX > 0) slideCompetitions(1);
            else slideCompetitions(-1);
          }
        }, { passive: true });
      }

      
      window.addEventListener('keydown', (e) => {
        const lombaSec = document.getElementById('lomba');
        if (!lombaSec) return;
        const rect = lombaSec.getBoundingClientRect();
        const inView = rect.top < window.innerHeight * 0.85 && rect.bottom > 150;
        if (inView && document.activeElement && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
          if (e.key === 'ArrowRight') {
            slideCompetitions(1);
          } else if (e.key === 'ArrowLeft') {
            slideCompetitions(-1);
          }
        }
      });
    }

    function setupCompetitionSlides(category, targetSlide = 0) {
      const track = document.getElementById('competitions-slider-track');
      if (!track || allCardsElements.length === 0) return;

      currentCompCategory = category;

      
      const filtered = allCardsElements.filter(card => {
        const cardCats = card.getAttribute('data-category') || '';
        return category === 'all' || cardCats.includes(category);
      });

      totalFilteredCards = filtered.length;
      currentSlideCount = Math.max(1, Math.ceil(totalFilteredCards / 5));
      currentCompSlide = Math.min(Math.max(0, targetSlide), currentSlideCount - 1);

      track.innerHTML = '';

      for (let s = 0; s < currentSlideCount; s++) {
        const slideDiv = document.createElement('div');
        slideDiv.className = 'comp-slide w-full flex-shrink-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 min-[1400px]:grid-cols-5 gap-4 sm:gap-5 items-stretch';
        slideDiv.setAttribute('data-slide-index', s);

        const batch = filtered.slice(s * 5, (s + 1) * 5);
        batch.forEach(card => {
          card.style.display = 'block';
          slideDiv.appendChild(card);
        });

        track.appendChild(slideDiv);
      }

      updateCompSliderUI(true);
      dealCardsInActiveSlide();
    }

    function slideCompetitions(direction) {
      const target = currentCompSlide + direction;
      if (target >= 0 && target < currentSlideCount) {
        goToCompSlide(target);
      }
    }

    function goToCompSlide(slideIndex) {
      if (slideIndex < 0 || slideIndex >= currentSlideCount) return;
      currentCompSlide = slideIndex;
      updateCompSliderUI();
      dealCardsInActiveSlide();
    }

    function updateCompSliderUI(immediate = false) {
      const track = document.getElementById('competitions-slider-track');
      if (track) {
        if (immediate) {
          track.style.transition = 'none';
          track.style.transform = `translateX(-${currentCompSlide * 100}%)`;
          void track.offsetWidth;
          track.style.transition = '';
        } else {
          track.style.transform = `translateX(-${currentCompSlide * 100}%)`;
        }
      }

      
      const startNum = totalFilteredCards === 0 ? 0 : currentCompSlide * 5 + 1;
      const endNum = Math.min((currentCompSlide + 1) * 5, totalFilteredCards);

      const sumEl = document.getElementById('comp-slide-summary');
      if (sumEl) {
        sumEl.textContent = `Halaman ${currentCompSlide + 1} dari ${currentSlideCount}`;
      }

      
      const isFirst = currentCompSlide === 0;
      const isLast = currentCompSlide >= currentSlideCount - 1;

      const btnPrev = document.getElementById('comp-btn-prev');
      const btnNext = document.getElementById('comp-btn-next');
      const floatPrev = document.getElementById('comp-float-prev');
      const floatNext = document.getElementById('comp-float-next');
      const btnPrevBtm = document.getElementById('comp-btn-prev-btm');
      const btnNextBtm = document.getElementById('comp-btn-next-btm');

      if (btnPrev) btnPrev.disabled = isFirst;
      if (btnNext) btnNext.disabled = isLast;
      if (floatPrev) floatPrev.disabled = isFirst;
      if (floatNext) floatNext.disabled = isLast;
      if (btnPrevBtm) btnPrevBtm.disabled = isFirst;
      if (btnNextBtm) btnNextBtm.disabled = isLast;

      renderCompDots();
    }

    function renderCompDots() {
      const container = document.getElementById('comp-dots-container');
      if (!container) return;

      container.innerHTML = '';
      const isFirst = currentCompSlide === 0;
      const isLast = currentCompSlide >= currentSlideCount - 1;

      const prevBtn = document.createElement('button');
      prevBtn.type = 'button';
      prevBtn.setAttribute('aria-label', 'Halaman Sebelumnya');
      prevBtn.disabled = isFirst;
      prevBtn.onclick = () => slideCompetitions(-1);
      prevBtn.className = 'w-8 h-8 sm:w-9 sm:h-9 rounded-lg border border-[#636B2F]/40 bg-[#071A11] text-slate-300 hover:text-white hover:border-[#2CFF05]/50 flex items-center justify-center transition-all disabled:opacity-30 disabled:pointer-events-none active:scale-95 shrink-0';
      prevBtn.innerHTML = '<svg class="w-3.5 h-3.5 text-[#2CFF05]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"/></svg>';
      container.appendChild(prevBtn);

      for (let s = 0; s < currentSlideCount; s++) {
        const sNum = s + 1;
        const isActive = s === currentCompSlide;

        const btn = document.createElement('button');
        btn.type = 'button';
        btn.setAttribute('aria-label', `Pindah ke Halaman ${sNum}`);
        btn.onclick = () => goToCompSlide(s);

        if (isActive) {
          btn.className = 'w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#2CFF05] text-[#03110A] font-mono text-xs sm:text-sm font-bold transition-all shadow-neon-glow flex items-center justify-center scale-105 shrink-0';
          btn.innerHTML = `<span>${sNum}</span>`;
        } else {
          btn.className = 'w-8 h-8 sm:w-9 sm:h-9 rounded-lg border border-[#636B2F]/30 bg-[#071A11] text-slate-300 hover:text-white hover:border-[#2CFF05]/40 font-mono text-xs sm:text-sm font-semibold transition-all flex items-center justify-center active:scale-95 shrink-0';
          btn.innerHTML = `<span>${sNum}</span>`;
        }

        container.appendChild(btn);
      }

      const nextBtn = document.createElement('button');
      nextBtn.type = 'button';
      nextBtn.setAttribute('aria-label', 'Halaman Selanjutnya');
      nextBtn.disabled = isLast;
      nextBtn.onclick = () => slideCompetitions(1);
      nextBtn.className = 'w-8 h-8 sm:w-9 sm:h-9 rounded-lg border border-[#636B2F]/40 bg-[#071A11] text-slate-300 hover:text-white hover:border-[#2CFF05]/50 flex items-center justify-center transition-all disabled:opacity-30 disabled:pointer-events-none active:scale-95 shrink-0';
      nextBtn.innerHTML = '<svg class="w-3.5 h-3.5 text-[#2CFF05]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"/></svg>';
      container.appendChild(nextBtn);
    }

    function dealCardsInActiveSlide() {
      const track = document.getElementById('competitions-slider-track');
      if (!track) return;

      const activeSlide = track.querySelector(`.comp-slide[data-slide-index="${currentCompSlide}"]`);
      if (!activeSlide) return;

      const cards = Array.from(activeSlide.querySelectorAll('.comp-card'));
      if (cards.length === 0) return;

      cards.forEach((card, idx) => {
        card.classList.remove('deal-pitch-anim');
        card.style.animationDelay = '';
        void card.offsetWidth;

        const delay = (idx * 0.05).toFixed(2) + 's';
        card.style.animationDelay = delay;
        card.classList.add('deal-pitch-anim');

        card.addEventListener('animationend', () => {
          card.classList.remove('deal-pitch-anim');
          card.style.animationDelay = '';
        }, { once: true });
      });
    }

    function handlePokerTilt(e, card) {
      if (window.matchMedia && window.matchMedia('(hover: none)').matches) return;
      if (card._tiltRaf) return;
      const clientX = e.clientX;
      const clientY = e.clientY;
      card._tiltRaf = requestAnimationFrame(() => {
        card._tiltRaf = null;
        const rect = card.getBoundingClientRect();
        const x = clientX - rect.left;
        const y = clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 12;

        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(8px)`;
        
        const glare = card.querySelector('.poker-glare');
        if (glare) {
          const percentX = (x / rect.width) * 100;
          const percentY = (y / rect.height) * 100;
          glare.style.background = `radial-gradient(circle at ${percentX.toFixed(1)}% ${percentY.toFixed(1)}%, rgba(255,255,255,0.18) 0%, rgba(44,255,5,0.1) 40%, transparent 70%)`;
        }
      });
    }

    function resetPokerTilt(card) {
      if (card._tiltRaf) {
        cancelAnimationFrame(card._tiltRaf);
        card._tiltRaf = null;
      }
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    }

    function scrollCategoryTabs(dir) {
      const track = document.getElementById('category-tabs-track');
      if (track) {
        track.scrollBy({ left: dir * 180, behavior: 'smooth' });
      }
    }

    function filterCompetitions(category) {
      const buttons = document.querySelectorAll('.filter-btn');
      buttons.forEach(btn => {
        btn.classList.remove('border-[#2CFF05]', 'bg-[#2CFF05]/15', 'text-[#2CFF05]');
        btn.classList.add('border-[#636B2F]/30', 'bg-[#071A11]', 'text-slate-300');
      });

      if (window.event && window.event.currentTarget) {
        const targetBtn = window.event.currentTarget;
        targetBtn.classList.remove('border-[#636B2F]/30', 'bg-[#071A11]', 'text-slate-300');
        targetBtn.classList.add('border-[#2CFF05]', 'bg-[#2CFF05]/15', 'text-[#2CFF05]');
        if (targetBtn.scrollIntoView) {
          targetBtn.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        }
      }

      setupCompetitionSlides(category, 0);
    }

    function initPokerDealingObserver() {
      const lombaSection = document.getElementById('lomba');
      if (!lombaSection) return;

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !isPokerSectionInView) {
            isPokerSectionInView = true;
            dealCardsInActiveSlide();
          } else if (!entry.isIntersecting && isPokerSectionInView) {
            isPokerSectionInView = false;
          }
        });
      }, { threshold: 0.12 });

      observer.observe(lombaSection);

      window.addEventListener('scroll', () => {
        const rect = lombaSection.getBoundingClientRect();
        const inView = rect.top < window.innerHeight * 0.85 && rect.bottom > 100;
        if (inView && !isPokerSectionInView) {
          isPokerSectionInView = true;
          dealCardsInActiveSlide();
        } else if (!inView && isPokerSectionInView) {
          isPokerSectionInView = false;
        }
      }, { passive: true });

      if (window.location.hash === '#lomba') {
        setTimeout(() => {
          isPokerSectionInView = true;
          dealCardsInActiveSlide();
        }, 200);
      }
    }

    window.addEventListener('DOMContentLoaded', () => {
      initCompetitionsSlider();
      initPokerDealingObserver();
    });

    
    
    
    function cinematicScrollTo(targetSelector, customDuration = 950) {
      const target = document.querySelector(targetSelector);
      if (!target) return;

      const navbar = document.getElementById('navbar');
      const navOffset = navbar ? navbar.offsetHeight + 16 : 80;
      
      const startPosition = window.pageYOffset || document.documentElement.scrollTop;
      const targetPosition = target.getBoundingClientRect().top + startPosition - navOffset;
      const distance = targetPosition - startPosition;
      let startTime = null;
      let dealTriggered = false;

      
      function easeInOutQuint(t) {
        return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t;
      }

      function animationStep(currentTime) {
        if (!startTime) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / customDuration, 1);
        const ease = easeInOutQuint(progress);

        window.scrollTo(0, startPosition + distance * ease);

        
        if (progress > 0.85 && targetSelector === '#lomba' && !dealTriggered) {
          dealTriggered = true;
          isPokerSectionInView = true;
          dealCardsSequentially();
        }

        if (progress < 1) {
          window.requestAnimationFrame(animationStep);
        } else {
          
          window.scrollTo(0, targetPosition);
          
          if (targetSelector === '#lomba') {
            if (!dealTriggered) {
              dealTriggered = true;
              isPokerSectionInView = true;
              dealCardsSequentially();
            }
            target.classList.add('lomba-arrival-highlight');
            setTimeout(() => target.classList.remove('lomba-arrival-highlight'), 1800);
          }
        }
      }

      window.requestAnimationFrame(animationStep);
    }

    function initCinematicNavLinks() {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
          const href = this.getAttribute('href');
          if (href && href.length > 1 && document.querySelector(href)) {
            e.preventDefault();

            
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
              mobileMenu.classList.add('hidden');
            }

            cinematicScrollTo(href, href === '#lomba' ? 1050 : 850);
          }
        });
      });
    }

    window.addEventListener('DOMContentLoaded', () => {
      initCinematicNavLinks();
    });

  
    
    
    
    let currentProjIndex = 0;
    const totalProjSlides = 2;

    function updateProjectSlider() {
      const track = document.getElementById('project-slider-track');
      const idxDisplay = document.getElementById('proj-current-idx');
      const dots = document.querySelectorAll('.proj-dot');

      if (track) {
        track.style.transform = `translateX(-${currentProjIndex * 100}%)`;
      }

      if (idxDisplay) {
        idxDisplay.innerText = String(currentProjIndex + 1).padStart(2, '0');
      }

      dots.forEach((dot, idx) => {
        if (idx === currentProjIndex) {
          dot.classList.remove('w-3', 'bg-white/20');
          dot.classList.add('w-9', 'bg-[#2CFF05]');
        } else {
          dot.classList.remove('w-9', 'bg-[#2CFF05]');
          dot.classList.add('w-3', 'bg-white/20');
        }
      });
    }

    function prevProjectSlide() {
      currentProjIndex = (currentProjIndex - 1 + totalProjSlides) % totalProjSlides;
      updateProjectSlider();
    }

    function nextProjectSlide() {
      currentProjIndex = (currentProjIndex + 1) % totalProjSlides;
      updateProjectSlider();
    }

    function goToProjectSlide(idx) {
      if (idx >= 0 && idx < totalProjSlides) {
        currentProjIndex = idx;
        updateProjectSlider();
      }
    }

    
    window.addEventListener('keydown', (e) => {
      const dokSec = document.getElementById('dokumen');
      if (!dokSec) return;
      const rect = dokSec.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (inView) {
        if (e.key === 'ArrowLeft') prevProjectSlide();
        if (e.key === 'ArrowRight') nextProjectSlide();
      }
    });
