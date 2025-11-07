<template>
  <HeaderPage title="Memancing Section" />
  <div class="memancing-section">
    <!-- Search Bar -->
    <div class="search-container">
      <div class="search-box">
        <svg
          class="search-icon"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.35-4.35"></path>
        </svg>
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Mau memancing dimana hari ini?"
          class="search-input"
        />
      </div>
    </div>

    <!-- Filter Tabs -->
    <div class="filter-tabs">
      <button
        v-for="filter in filters"
        :key="filter.id"
        :class="['filter-tab', { active: selectedFilter === filter.id }]"
        @click="selectFilter(filter.id)"
      >
        {{ filter.label }}
      </button>
    </div>

    <!-- Fishing Places Grid -->
    <div class="fishing-grid">
      <div
        v-for="place in paginatedPlaces"
        :key="place.id"
        class="fishing-card"
        @click="selectPlace(place)"
      >
        <!-- Image -->
        <div class="card-image">
          <img :src="place.image" :alt="place.name" />
          <div class="favorite-badge">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              />
            </svg>
          </div>
        </div>

        <!-- Content -->
        <div class="card-content">
          <!-- Title & Rating -->
          <div class="card-header">
            <h3 class="card-title">{{ place.name }}</h3>
            <div class="card-rating">
              <svg
                class="star-icon"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                />
              </svg>
              <span class="rating-value">{{ place.rating }}</span>
            </div>
          </div>

          <!-- Location -->
          <div class="card-location">
            <svg
              class="location-icon"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <span>{{ place.location }}</span>
          </div>

          <!-- Facilities -->
          <div class="card-facilities">
            <span
              v-for="(facility, index) in place.facilities.slice(0, 3)"
              :key="index"
              class="facility-badge"
            >
              {{ facility }}
            </span>
            <span v-if="place.facilities.length > 3" class="facility-more">
              +{{ place.facilities.length - 3 }}
            </span>
          </div>

          <!-- Price -->
          <div class="card-price">
            <span class="price-label">Mulai dari</span>
            <span class="price-value">{{ formatCurrency(place.price) }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div class="pagination">
      <button
        class="pagination-btn pagination-prev"
        :disabled="currentPage === 1"
        @click="previousPage"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>

      <button
        v-for="page in visiblePages"
        :key="page"
        :class="['pagination-btn', { active: currentPage === page }]"
        @click="goToPage(page)"
      >
        {{ page }}
      </button>

      <button
        class="pagination-btn pagination-next"
        :disabled="currentPage === totalPages"
        @click="nextPage"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
import HeaderPage from "@/components/layouts/HeaderPage.vue";
export default {
  name: "MemancingSection",
  components: {
    HeaderPage,
  },

  data() {
    return {
      searchQuery: "",
      selectedFilter: null, // Ganti nilai default menjadi null atau "" agar "All" terpilih pertama
      currentPage: 1,
      itemsPerPage: 12,

      filters: [
        { id: null, label: "All" }, // Tambahkan tombol "All"
        { id: "bandung", label: "Bandung" },
        { id: "garut", label: "Garut" },
        { id: "tasikmalaya", label: "Tasikmalaya" },
        { id: "pangandaran", label: "Pangandaran" },
        { id: "semarang", label: "Semarang" },
        { id: "amol", label: "Amol" },
        { id: "karimunjawa", label: "Karimunjawa" },
        { id: "cilacap", label: "Cilacap" },
      ],

      fishingPlaces: [
        {
          id: 1,
          name: "Kolam Pemancingan Kacuy",
          location: "Arcamanik, Bandung",
          rating: 4.5,
          price: 25000,
          image:
            "https://lh3.googleusercontent.com/gps-cs-s/AG0ilSxcPfvuwTDUyHItXrnkXsiHp6V7-qcaKELor84JpupulFx0raHRZVjKncXr1xqArBhgd1OwO9jkm27XFJrasY-dgAHFJIHUwIVyrIYAenojdyY2owXGTejPtstN9sXPgxoaawND=s680-w680-h510-rw",
          facilities: [
            "Gazebo",
            "Toilet",
            "Mushola",
            "Parkir Luas",
            "Warung Makan",
          ],
          city: "bandung",
        },
        {
          id: 2,
          name: "Saguling Lake Fishing",
          location: "Saguling, Bandung",
          rating: 4.7,
          price: 30000,
          image:
            "data:image/jpeg;base64,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",
          facilities: ["Gazebo", "Toilet", "Parkir", "View Danau"],
          city: "bandung",
        },
        {
          id: 3,
          name: "Ciwidey Fishing Park",
          location: "Ciwidey, Bandung",
          rating: 4.3,
          price: 20000,
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgYjjPUFgBOCoHzYs7hxXMkokHkWMh02sAMw&s",
          facilities: ["Gazebo", "Toilet", "Mushola", "Pemandangan Pegunungan"],
          city: "bandung",
        },
        {
          id: 4,
          name: "Ranca Upas Fishing",
          location: "Rancabali, Bandung",
          rating: 4.6,
          price: 35000,
          image:
            "data:image/jpeg;base64,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",
          facilities: ["Gazebo Premium", "Toilet", "Camping Ground", "Warung"],
          city: "bandung",
        },
        {
          id: 5,
          name: "Dago Pakar Fishing",
          location: "Dago, Bandung",
          rating: 4.4,
          price: 40000,
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSij-KDo8l-QQGX8Ugxwsoy3ioz9wcW4KpFcA&s",
          facilities: ["Gazebo", "Toilet", "WiFi", "Café", "View Kota"],
          city: "bandung",
        },
        {
          id: 6,
          name: "Lembang Trout Fishing",
          location: "Lembang, Bandung",
          rating: 4.8,
          price: 45000,
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR86Da47a2KdwOQLvAUTRpRnMXo8yNx5XK4Zg&s",
          facilities: [
            "Gazebo",
            "Toilet",
            "Restaurant",
            "Parkir Luas",
            "Kolam Khusus Anak",
          ],
          city: "bandung",
        },
        {
          id: 7,
          name: "Cileunyi Fishing Pond",
          location: "Cileunyi, Bandung",
          rating: 4.2,
          price: 18000,
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXdbeofXccPmAextK-yc03xT-VbuKzztS2sA&s",
          facilities: ["Gazebo", "Toilet", "Mushola", "Parkir"],
          city: "bandung",
        },
        {
          id: 8,
          name: "Maribaya Fishing",
          location: "Maribaya, Bandung",
          rating: 4.5,
          price: 32000,
          image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzS_3IAqFe4JqCxatUZkqHF7WvbGMLe9Skog&s",
          facilities: ["Gazebo", "Toilet", "Warung", "View Air Terjun"],
          city: "bandung",
        },
        {
          id: 9,
          name: "Cipanas Fishing Resort",
          location: "Cipanas, Garut",
          rating: 4.6,
          price: 28000,
          image:
            "https://images.unsplash.com/photo-1551244072-5d12893278ab?w=400&h=300&fit=crop",
          facilities: [
            "Gazebo",
            "Toilet",
            "Mushola",
            "Hot Spring",
            "Restaurant",
          ],
          city: "garut",
        },
        {
          id: 10,
          name: "Situ Bagendit Fishing",
          location: "Banyuresmi, Garut",
          rating: 4.4,
          price: 22000,
          image:
            "https://images.unsplash.com/photo-1500534623283-312aade485b7?w=400&h=300&fit=crop",
          facilities: ["Gazebo", "Toilet", "Perahu", "View Danau"],
          city: "garut",
        },
        {
          id: 11,
          name: "Kampung Sampireun Fishing",
          location: "Garut Kota, Garut",
          rating: 4.7,
          price: 50000,
          image:
            "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&h=300&fit=crop",
          facilities: ["Villa", "Restaurant", "Kolam Private", "Spa", "WiFi"],
          city: "garut",
        },
        {
          id: 12,
          name: "Tasik Fishing Paradise",
          location: "Indihiang, Tasikmalaya",
          rating: 4.3,
          price: 25000,
          image:
            "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop",
          facilities: ["Gazebo", "Toilet", "Mushola", "Parkir", "Warung"],
          city: "tasikmalaya",
        },
      ],
    };
  },

  computed: {
    filteredPlaces() {
      let places = this.fishingPlaces; // Filter by city // Cek jika selectedFilter tidak null/kosong sebelum melakukan filtering

      if (this.selectedFilter) {
        places = places.filter((place) => place.city === this.selectedFilter);
      }

      // Filter by search query
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        places = places.filter(
          (place) =>
            place.name.toLowerCase().includes(query) ||
            place.location.toLowerCase().includes(query) ||
            place.facilities.some((f) => f.toLowerCase().includes(query))
        );
      }

      return places;
    },

    paginatedPlaces() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredPlaces.slice(start, end);
    },

    totalPages() {
      return Math.ceil(this.filteredPlaces.length / this.itemsPerPage);
    },

    visiblePages() {
      const pages = [];
      const maxVisible = 5;
      let start = Math.max(1, this.currentPage - Math.floor(maxVisible / 2));
      let end = Math.min(this.totalPages, start + maxVisible - 1);

      if (end - start < maxVisible - 1) {
        start = Math.max(1, end - maxVisible + 1);
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      return pages;
    },
  },

  methods: {
    formatCurrency(amount) {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      }).format(amount);
    },

    selectFilter(filterId) {
      this.selectedFilter = filterId;
      this.currentPage = 1;
    },

    selectPlace(place) {
      this.$emit("place-selected", place);
      console.log("Selected place:", place);
    },

    goToPage(page) {
      this.currentPage = page;
      window.scrollTo({ top: 0, behavior: "smooth" });
    },

    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },

    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
  },

  watch: {
    searchQuery() {
      this.currentPage = 1;
    },
  },
};
</script>

