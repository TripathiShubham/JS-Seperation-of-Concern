var count = 0;

document.getElementById("mybtn").addEventListener("click", function() {
    document.getElementById("count").innerHTML = ++count;
});