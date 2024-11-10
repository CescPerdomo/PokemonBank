// Funcion para información en localStorage
const summaryDetails = {
    saldoInicial: "$500.00",
    saldoFinal: "$505.00"
};

const transactionHistory = [
    { fecha: "01/09/2024", descripcion: "Depósito", monto: "$500.00" },
    { fecha: "05/09/2024", descripcion: "Compra en Supermercado", monto: "-$45.00" },
    { fecha: "12/09/2024", descripcion: "Pago de Servicios", monto: "-$100.00" },
    { fecha: "20/09/2024", descripcion: "Transferencia Recibida", monto: "$300.00" },
    { fecha: "30/09/2024", descripcion: "Retiros en Efectivo", monto: "-$150.00" }
];

localStorage.setItem("summaryDetails", JSON.stringify(summaryDetails));
localStorage.setItem("transactionHistory", JSON.stringify(transactionHistory));

// Descargar PDF al hacer clic en el botón
document.getElementById("downloadPDF").addEventListener("click", function() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.text("Resumen de Cuenta", 10, 10);
    doc.text(`Saldo Inicial: ${summaryDetails.saldoInicial}`, 10, 20);
    doc.text(`Saldo Final: ${summaryDetails.saldoFinal}`, 10, 30);

    doc.autoTable({
        head: [['Fecha', 'Descripción', 'Monto (USD)']],
        body: transactionHistory.map(item => [item.fecha, item.descripcion, item.monto]),
        startY: 40
    });

    doc.save("Resumen_de_Cuenta.pdf");

    // Registrar cuando se de click al boton descargarpdf en localStorage
    let descargas = localStorage.getItem("descargas");
    descargas = descargas ? JSON.parse(descargas) : [];
    descargas.push(new Date().toISOString());
    localStorage.setItem("descargas", JSON.stringify(descargas));
});