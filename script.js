const defaultConfig = {
  hero_name: 'Zintle Mfobo',
  hero_tagline: 'I build for scale and solve for humans',
  about_text: "I'm a software developer whose journey has been shaped by understanding both sides of the wire—from high-pressure technical support to architecting enterprise-scale digital solutions.",
  contact_email: 'zintlemfobo@gmail.com',
  background_color: '#020617',
  surface_color: '#1E293B',
  text_color: '#F8F9FA',
  primary_action_color: '#7C3AED',
  secondary_action_color: '#A78BFA',
  font_family: 'Space Grotesk',
  font_size: 16
};

let config = { ...defaultConfig };
let currentMode = 'developer';

const terminalCommands = {
  '/skills': `
    <div class="space-y-3">
      <div class="text-ultraviolet-glow">// Technical Skills</div>
      <div class="flex flex-wrap gap-2">
        <span class="bg-ultraviolet/30 text-ultraviolet px-2 py-1 rounded text-xs">React</span>
        <span class="bg-ultraviolet/30 text-ultraviolet px-2 py-1 rounded text-xs">Next.js</span>
        <span class="bg-ultraviolet/30 text-ultraviolet px-2 py-1 rounded text-xs">TypeScript</span>
        <span class="bg-ultraviolet/30 text-ultraviolet px-2 py-1 rounded text-xs">Tailwind</span>
        <span class="bg-ultraviolet/30 text-ultraviolet px-2 py-1 rounded text-xs">Node.js</span>
        <span class="bg-ultraviolet/30 text-ultraviolet px-2 py-1 rounded text-xs">Python</span>
        <span class="bg-ultraviolet/30 text-ultraviolet px-2 py-1 rounded text-xs">SQL</span>
        <span class="bg-ultraviolet/30 text-ultraviolet px-2 py-1 rounded text-xs">Git</span>
      </div>
      <div class="text-titanium/40 text-xs mt-2">Try /stack or /contact for more</div>
    </div>
  `,
  '/stack': `
    <div class="space-y-3">
      <div class="text-ultraviolet-glow">// Preferred Stack</div>
      <div class="space-y-2 text-sm">
        <div><span class="text-ultraviolet">Frontend:</span> <span class="text-titanium/70">Next.js 15 + React 19 + Tailwind</span></div>
        <div><span class="text-ultraviolet">Language:</span> <span class="text-titanium/70">TypeScript (always)</span></div>
        <div><span class="text-ultraviolet">State:</span> <span class="text-titanium/70">Zustand / TanStack Query</span></div>
        <div><span class="text-ultraviolet">Testing:</span> <span class="text-titanium/70">Vitest + Playwright</span></div>
        <div><span class="text-ultraviolet">Deploy:</span> <span class="text-titanium/70">Vercel / AWS</span></div>
      </div>
    </div>
  `,
  '/contact': `
    <div class="space-y-3">
      <div class="text-ultraviolet-glow">// Let's Connect</div>
      <div class="space-y-2 text-sm">
        <div><span class="text-ultraviolet">Email:</span> <span class="text-titanium/70">zintlemfobo@gmail.com</span></div>
        <div><span class="text-ultraviolet">GitHub:</span> <span class="text-titanium/70">github.com/zintle-mfobo</span></div>
        <div><span class="text-ultraviolet">LinkedIn:</span> <span class="text-titanium/70">linkedin.com/in/zintle-mfobo</span></div>
      </div>
      <div class="text-green-400 text-xs mt-2">✓ Currently open to opportunities</div>
    </div>
  `,
  '/help': `
    <div class="space-y-2">
      <div class="text-ultraviolet-glow">// Available Commands</div>
      <div class="text-sm text-titanium/70">
        <div><span class="text-ultraviolet">/skills</span> - View my technical skills</div>
        <div><span class="text-ultraviolet">/stack</span> - See my preferred tech stack</div>
        <div><span class="text-ultraviolet">/contact</span> - Get my contact info</div>
        <div><span class="text-ultraviolet">/clear</span> - Clear terminal</div>
      </div>
    </div>
  `,
  '/clear': ''
};

