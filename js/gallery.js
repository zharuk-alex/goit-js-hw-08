const images = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820__480.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

class GallerySimple {
  #galleryRef = null;
  #items = [];
  #lightboxInstance = null;
  #currentSrc = '';
  /**
   *
   * @param {string} wrapperId - css selector, gallery container
   * @param {GalleryItem[]} items - array of objects
   *
   * @typedef {Object} GalleryItem
   * @property {string} preview
   * @property {string} original
   * @property {string} description
   */
  constructor(wrapperId = '', items = []) {
    if (!wrapperId) {
      throw new Error('gallery wrapper element is required');
    }

    this.#galleryRef = document.querySelector(wrapperId);
    if (!this.#galleryRef) {
      throw new Error(`Element with selector ${wrapperId} not found`);
    }

    this.#items = Array.isArray(items) ? items : [];
    this.renderItems();
    this.#initEvents();
  }

  renderItems = () => {
    const elStr = this.#items.map(item => this.templateItem(item)).join('');
    this.#galleryRef.insertAdjacentHTML('afterBegin', elStr);
  };

  templateItem = ({ preview, original, description }) => {
    return `
      <li class="gallery-item">
        <a class="gallery-link" href="${original}">
          <img
            class="gallery-image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
          />
        </a>
      </li>`;
  };

  clickWrapperHandler = e => {
    e.preventDefault();
    if (e.currentTarget === e.target) {
      return;
    }

    const imgEl = e.target.closest('.gallery-image');
    this.#currentSrc = imgEl.dataset?.source;

    this.#showLightbox();
  };

  #showLightbox = () => {
    if (this.#lightboxInstance === null) {
      this.#lightboxInstance = basicLightbox.create(
        `<img src="${this.#currentSrc}" class="gallery-image"/>`
      );
    } else {
      const imgEl = this.#lightboxInstance
        .element()
        .querySelector('.gallery-image');
      imgEl.src = this.#currentSrc;
    }

    this.#lightboxInstance.show();
  };

  #initEvents = () => {
    this.#galleryRef.addEventListener('click', this.clickWrapperHandler);
  };

  destroy = () => {
    this.#galleryRef.removeEventListener('click', this.clickWrapperHandler);
    this.#galleryRef.innerHTML = '';
    this.#items = [];
    this.#lightboxInstance = null;
    this.#currentSrc = '';
  };
}

const gallery = new GallerySimple('.gallery', images);
// setTimeout(() => gallery.destroy(), 5000);
