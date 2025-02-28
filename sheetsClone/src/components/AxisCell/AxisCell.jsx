import classes from "./AxisCell.module.css";

const AxisCell = (props) => {
  return <th className={classes.AxisCell}>{props.children}</th>;
};

export default AxisCell;