<style scoped>
/* ===== VARIABEL WARNA ===== */
:root {
  --color-primary: #48cae4;
  --color-secondary: #ffa200;
  --color-dark: #03045e;
  --color-light-bg: #f0f8ff;
  --color-white: #ffffff;
  --color-border: #e0e0e0;
  --color-text-secondary: #666666;
}

/* ===== CONTAINER ===== */
.memancing-section {
  max-width: 1280px;
  margin: 0 auto;
  /* Tingkatkan padding atas untuk memberi ruang di bawah header */
  padding: 24px; /* Ganti atau tambahkan baris di bawah */
  padding-top: 100px; /* Nilai contoh. Sesuaikan sesuai tinggi header Anda, misalnya 80px atau 100px */
  background-color: #fafafa;
  min-height: 100vh;
}

/* ===== SEARCH BAR ===== */
.search-container {
  margin-bottom: 24px;
}

.search-box {
  position: relative;
  max-width: 600px;
  margin: 0 auto;
}

.search-icon {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-text-secondary);
  pointer-events: none;
}

.search-input {
  width: 100%;
  padding: 14px 16px 14px 48px;
  border: 2px solid var(--color-border);
  border-radius: 50px;
  font-size: 15px;
  outline: none;
  transition: all 0.3s ease;
}

