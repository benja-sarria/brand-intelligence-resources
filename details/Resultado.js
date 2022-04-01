$(document).ready(function () {
    $("#tblGrillaopos").bootstrapTable();
    try {
        $("#tblGrillaopos").bootstrapTable("append", opos);
    } catch (e) {}

    $("#tblGrillaVistas").bootstrapTable();
    try {
        $("#tblGrillaVistas").bootstrapTable("append", vistas);
    } catch (e) {}

    $("#tblGrillaLlamados").bootstrapTable();
    try {
        $("#tblGrillaLlamados").bootstrapTable("append", llamados);
    } catch (e) {}

    $("#tblGrillareservas1").bootstrapTable();
    try {
        $("#tblGrillareservas1").bootstrapTable("append", reservas1);
    } catch (e) {}

    $("#tblGrillareservas2").bootstrapTable();
    try {
        $("#tblGrillareservas2").bootstrapTable("append", reservas2);
    } catch (e) {}

    $("#tblGrillaTransferencias").bootstrapTable();
    try {
        $("#tblGrillaTransferencias").bootstrapTable("append", transferencias);
        ArreglaTrans();
    } catch (e) {}

    $("#tblGrillaCambioRubro").bootstrapTable();
    try {
        $("#tblGrillaCambioRubro").bootstrapTable("append", CambioRubro);
    } catch (e) {}

    $("#tblGrillaDictamenes").bootstrapTable();
    try {
        $("#tblGrillaDictamenes").bootstrapTable("append", Dictamenes);
    } catch (e) {}

    $("#tblGrillaPedRecon").bootstrapTable();
    try {
        $("#tblGrillaPedRecon").bootstrapTable(
            "append",
            Pedidos_Reconsideracion
        );
    } catch (e) {}

    $("#tblGrillaDemandas").bootstrapTable();
    try {
        $("#tblGrillaDemandas").bootstrapTable("append", Demandas);
    } catch (e) {}

    $("#tblGrillaCaducidadesNulidades").bootstrapTable();
    try {
        $("#tblGrillaCaducidadesNulidades").bootstrapTable(
            "append",
            Caducidades_Nulidades
        );
    } catch (e) {}

    $("#tblGrillaRenuncias").bootstrapTable();
    try {
        $("#tblGrillaRenuncias").bootstrapTable("append", Renuncias);
    } catch (e) {}

    $(".llamadoLink").click(function (e) {
        e.preventDefault();
        var txt = $(this).data("llamado");
        $.jAlert({
            title: "Fundamento",
            content: txt,
            size: "auto",

            closeOnClick: true,
            btns: [
                {
                    text: "Imprimir",

                    onClick: function () {
                        $("div.ja_btn_wrap").hide();
                        w = window.open();
                        w.document.write($("div.ja_body").html());
                        w.print();
                        w.close();
                        $("div.ja_btn_wrap").show();
                    },
                },
            ],
        });
    });
    $(".autosLink").click(function (e) {
        e.preventDefault();
        var txt = $(this).data("autos");
        $.jAlert({
            title: "Descripción",
            content: txt,
            size: "auto",

            closeOnClick: true,
            btns: [
                {
                    text: "Imprimir",

                    onClick: function () {
                        $("div.ja_btn_wrap").hide();
                        w = window.open();
                        w.document.write($("div.ja_body").html());
                        w.print();
                        w.close();
                        $("div.ja_btn_wrap").show();
                    },
                },
            ],
        });
    });
    $(".vistaLink").click(function (e) {
        e.preventDefault();
        var cod = $(this).data("vista");

        $.jAlert({
            title: "Vista",
            //'content': response.Texto,
            size: "auto",
            ajax: "/MarcasConsultas/ObtenerVistaTexto?Cod_VistaExp=" + cod,
            closeOnClick: true,
            btns: [
                {
                    text: "Imprimir",

                    onClick: function () {
                        $("div.ja_btn_wrap").hide();
                        w = window.open();
                        w.document.write($("div.ja_body").html());
                        w.print();
                        w.close();
                        $("div.ja_btn_wrap").show();
                    },
                },
            ],
        });
        /*
        $.ajax({
            url: "/MarcasConsultas/ObtenerVista",
            type: 'POST',
            dataType: 'json',
            data: JSON.stringify({ Cod_VistaExp: cod }),
            processData: false,
            contentType: 'application/json; charset=utf-8',

            success: function (response) {
               

            },
            error: function (data) {

            }
        });
        */
    });

    $(".oposLink").click(function (e) {
        e.preventDefault();
        var fecha_levantamiento = $(this).data("fecha_levantamiento");
        if (
            fecha_levantamiento == "/Date(-62135586000000)/" ||
            fecha_levantamiento == "/Date(-62135499600000)/"
        )
            fecha_levantamiento = "";
        else
            fecha_levantamiento = convertDate(
                parseInt(fecha_levantamiento.replace(/\D+/g, ""))
            );
        var fundamento =
            $(this).data("fundamento") == null
                ? ""
                : $(this).data("fundamento");
        var motivo_levantamiento = "";
        switch ($(this).data("motivo_levantamiento")) {
            case "P":
                motivo_levantamiento = "PUBLICACIÓN ERRONEA";
                break;
            case "S":
                motivo_levantamiento = "SE TIENE POR NO PRESENTADA";
                break;
            case "N":
                motivo_levantamiento = "SE TIENE POR NULA";
                break;
            case "R":
                motivo_levantamiento = "RETIRO VOLUNTARIO";
                break;
        }

        //var motivo_levantamiento = $(this).data("motivo_levantamiento") == null ? "" : $(this).data("motivo_levantamiento");
        var fundamento_levantamiento =
            $(this).data("fundamento_levantamiento") == null
                ? ""
                : $(this).data("fundamento_levantamiento");

        var txt = "Fundamentos de la Oposición: " + fundamento + "<br/><br/>";
        txt += "Fecha Levantamiento " + fecha_levantamiento + "<br/>";
        txt += "Motivo Levantamiento " + motivo_levantamiento + "<br/>";
        txt +=
            "Fundamento del Levantamiento " +
            fundamento_levantamiento +
            "<br/>";

        $.jAlert({
            title: "Oposición",
            content: txt,
            size: "auto",

            closeOnClick: true,
            btns: [
                {
                    text: "Imprimir",

                    onClick: function () {
                        $("div.ja_btn_wrap").hide();
                        w = window.open();
                        w.document.write($("div.ja_body").html());
                        w.print();
                        w.close();
                        $("div.ja_btn_wrap").show();
                    },
                },
            ],
        });
    });

    $("#logo").click(function (e) {
        e.preventDefault();
        var el = $("#logo").find("img").clone();
        $(el).removeAttr("height");

        $.jAlert({
            title: " ",
            content:
                "<img style='max-height: 650px;max-width: 1000px;' src='" +
                $("#logo img").attr("src") +
                "' />",
            size: "auto",
            closeOnClick: true,
            btns: [
                {
                    text: "Imprimir",

                    onClick: function () {
                        $("div.ja_btn_wrap").hide();
                        w = window.open();
                        w.document.write($("div.ja_body").html());
                        w.print();
                        w.close();
                        $("div.ja_btn_wrap").show();
                    },
                },
            ],
        });
    });
    $("#BtnImprimir").click(function (e) {
        e.preventDefault();
        window.print();
    });

    $("#tblGrillaTransferencias tr")
        .mouseenter(function () {
            var tr = $(this).data("uniqueid");
            $("#tblGrillaTransferencias tr[data-uniqueid=" + tr + "]").addClass(
                "hover"
            );
        })
        .mouseleave(function () {
            var tr = $(this).data("uniqueid");
            $(
                "#tblGrillaTransferencias tr[data-uniqueid=" + tr + "]"
            ).removeClass("hover");
        });
    $(".panel-body").each(function () {
        if ($(this).text().trim() == "")
            $(this).html(
                "<p class='text-center'>No se encontraron registros</p>"
            );
    });
});
function dateFormat(value, row, index) {
    try {
        if (
            value == "/Date(-62135586000000)/" ||
            value == "/Date(-62135499600000)/" ||
            value == "/Date(-62122539600000)/"
        )
            return "";
        else return convertDate(parseInt(value.replace(/\D+/g, "")));
    } catch (e) {
        return "";
    }
}
function dateStringFormat(value, row, index) {
    try {
        return value.substr(0, 10);
    } catch (e) {
        return "";
    }
}
function verFormat(value, row, index) {
    var f = row.Fundamento.replace(/["']/g, "&quot; ");
    return (
        "<a href='#' data-fundamento='" +
        f +
        "' data-fecha_levantamiento='" +
        row.Fecha_Levantamiento +
        "' data-motivo_levantamiento='" +
        row.Motivo_Levantamiento +
        "' data-fundamento_levantamiento='" +
        row.Fundamento_Levantamiento +
        "' class='oposLink text-danger'>Ver Mas</a>"
    );
    //return '<a href="https://portaltramites.inpi.gob.ar/Clasico/Docs/ResultadosConsultas/ResultadoOposicionMarca.asp?solicitud=' + value + '" target="_blank">Ver Mas</a>';
}
function verVistaFormat(value, row, index) {
    return (
        "<a href='#' data-vista='" +
        value +
        "' class='vistaLink text-danger'>Ver Descripción</a>"
    );
    //return '<a href="https://portaltramites.inpi.gob.ar/Clasico/Docs/ResultadosConsultas/ResultadoVistaMarca.asp?solicitud=' + value + '&Antecedentes=' + Acta + '" target="_blank">Ver Descripción</a>';
}
function verLLamadoFormat(value, row, index) {
    return (
        "<a href='#' data-llamado='" +
        value +
        "' class='llamadoLink text-danger'>Ver Fundamento</a>"
    );
}
function verAutosFormat(value, row, index) {
    return (
        "<a href='#' data-autos='" +
        value +
        "' class='autosLink text-danger'>Ver Autos</a>"
    );
}
function ArreglaTrans() {
    /*arregla tabla transferencias*/
    var id = 0;
    var c = 0;
    $("#tblGrillaTransferencias tbody tr").each(function () {
        var uniqueid = $(this).data("uniqueid");
        c++;
        if (uniqueid == id) {
            $(this).find("td:lt(6)").addClass("btblGrillaTransferencias");
        } else {
            if (c != 0) {
                $(".encatblGrillaTransferencias").each(function () {
                    $(this).attr("rowspan", c);
                    $(this).removeClass("encatblGrillaTransferencias");
                });
            }
            $(this).find("td:lt(6)").addClass("encatblGrillaTransferencias");
            id = uniqueid;
            c = 0;
        }
    });
    $(".encatblGrillaTransferencias").each(function () {
        $(this).attr("rowspan", c + 1);
        $(this).removeClass("encatblGrillaTransferencias");
    });
    $(".btblGrillaTransferencias").hide();
    /*fin arregla tabla*/
}
