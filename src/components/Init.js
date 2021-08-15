import { useEffect } from 'react';

function Init(props) {
  //const CDM = () => {
    //console.log('ComponentDidMount');
  //}
  //const CWUM= () => {
    //console.log('ComponentWillUnMount');
  //}
  const CDU= () => {
    //console.log('Init')
    props.history.push(props.nextRoute);
  }
  /*
  useEffect(() => {
    CDM();
    return () => {
      CWUM();
    }
  }, [])
  */
  useEffect(() => {
    CDU();
    //return () => {
    //  CWUM();
    //}
  })
  
  return null;
}

export default Init;