.search-input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 4px rgba(72, 202, 228, 0.1);
}

.search-input::placeholder {
  color: var(--color-text-secondary);
}

/* ===== FILTER TABS ===== */
.filter-tabs {
  display: flex;
  gap: 12px;
  margin-bottom: 32px;
  overflow-x: auto;
  padding-bottom: 8px;
}

.filter-tabs::-webkit-scrollbar {
  height: 4px;
}

.filter-tabs::-webkit-scrollbar-thumb {
  background-color: var(--color-primary);
  border-radius: 2px;
}

.filter-tab {
  padding: 10px 24px;
  border: 2px solid var(--color-border);
  border-radius: 50px;
  background-color: var(--color-white);
  color: var(--color-text-secondary);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.filter-tab:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.filter-tab.active {
  background-color: var(--color-primary);
  border-color: var(--color-primary);
  color: var(--color-white);
}

/* ===== FISHING GRID ===== */
.fishing-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;
  margin-bottom: 40px;
}

.fishing-card {
  background-color: var(--color-white);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: all 0.3s ease;
}

.fishing-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}

/* ===== CARD IMAGE ===== */
.card-image {
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.fishing-card:hover .card-image img {
  transform: scale(1.1);
}

.favorite-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 36px;
  height: 36px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  backdrop-filter: blur(4px);
  transition: all 0.3s ease;
}

