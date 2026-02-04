import VariablesAndConstants from "./VariablesAndConstants";
import VariableTypes from "./VariableTypes";
import BooleanVariables from "./BooleanVariables";
import IfElse from "./IfElse";
import TernaryOperator from "./TernaryOperator";
import Add from "./Add";
import Square from "./Square";
import Highlight from "./Highlight";
import TodoList from "./todos/TodoList";
import AddingAndRemovingToFromArrays from "./AddingAndRemovingToFromArrays";
import ArrayIndexAndLength from "./ArrayIndexAndLength";
import ArrowFunctions from "./ArrowFunctions";
import Classes from "./Classes";
import ClientComponentDemo from "./ClientComponentDemo";
import ConditionalOutputIfElse from "./ConditionalOutputIfElse";
import ConditionalOutputInline from "./ConditionalOutputInLine";
import Destructing from "./Destructing";
import DestructingImports from "./DestructingImports";
import FilterFunction from "./FilterFunction";
import FindFunction from "./FindFunction";
import FindIndex from "./FindIndex";
import ForLoops from "./ForLoops";
import FunctionDestructing from "./FunctionDestructing";
import House from "./House";
import ImpliedReturn from "./ImpliedReturn";
import JsonStringify from "./JsonStringify";
import LegacyFunctions from "./LegacyFunctions";
import MapFunction from "./MapFunction";
import PathParameters from "./PathParameters";
import ServerComponentDemo from "./ServerComponentDemo";
import SimpleArrays from "./SimpleArrays";
import Spreading from "./Spreader";
import Styles from "./Styles";
import TemplateLiterals from "./TemplateLiterals";

export default function Lab3() {
  console.log('Hello World!');
  return(
    <div id="wd-lab3">
      <h3>Lab 3</h3>
      <VariablesAndConstants/>
      <VariableTypes/>
      <BooleanVariables />
      <IfElse />
      <TernaryOperator />
      <Add a={3} b={4} />
      <h4>Square of 4</h4>
      <Square>4</Square>
      <hr />
      <Highlight>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipitratione eaque illo minus cum, saepe totam
        vel nihil repellat nemo explicabo excepturi consectetur. Modi omnis minus sequi maiores, provident voluptates.
     </Highlight>
    <TodoList />
    <AddingAndRemovingToFromArrays />
    <ArrayIndexAndLength />
    <ArrowFunctions />
    <Classes />
    <ClientComponentDemo />
    <ConditionalOutputIfElse />
    <ConditionalOutputInline />
    <Destructing />
    <DestructingImports />
    <FilterFunction />
    <FindFunction />
    <FindIndex />
    <ForLoops />
    <FunctionDestructing />
    <House />
    <ImpliedReturn />
    <JsonStringify />
    <LegacyFunctions />
    <MapFunction />
    <PathParameters />
    <ServerComponentDemo />
    <SimpleArrays />
    <Spreading />
    <Styles />
    <TemplateLiterals />
    </div>
  );
}
