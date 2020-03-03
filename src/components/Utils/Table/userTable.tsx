import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  Checkbox,
  TableContainer,
  makeStyles,
  Theme,
  Paper,
  createStyles
} from "@material-ui/core";
import { useState } from "react";

type Users = {
  _id: string;
  name: string;
  email: string;
  role: number;
  createdAt: string;
  updatedAt: string;
  token: string;
};
type UsersTable = Array<Users>;

type Order = "asc" | "desc";
function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const stableSort = (array: any[], comparator: any) => {
  const stabilizeThis = array.map((el, index) => [el, index]);
  stabilizeThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizeThis.map(el => el[0]);
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      width: "100%",
      marginBottom: theme.spacing(2),
      backgroundColor: "#303030",
      color: "currentColor"
    }
  })
);

const UserTable: React.FC<{ users: UsersTable }> = ({ users }) => {
  const classes = useStyles();
  const [order] = useState<Order>("asc");
  const [orderBy] = useState<keyof Users>("name");
  const [page] = useState(0);
  const [rowsPerPage] = useState(5);
  const [selected] = useState<string[]>([]);
  const isSelected = (name: string) => selected.indexOf(name) !== -1;
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, users.length - page * rowsPerPage);
  return (
    <div style={{ color: "currentColor" }}>
      <Paper className={classes.paper}>
        <TableContainer>
          <Table>
            <TableBody>
              {stableSort(users, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(
                  (
                    {
                      _id,
                      name,
                      email,
                      role,
                      createdAt,
                      updatedAt,
                      token
                    }: Users,
                    i: number
                  ) => {
                    const isItemSelected = isSelected(name);
                    const labelId = `enhanced-table-checkbox-${i}`;
                    return (
                      <TableRow
                        hover
                        onClick={() => alert(name)}
                        role="checkbox"
                        tabIndex={-1}
                        key={name}
                        aria-checked={isItemSelected}
                        selected={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isItemSelected}
                            inputProps={{ "aria-labelledby": labelId }}
                          />
                        </TableCell>
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                        >
                          {name}
                        </TableCell>
                        <TableCell align="left">{email}</TableCell>
                        <TableCell align="left">{role}</TableCell>
                        <TableCell align="left">
                          {new Date(createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell align="left">
                          {new Date(updatedAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell align="left">
                          {token ? "Online" : "Away"}
                        </TableCell>
                        <TableCell align="left">{_id}</TableCell>
                      </TableRow>
                    );
                  }
                )}
              {emptyRows > 0 && (
                <TableRow>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};

export default UserTable;
