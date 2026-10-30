const CACHE_NAME = 'mundo-kids-v1';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './animais.html',
    './bateria.html',
    './carro.html',
    './foguete.html',
    './herois.html',
    './piano.html',
    './pintura.html',
    './veiculos.html',
    './manifest.json',
    './img/icon-192.png',
    './img/icon-512.png'
    // Dica: Adicione aqui os caminhos das suas imagens (ex: './img/bateria.png') e sons para funcionamento 100% offline
];

// Instalação: Salva os arquivos no cache
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => cache.addAll(ASSETS_TO_CACHE))
    );
});

// Ativação: Limpa caches antigos se a versão mudar
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys.filter(key => key !== CACHE_NAME)
                .map(key => caches.delete(key))
            );
        })
    );
});

// Intercepta as requisições: Tenta pegar do cache, se falhar, busca na rede
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
        .then(response => response || fetch(event.request))
    );
});