import React from "react";
import { Table } from "@mantine/core";

function TableData({ data, blackBet, greenBet }) {
  return (
    <Table>
      <thead>
        <tr>
          <th>Round</th>
          <th>Spin</th>
          <th>Black Bet ({blackBet})</th>
          <th>Green Bet ({greenBet})</th>
          <th>Outcome</th>
          <th>Balance</th>
          <th>Final</th>
        </tr>
      </thead>
      <tbody>
        {data.map((rows) => {
          return (
            <tr>
              <td>{rows.round}</td>
              <td>{rows.spin}</td>
              <td
                style={{
                  backgroundColor: rows.bet100 ? "green" : "red",
                  color: "white",
                }}
              >
                {rows.bet100 ? "Win" : "Lose"}
              </td>
              <td
                style={{
                  backgroundColor: rows.bet10 ? "green" : "red",
                  color: "white",
                }}
              >
                {rows.bet10 ? "Win" : "Lose"}
              </td>
              <td>{rows.outCome}</td>
              <td>{rows.balance}</td>
              <td>{rows.final}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

export default TableData;
