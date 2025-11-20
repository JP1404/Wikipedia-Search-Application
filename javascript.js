document.getElementById('searchBtn').addEventListener('click', searchWikipedia);

async function searchWikipedia() {
    const query = document.getElementById('searchInput').value.trim();
    const resultsContainer = document.getElementById('results');
    const spinner = document.getElementById('spinner');

    if (!query) {
        alert('Please enter a search term!');
        return;
    }

    resultsContainer.innerHTML = '';
    spinner.style.display = 'block';

    try {
        const response = await fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${query}&format=json&origin=*`);
        const data = await response.json();
        spinner.style.display = 'none';

        if (data.query.search.length === 0) {
            resultsContainer.innerHTML = '<p class="text-danger">No results found.</p>';
            return;
        }

        data.query.search.forEach(item => {
            const title = item.title;
            const snippet = item.snippet;
            const link = `https://en.wikipedia.org/wiki/${encodeURIComponent(title)}`;

            const resultItem = document.createElement('a');
            resultItem.href = link;
            resultItem.target = '_blank';
            resultItem.className = 'list-group-item list-group-item-action';
            resultItem.innerHTML = `<h5>${title}</h5><p>${snippet}...</p>`;
            resultsContainer.appendChild(resultItem);
        });
    } catch (error) {
        spinner.style.display = 'none';
        resultsContainer.innerHTML = '<p class="text-danger">Error fetching data. Please try again.</p>';
        console.error(error);
    }
}
