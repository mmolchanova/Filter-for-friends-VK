export default function () {
  const filterInputLeft = document.querySelector('#filterInputLeft');
  const filterInputRight = document.querySelector('#filterInputRight');  
  const friendsListLeft = document.querySelector('#friendsResult');
  const friendsListRight = document.querySelector('#friendsSelect');

  filterInputLeft.addEventListener('input', function() { listener(filterInputLeft, friendsListLeft); }, false);
  filterInputRight.addEventListener('input', function() { listener(filterInputRight, friendsListRight); }, false);

  function listener(filterInput, friendsList) {
    const { value } = filterInput;

    for (const friendNode of friendsList.children) {
      if(friendNode.textContent.toLowerCase().includes(value.toLowerCase())) {
        friendNode.classList.remove('hidden');
      } else {
        friendNode.classList.add('hidden');
      }
    }
  }

}

