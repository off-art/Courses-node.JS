const toCurrency = price => {
  return new Intl.NumberFormat('ru-RU', {
    currency: 'rub',
    style: 'currency',
  }).format(price)
}

document.querySelectorAll('.price').forEach((node) => {
  node.textContent = toCurrency(node.textContent)
})

const $card = document.querySelector('#id')

if ($card) {
  $card.addEventListener('click', (e) => {
    if (e.target.classList.contains('js-remove')) {
      const id = e.target.dataset.id

      fetch('card/remove/' + id, {
        method: 'delete',
      })
        .then((res) => res.json())
        .then((card) => {
          if (card.courses.length) {
            const html = card.courses.map((c) => {
              const { title, count, id } = c;
              return `
              <tr>
                <td>${title}</td>
                <td>${count}</td>
                <td>
                  <button class="btn btn-small js-remove" data-id="${id}">Delete course</button>
                </td>
              </tr>
              `
            }).join('');
            $card.querySelector('tbody').innerHTML = html
            $card.querySelector('.price').textContent = toCurrency(card.price)
          } else {
            $card.innerHTML = '<p>Cart is empty</p>'
          }
        })
    }
  })
}
