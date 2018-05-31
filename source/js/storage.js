export default function () {
    const saveBtn = document.querySelector('#save');

    const friendsListLeft = document.querySelector('#friendsResult');
    const friendsListRight = document.querySelector('#friendsSelect');

    let storage = localStorage;

    saveBtn.addEventListener('click', function() {
        let friendsItemsLeft = friendsListLeft.querySelectorAll('.friend-item');
        let friendsItemsRight = friendsListRight.querySelectorAll('.friend-item');

        storage.dataLeft = JSON.stringify({
            items : createList(friendsItemsLeft),
        });
        storage.dataRight = JSON.stringify({
            items : createList(friendsItemsRight),
        });       

        function createList(friendsItems) {
            let friendsList = [];

            for (const item of friendsItems) {
                let elem = {};
    
                elem.first_name = item.children[1].textContent;
                elem.photo_100 = item.children[0].getAttribute('src');
    
                friendsList.push(elem);
            }

            return friendsList;
        }

    });
}