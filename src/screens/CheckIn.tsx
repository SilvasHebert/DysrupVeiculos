import React from 'react';

import {GoBackHeader} from '../components/GoBackHeader';
import {Map} from '../components/Map';
import {CheckInForm} from '../components/CheckInForm';

export function CheckIn() {
  return (
    <>
      <GoBackHeader>Saída</GoBackHeader>
      <Map />
      <CheckInForm />
    </>
  );
}
