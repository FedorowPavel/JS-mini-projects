const postsContainer = document.getElementById('post-container');
const loading = document.querySelector('.loader');
const filter = document.getElementById('filter');

let limit = 5;
let page = 1;


//fetch posts from API
async function getPosts() {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`)

    const data = await response.json();

    return data;
}

//show posts in dom
async function showPosts() {
    const posts = await getPosts();

    posts.forEach(post => {
        const postEl = document.createElement('div')
        postEl.classList.add('post');
        postEl.innerHTML = `
            <div class="number">${post.id}</div>
            <div class="post-info">
                <h2 class="post-tittle">${post.title}</h2>
                <p class="post-body">${post.body}</p>
            </div>

        `;

        postsContainer.appendChild(postEl)
    });

    console.log(posts);
}

//show loader and fetch new posts
function showLoading() {
    loading.classList.add('show');

    setTimeout(() => {
        loading.classList.remove('show');

        setTimeout(() => {
            page++;
            showPosts()
        },300)
    },1000)


}

//filter posts bu input
function filterPosts(event) {
    console.log(event.target.value);
    const term = event.target.value.toUpperCase();
    console.log(term);

    const posts = document.querySelectorAll('.post');

    posts.forEach(post => {
        const title = post.querySelector('.post-tittle').innerText.toUpperCase();
        const body = post.querySelector('.post-body').innerText.toUpperCase();

        if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
            post.style.display = 'flex';
        } else {
            post.style.display = 'none';
        }
        
    })
}



showPosts()


window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight} = document.documentElement


    if (scrollTop + clientHeight >= scrollHeight - 5) {
        showLoading()
    }
})


filter.addEventListener('input', filterPosts)