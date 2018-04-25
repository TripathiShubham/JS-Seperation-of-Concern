var data = [
    {
        "name": "one",
        "count": 0
    },
    {
        "name": "two",
        "count": 0
    },
    {
        "name": "three",
        "count": 0
    },
    {
        "name": "four",
        "count": 0
    },
    {
        "name": "five",
        "count": 0
    }
]

function init() {
    var currentIndex;
    var body = document.getElementsByTagName("body");
    var div = document.createElement("div");
    div.setAttribute("id", "selected");
    var button = document.createElement("button");
    button.textContent = "click";
    button.setAttribute("style", "display:none");
    button.setAttribute("id", "mybtn");
    button.addEventListener("click", function() {
        var count = ++data[currentIndex].count;
        document.getElementById("count").innerHTML = count;
    });
    var name = document.createElement("h3");
    name.setAttribute("id", "name");
    var count = document.createElement("p");
    count.setAttribute("id", "count");
    div.append(button);
    div.append(name);
    div.append(count);
    body[0].append(div);
    var ul = document.createElement("ul");
    for (let index = 0; index < data.length; index++) {
        var li = document.createElement("li");
        li.innerHTML = data[index].name;
        li.addEventListener("click", (function(data, index) {
            return function() {
                document.getElementById("mybtn").setAttribute("style", "display:block");
                document.getElementById("name").innerHTML = data.name;
                document.getElementById("count").innerHTML = data.count;
                currentIndex = index;
            }
        })(data[index], index));
        ul.append(li);
    }
    body[0].append(ul);
}
init();