.fishing-card:hover .favorite-badge {
  transform: scale(1.1);
}

/* ===== CARD CONTENT ===== */
.card-content {
  padding: 16px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
  gap: 8px;
}

.card-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--color-dark);
  margin: 0;
  flex: 1;
  line-height: 1.3;
}

.card-rating {
  display: flex;
  align-items: center;
  gap: 4px;
  background-color: #fff3cd;
  padding: 4px 10px;
  border-radius: 20px;
  flex-shrink: 0;
}

.star-icon {
  color: #ffc107;
}

.rating-value {
  font-size: 14px;
  font-weight: 700;
  color: #856404;
}

/* ===== LOCATION ===== */
.card-location {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 12px;
  color: var(--color-text-secondary);
  font-size: 14px;
}

.location-icon {
  color: var(--color-primary);
  flex-shrink: 0;
}

/* ===== FACILITIES ===== */
.card-facilities {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 16px;
  min-height: 28px;
}

.facility-badge {
  padding: 4px 10px;
  background-color: #e8f5e9;
  color: #2e7d32;
  font-size: 12px;
  font-weight: 600;
  border-radius: 12px;
  white-space: nowrap;
}

.facility-more {
  padding: 4px 10px;
  background-color: #f5f5f5;
  color: var(--color-text-secondary);
  font-size: 12px;
  font-weight: 700;
  border-radius: 12px;
}

/* ===== PRICE ===== */
.card-price {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding-top: 12px;
  border-top: 1px solid var(--color-border);
}

.price-label {
  font-size: 12px;
  color: var(--color-text-secondary);
}

.price-value {
  font-size: 20px;
  font-weight: 800;
  color: var(--color-primary);
}

/* ===== PAGINATION ===== */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 40px;
}

.pagination-btn {
  min-width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid var(--color-border);
  border-radius: 50%;
  background-color: var(--color-white);
  color: var(--color-text-secondary);
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.pagination-btn:hover:not(:disabled) {
  border-color: var(--color-primary);
  color: var(--color-primary);
  transform: scale(1.05);
}

.pagination-btn.active {
  background-color: var(--color-primary);
  border-color: var(--color-primary);
  color: var(--color-white);
}

.pagination-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.pagination-prev,
.pagination-next {
  background-color: var(--color-primary);
  border-color: var(--color-primary);
  color: var(--color-white);
}

.pagination-prev:hover:not(:disabled),
.pagination-next:hover:not(:disabled) {
  background-color: #3aa8c1;
  transform: scale(1.1);
}

/* ===== RESPONSIVE ===== */
@media (max-width: 1024px) {
  .fishing-grid {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 16px;
  }
}

@media (max-width: 768px) {
  .memancing-section {
    padding: 16px;
  }

  .fishing-grid {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  }

  .filter-tabs {
    gap: 8px;
  }

  .filter-tab {
    padding: 8px 16px;
    font-size: 13px;
  }
}

@media (max-width: 480px) {
  .fishing-grid {
    grid-template-columns: 1fr;
  }

  .pagination {
    gap: 4px;
  }

  .pagination-btn {
    min-width: 40px;
    height: 40px;
    font-size: 14px;
  }
}
</style>
