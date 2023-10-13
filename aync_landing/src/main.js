const docre = (item) => document.createElement(item)
const $ = (item) => document.querySelector(item)
const accesKey = 'Fa5eEK4rKfjY-yJqnUlPTDkfTBazCybu7JJMs9h7uiY';
const API = 'https://api.unsplash.com/';
let images = []

const fetchApi = async (query, random, orientation) => {
    if(!orientation){
        orientation = 'portrait'
    }

    let response;
    if(!random){
        response = await fetch(`${API}search/photos?query=${query}&client_id=${accesKey}&orientation=${orientation}`)
    } else {
        response = await fetch(`${API}photos/random?query=${query}&client_id=${accesKey}&orientation=${orientation}`)
    }
    return await response.json()
};

window.addEventListener('load', () => {
    setPrincipalPhoto()
    showLastImages()
    showAllImages()
});

// funcion IIFE: Inmediately Invoked Function Expression
(async () => {
    let response = await fetchApi('gamer')
    console.log(response.results);
    response.results.forEach(element => {

        //destructure the data that i want from each element 🤝
        let { id, alt_description, height } = element
        let { regular } = element.urls
        let { bio, name, instagram_username, twitter_username } = element.user
        let { html } = element.user.links
    
        // put the data on the array that I would show ✌️
        images.push({
            id_photo:               id,
            url_photo:              regular,
            name_user:              name,
            contact_user:           bio,
            twitter_user:           twitter_username,
            height_photo:           height,
            instagram_user:         instagram_username,
            alt_descr_photo:        alt_description,
            profile_unsplash_user:  html
        })
    });

})(); //los dos parentesis del final hacen que la función se ejecute inmediatamente que se creo

async function setPrincipalPhoto(){
    let image_principal = $('#principal_photo')
    let response = await fetchApi('gamer', 1)
    image_principal.setAttribute('src', response.urls.regular)
    image_principal.setAttribute('alt', response.alt_description + ' | ' + response.user.name)
    
    let image_about = $('#about_photo')
    let response_about = await fetchApi('girl', 1, 'landscape')
    image_about.setAttribute('src', response_about.urls.regular)
    image_about.setAttribute('alt', response_about.alt_description + ' | ' + response_about.user.name)
}

function showAllImages() {
    let container_last_photos = $('#group_photos')
    images.forEach(x => {
        let div_group = docre('div'),
            div_full = docre('div'),
            image_full = docre('img'),
            div_text = docre('div'),
            h3_text = docre('h3'),
            span_text = docre('span')
        
        image_full.classList.add('w-full')
        image_full.src = x.url_photo
        image_full.alt = x.alt_descr_photo
        div_full.classList.add('w-full', 'bg-gray-200', 'aspect-w-1', 'aspect-h-1', 'rounded-md', 'overflow-hidden', 'group-hover:opacity-75', 'lg:aspect-none')
        div_full.appendChild(image_full)

        span_text.setAttribute('aria-hidden', true)
        span_text.classList.add('absolute', 'inset-0')
        h3_text.classList.add('text-sm', 'text-gray-700')
        h3_text.innerHTML = x.name_user
        h3_text.appendChild(span_text)
        div_text.classList.add('mt-4', 'flex', 'justify-between')
        div_text.appendChild(h3_text)

        div_group.classList.add('group', 'relative', 'cursor-pointer')
        div_group.addEventListener('click', () => window.open(x.profile_unsplash_user))
        div_group.append(div_full, div_text)

        container_last_photos.appendChild(div_group)
    })
}

function showLastImages(){
    let container_last_photos = $('#group_last_photos')
    images.filter(y => y.height_photo >= 4000).forEach((x, idx) => {
        if(idx < 4){
            let div_group = docre('div'),
                div_full = docre('div'),
                image_full = docre('img'),
                div_text = docre('div'),
                h3_text = docre('h3'),
                span_text = docre('span')
            
            image_full.classList.add('w-full')
            image_full.src = x.url_photo
            div_full.classList.add('w-full', 'bg-gray-200', 'aspect-w-1', 'aspect-h-1', 'rounded-md', 'overflow-hidden', 'group-hover:opacity-75', 'lg:aspect-none')
            div_full.appendChild(image_full)
    
            span_text.setAttribute('aria-hidden', true)
            span_text.classList.add('absolute', 'inset-0')
            h3_text.classList.add('text-sm', 'text-gray-700')
            h3_text.innerHTML = x.name_user
            h3_text.appendChild(span_text)
            div_text.classList.add('mt-4', 'flex', 'justify-between')
            div_text.appendChild(h3_text)
    
            div_group.classList.add('group', 'relative')
            div_group.append(div_full, div_text)
    
            container_last_photos.appendChild(div_group)
        }
    })
}