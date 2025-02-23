(function () {
    "use strict";

    /*get-запрос*/
    document.addEventListener("DOMContentLoaded", function () {
        function loadSelectPoints1() {
            const selectCity1 = document.querySelector("#js-select-city1");

            fetch("https://shift-intensive.ru/api/delivery/points")
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Сетевая ошибка");
                    }
                    return response.json();
                })
                .then((data) => {
                    if (data.success) {
                        data.points.forEach((point) => {
                            const optionPoint =
                                document.createElement("option");
                            optionPoint.value = JSON.stringify(point);
                            optionPoint.textContent = point.name;
                            selectCity1.appendChild(optionPoint);
                        });
                    } else {
                        console.log("Ошибка при получении данных: ", data);
                    }
                })
                .catch((error) => console.error("Ошибка: ", error));
        }

        function loadSelectPoints2() {
            const selectCity2 = document.querySelector("#js-select-city2");

            fetch("https://shift-intensive.ru/api/delivery/points")
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Сетевая ошибка");
                    }
                    return response.json();
                })
                .then((data) => {
                    if (data.success) {
                        data.points.forEach((point) => {
                            const optionPoint =
                                document.createElement("option");
                            optionPoint.value = JSON.stringify(point);
                            optionPoint.textContent = point.name;
                            selectCity2.appendChild(optionPoint);
                        });
                    } else {
                        console.log("Ошибка при получении данных: ", data);
                    }
                })
                .catch((error) => console.error("Ошибка: ", error));
        }

        function loadSelectPackage() {
            const selectPackage = document.querySelector("#js-select-package");

            fetch("https://shift-intensive.ru/api/delivery/package/types")
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("error");
                    }
                    return response.json();
                })
                .then((data) => {
                    if (data.success) {
                        data.packages.forEach((pack) => {
                            const optionPack = document.createElement("option");
                            optionPack.className = "field__option";
                            optionPack.value = JSON.stringify(pack);
                            optionPack.textContent = `${pack.name}, ${pack.length}x${pack.width}x${pack.height}`;
                            selectPackage.appendChild(optionPack);
                        });
                    } else {
                        console.log("Ошибка при получении данных: ", data);
                    }
                })
                .catch((error) => console.log("Ошибка: ", error));
        }

        loadSelectPoints1();
        loadSelectPoints2();
        loadSelectPackage();
    });

    /*Проверка состояния select (нужно чтобы они были все заполнены)*/
    const selectCity1 = document.getElementById("js-select-city1");
    const selectCity2 = document.getElementById("js-select-city2");
    const selectPackage = document.getElementById("js-select-package");
    const submitButton = document.getElementById("js-page1-btn");

    function checkSelects() {
        const isCity1Selected = selectCity1.value !== "";
        const isCity2Selected = selectCity2.value !== "";
        const isPackageSelected = selectPackage.value !== "";

        if (isCity1Selected && isCity2Selected && isPackageSelected) {
            submitButton.classList.remove("btn--disabled");
        }
    }

    selectCity1.addEventListener("change", checkSelects);
    selectCity2.addEventListener("change", checkSelects);
    selectPackage.addEventListener("change", checkSelects);

    /*post-запрос*/
    const form = document.querySelector("#js-select-form");
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const select1 = document.querySelector("#js-select-city1").value;
        const select2 = document.querySelector("#js-select-city2").value;
        const select3 = document.querySelector("#js-select-package").value;

        const optiondata1 = JSON.parse(select1);
        const optiondata2 = JSON.parse(select2);
        const optiondata3 = JSON.parse(select3);

        const data = {
            package: optiondata3,
            senderPoint: optiondata1,
            receiverPoint: optiondata2,
        };
        console.log(JSON.stringify(data));

        fetch("https://shift-intensive.ru/api/delivery/calc", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Сетевая ошибка: " + response.statusText);
                }
                return response.json();
            })
            .then((data) => {
                console.log("Данные успешно отправлены: ", data);
                localStorage.setItem("postdata", JSON.stringify(data));
                addDelivery(data);
            })
            .catch((error) => console.log("Ошибка: ", error));
    });
    /*функция добавления карточек с информацией о доставке*/
    function addDelivery(data) {
        const deliveryContainer = document.querySelector(
            "#js-delivery-container"
        );
        deliveryContainer.innerHTML = "";

        data.options.forEach((item) => {
            const card = document.createElement("a");
            card.href = "#";
            card.className = "page-first__card";
            card.classList.add = "next-btn";

            const cardIcon = document.createElement("div");
            cardIcon.className = "page-first__card-icon";
            const icon = document.createElement("img");

            if (item.type === "EXPRESS") {
                icon.src = "assets/images/delivery1.svg";
            } else if (item.type === "DEFAULT") {
                icon.src = "assets/images/delivery2.svg";
            }

            cardIcon.appendChild(icon);

            const cardInfo = document.createElement("div");
            cardInfo.className = "page-first__card-info";

            const cardSubtitle = document.createElement("p");
            cardSubtitle.textContent = item.name;
            cardSubtitle.classList.add("page-first__card-subtitle");

            const cardTitle = document.createElement("h3");
            const textContent = Math.round(item.price / 100);
            cardTitle.textContent = `${textContent} ₽`;
            cardTitle.classList.add("page-first__card-cost");

            const cardTime = document.createElement("p");
            cardTime.textContent = wordForm(item.days);
            cardTime.classList.add("page-first__card-time");

            cardInfo.appendChild(cardSubtitle);
            cardInfo.appendChild(cardTitle);
            cardInfo.appendChild(cardTime);

            card.appendChild(cardIcon);
            card.appendChild(cardInfo);

            deliveryContainer.appendChild(card);
        });
    }
    /*функция склонения слов для карточек с информацией о доставке*/
    function wordForm(day) {
        let word;

        if (day === 1) {
            word = "рабочий день";
        } else if (day > 1 && day < 5) {
            word = "рабочих дня";
        } else {
            word = "рабочих дня";
        }

        return `${day} ${word}`;
    }

    /*функция для перехода по страницам*/
    function showPage(pageId) {
        // Скрываем все страницы
        const pages = document.querySelectorAll(".page-hidden");
        pages.forEach((page) => {
            page.classList.remove("page-active");
        });

        // Показываем выбранную страницу
        const activePage = document.getElementById(pageId);
        activePage.classList.add("page-active");

        // Сохраняем текущий шаг в localStorage
        history.pushState({ pageId }, "", `#${pageId}`);
    }
    function loadState() {
        const pageId = location.hash.replace("#", "") || "page1";

        showPage(pageId);
    }
    document.querySelectorAll(".next-btn").forEach((button) => {
        button.addEventListener("click", function () {
            const pageId = this.getAttribute("data-page");
            showPage(pageId);
        });
    });

    /*очистка localstorage при переходе на главную страницу*/
    document.getElementById("homeLink").addEventListener("click", function () {
        console.log("удаление");

        localStorage.removeItem("postdata");
        console.log(storedData);
    });

    /*добавление данных в localstorage при отправке формы на главной страницу*/
    function loadStoredData() {
        console.log("local");

        const storedData = localStorage.getItem("postdata");
        console.log(storedData);

        if (storedData) {
            const data = JSON.parse(storedData);
            addDelivery(data);
        }
    }

    window.addEventListener("popstate", loadState);
    document.addEventListener("DOMContentLoaded", loadState);
    document.addEventListener("DOMContentLoaded", loadStoredData);
})();
