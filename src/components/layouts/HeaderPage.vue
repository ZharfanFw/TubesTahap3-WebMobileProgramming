<script setup></script>

<template>
  <header>
    <nav class="navbar">
      <div class="nav-left">
        <h1>
          <router-link to="/"><span>Kail</span>Ku</router-link>
        </h1>
      </div>

      <div class="nav-middle">
        <router-link to="/">Beranda</router-link>
        <a href="">Tempat Pemancingan</a>
      </div>

      <nav class="nav-right">
        <a href="login-section.html" class="login-btn">Masuk</a>
        <router-link to="/signup" class="signup-btn">Daftar</router-link>
      </nav>
    </nav>
  </header>
</template>

<style scoped>
.navbar {
  background-color: var(--color-white);
  padding: 0.5rem 0;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
}

.nav-left h1 {
  font-size: 2rem;
  margin-left: 2rem;
  color: var(--color-black);
}

.nav-left h1 a {
  color: var(--color-black);
}

.nav-left h1 a span {
  color: #023e8a;
}

.nav-middle {
  justify-items: center;
  color: black;
}

.nav-middle a {
  margin: 0 1rem;
  transition: color var(--transition), transform var(--transition);
}

.nav-middle a:hover {
  color: var(--color-primary-dark);
}

.nav-right {
  margin: 0.5rem;
  padding: 0.5rem;
}

.nav-right a {
  margin: 0 0.5rem;
  padding: 0.5rem 0.9rem;
  border-radius: 15px;
  transition: background-color var(--transition), transform var(--transition);
}

.login-btn {
  color: var(--color-primary-deep);
  border: 1px solid var(--color-primary-deep);
}

.login-btn:hover {
  color: var(--color-primary-dark);
  border: 1px solid var(--color-primary-dark);
}

.signup-btn {
  border: 1px solid var(--color-primary-deep);
  color: var(--color-white);
  background-color: var(--color-primary-deep);
}

.signup-btn:hover {
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  border: 1px solid var(--color-primary-dark);
  background-color: var(--color-primary-dark);
}
</style>
