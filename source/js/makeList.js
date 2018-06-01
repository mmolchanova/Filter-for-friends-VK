import renderLeft from '../templates/left-template.hbs';
import renderRight from '../templates/right-template.hbs';

export default function makeList(friendsLeft, friendsRight) {
    const htmlLeft = renderLeft(friendsLeft);
    const htmlRight = renderRight(friendsRight);

    const results = document.querySelector('#friendsResult');
    const select = document.querySelector('#friendsSelect');

    results.innerHTML = htmlLeft;
    select.innerHTML = htmlRight;
}
