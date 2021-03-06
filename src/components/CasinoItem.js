const CasinosItem = (background_color, logo, rating, title, url) => {
  const template = `<div class="casino">
  <div class="casino__firstblock" style="background-color:${background_color}">
    <figure>
      <img src=${logo} class="casino__firstblock-img" alt="logo" />
    </figure>
  </div>
  <article class="casino__secondblock">
    <div>
      <p class="casino__secondblock-rating">
      <span class="casino__secondblock-rating-star"><i class="fas fa-star"></i></span>
      <span>${rating}</span>
      </p>
      <p class="casino__secondblock-title">${title}</p>
      <a href=${url} target="_blank">
        <button class="casino__secondblock-button">Play</button>
      </a>
    </div>
  </article>
</div>`;

  return template;
};

export default CasinosItem;
