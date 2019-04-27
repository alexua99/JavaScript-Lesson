"use strict";

class ActionsHistoryUserWindow {
    constructor(windowClassName, url) {
        this.achievementsUrl = url;
        this.element = document.querySelector(windowClassName);
        this.LoadUserAchievements(this.ApplyAchivements, this.element);
    }

    LoadUserAchievements(funk, element) {
        $.get(this.achievementsUrl, function (response) {
            if (response.result) {
                funk(response.result, element);
            }
        }, "json");
    }

    ApplyAchivements(achievements, element) {
        let innerHTML = "";
        for (let achievement of achievements) {
            let description = "";

            let date = new Date(achievement.createdOn);
            date = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;

            if (achievement.Description) {
                description = `<p class="action-description">${achievement.Description}</p>`;
            }
            innerHTML += `<div class="history-item">
                                <span class="action-date mr-2">${date}</span>
                                <div class="action-photo mr-4">
                                    <img src="/images/achievement.png" alt="">
                                </div>
                                <div class="action-info">
                                    <span class="action-title">Action title</span>
                                    ${description}
                                    <p class="action-nominated">
                                        Nominated by:
                                        <a href="#" class="nominated-by">test user</a>
                                        Approved by:
                                        <a href="#" class="admin">Admin</a>
                                    </p>
                                </div>
                            </div>`;
        }

        element.innerHTML = innerHTML;
    }
}

new ActionsHistoryUserWindow(".actions-history-wrap", "api/UserAchievement/GetUserAchievements");