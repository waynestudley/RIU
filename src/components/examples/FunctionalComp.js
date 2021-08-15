import React, { useEffect } from 'react';

function FunctionalComp() {
  const CDM = () => {
    //console.log('ComponentDidMount');
  }
  const CWUM= () => {
    //console.log('ComponentWillUnMount');
  }
  const CDU= () => {
    //console.log('ComponentDidUpdate');
  }
  useEffect(() => {
    CDM();
    return () => {
      CWUM();
    }
  }, [])
  useEffect(() => {
    CDU();
  })
  
  return (
    <div className="FunctionalComp">
        <h1>FunctionalComp</h1>      
    </div>
  );
}

export default FunctionalComp;
