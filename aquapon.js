function openPara(paraName, elmnt, color) {
    var i, tabcontent, tablink;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablink = document.getElementsByClassName("tablink");
    for (i = 0; i < tablink.length; i++) {
        tablink[i].style.backgroundColor = "";
        tablink[i].style.borderBottom = "2px";
    }
    document.getElementById(paraName).style.display = "block";
    elmnt.style.backgroundColor = color;
    elmnt.style.borderBottom = "0";
}
