import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        cart: resolve(__dirname, "src/cart/index.html"),
        checkout: resolve(__dirname, "src/checkout/index.html"),
        product: resolve(__dirname, "src/product_pages/index.html"),
        listing: resolve(__dirname, "src/product-listing/index.html"),
        login: resolve(__dirname, "src/accounts/login.html"),
        register: resolve(__dirname, "src/accounts/registration.html"),
        account: resolve(__dirname, "src/accounts/account.html"),
        logout: resolve(__dirname, "src/accounts/logout.html"),
        about: resolve(__dirname, "src/about/about.html"),
      },
    },
  },
});
