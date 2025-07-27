<nav class="main-nav">
  <input type="checkbox" id="menu-toggle" />
  <label for="menu-toggle" class="menu-icon" id="hamburger"></label>

  <div class="nav-links">
    <a href="index.php" class="<?php echo basename($_SERVER['PHP_SELF']) == 'index.php' ? 'active' : ''; ?>">Accueil</a>
    <a href="qui-sommes-nous.php" class="<?php echo basename($_SERVER['PHP_SELF']) == 'qui-sommes-nous.php' ? 'active' : ''; ?>">Qui sommes-nous&nbsp;?</a>
    <a href="mieux-comprendre.php" class="<?php echo basename($_SERVER['PHP_SELF']) == 'mieux-comprendre.php' ? 'active' : ''; ?>">Mieux comprendre</a>
    <a href="vision-strategique.php" class="<?php echo basename($_SERVER['PHP_SELF']) == 'vision-strategique.php' ? 'active' : ''; ?>">Pourquoi c’est possible&nbsp;?</a>

    <div class="dropdown">
      <a href="#" class="dropdown-toggle">Devenir acteur ▾</a>
      <div class="dropdown-menu">
        <a href="devenir-proprietaire.php" class="<?php echo basename($_SERVER['PHP_SELF']) == 'devenir-proprietaire.php' ? 'active' : ''; ?>">Je veux devenir propriétaire</a>
        <a href="proposer-un-bien.php" class="<?php echo basename($_SERVER['PHP_SELF']) == 'proposer-un-bien.php' ? 'active' : ''; ?>">Je propose un bien</a>
        <a href="nous-soutenir.php" class="<?php echo basename($_SERVER['PHP_SELF']) == 'nous-soutenir.php' ? 'active' : ''; ?>">Nous soutenir</a>
      </div>
    </div>

    <div class="dropdown">
      <a href="#" class="dropdown-toggle">Ressources ▾</a>
      <div class="dropdown-menu">
        <a href="manifeste.php" class="<?php echo basename($_SERVER['PHP_SELF']) == 'manifeste.php' ? 'active' : ''; ?>">Le manifeste</a>
        <a href="exemples-financiers.php" class="<?php echo basename($_SERVER['PHP_SELF']) == 'exemples-financiers.php' ? 'active' : ''; ?>">Exemples financiers</a>
        <a href="base-juridique.php" class="<?php echo basename($_SERVER['PHP_SELF']) == 'base-juridique.php' ? 'active' : ''; ?>">Base juridique</a>
        <a href="etude-de-cas.php" class="<?php echo basename($_SERVER['PHP_SELF']) == 'etude-de-cas.php' ? 'active' : ''; ?>">Étude de cas</a>
      </div>
    </div>
  </div>
</nav>

<style>
  .main-nav {
    background-color: var(--bleu-fonce);
    font-family: 'Inter', sans-serif;
    position: relative;
    z-index: 100;
  }

  .menu-icon {
    display: none;
    font-size: 2rem;
    color: white;
    padding: 1rem;
    cursor: pointer;
    position: fixed;
    top: 1rem;
    left: 1rem;
    z-index: 2000;
    transition: opacity 0.3s ease, transform 0.3s ease;
  }

  .menu-icon.hidden {
    transform: translateY(-100%);
    pointer-events: none;
  }

  #menu-toggle {
    display: none;
  }

  #menu-toggle+.menu-icon::before {
    content: "\2630";
  }

  #menu-toggle:checked+.menu-icon::before {
    content: "✕";
  }

  .nav-links {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
  }

  .nav-links>a,
  .nav-links>.dropdown>a {
    color: white;
    background: transparent;
    text-decoration: none;
    font-weight: 600;
    padding: 0.5rem 1rem;
    border-radius: 30px;
    transition: background 0.3s ease;
  }

  .nav-links a.active {
    background: #fff;
    color: var(--bleu-fonce);
  }

  .nav-links a:hover,
  .nav-links .dropdown:hover>a {
    background: var(--vert-pastel);
    color: var(--vert);
  }

  .dropdown {
    position: relative;
  }

  .dropdown-menu {
    display: none;
    position: absolute;
    background-color: var(--bleu-fonce);
    top: 1.7em;
    left: 0;
    min-width: 240px;
    border-radius: 1.3em;
    overflow: hidden;
    z-index: 10;
    box-shadow: 0 2px 6px rgba(8, 79, 140, 0.9);
  }

  .dropdown:hover .dropdown-menu {
    display: block;
  }

  .dropdown-menu a {
    display: block;
    padding: 0.6rem 1rem;
    color: white;
    text-decoration: none;
  }

  .dropdown-menu a:hover {
    background-color: var(--vert-pastel);
    color: var(--vert);
  }

  @media (max-width: 768px) {
    .nav-links {
      position: fixed;
      top: -5em;
      left: -100%;
      flex-direction: column;
      align-items: flex-start;
      background-color: var(--bleu-fonce);
      width: 70%;
      height: 100%;
      padding: 4rem 1rem 1rem;
      gap: 3rem;
      transition: left 0.3s ease;
      z-index: 1000;
    }

    #menu-toggle:checked~.nav-links {
      left: 0;
    }

    .menu-icon {
      display: block;
    }

    .dropdown-menu {
      position: relative;
      background-color: transparent;
      border-radius: 0;
      box-shadow: none;
      padding-left: 1rem;
    }

    .dropdown:hover .dropdown-menu {
      display: none;
    }

    .dropdown.open .dropdown-menu {
      display: block;
    }

    .dropdown>a {
      background-color: var(--vert);
      color: white;
      border-radius: 30px;
    }
  }
</style>

<script>
  document.querySelectorAll('.dropdown > .dropdown-toggle').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.preventDefault(); // toujours bloquer le scroll

      if (window.innerWidth <= 768) {
        const parent = btn.parentElement;
        parent.classList.toggle('open');
      }
    });
  });

  const hamburger = document.getElementById('hamburger');
  let lastScroll = 0;
  const headerHeight = 270;
  const fadeEnd = 300; // jusqu'où on veut que l'opacité diminue

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    // Fading
    if (currentScroll < fadeEnd) {
      const opacity = 1 - currentScroll / fadeEnd;
      hamburger.style.opacity = opacity;
    } else {
      hamburger.style.opacity = 0;
    }

    // Masquer si on dépasse le header et qu'on descend
    if (currentScroll > headerHeight && currentScroll > lastScroll) {
      hamburger.classList.add('hidden');
    } else {
      hamburger.classList.remove('hidden');
    }

    lastScroll = currentScroll;
  });
</script>