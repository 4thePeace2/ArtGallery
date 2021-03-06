$(document).ready(function () {

    //>>>>>>>>>>>>>>>>> Global variable initialization on start <<<<<<<<<<<<<<<<<<<<<<<<<
    var host = window.location.host;
    var token = null;
    var headers = {};
    var picturesEndpoint = "/api/pictures";
    var galeriesEndpoint = "/api/galeries";

    var editingId;

    $("#logoutDiv").css("display", "none");
    $("#regForm").css("display", "none");
    $("#loginDiv").css("display", "none");

    var picturesUrl = "http://" + host + picturesEndpoint;
    var galeriesUrl = "http://" + host + galeriesEndpoint;
    var pretragaUrl = "http://" + host + "/api/search";

    $.getJSON(picturesUrl, loadMainEntity);

    $("body").on("click", "#logoutBtn", reset);
    $("body").on("click", "#giveUpBtn", cleanForm);
    $("body").on("click", "#prijavaBtn", loadLoginForm);
    $("body").on("click", "#btnDelete", deletepicture);


    $("body").on("click", "#loginBtn", ulogujSe);

    $("body").on("click", "#findBtn", pretrazi);
    $("body").on("click", "#regFormLoad", loadRegistration);
    

    $("body").on("click", "#regBtn", reset);
    var lang = $("#prijavaBtn").text();

    //>>>>>>>>>>>>>>>> Clean creation form <<<<<<<<<<<<<<

    function cleanForm() {
        $("#createInput1").val('');
        $("#createInput2").val('');
        $("#createInput3").val('');
        $("#createInput5").val('');

    }

    //>>>>>>>> Load registration form <<<<<<<<<<
    function loadRegistration() {
        $("#info").empty();
        $("#btns").addClass("hidden");
        $("#loginDiv").css("display", "none");
        $("#regForm").css("display", "block");
    }
    //>>>>>>>> Load login form <<<<<<<<<<
    function loadLoginForm() {
        $("#info").empty();
        $("#loginDiv").css("display", "block");
        $("#btns").addClass("hidden");
        $("#regForm").css("display", "none");
    }

    //>>>>>>>> Load login form <<<<<<<<<<
    $("body").on("click", "#jumpToLogin", reset);

    //>>>>>>>>>>>>>>> Reset/logout <<<<<<<<<<<<<<<
    function reset() {
        if (token != null) {
            token = null;
        }
        $("#loginDiv").css("display", "none");
        $("#regForm").css("display", "none");
        $("#logoutDiv").css("display", "none");
        $("#loggedInParagraph").empty();
        $("#btns").removeClass("hidden");
        $("#brDiv").addClass("hidden");
        $("#pFirst").empty();
        $("#pSecond").empty();
        $("#create").addClass("hidden");
        $("#brDiv").addClass("hidden");
        $("#search").addClass("hidden");
        $("#findInput1").val('');
        $("#findInput2").val('');




        $.getJSON(picturesUrl, loadMainEntity);
    }

    //>>>>>>>>>>> Registration <<<<<<<<<<<

    $("#registration").submit(function (e) {
        e.preventDefault();

        var email = $("#regEmail").val();
        var loz1 = $("#regPass").val();
        var loz2 = $("#regPass2").val();


        var sendData = {
            "Email": email,
            "Password": loz1,
            "ConfirmPassword": loz2
        };

        $.ajax({
            type: "POST",
            url: 'http://' + host + "/api/Account/Register",
            data: sendData

        }).done(function (data) {
            $("#info").append("Uspešna registracija. Možete se prijaviti na sistem.");
            $("#regEmail").val('');
            $("#regPass").val('');
            $("#regPass2").val('');
            $("#regForm").css("display", "none");
            $("#loginDiv").css("display", "block");

        }).fail(function (data) {
            alert("Greska prilikom registracije!");
        });
    });

    //>>>>>>>>>>>>>> Adding main entity(picture) <<<<<<<<<<<<<<<<<<<<<<<<<

    $("#create").submit(function (e) {

        e.preventDefault();



        var name = $("#createInput1").val();
        var author = $("#createInput2").val();
        var year = $("#createInput3").val();
        var galerie = $("#createInput4select").val();
        var price = $("#createInput5").val();

        $("#validationMsgInput1").empty();
        $("#validationMsgInput2").empty();
        $("#validationMsgInput3").empty();
        $("#validationMsgInput5").empty();




        if (token) {
            headers.Authorization = "Bearer " + token;
        }

        var dataCreate = {
            "Name": name,
            "Author": author,
            "MadeYear": year,
            "GaleryId": galerie,
            "Price": price,

        }
        httpAction = "POST";

        $.ajax({
            "url": picturesUrl,
            "type": httpAction,
            "data": dataCreate,
            "headers": headers
        })
            .done(function (data, status) {
                $.getJSON(picturesUrl, loadMainEntity);
                $("#createInput1").val('');
                $("#createInput2").val('');
                $("#createInput3").val('');
                $("#createInput5").val('');



            })
            .fail(function (data, status) {
                validation();
                //alert("Greska prilikom dodavanja!");
            })

    })

    //>>>>>>>>>>> Login <<<<<<<<<<<<<<<<<<

    function ulogujSe() {

        var email = $("#loginEmail").val();
        var loz = $("#loginPass").val();

        var sendData = {
            "grant_type": "password",
            "username": email,
            "password": loz
        };

        $.ajax({
            "type": "POST",
            "url": 'http://' + host + "/Token",
            "data": sendData

        }).done(function (data) {

            //$("#info").empty().html("Prijavljen korisnik: <b>" + data.userName + "</b>");

            token = data.access_token;
            console.log(token);
            $("#loginEmail").val('');
            $("#loginPass").val('');
            $("#loginDiv").css("display", "none");
            $("#regForm").css("display", "none");
            if (lang === 'Login') {
                $("#loggedInParagraph").html("Current user: <b>" + email + "</b>");

            } else {
                $("#loggedInParagraph").html("Prijavljen korisnik: <b>" + email + "</b>");


            }
            $("#logoutDiv").css("display", "block");
            $("#brDiv").removeClass("hidden");



            $.getJSON(picturesUrl, loadMainEntity);
            $.getJSON(galeriesUrl, getgaleries);

            $("#data").css("display", "block");
            $("#create").removeClass("hidden");
            $("#search").removeClass("hidden");

        }).fail(function (data) {
            alert("Greska prilikom prijave!");
        });

    };

    //>>>>>>>>>>>>>>>> Load 2nd entity into dropdown menu-create form <<<<<<<<<<<<<<<<<<

    function getgaleries(data, status) {
        var galeries = $("#createInput4select");
        galeries.empty();

        if (status === "success") {

            for (var i = 0; i < data.length; i++) {
                var option = "<option value=" + data[i].Id + ">" + data[i].Name + "</option>";
                galeries.append(option);
            }
        }
        else {
            var div = $("<div></div>");
            var h3 = $("<h3>Greška prilikom preuzimanja galerije!</h3>");
            div.append(h3);
            galeries.append(div);
        }



    }

    //>>>>>>>>>>>>>>>>>> Load table with main entity <<<<<<<<<<<<<<<<<<<<<<
    function loadMainEntity(data, status) {
        console.log("Status: " + status);
        $("#data").empty();



        var container = $("#data");
        container.empty();

        if (status == "success") {
            console.log(data);

            // ispis naslova
            var div = $("<div></div>");
            if (lang === 'Login') {
                var h1 = $("<h1>Pictures</h1>");
                var name = "Name";
                var author = "Author";
                var price = "Price";
                var galery = "Galery";
                var action = "Action";
                var deleteAction = "delete";



            } else {
                var h1 = $("<h1>Slike</h1>");
                var name = "Naziv";
                var author = "Autor";
                var price = "Cena";
                var galery = "Galerija";
                var action = "Akcija";
                var deleteAction = "obriši";
            }
            
            var head = $("<thead></thead>");
            var body = $("<tbody></tbody>");

            div.append(h1);

            var table = $("<table border='1'  class=\"table table-hover text-center\" ></table>");
            var header = $("<tr style=\"background-color : lightblue; height:20px\"><th class=\"text-center\" style=\"width:200px\">" + name + "</th><th class=\"text-center\" style=\"width:250px\">" + author + "</th><th class=\"text-center\" style=\"width:100px\">" + price + "</th><th class=\"text-center\" style=\"width:200px\">" + galery + "</th><th class=\"text-center hidden\" style=\"width:120px\">" + action +"</th></tr>");
            head.append(header);
            table.append(head);
            table.append(body);


            for (i = 0; i < data.length; i++) {

                // prikazujemo novi red u tabeli
                var row = "<tr style=\"height:20px\">";
                // prikaz podataka
                var displayData = "<td>" + data[i].Name + "</td><td>" + data[i].Author + "</td><td>" + data[i].Price + "</td><td>" + data[i].GaleryName + "</td>";
                // prikaz dugmadi za izmenu i brisanje
                var stringId = data[i].Id.toString();
                console.log(stringId);
                var displayDelete = "<td class=\"hidden\"><a href=\"#\" id=btnDelete name=" + stringId + ">[" + deleteAction + "]</a></td>";
                //var displayEdit = "<td class=\"hidden\"><a href=\"#\" id=btnEdit  name=" + stringId + ">[izmeni]</a></td>";


                row += displayData + displayDelete + "</tr>";
                body.append(row);
                //table.append(row);

            }

            div.append(table);

            // ispis novog sadrzaja
            container.append(div);
            if (token) {
                $("th").removeClass("hidden");
                $("td").removeClass("hidden");
                $("#brDiv").removeClass("hidden");
                $("#findInput1").val('');
                $("#findInput2").val('');


            }
        }
        else {
            var div = $("<div></div>");
            var h1 = $("<h1>Greška prilikom preuzimanja mesta!</h1>");
            div.append(h1);
            container.append(div);
        }
    }

    //>>>>>>>>>>>>>>>>>>>> Removing entry from table od button delete <<<<<<<<<<<<<<<<<<<<<<<
    function deletepicture() {
        var deleteId = this.name;
        console.log(this.name);
        httpAction = "DELETE";

        if (token) {
            headers.Authorization = "Bearer " + token;
        }
        var picturesUrl = "http://" + host + picturesEndpoint;
        $.ajax({
            "url": picturesUrl + "?id=" + deleteId,
            "type": httpAction,
            "headers": headers

        })
            .done(function (data, status) {
                picturesUrl = "http://" + host + picturesEndpoint;
                $.getJSON(picturesUrl, loadMainEntity);

            })
            .fail(function (data, status) {

                alert("Greska prilikom brisanja proizvoda!")
            })

    };

    //>>>>>>>>>>>>>>>>>>>>>> Search form <<<<<<<<<<<<<<<<<<<<<<<<<
    function pretrazi() {
        var start = $("#findInput1").val();
        var kraj = $("#findInput2").val();
        httpAction = "POST";

        if (token) {
            headers.Authorization = "Bearer " + token;
        }

        var searchUrl = pretragaUrl + "?min=" + start + "&max=" + kraj;
        $.ajax({
            "url": searchUrl,
            "type": httpAction,
            "headers": headers
        })
            .done(loadMainEntity)
            .fail(function (data, status) {
                alert("Greska prilikom pretrage!");
            });

    };


});



