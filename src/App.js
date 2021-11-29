import { useReducer } from 'react';
import './Style.css'
import DigitButton from './DigitButton';
import OperationButton from './OperationButton';
export const ACTIONS={
  ADD_DIGIT:'add-digit',
  CHOSE_OPERATION:'chose-operation',
  CLEAR:'clear',
  DELETE_DIGIT:'delete-digit',
  EVALUATE:'evaluate'
}

function reducer(state,{type,payload}){
  switch(type){
    case ACTIONS.ADD_DIGIT:
      if(payload.digit==="0" && state.currentOperand==="0"){return state}
       
      if(payload.digit ==="." && state.currentOperand.includes(".")){return state}
       
      return{
        ...state,
        currentOperand:`${state.currentOperand || ''}${payload.digit}`,
      }
    
     case ACTIONS.CHOSE_OPERATION:{
       if(state.currentOperand===null && state.prevOperand===null){
         return state
       }
       if(state.currentOperand==null){
         return{
           ...state,
           operation:payload.operation,
         }
       }
       if(state.prevOperand==null){
         return{
           ...state,
           operation:payload.operation,
           prevOperand:state.currentOperand,
           currentOperand:null
         }
       }
     } 
     return{
       ...state,
      prevOperand:calculate(state),
      operation:payload.operation,
      currentOperand:null
     }

    case ACTIONS.CLEAR:{
        return {}
      }
  }
}
function calculate({currentOperand,prevOperand,operation}){
  const current=parseFloat(currentOperand)
  const previous=parseFloat(prevOperand)
  if(isNaN(previous) ||isNaN(current)){return ""}
  let computation=""
  switch(operation){
    case "+":
    computation=previous+current
    break
    case "-":
    computation=previous-current
    break
    case "*":
    computation=previous*current
    break
    case "/":
    computation=previous/current
    break
  }
    return computation.toString()
}
function App() {

  const [{currentOperand,prevOperand,operation },dispatch]=useReducer(reducer,{})

  return (
    <div className="calculator-interface">
      <div className="output">
        <div className="previous-operator">{prevOperand} {operation}</div>
        <div className="current-operator">{currentOperand}</div>
      </div>
      <button className="span-two" onClick={()=>dispatch({type:ACTIONS.CLEAR})}>AC</button>
      <button>DEL</button>
      <OperationButton operation="/" dispatch={dispatch}/>
      <DigitButton digit="1" dispatch={dispatch}/>
      <DigitButton digit="2" dispatch={dispatch}/>
      <DigitButton digit="3" dispatch={dispatch}/>
      <OperationButton operation="*" dispatch={dispatch}/>
      <DigitButton digit="4" dispatch={dispatch}/>
      <DigitButton digit="5" dispatch={dispatch}/>
      <DigitButton digit="6" dispatch={dispatch}/>
      <OperationButton operation="+" dispatch={dispatch}/>
      <DigitButton digit="7" dispatch={dispatch}/>
      <DigitButton digit="8" dispatch={dispatch}/>
      <DigitButton digit="9" dispatch={dispatch}/>
      <OperationButton operation="-" dispatch={dispatch}/>
      <DigitButton digit="0" dispatch={dispatch}/>
      <DigitButton digit="." dispatch={dispatch}/>
      <button className="span-two">=</button>
    </div>
  );
}

export default App;
