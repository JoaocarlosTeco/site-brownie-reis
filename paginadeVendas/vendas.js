// Menu Mobile Toggle
const menuToggle = document.getElementById("menuToggle");
const navbar = document.getElementById("navbar");

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    navbar.classList.toggle("active");
  });
}

// Fechar menu ao clicar em um link
const navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (window.innerWidth <= 768) {
      navbar.classList.remove("active");
    }
  });
});

// Scroll suave para links âncora
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Função para comprar via WhatsApp
function comprarWhatsApp(nomeProduto, preco) {
  const telefone = "5521999999999"; // Substitua pelo número real
  const mensagem = encodeURIComponent(
    `Olá! Gostaria de comprar: ${nomeProduto}\n` +
      `Preço: R$ ${preco.replace(".", ",")}\n\n` +
      `Poderia me ajudar com mais informações?`
  );
  const url = `https://wa.me/${telefone}?text=${mensagem}`;
  window.open(url, "_blank");
}

// Filtro de produtos
const filterButtons = document.querySelectorAll(".filter-btn");
const items = document.querySelectorAll(".item");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Remove active de todos os botões
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    // Adiciona active ao botão clicado
    button.classList.add("active");

    const filter = button.getAttribute("data-filter");

    items.forEach((item) => {
      const category = item.getAttribute("data-category");

      if (filter === "all" || category === filter) {
        item.classList.remove("hidden");
        item.style.animation = "fadeInUp 0.6s ease forwards";
      } else {
        item.classList.add("hidden");
      }
    });
  });
});

// Animação de scroll para elementos
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

// Observar elementos para animação
document.addEventListener("DOMContentLoaded", () => {
  items.forEach((item) => {
    observer.observe(item);
  });
});

// Navbar com sombra ao fazer scroll
window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;
  const nav = document.getElementById("navbar");

  if (currentScroll > 100) {
    nav.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.2)";
  } else {
    nav.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.1)";
  }
});

// Adicionar classe active ao link da página atual
const currentPage = window.location.pathname;
navLinks.forEach((link) => {
  if (
    link.getAttribute("href") === currentPage ||
    (currentPage.includes("Vendas.html") && link.textContent === "Produtos")
  ) {
    link.classList.add("active");
  }
});

// Efeito de hover nos cards
items.forEach((item) => {
  item.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px) scale(1.02)";
  });

  item.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
  });
});

// Adicionar animação de loading nas imagens
const images = document.querySelectorAll(".item-image-wrapper img");
images.forEach((img) => {
  img.addEventListener("load", function () {
    this.style.opacity = "1";
  });

  img.style.opacity = "0";
  img.style.transition = "opacity 0.5s ease";

  if (img.complete) {
    img.style.opacity = "1";
  }
});

// Contador de produtos (opcional - para estatísticas)
let produtosVisualizados = new Set();
items.forEach((item) => {
  const itemObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const productName = entry.target.querySelector("h3").textContent;
          produtosVisualizados.add(productName);
        }
      });
    },
    { threshold: 0.5 }
  );

  itemObserver.observe(item);
});

// Adicionar efeito de clique nos cards
items.forEach((item) => {
  item.addEventListener("click", function (e) {
    // Não acionar se clicar no botão WhatsApp
    if (!e.target.closest(".btn-whatsapp")) {
      this.style.transform = "scale(0.98)";
      setTimeout(() => {
        this.style.transform = "";
      }, 150);
    }
  });
});

// Lazy loading para imagens (melhora performance)
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute("data-src");
          imageObserver.unobserve(img);
        }
      }
    });
  });

  document.querySelectorAll("img[data-src]").forEach((img) => {
    imageObserver.observe(img);
  });
}

// Adicionar feedback visual ao clicar no botão
document.querySelectorAll(".btn-whatsapp").forEach((btn) => {
  btn.addEventListener("click", function () {
    this.style.transform = "scale(0.95)";
    setTimeout(() => {
      this.style.transform = "";
    }, 200);
  });
});
