import Math, { add, subtract, multiply, divide } from "./Math";
import * as Matematica from "./Math";
export default function DestructingImports() {
  return (
    <div id="wd-destructuring-imports">
      <h2>Destructing Imports</h2>
      <table className="table table-sm">
        <thead>
          <tr>
            <th>Math</th>
            <th>Matematica</th>
            <th>Functions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Math.add(2, 3) = {Math.add(2, 3)}</td>
            <td>Matematica.add(2, 3) =
                {Matematica.add(2, 3)}</td>
            <td>add(2, 3) = {add(2, 3)}</td>
          </tr>
          <tr>
            <td>Math.subtract(5, 1) = {Math.subtract(5, 1)}</td>
            <td>Matematica.subtract(5, 1) =
                {Matematica.subtract(5, 1)}</td>
            <td>subtract(5, 1) = {subtract(5, 1)}</td>
          </tr>
          <tr>
            <td>Math.multiply(13, 1) = {Math.subtract(13, 1)}</td>
            <td>Matematica.multiply(13, 1) =
                {Matematica.multiply(13, 1)}</td>
            <td>multiply(13, 1) = {multiply(13, 1)}</td>
          </tr>
          <tr>
            <td>Math.divide(20, 4) = {Math.divide(20, 4)}</td>
            <td>Matematica.divide(20, 4) =
                {Matematica.divide(20, 4)}</td>
            <td>divide(20, 4) = {divide(20, 4)}</td>
          </tr>
        </tbody>
      </table>
      <hr />
    </div>
);}
