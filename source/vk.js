export default function () {
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
            }, 2)
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
            await auth();
            const friends = await callAPI('friends.get', { fields: 'photo_100' });
            const template = document.querySelector('#user-template').textContent;
            const render = Handlebars.compile(template);
            const html = render(friends);
            const results = document.querySelector('#results');

            results.innerHTML = html;
        } catch (e) {
            console.error(e);
        }
    })();


    //    friends.get 
}