const terminalInput = document.getElementById('terminal-input');
const terminalOutput = document.getElementById('terminal-output');

terminalInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const command = terminalInput.value.toLowerCase().trim();
    
    if (command === '/clear') {
      terminalOutput.innerHTML = '<div class="text-titanium/60"><span class="text-ultraviolet-glow">// Cleared!</span> Type a command to explore...</div>';
    } else if (terminalCommands[command]) {
      terminalOutput.innerHTML = terminalCommands[command];
    } else if (command) {
      terminalOutput.innerHTML = `
        <div class="text-red-400/80">Command not found: ${command}</div>
        <div class="text-titanium/40 text-sm mt-2">Try /help to see available commands</div>
      `;
    }
    
    terminalInput.value = '';
  }
});

const devModeBtn = document.getElementById('dev-mode');
const solverModeBtn = document.getElementById('solver-mode');
const devContents = document.querySelectorAll('.dev-content');
const solverContents = document.querySelectorAll('.solver-content');

function setMode(mode) {
  currentMode = mode;
  
  if (mode === 'developer') {
    devModeBtn.classList.add('active');
    solverModeBtn.classList.remove('active');
    devContents.forEach(el => el.classList.remove('hidden'));
    solverContents.forEach(el => el.classList.add('hidden'));
  } else {
    solverModeBtn.classList.add('active');
    devModeBtn.classList.remove('active');
    solverContents.forEach(el => el.classList.remove('hidden'));
    devContents.forEach(el => el.classList.add('hidden'));
  }
}

devModeBtn.addEventListener('click', () => setMode('developer'));
solverModeBtn.addEventListener('click', () => setMode('solver'));

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

document.querySelector('#app-wrapper').addEventListener('mousemove', (e) => {
  const avatar = document.getElementById('interactive-avatar');
  const head = document.getElementById('head-move');
  if (!avatar || !head) return;

  const rect = avatar.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
  
  const pDist = 3;
  const pX = Math.cos(angle) * pDist;
  const pY = Math.sin(angle) * pDist;

  document.getElementById('pupil-l').setAttribute('cx', 85 + pX);
  document.getElementById('pupil-l').setAttribute('cy', 85 + pY);
  document.getElementById('pupil-r').setAttribute('cx', 115 + pX);
  document.getElementById('pupil-r').setAttribute('cy', 85 + pY);

  const hDist = 5;
  const hX = Math.cos(angle) * hDist;
  const hY = Math.sin(angle) * hDist;
  head.style.transform = `translate(${hX}px, ${hY}px)`;
});
const skills = ['JS', 'React', 'Magento', 'CSS', 'TypeScript', 'AWS', 'Vue', 'PHP', 'Tailwind', 'SQL','PHP'];
const avatarContainer = document.querySelector('.avatar-container');

function spawnSkills() {
  let firstIdx = Math.floor(Math.random() * skills.length);
  let secondIdx;
  do {
    secondIdx = Math.floor(Math.random() * skills.length);
  } while (secondIdx === firstIdx);

  const selectedIndices = [firstIdx, secondIdx];

  selectedIndices.forEach((skillIdx, i) => {
    const bubble = document.createElement('div');
    bubble.className = 'skill-bubble';
    bubble.innerText = skills[skillIdx];

    let x;
    if (i === 0) {
      x = Math.random() * 25 - 10; 
    } else {
      x = Math.random() * 25 + 75;
    }

    const y = Math.random() * 50 + 15; 
    
    bubble.style.left = `${x}%`;
    bubble.style.top = `${y}%`;

    avatarContainer.appendChild(bubble);

    setTimeout(() => {
      bubble.remove();
    }, 2000);
  });
}

