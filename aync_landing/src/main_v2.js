// Esto se esta creando con RAPIdapi, usando la API Youtubev3 para traer los videos de una playlis de Tokio Hotel ❤️
const url = 'https://youtube-v31.p.rapidapi.com/playlistItems?playlistId=PLqFNjWqguIhjm6Gz4Qucjh6R8bgsxzbsD&part=snippet&maxResults=50';
const $ = (item) => document.querySelector(item)
const docre = (item) => document.createElement(item)

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '0bc6a0b8femsh2c3fa64202ea502p1ee64ejsn859a122ff7b8',
		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
	}
};


(async () => {
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        const content_box = $('#content')

        let elementos = result.items.map(x => 
            `
                <div class="group relative cursor-pointer" onclick="window.open('https://www.youtube.com/watch?v=${x.snippet.resourceId.videoId}')">
                    <div class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                        <img src="${x.snippet.thumbnails.high.url}" alt="${x.snippet.description}" class="w-full">
                    </div>
                    <div class="mt-4 flex justify-between">
                        <h3 class="text-sm text-gray-700">
                            <span aria-hidden="true" class="absolute inset-0"></span>
                            ${x.snippet.title}
                        </h3>
                    </div>
                </div>
            `
        ).slice(0,4).join('')

        content_box.innerHTML = elementos

        let content_all = $('#content_all')
        let elementosAll = result.items.map(x => 
            `
                <div class="group relative cursor-pointer" onclick="window.open('https://www.youtube.com/watch?v=${x.snippet.resourceId.videoId}')">
                    <div class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                        <img src="${x.snippet.thumbnails.high.url}" alt="${x.snippet.description}" class="w-full">
                    </div>
                    <div class="mt-4 flex justify-between">
                        <h3 class="text-sm text-gray-700">
                            <span aria-hidden="true" class="absolute inset-0"></span>
                            ${x.snippet.title}
                        </h3>
                    </div>
                </div>
            `
        ).join('')
        content_all.innerHTML = elementosAll
    } catch (error) {
        console.error(error);
    }
})();