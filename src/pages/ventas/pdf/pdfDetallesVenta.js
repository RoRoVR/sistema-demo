import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import img from '../../../assets/pdf/logo.png';
import line from '../../../assets/pdf/line.png';

import { QuicksandMedium } from '../../../assets/pdf/QuicksandMedium';
import { QuicksandRegular } from '../../../assets/pdf/QuicksandRegular';
import { QuicksandSemibold } from '../../../assets/pdf/QuicksandSemibold';

export const pdfDetallesVenta = ( items, datos ) => {
    if( items ){

      // Contacto DEFAULD
      const contactoDefaul = '78223755';

      //DIVIDIR LOS ITEMS EN SUS HOJAS CORRECPONDIENTES
      let newItems = [];
      let fin = 35;
      for( let i = 0; i < items.length; i+=35 ){
          newItems.push( items.slice( i, fin ) );
          fin+=35
      }
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



      for (let i = 0; i < newItems.length; i++) {
        // Posicion en la que aparece la linea del pie de pagina
        const footPageY = (newItems[i].length > 14)? 10: 5.7 ; 

        // -------------------- ENCABEZADO --------------------
        // AGREGAMOS EL LOGO DE LA EMPRESA
        doc.addImage(img, 'png', 0.5, 0.2, 2.1, 0.7 );
        doc.addImage(line, 'png', 0.5, footPageY, 7.5, 0.1 ); // Linea del pie de pagina
        
        //AGREGAMOS LA FECHA, MODIFICANDO EL TAMAÑO DE LA LETRA A 12px
        doc.setFontSize(10);
        
        doc.setFont("QuicksandSemibold");
        doc.text( `PROFORMA Nº ${ datos.numero }`, 4.9, 0.5 );
        
        doc.setFont("QuicksandSemibold");
        doc.text( 'Fecha: ', 4.9, 0.7);
        doc.setFont("QuicksandRegular");
        doc.text( `${ datos.fecha }`, 5.5, 0.7 );
        doc.setFont("QuicksandSemibold");
        doc.text( 'Nombre: ', 0.6, 1.1);
        doc.setFont("QuicksandRegular");
        doc.text( `${ datos.nombre }`, 1.3, 1.1 );
        doc.setFont("QuicksandSemibold");
        doc.text( 'NIT: ', 0.6, 1.3);
        doc.setFont("QuicksandRegular");
        doc.text( `${ datos.nit }`, 1.3, 1.3 );
        doc.setFont("QuicksandSemibold");
        doc.text( 'Cel: ', 4.9, 1.1);
        doc.setFont("QuicksandRegular");
        doc.text( `${ datos.cel }`, 5.5, 1.1 );
        doc.setFont("QuicksandSemibold");
        doc.text( 'Correo: ', 4.9, 1.3);
        doc.setFont("QuicksandRegular");
        doc.text( `${ datos.correo }`, 5.5, 1.3 );
        // -------------------- FIN ENCABEZADO --------------------
        
        // -------------------- TABLA --------------------
        autoTable(doc, {
          startY: 1.5,
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
          head: [['Nº', 'MODELO', 'MARCA', 'NOMBRE', 'U/M','CANT', 'P/UNIT', 'TOTAL']],
          body: newItems[i],
          foot: [['', '', '', '','','','TOTAL', `${datos.total} Bs.`]]
        });
        // -------------------- FIN TABLA --------------------

        // -------------------- PIE DE PAGINA --------------------
        doc.setFont("QuicksandRegular");
        doc.text( '-------------------------------------------', 1.2, footPageY - 0.2 );
        
        doc.setFont("QuicksandRegular");
        doc.text( 'Entregado por', 1.9, footPageY - 0.1 );
        doc.setFont("QuicksandRegular");
        doc.text( '-------------------------------------------', 4.8, footPageY - 0.2 );
        
        doc.setFont("QuicksandRegular");
        doc.text( 'Recibido por', 5.5, footPageY - 0.1 );
  
        doc.setFont("QuicksandSemibold");
        doc.text( 'RESPONSABLE DE VENTAS', 0.5, footPageY + 0.3 );
        doc.setFont("QuicksandRegular");
        doc.text( `${ datos.vendedor }`, 0.5, footPageY + 0.5 );
        doc.setFont("QuicksandSemibold");
        doc.text( 'DIRECCION', 3, footPageY + 0.3 );
        doc.setFont("QuicksandRegular");
        doc.text( 'Av. Barrio Nº125', 3, footPageY + 0.5 );
        doc.setFont("QuicksandSemibold");
        doc.text( 'CONTACTO', 6, footPageY + 0.3 );
        doc.setFont("QuicksandRegular");
        doc.text( `${datos.contacto}-${contactoDefaul}`, 6, footPageY + 0.5 );
        // -------------------- FIN PIE DE PAGINA -------------------- 
        
        // Verifica si la matriz aun tiene otro arreglo dentro, para agregar una nueva hoja o no
        if( newItems[i+1] ){ 
          doc.addPage( 'letter', 'p' ); // AGREGA UNA NUEVA PAGINA Y PASA EL FOCO A ELLA
        }
      }
      doc.save(`PROFORMA Nº ${ datos.numero }.pdf`);


    }else{
        console.log('No se agrego ningun archivo...');
    }

}