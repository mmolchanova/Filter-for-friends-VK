import makeDnD from './dnd.js';

export default function () {
    const friendsListLeft = document.querySelector('#friendsResult');
    const friendsListRight = document.querySelector('#friendsSelect');

    makeDnD(friendsListLeft, friendsListRight, 'friend-item');
    makeDnD(friendsListRight, friendsListLeft, 'friend-item');

    friendsListLeft.addEventListener('click', (e) => { 
        var elem = e.target;

        if (elem.classList.contains('friend-item__add')) {
            friendsListRight.insertBefore(elem.parentNode, friendsListRight.firstChild);
            elem.classList.remove('friend-item__add');
            elem.classList.add('friend-item__remove');
        }
    });

    friendsListRight.addEventListener('click', (e) => { 
        var elem = e.target;

        if (elem.classList.contains('friend-item__remove')) {
            friendsListLeft.insertBefore(elem.parentNode, friendsListLeft.firstChild);
            elem.classList.remove('friend-item__remove');
            elem.classList.add('friend-item__add');
        }
    });
  
}