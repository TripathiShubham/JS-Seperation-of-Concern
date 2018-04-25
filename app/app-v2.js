var data = [
    {
        "name": "one",
        "count": 0
    },
    {
        "name": "two",
        "count": 0
    }
]

function init() {
    document.getElementById("name1").innerHTML = data[0].name;
    document.getElementById("name2").innerHTML = data[1].name;
}
init();

document.getElementById("mybtn1").addEventListener("click", function() {
    document.getElementById("count1").innerHTML = ++data[0].count
});

document.getElementById("mybtn2").addEventListener("click", function() {
    document.getElementById("count2").innerHTML = ++data[1].count
});