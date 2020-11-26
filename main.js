A = []; B = []; letra = "C"
concat = "";

main = () => {
    A = document.getElementById("A").value.split(",");
    B = document.getElementById("B").value.split(",");

    (A[0] !== "" && B[0] !== "") ? universe() : alert("Preencha os campos!")
}

function universe() {
    U = [];
    for (i = 0; i < A.length; i++) {
        for (j = 0; j < B.length; j++) {
            U.push("(" + A[i] + "," + B[j] + ")");
        }
    }
    $("#relacoes").html("")
    let resultA = ("A = {" + printable(A)).replace("NaN", 0) + "} "+ "|A| = " + A.length;
    document.getElementById("a-set").textContent = resultA;
    let resultB = ("B = {" + printable(B)).replace("NaN", 0) + "} "+ " |B| = " + B.length;
    document.getElementById("b-set").textContent = resultB;
    let resultU = ("U = {" + printable(U)).replace("NaN", 0) + "} "+ " |U| = " + U.length;
    document.getElementById("universe-set").textContent = resultU;
}

function test_prime(n) {

    if (n === 1) {
        return false;
    }
    else if (n === 2) {
        return true;
    } else {
        for (var x = 2; x < n; x++) {
            if (n % x === 0) {
                return false;
            }
        }
        return true;
    }
}

function nextChar(c) {
    return String.fromCharCode(c.charCodeAt(0) + 1);
}

function auxiliarOperacoes(a, b, operador, relacao, valor) {
    var total
    switch (operador) {
        case "+":
            total = a + b
            break;
        case "-":
            total = a - b
            break;
        case "/":
            total = a / b
            break;
        case "*":
            total = a * b
            break;
    }

    switch (relacao) {
        case "=":
            return total == valor
            break;
        case "≠":
            return total != valor
            break;
        case ">":
            return total > valor
            break;
        case "<":
            return total < valor
            break;
    }

}

function operacoes() {
    if (A.length > 0 && B.length > 0 && A[0] !== "" && B[0] !== "") {
        var operador = $("#operacoes-operador").val()
        var relacao = $("#operacoes-relacao").val()
        var valor = $("#operacoes-valor").val()

        if (operador !== null && relacao !== null && valor !== "") {

            X = [];

            for (i = 0; i < A.length; i++) {
                for (j = 0; j < B.length; j++) {
                    if (auxiliarOperacoes(parseInt(A[i]), parseInt(B[j]), operador, relacao, valor))
                        X.push("(" + A[i] + "," + B[j] + ")");
                }
            }
            let result = (letra + " = {a " + operador + " b " + relacao + " " + valor + "} = {" + printable(X)).replace("NaN", 0) + "}" + " |"+letra+"| = " + X.length;
            letra = nextChar(letra)
            $("#relacoes").append(`<span style="font-weight: 500;">${result}</span>`)
        } else
            alert("Preencha todos os campos!")
    } else
        alert("Gere o conjunto universo antes de adicionar as relações!")
}

function auxiliarCaracteristicas(val1, val2, carac, res) {
    res = parseInt(res)
    switch (carac) {
        case "é primo":
            return (test_prime(val1))
            break;
        case "é par":
            return val1 % 2 == 0
            break;
        case "é impar":
            return val1 % 2 == 1
            break;
        case ("divide a"):
            return val2 % val1 == 0
            break;
        case ("divide b"):
            return val2 % val1 == 0
            break;
        case "divide":
            return res % val1 == 0
            break;
        case "=":
            return val1 == res
            break;
        case "≠":
            return val1 !== res
            break;
        case ">":
            return val1 > res
            break;
        case "<":
            return val1 < res
            break;


    }
}
function caracteristicas() {
    if (A.length > 0 && B.length > 0 && A[0] !== "" && B[0] !== "") {
        var cA = $("#caracteristica-a").val()
        var cAv = $("#caracteristica-a-valor").val()
        var eOU = $("#caracteristica-eou").val()
        var cB = $("#caracteristica-b").val()
        var cBv = $("#caracteristica-b-valor").val()

        if (cA !== null && eOU !== null && cB !== null) {
            X = [];
            if (eOU == "E") {
                for (i = 0; i < A.length; i++) {
                    for (j = 0; j < B.length; j++) {
                        if (auxiliarCaracteristicas(parseInt(A[i]), parseInt(B[j]), cA, cAv) && auxiliarCaracteristicas(parseInt(B[j]), parseInt(A[i]), cB, cBv)) {
                            X.push("(" + A[i] + "," + B[j] + ")");
                            console.log(auxiliarCaracteristicas(parseInt(B[j]), parseInt(A[i]), cB, cBv))
                        }
                    }
                }
            }
            else if (eOU == "OU") {
                for (i = 0; i < A.length; i++) {
                    for (j = 0; j < B.length; j++) {
                        if (auxiliarCaracteristicas(parseInt(A[i]), parseInt(B[j]), cA, cAv) || auxiliarCaracteristicas(parseInt(B[j]), parseInt(A[i]), cB, cBv))
                            X.push("(" + A[i] + "," + B[j] + ")");
                    }
                }
            }
            let result = (letra + " = {a " + cA + " " + cAv + " " + eOU + " b " + cB + cBv + "} = {" + printable(X)).replace("NaN", 0) + "}" + " |"+letra+"| = " + X.length;
            letra = nextChar(letra)
            $("#relacoes").append(`<span style="font-weight: 500;">${result}</span>`)
        } else
            alert("Preencha todos os campos!")
    } else
        alert("Gere o conjunto universo antes de adicionar as relações!")
}

function printable(param) {
    result = "";
    for (i = 0; i < param.length; i++) {
        if (i != param.length - 1) {
            result += param[i] + ",";
        } else {
            result += param[i];
        }
    }
    return result;
}

function limpar() {
    $("#a-set").html("")
    $("#b-set").html("")
    $("#universe-set").html("")
    $("#relacoes").html("")
}

$(() => {
    $("#caracteristica-a").on("change", () => {
        if ($("#caracteristica-a").val() == "divide b" || $("#caracteristica-a").val() == "é primo" || $("#caracteristica-a").val() == "é par" || $("#caracteristica-a").val() == "é impar") {
            $("#caracteristica-a-valor").hide()
            $("#caracteristica-a-valor").val("")
        } else
            $("#caracteristica-a-valor").show()
    })
    $("#caracteristica-b").on("change", () => {
        if ($("#caracteristica-b").val() == "divide a" || $("#caracteristica-b").val() == "é primo" || $("#caracteristica-b").val() == "é par" || $("#caracteristica-b").val() == "é impar") {
            $("#caracteristica-b-valor").hide()
            $("#caracteristica-b-valor").val("")
        } else
            $("#caracteristica-b-valor").show()
    })
})


