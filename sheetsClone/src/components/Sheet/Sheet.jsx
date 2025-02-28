import React from "react";
import Row from "../Row/Row";
import Column from "../Column/Column";
import Cell from "../Cell/Cell";

const Sheet = () => {
  return (
    <table>
      <tbody>
        <Row>
          <Column>
            <Cell></Cell>
          </Column>
          <Column>
            <Cell></Cell>
          </Column>
          <Column>
            <Cell></Cell>
          </Column>
          <Column>
            <Cell></Cell>
          </Column>
        </Row>
      </tbody>
    </table>
  );
};

export default Sheet;
