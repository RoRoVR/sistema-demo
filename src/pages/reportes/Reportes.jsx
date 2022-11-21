import React from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { obtenerColeccionReportesPorFecha } from './slices/reportesThunk';

import { Body } from './body/Body';
import { Footer } from './footer/Footer';
import { Header } from './header/Header';
import { useForm } from '../../hooks/useForm';

export const Reportes = () => {
  const date = new Date();
  const primer = new Date(date.getFullYear(), date.getMonth(), 1);
  const primerDia = primer.toISOString().split('T')[0];
  const ultimo = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const ultimoDia = ultimo.toISOString().split('T')[0];
  const dispatch = useDispatch();

  const initialState = {
    filtro: '',
    fechaInicio: `${ primerDia }`,
    fechaFinal:`${ ultimoDia }`
  };
  const [ valuesObj, handleInputChangeObj, valueManual ] = useForm( initialState );

  useEffect(() => {
    dispatch( obtenerColeccionReportesPorFecha( primerDia, ultimoDia ) );
  }, [])


  return (
    <div>
        <Header valuesObj = { valuesObj } handleInputChangeObj={handleInputChangeObj} />
        <Body valuesObj = { valuesObj } />
        <Footer/>
    </div>
  )
}
