import filter from './filter.js';
import move from './move.js';
import makeList from './makeList.js';

export default function () {    
    VK.init({
        apiId: 6491719
    });

    let friendsLeft = {};
    let friendsRight = {};
    
    if (localStorage.dataLeft || localStorage.dataRight) {
        friendsLeft = JSON.parse(localStorage.dataLeft);
        friendsRight = JSON.parse(localStorage.dataRight);
        makeList(friendsLeft, friendsRight);
        filter();
        move();    
    } else {
        (async () => {
            try {               
                await auth();
                friendsLeft = await callAPI('friends.get', { fields: 'photo_100' });              
                makeList(friendsLeft, friendsRight);
                filter();
                move();
            } catch (e) {
                console.error(e);
            }
        })();  
    } 

    function auth() {
        return new Promise((resolve, reject) => {
            VK.Auth.login(data => {
                if (data.session) {
                    resolve();
                } else {
                    reject(new Error('Не удалось авторизоваться'));
                }
            }, 2);
        });
    }

    function callAPI(method, params) {
        params.v = '5.76';

        return new Promise((resolve, reject) => {
            VK.api(method, params, (data) => {
                if (data.error) {
                    reject(data.error);
                } else {
                    resolve(data.response);
                }
            });
        })
    }
}