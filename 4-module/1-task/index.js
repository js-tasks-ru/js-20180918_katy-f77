'use strict';

/**
 * Генерация HTML списка друзей
 * @param {Friend[]} friends
 * @return {HTMLUListElement}
 */
function makeFriendsList (friends) {
    
    let friendList = document.createElement("ul");

    for (let friend of friends){

        let friendElement = document.createElement("li");
        friendElement.textContent = friend.firstName + " " + friend.lastName;
        friendList.appendChild(friendElement);
    }

    return friendList;
}
