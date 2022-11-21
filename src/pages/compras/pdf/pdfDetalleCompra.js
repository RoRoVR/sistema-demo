import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import img from '../../../assets/pdf/logo.png';

import { QuicksandMedium } from '../../../assets/pdf/QuicksandMedium';
import { QuicksandRegular } from '../../../assets/pdf/QuicksandRegular';
import { QuicksandSemibold } from '../../../assets/pdf/QuicksandSemibold';

export const pdfDetalleCompra = ( id, datos ) => {
    if( id ){

        //DIVIDIR LOS ITEMS EN SUS HOJAS CORRECPONDIENTES
      const doc = new jsPDF({ //creamos el documento con unidades en PULGADAS y en tamaño LEGAL
          unit: "in",
          format: 'letter'
        });
      //Cargando fuentes
      //*Nota: es importante poner "normal", en la funcion addFont, caso contrario no importa la fuente
      doc.addFileToVFS("Quicksand-Medium.ttf", QuicksandMedium);
      doc.addFont("Quicksand-Medium.ttf", "QuicksandMedium", "normal");
      
      doc.addFileToVFS("Quicksand-Regular.ttf", QuicksandRegular);
      doc.addFont("Quicksand-Regular.ttf", "QuicksandRegular", "normal");

      doc.addFileToVFS("Quicksand-Semibold.ttf", QuicksandSemibold);
      doc.addFont("Quicksand-Semibold.ttf", "QuicksandSemibold", "normal");

      // -------------------- ENCABEZADO --------------------
      
      // AGREGAMOS EL LOGO DE LA EMPRESA
      doc.addImage(img, 'png', 0.5, 0.2, 2.1, 0.7 );

      //AGREGAMOS LA FECHA, MODIFICANDO EL TAMAÑO DE LA LETRA A 12px
      doc.setFontSize(10);
           
      doc.setFont("QuicksandSemibold");
      doc.text( 'Fecha de compra: ', 4.9, 0.5);
      doc.setFont("QuicksandRegular");
      doc.text( `${ datos.fecha }`, 6.2, 0.5 );
      doc.setFont("QuicksandSemibold");
      doc.text( 'Fecha de entrega: ', 4.9, 0.7);
      doc.setFont("QuicksandRegular");
      doc.text( `${ datos.fechaRecibido }`, 6.2, 0.7 );
      doc.setFont("QuicksandSemibold");
      doc.text( 'Proveedor: ', 0.6, 1.1);
      doc.setFont("QuicksandRegular");
      doc.text( `${ datos.proveedor }`, 1.4, 1.1 );
      doc.setFont("QuicksandSemibold");
      doc.text( 'Comprado por: ', 0.6, 1.3);
      doc.setFont("QuicksandRegular");
      doc.text( `${ datos.usuarioCompra }`, 1.7, 1.3 );
      doc.setFont("QuicksandSemibold");
      doc.text( 'Recibido por: ', 0.6, 1.5);
      doc.setFont("QuicksandRegular");
      doc.text( `${ datos.usuarioRecibido}`, 1.6, 1.5 );
      doc.setFont("QuicksandSemibold");
      doc.text( 'Detalle: ', 0.6, 1.7);
      doc.setFont("QuicksandRegular");
      doc.text( `${ datos.detalle }`, 1.2, 1.7 );
      // -------------------- FIN ENCABEZADO --------------------
      
      // -------------------- TABLA --------------------
      autoTable(doc, {
        startY: 1.9,
        headStyles: { 
          fillColor: '#2D2D2D', 
          lineWidth:0, 
          cellPadding: { top: 0.04, right: 0.04, bottom: 0.04, left: 0.04 },
          fontStyle: 'normal',
          font: 'QuicksandSemibold',
          fontSize: 8,
        },
        bodyStyles: {
          cellPadding: { top: 0.04, right: 0.04, bottom: 0.04, left: 0.04 },
          font: 'QuicksandRegular',
          fontSize: 8,
        },
        footStyles: {
          fillColor: '#016ED3',
          fontStyle: 'normal', 
          lineColor: '#016ED3',
          lineWidth: 0,
          cellPadding: { top: 0.04, right: 0.04, bottom: 0.04, left: 0.04 },
          font: 'QuicksandSemibold',
          fontSize: 10,
        },
        html: `#${id}`
      });
      // -------------------- FIN TABLA --------------------         
      doc.save(`COMPRA Nº${ datos.numero }.pdf`);


    }else{
        console.log('No se agrego ningun archivo...');
    }

}