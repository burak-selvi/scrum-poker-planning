import React from 'react';
import { Table, TableHead, TableBody, TableCell, TableRow, makeStyles, withStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 500,
  },
  tableWrapper: {
    border: '1px solid black',
    overflowX: 'auto',
    height: '100%'
  },
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.grey[300],
    // borderRight: '1px solid black'
  },
  body: {
    fontSize: 12,
    // borderRight: '1px solid black'

  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover
    }
  }
}))(TableRow);

const handleRowClick = data => {
  console.log(data)
}

export default function TableWrapper({ columns, items }) {
  const classes = useStyles();

  return (
    <div className={classes.tableWrapper}>
      <Table className={classes.table}>
        <TableHead>
          <StyledTableRow>
            {(columns || []).map((column, i) => {
              return <StyledTableCell key={"column-" + column.title} style={{ paddingLeft: i === 0 && '48px', borderRight: i === columns.length - 1 ? 'none' : '1px solid black' }}>{column.title}</StyledTableCell>
            })}
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {items && items.length > 0 ?
            items.map((row, index) => (
              <StyledTableRow key={'row-' + index} onClick={() => handleRowClick(row)}>
                {
                  columns.map((column, i) => {
                    return <StyledTableCell key={"column-" + index + i} component="th" scope="row" style={{ paddingLeft: i === 0 && '48px', borderRight: i === columns.length - 1 ? 'none' : '1px solid black' }} align={column.align}>
                      {column.rowMapper(row)}
                    </StyledTableCell>
                  })
                }
              </StyledTableRow>
            )) :
            <tr>
              <td>
                <p className="pt-5 pl-5">Kayıt Bulunamadı</p>
              </td>
            </tr>
          }
        </TableBody>
      </Table>
    </div>
  );
}