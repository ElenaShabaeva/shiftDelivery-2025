(function () {
    "use strict";

    document.addEventListener("DOMContentLoaded", function () {
        function loadSelectPoints1() {
            const selectCity1 = document.querySelector("#js-select-city1");

            fetch('https://shift-intensive.ru/api/delivery/points')
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Сетевая ошибка");
                    }
                    return response.json();
                    
                })
                .then((data) => {
                    if (data.success) {
                        data.points.forEach(point => {
                            const optionPoint = document.createElement("option");
                            optionPoint.value = JSON.stringify(point);
                            optionPoint.textContent = point.name;
                            selectCity1.appendChild(optionPoint);
                        });
                    } else {
                        console.log('Ошибка при получении данных: ', data);
                    }
                })
                .catch (error => console.error("Ошибка: ", error));
        }

        function loadSelectPoints2() {
            const selectCity2 = document.querySelector("#js-select-city2");

            fetch('https://shift-intensive.ru/api/delivery/points')
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Сетевая ошибка");
                    }
                    return response.json();
                    
                })
                .then((data) => {
                    if (data.success) {
                        data.points.forEach(point => {
                            const optionPoint = document.createElement("option");
                            optionPoint.value = JSON.stringify(point);
                            optionPoint.textContent = point.name;
                            selectCity2.appendChild(optionPoint);
                        });
                    } else {
                        console.log('Ошибка при получении данных: ', data);
                        
                    }
                })
                .catch (error => console.error("Ошибка: ", error));
        }

        function loadSelectPackage() {
            const selectPackage = document.querySelector("#js-select-package");

            fetch('https://shift-intensive.ru/api/delivery/package/types')
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("error");
                    }
                    return response.json();
                })
                .then((data) => {
                    if (data.success) {
                        data.packages.forEach(pack => {
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
                .catch(error => console.log("Ошибка: ", error));
        }

        loadSelectPoints1();
        loadSelectPoints2();
        loadSelectPackage();
    }); 

})();