setInterval(spawnSkills, 1500);

async function onConfigChange(newConfig) {
  const heroNameEl = document.getElementById('hero-name');
  const heroTaglineEl = document.getElementById('hero-tagline');
  const contactEmailEl = document.getElementById('contact-email-display');
  const navNameEl = document.getElementById('nav-name');
  
  if (heroNameEl) {
    heroNameEl.innerHTML = `<span class="text-titanium">Hi, I'm </span><span class="gradient-text">${newConfig.hero_name || defaultConfig.hero_name}</span>`;
  }
  
  if (navNameEl) {
    navNameEl.textContent = newConfig.hero_name || defaultConfig.hero_name;
  }
  
  if (heroTaglineEl) {
    heroTaglineEl.textContent = newConfig.hero_tagline || defaultConfig.hero_tagline;
  }
  
  if (contactEmailEl) {
    contactEmailEl.textContent = newConfig.contact_email || defaultConfig.contact_email;
  }
  
  document.documentElement.style.setProperty('--bg-color', newConfig.background_color || defaultConfig.background_color);
  document.body.style.backgroundColor = newConfig.background_color || defaultConfig.background_color;
  
  const fontFamily = newConfig.font_family || defaultConfig.font_family;
  document.body.style.fontFamily = `${fontFamily}, sans-serif`;
  
  const baseSize = newConfig.font_size || defaultConfig.font_size;
  document.documentElement.style.fontSize = `${baseSize}px`;
}

function mapToCapabilities(config) {
  return {
    recolorables: [
      {
        get: () => config.background_color || defaultConfig.background_color,
        set: (value) => {
          config.background_color = value;
          if (window.elementSdk) {
            window.elementSdk.setConfig({ background_color: value });
          }
        }
      },
      {
        get: () => config.surface_color || defaultConfig.surface_color,
        set: (value) => {
          config.surface_color = value;
          if (window.elementSdk) {
            window.elementSdk.setConfig({ surface_color: value });
          }
        }
      },
      {
        get: () => config.text_color || defaultConfig.text_color,
        set: (value) => {
          config.text_color = value;
          if (window.elementSdk) {
            window.elementSdk.setConfig({ text_color: value });
          }
        }
      },
      {
        get: () => config.primary_action_color || defaultConfig.primary_action_color,
        set: (value) => {
          config.primary_action_color = value;
          if (window.elementSdk) {
            window.elementSdk.setConfig({ primary_action_color: value });
          }
        }
      },
      {
        get: () => config.secondary_action_color || defaultConfig.secondary_action_color,
        set: (value) => {
          config.secondary_action_color = value;
          if (window.elementSdk) {
            window.elementSdk.setConfig({ secondary_action_color: value });
          }
        }
      }
    ],
    borderables: [],
    fontEditable: {
      get: () => config.font_family || defaultConfig.font_family,
      set: (value) => {
        config.font_family = value;
        if (window.elementSdk) {
          window.elementSdk.setConfig({ font_family: value });
        }
      }
    },
    fontSizeable: {
      get: () => config.font_size || defaultConfig.font_size,
      set: (value) => {
        config.font_size = value;
        if (window.elementSdk) {
          window.elementSdk.setConfig({ font_size: value });
        }
      }
    }
  };
}

function mapToEditPanelValues(config) {
  return new Map([
    ['hero_name', config.hero_name || defaultConfig.hero_name],
    ['hero_tagline', config.hero_tagline || defaultConfig.hero_tagline],
    ['about_text', config.about_text || defaultConfig.about_text],
    ['contact_email', config.contact_email || defaultConfig.contact_email]
  ]);
}

if (window.elementSdk) {
  window.elementSdk.init({
    defaultConfig,
    onConfigChange,
    mapToCapabilities,
    mapToEditPanelValues
  });
} else {
  onConfigChange(defaultConfig);
}