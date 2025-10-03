import { getArticles } from "./fetch.js";
import type { DevToApiResponse } from "./types.js";


const formEl = document.querySelector("header form") as HTMLFormElement;
const inputCategory = document.querySelector("input") as HTMLInputElement;
const loadingEl: HTMLElement | null = document.querySelector(".loading");
const errEl: HTMLElement | null = document.querySelector(".error")

if (!formEl || !inputCategory) {
  console.log("form: ", formEl)
  console.log("input: ", inputCategory)
  if (errEl) {
    errEl.classList.add("active");
    errEl.textContent = "Error: Required form elements not found";

  }
  throw new Error("Error: Required Form elements not found");
}

formEl.addEventListener("submit", async (e: SubmitEvent) => {
  e.preventDefault();


  try {
    loadingEl && loadingEl.classList.add("active");
    const articles = await getArticles(inputCategory.value.trim());

    if (articles) {
      setTimeout(() => {
        // Remove loading Element after responsed data
        loadingEl && loadingEl.classList.remove("active");

        // Display Responsed Data   
        displayData(articles);
      }, 1500);

    } else {
      if (errEl) {
        loadingEl && loadingEl.classList.remove("active");
        errEl.classList.add("active");
        errEl.textContent = "No articles found. Try another category.";

        setTimeout(() => {
          errEl.classList.remove("active");
        }, 2000)
      }
    }
  } catch (error) {
    console.error(error);
    if (errEl) {
      loadingEl && loadingEl.classList.remove("active")
      errEl.textContent = "Failed to load articles. Please try again.";
      errEl.classList.add("active")

      setTimeout(() => {
        errEl.classList.remove("active");
      }, 5000)
    }
  }
});


const displayData = (articles: DevToApiResponse): void => {
  if (articles.length === 0) return;

  const randomIndex = Math.floor(Math.random() * articles.length);
  const article = articles[randomIndex];

  // Image
  const imageEl = document.querySelector(".image img") as HTMLImageElement;
  if (imageEl) {
    imageEl.src = article.cover_image || article.social_image || "./assets/images/illustration-article.svg";
    imageEl.alt = article.title;
  }

  // Category or Tags
  const tagsEl = document.querySelector(".content .tags");
  if (tagsEl) {
    tagsEl.innerHTML = ""
    let categoryEl = document.createElement("p")

    if (article.tag_list) {
      article.tag_list.forEach((tag) => {
        categoryEl.textContent = tag
        tagsEl.appendChild(categoryEl)
      })
    } else {
      categoryEl.textContent = inputCategory.value
    }

    tagsEl.appendChild(categoryEl)
  }



  // Publish Date
  const publishDateEl = document.querySelector(".publish-date span");
  if (publishDateEl) {
    const dateText = new Date(article.published_at).toLocaleDateString(undefined, { dateStyle: "medium" });
    publishDateEl.textContent = dateText;
  }

  // Title
  const titleLink = document.querySelector(".content .title a") as HTMLAnchorElement;
  if (titleLink) {
    titleLink.textContent = article.title;
    titleLink.href = article.url;
  }

  // Description
  const descEl = document.querySelector(".desc");
  if (descEl) {
    descEl.textContent = article.description;
  }

  // Author
  const authorEl = document.querySelector(".author .name");
  if (authorEl) {
    authorEl.textContent = article.user.name || "Unknown Author";
  }

  // Author image
  const authorImg = document.querySelector(".author img") as HTMLImageElement;
  if (authorImg && article.user.profile_image_90) {
    authorImg.src = article.user.profile_image_90;
    authorImg.alt = article.user.name;
  }
};
