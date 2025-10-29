<script setup>
</script>

<template>
  <header>
    <nav class="navbar">
      <div class="nav-left">
        <h1>
          <a href="#home"><span>Kail</span>Ku</a>
        </h1>
      </div>

      <div class="nav-middle">
        <a href="#home">Beranda</a>
        <a href="">Tempat Pemancingan</a>
        <a href="#alat">Alat Pancing</a>
      </div>

      <nav class="nav-right">
        <a href="login-section.html" class="login-btn">Masuk</a>
        <a href="signup-section.html" class="signup-btn">Daftar</a>
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
}

.nav-left h1 {
  font-size: 2rem;
  margin-left: 2rem;
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
  box-shadow: 0 4px 10px rgba(0,0,0,0.15);
  border: 1px solid var(--color-primary-dark);
  background-color: var(--color-primary-dark);
}

</style>
