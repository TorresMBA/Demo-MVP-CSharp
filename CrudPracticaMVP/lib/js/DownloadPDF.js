$(document).ready(function () {
    var doc = new jsPDF('p', 'pt', 'a4');
    var specialElementHandlers = {
        '#editor': function (element, renderer) {
            return true;
        }
    };
   // se inserta el html en el div
    $('#cmd').click(function () {
        html2canvas($("#content"), {
            onrendered: function (canvas) {

                var img = canvas.toDataURL("image/png");
                var doc = new jsPDF();
                doc.addImage(img, 'JPEG', 5, 5);
                doc.save('TicketVenta.pdf');
            }

        });

    });
});


