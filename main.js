import './style.css';

const app = document.querySelector('#app');

app.innerHTML = `
  <div class="panel">
    <p class="eyebrow">EMYURETA</p>
    <h1>ページを開く</h1>
    <p class="description">URL を入力すると、この画面の中で表示できます。</p>
  </div>

  <section class="browser-panel" aria-label="ページ内ブラウザー">
    <form id="browser-form" class="browser-bar">
      <label class="sr-only" for="url-input">開く URL</label>
      <input id="url-input" type="url" placeholder="https://example.com" autocomplete="url" required />
      <button type="submit">開く</button>
    </form>
    <p id="browser-status" class="browser-status">URL を入力すると、この画面内で開きます。</p>
    <iframe id="page-frame" title="ページ内ブラウザー" referrerpolicy="no-referrer"></iframe>
  </section>
`;

const browserForm = document.querySelector('#browser-form');
const urlInput = document.querySelector('#url-input');
const browserStatus = document.querySelector('#browser-status');
const pageFrame = document.querySelector('#page-frame');

browserForm.addEventListener('submit', (event) => {
  event.preventDefault();

  let url;
  try {
    url = new URL(urlInput.value);
  } catch {
    browserStatus.textContent = '正しい URL を入力してください。';
    return;
  }

  if (!['http:', 'https:'].includes(url.protocol)) {
    browserStatus.textContent = 'http:// または https:// の URL を入力してください。';
    return;
  }

  pageFrame.src = url.href;
  browserStatus.textContent = `${url.href} をページ内で開いています。表示を拒否するサイトもあります。`;
});

pageFrame.addEventListener('load', () => {
  try {
    urlInput.value = pageFrame.contentWindow.location.href;
  } catch {
    // Cross-origin pages cannot expose their current URL to the parent page.
  }
});
