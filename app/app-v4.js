(function() {
    var model = {
        data: [],
        init: function() {
            for (let index = 0; index < 5; index++) {
                this.data.push({
                    "name": Math.random().toString(36).substring(7),
                    "count": 0,
                    "id": index,
                    "isUpdate": false
                });
            }
            this.setSelectedCat(this.data[0]);
        },
        getAll: function() {
            return this.data;
        },
        getSelectedCat: function() {
            return this.selectedCat;
        },
        setSelectedCat: function(currentCat) {
            this.selectedCat = currentCat;
        },
        selectedCat: null
    }

    var octopus = {
        init: function() {
            model.init();
            catListView.init();
            catView.init();
            adminView.init();
            formView.init();
        },
        getAllData: function() {
            return model.getAll();
        },
        getSelectedCat: function() {
            return model.getSelectedCat();
        },
        setSelectedCat: function(currentCat) {
            model.setSelectedCat(currentCat);
        },
        incrementCounter: function() {
            model.selectedCat.count++;
            catView.render();
        }
    }

    var catView = {
        init: function() {
            var firstCat = octopus.getAllData();
            model.selectedCat = firstCat[0];
            this.render();
            document.getElementById("sel-btn").addEventListener("click", function() {
                ++model.selectedCat.count;
                catView.render();
            });
        },
        render: function() {
            var selectedCat = octopus.getSelectedCat();
            document.getElementsByClassName("sel-name")[0].textContent = selectedCat.name;
            document.getElementsByClassName("sel-count")[0].textContent =  selectedCat.count;
        }
    }

    var catListView = {
        init: function() {
            this.nodeList = document.getElementById("list");
            this.renderList();
        },
        renderList: function() {
            var htmlStr = '';
            octopus.getAllData().forEach(data => {
                var li = document.createElement("li");
                li.setAttribute("id", data.id);
                li.textContent = data.name;
                li.addEventListener("click", (function(data) {
                    return function() {
                        octopus.setSelectedCat(data);
                        catView.render();
                    }
                })(data));
                this.nodeList.appendChild(li);
            });
        },
        updateList: function() {
            var list = octopus.getAllData();
            for (let index = 0; index < list.length; index++) {
                if(list[index].isUpdate) {
                    document.getElementById(list[index].id).textContent = list[index].name;
                    list[index].isUpdate = false;
                }
            }
        }
    }

    var adminView = {
        init: function() {
            document.getElementById("admin-btn").addEventListener("click", function() {
                formView.toogleFormView();
                formView.setForm();
            });
        }
    }

    var formView = {
        init: function() {
            this.nameInput = document.getElementById("name");
            this.countInput = document.getElementById("count");
            document.getElementById("cancel-form").addEventListener("click", function() {
                formView.toogleFormView();
            });
            document.getElementById("my-form").addEventListener("submit", function(e) {
                e.preventDefault();
                model.selectedCat.name = formView.nameInput.value;
                model.selectedCat.count = formView.countInput.value;
                model.selectedCat.isUpdate = true;
                formView.toogleFormView();
                catView.render();
                catListView.updateList();
            });
        },
        toogleFormView: function() {
            document.getElementById("admin-form").classList.toggle("hide");
        },
        setForm: function() {
            var sel = octopus.getSelectedCat();
            this.nameInput.value = sel.name;
            this.countInput.value = sel.count;
        }
    }

    octopus.init();
})()