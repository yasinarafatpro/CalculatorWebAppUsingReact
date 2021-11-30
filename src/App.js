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

const INTEGER_FORMATTER=new Intl.NumberFormat("en-us",{maximumFractionDigits:0})

function formateOperand(operand){
  if(operand==null) return 
  const [integr,decimal]=operand.split(".")
  if(decimal==null) return INTEGER_FORMATTER.format(integr)
  return `${INTEGER_FORMATTER.format(integr)}.${decimal}`
}

function reducer(state,{type,payload}){
  switch(type){
    case ACTIONS.ADD_DIGIT:
      if(state.overwrite){
        return{
          ...state,
          currentOperand:payload.digit,
          overwrite:false
        }
      }
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
      case ACTIONS.DELETE_DIGIT:{
        if(state.overwrite){
          return {
            ...state,
            overwrite:false,
            currentOperand:null
          }
        }
        if(state.currentOperand==null)return state
        if(state.currentOperand.length==1){
          return{...state,currentOperand:null}
        }
        return{
          ...state,
          currentOperand:state.currentOperand.slice(0,-1)
        }
      }
      case ACTIONS.EVALUATE:{
        if(
          state.operation==null ||
          state.prevOperand==null||
          state.currentOperand==null
          )
          {
            return state
          }
          return{
            ...state,
            overwrite:true,
            prevOperand:null,
            operation:null,
            currentOperand:calculate(state)
          }
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
        <div className="previous-operator">{formateOperand(prevOperand)} {operation}</div>
        <div className="current-operator">{formateOperand(currentOperand)}</div>
      </div>
      <button className="span-two" onClick={()=>dispatch({type:ACTIONS.CLEAR})}>AC</button>
      <button onClick={()=>dispatch({type:ACTIONS.DELETE_DIGIT})}>DEL</button>
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
      <button className="span-two" onClick={()=>dispatch({type:ACTIONS.EVALUATE})}>=</button>
    </div>
  );
}

export default App;
