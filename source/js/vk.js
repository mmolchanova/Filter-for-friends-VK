import filter from './filter.js';
import move from './move.js';
import storage from './storage.js';

import renderLeft from '../templates/user-template.hbs';
import renderRight from '../templates/user-select-template.hbs';

export default function () { 
    storage();
    
    VK.init({
        apiId: 6491719
    });

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

    (async () => {
        try {
            let friendsLeft = {};
            let friendsRight = {};

            if (localStorage.dataLeft || localStorage.dataRight) {
                friendsLeft = JSON.parse(localStorage.dataLeft);
                friendsRight = JSON.parse(localStorage.dataRight);
            } else {
                await auth();
                friendsLeft = await callAPI('friends.get', { fields: 'photo_100' });              
            }          

            const htmlLeft = renderLeft(friendsLeft);
            const htmlRight = renderRight(friendsRight);

            const results = document.querySelector('#friendsResult');
            const select = document.querySelector('#friendsSelect');

            results.innerHTML = htmlLeft;
            select.innerHTML = htmlRight;

            // localStorage.clear();

            filter();
            move();
        } catch (e) {
            console.error(e);
        }
    })();   
}