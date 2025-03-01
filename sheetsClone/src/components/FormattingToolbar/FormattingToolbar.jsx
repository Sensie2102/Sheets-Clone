import React from "react";
import { useRecoilState } from "recoil";
import { CellFormatState } from "../../store/CellFormatState";

const FormattingToolbar = ({ selectedCellId }) => {

  const realCellId = selectedCellId || "__dummy__";

  const [format, setFormat] = useRecoilState(CellFormatState(realCellId));

 
  if (!selectedCellId) {
    return (
      <div style={styles.toolbar}>
        <span>Select a cell to format.</span>
      </div>
    );
  }


  const toggleBold = () => {
    setFormat({ ...format, bold: !format.bold });
  };

  const toggleItalic = () => {
    setFormat({ ...format, italic: !format.italic });
  };

  const changeFontSize = (e) => {
    setFormat({ ...format, fontSize: parseInt(e.target.value, 10) || 12 });
  };

  const changeColor = (e) => {
    setFormat({ ...format, color: e.target.value });
  };

  return (
    <div style={styles.toolbar}>
      <button
        onClick={toggleBold}
        style={{ fontWeight: "bold", marginRight: 10 }}
      >
        B
      </button>
      <button
        onClick={toggleItalic}
        style={{ fontStyle: "italic", marginRight: 10 }}
      >
        I
      </button>
      <input
        type="number"
        value={format.fontSize}
        onChange={changeFontSize}
        min={8}
        max={72}
        style={{ marginRight: 10, width: 60 }}
      />
      <input type="color" value={format.color} onChange={changeColor} />
    </div>
  );
};

const styles = {
  toolbar: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    padding: "10px",
    borderBottom: "1px solid #ccc",
    background: "#fff",
    display: "flex",
    alignItems: "center",
    zIndex: 9999,
  },
};

export default FormattingToolbar;
