
var rest = document.getElementById('update-place');
rest.addEventListener('click', function() {
  fetch('things', {
    method: 'put',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      'restaurant': 'Cafe Enchante',
      'location': 'Also geary'
    })
  })
  .then(res => {
    if (res.ok) {return res.json();}
  })
  .then(data => {
    console.log(data);
    window.location.reload(true);
  })
})

var delCafe = document.getElementById('delete-cafe');
delCafe.addEventListener('click', function() {
  fetch('things', {
    method: 'delete',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      'restaurant': 'Cafe Enchante'
    })
  })
  .then(res => {
    if (res.ok) return res.json()
  })
  .then(data => {
    console.log(data);
    window.location.reload(true);
  })
})