//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> Data validation before creating an object and submiting it to controller <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
function validation() {
    var name = $("#createInput1").val();
    var year = $("#createInput3").val();
    var author = $("#createInput2").val();
    var price = $("#createInput5").val();

    var pName = $("#validationMsgInput1");
    var pAuthor = $("#validationMsgInput2");
    var pYear = $("#validationMsgInput3");
    var pPrice = $("#validationMsgInput5");



    var isValid = true;

    //>>>>>>>>>>>>>> Galery name validation <<<<<<<<<<<<<<<<<<<<<<<<
    if (!name) {
        pName.text("Naziv slike je obavezno polje!");
        isValid = false;
    }
    else if (name.length > 120) {
        pName.text("Naziv slike ne moze biti duzi od 120 karaktera!");
        isValid = false;
    }

    //>>>>>>>>>>>>>> Author name validation <<<<<<<<<<<<<<<<<<<<<<<<
    if (!author) {
        pAuthor.text("Autor slike je obavezno polje!");
        isValid = false;
    }
    else if (author.length > 70) {
        pAuthor.text("Ime autora ne moze biti duze od 70 karaktera!");
        isValid = false;
    }

     //>>>>>>>>>>>>>> Year validation <<<<<<<<<<<<<<<<<<<<<<<<
    if (!year || year < 1520 || year > 2019) {
        pYear.text("Godina mora biti iz intervala od 1520. do 2019.");
        isValid = false;
    }

     //>>>>>>>>>>>>>> Price validation <<<<<<<<<<<<<<<<<<<<<<<<
    
    if (!price) {
        pPrice.text("Cena je obavezno polje!");
        isValid = false;
    }

    else if (price < 100.00 || price > 49999.99) {
        pPrice.text("Cena mora biti iz intervala od 100 do 49999.99!");
        isValid = false;
    }

    return isValid;
}